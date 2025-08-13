"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Users, Search, Edit, Trash2, Eye, UserPlus } from "lucide-react";
import AdminSidebar from "@/components/admin-sidebar";
import { useRouter } from "next/navigation";
import { useAuth, User } from "@/contexts/AuthContext";

interface UserFormData {
	name?: string;
	email?: string;
	phone?: string;
	address?: string;
	isActive?: string;
}

import { toast } from "sonner";
import axios from "axios";

export default function AdminUsersPage() {
	const { isAdmin } = useAuth();
	const router = useRouter();
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [editForm, setEditForm] = useState<UserFormData>({});
	const [filters, setFilters] = useState({
		search: "",
		status: "",
	});

	useEffect(() => {
		if (!isAdmin) {
			router.push("/admin/login");
			return;
		}

		loadUsers();
	}, [isAdmin]);

	const loadUsers = async () => {
		try {
			setLoading(true);
			const data = await axios.get("/api/admin/users");
			setUsers(data.data.users);
		} catch (error) {
			console.error("Failed to load users:", error);
			toast("Failed to load users.");
		} finally {
			setLoading(false);
		}
	};

	const handleViewUser = async (userId: string) => {
		try {
			console.log(userId);
			const res = await axios.post(
				`/api/admin/users/user`,
				{ userId },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			setSelectedUser(res.data.user);
		} catch (error) {
			toast("Failed to load user details.");
		}
	};

	const handleEditUser = (user: User) => {
		setEditingUser(user);
		setEditForm({
			name: user.name,
			email: user.email,
			phone: user.phone,
			address: user.address,
			isActive: user.isActive,
		});
	};

	const handleUpdateUser = async () => {
		if (!editingUser) return;

		try {
			const updatedUser = await axios.put(`/api/admin/users`, editForm);
			if (updatedUser.data.success) {
				loadUsers();
				setEditingUser(null);
				setEditForm({});
				toast("User updated successfully.");
			}
		} catch (error) {
			toast("Failed to update user.");
		}
	};

	const handleDeleteUser = async (userId: string) => {
		if (!confirm("Are you sure you want to delete this user?")) return;

		try {
			const res = await axios.delete(`/api/admin/users`, {
				data: { userId },
			});
			if (res.data.success) {
				loadUsers();
				toast("User deleted successfully.");
			}
		} catch (error) {
			toast("Failed to delete user.");
		}
	};

	const handleFilterChange = (key: string, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
	};

	if (!isAdmin) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				Loading...
			</div>
		);
	}

	return (
		<div className='flex min-h-screen bg-gray-50'>
			<AdminSidebar />

			<div className='flex-1 p-8'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						User Management
					</h1>
					<p className='text-gray-600'>
						Manage and monitor all users in the community library.
					</p>
				</div>

				{/* Filters */}
				<Card className='mb-6'>
					<CardHeader>
						<CardTitle className='flex items-center gap-2'>
							<Search className='h-5 w-5' />
							Filters
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<div className='space-y-2'>
								<Label>Search Users</Label>
								<div className='relative'>
									<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
									<Input
										placeholder='Search by name or email...'
										value={filters.search}
										onChange={(e) =>
											handleFilterChange(
												"search",
												e.target.value
											)
										}
										className='pl-10'
									/>
								</div>
							</div>
							<div className='space-y-2'>
								<Label>Status</Label>
								<Select
									value={filters.status}
									onValueChange={(value) =>
										handleFilterChange("status", value)
									}>
									<SelectTrigger>
										<SelectValue placeholder='Select status' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>
											All statuses
										</SelectItem>
										<SelectItem value='active'>
											Active
										</SelectItem>
										<SelectItem value='blocked'>
											Blocked
										</SelectItem>
										<SelectItem value='deleted'>
											Deleted
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Users Table */}
				<Card>
					<CardHeader>
						<div className='flex items-center justify-between'>
							<CardTitle className='flex items-center gap-2'>
								<Users className='h-5 w-5' />
								Users ({users.length})
							</CardTitle>
							<Button className='bg-purple-600 hover:bg-purple-700'>
								<UserPlus className='h-4 w-4 mr-2' />
								Add User
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						{loading ? (
							<div className='space-y-4'>
								{Array.from({ length: 5 }).map((_, i) => (
									<div
										key={i}
										className='animate-pulse flex items-center space-x-4'>
										<div className='rounded-full bg-gray-200 h-10 w-10'></div>
										<div className='flex-1 space-y-2'>
											<div className='h-4 bg-gray-200 rounded w-3/4'></div>
											<div className='h-3 bg-gray-200 rounded w-1/2'></div>
										</div>
									</div>
								))}
							</div>
						) : (
							<>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>User</TableHead>
											<TableHead>Email</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Location</TableHead>
											<TableHead>Joined</TableHead>
											<TableHead>Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{users.map((user) => (
											<TableRow key={user._id}>
												<TableCell>
													<div className='flex items-center gap-3'>
														<Avatar className='h-8 w-8'>
															<AvatarFallback className='bg-purple-100 text-purple-600'>
																{user.name
																	.charAt(0)
																	.toUpperCase()}
															</AvatarFallback>
														</Avatar>
														<div>
															<div className='font-medium'>
																{user?.name}
															</div>
															<div className='text-sm text-gray-500'>
																{user.phone}
															</div>
														</div>
													</div>
												</TableCell>
												<TableCell>
													{user.email}
												</TableCell>
												<TableCell>
													<Badge
														variant={
															user.isActive
																? "default"
																: "secondary"
														}>
														{user.isActive}
													</Badge>
												</TableCell>
												<TableCell>
													<div className='text-sm'>
														{user.city && user.state
															? `${user.city}, ${user.state}`
															: "Not provided"}
													</div>
												</TableCell>
												<TableCell>
													<div className='text-sm'>
														{new Date(
															user.createdAt
														).toLocaleDateString()}
													</div>
												</TableCell>
												<TableCell>
													<div className='flex items-center gap-2'>
														<Button
															variant='ghost'
															size='sm'
															onClick={() =>
																handleViewUser(
																	user._id
																)
															}>
															<Eye className='h-4 w-4' />
														</Button>
														<Button
															variant='ghost'
															size='sm'
															onClick={() =>
																handleEditUser(
																	user
																)
															}>
															<Edit className='h-4 w-4' />
														</Button>
														<Button
															variant='ghost'
															size='sm'
															onClick={() =>
																handleDeleteUser(
																	user._id
																)
															}
															className='text-red-600 hover:text-red-700'>
															<Trash2 className='h-4 w-4' />
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</>
						)}
					</CardContent>
				</Card>

				{/* View User Dialog */}
				<Dialog
					open={!!selectedUser}
					onOpenChange={() => setSelectedUser(null)}>
					<DialogContent className='max-w-2xl'>
						<DialogHeader>
							<DialogTitle>User Details</DialogTitle>
						</DialogHeader>
						{selectedUser && (
							<div className='space-y-6'>
								<div className='flex items-center gap-4'>
									<Avatar className='h-16 w-16'>
										<AvatarFallback className='bg-purple-100 text-purple-600 text-xl'>
											{selectedUser.name
												?.charAt(0)
												?.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div>
										<h3 className='text-xl font-semibold'>
											{selectedUser.name}
										</h3>
										<p className='text-gray-600'>
											{selectedUser.email}
										</p>
										<Badge
											variant={
												selectedUser.isActive
													? "default"
													: "secondary"
											}
											className='mt-1'>
											{selectedUser.isActive}
										</Badge>
									</div>
								</div>

								<div className='grid grid-cols-2 gap-4'>
									<div>
										<Label className='text-sm font-medium text-gray-500'>
											Phone
										</Label>
										<p className='mt-1'>
											{selectedUser.phone ||
												"Not provided"}
										</p>
									</div>
									<div>
										<Label className='text-sm font-medium text-gray-500'>
											Address
										</Label>
										<p className='mt-1'>
											{selectedUser.address ? (
												<>
													{selectedUser.address}
													<br />
													{selectedUser.city},{" "}
													{selectedUser.state}{" "}
													{selectedUser.zipCode}
												</>
											) : (
												"Not provided"
											)}
										</p>
									</div>
									<div>
										<Label className='text-sm font-medium text-gray-500'>
											Member Since
										</Label>
										<p className='mt-1'>
											{new Date(
												selectedUser.createdAt
											).toLocaleDateString()}
										</p>
									</div>
								</div>
							</div>
						)}
					</DialogContent>
				</Dialog>

				{/* Edit User Dialog */}
				<Dialog
					open={!!editingUser}
					onOpenChange={() => setEditingUser(null)}>
					<DialogContent className='max-w-2xl'>
						<DialogHeader>
							<DialogTitle>Edit User</DialogTitle>
						</DialogHeader>
						{editingUser && (
							<div className='space-y-4'>
								<div className='grid grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label>Name</Label>
										<Input
											value={editForm?.name || ""}
											onChange={(e) =>
												setEditForm((prev: UserFormData) => ({
													...prev,
													name: e.target.value,
												}))
											}
										/>
									</div>
								</div>

								<div className='space-y-2'>
									<Label>Email</Label>
									<Input
										type='email'
										value={editForm?.email || ""}
										onChange={(e) =>
											setEditForm((prev: UserFormData) => ({
												...prev,
												email: e.target.value,
											}))
										}
									/>
								</div>

								<div className='space-y-2'>
									<Label>Phone</Label>
									<Input
										value={editForm?.phone || ""}
										onChange={(e) =>
											setEditForm((prev: UserFormData) => ({
												...prev,
												phone: e.target.value,
											}))
										}
									/>
								</div>

								<div className='space-y-2'>
									<Label>Address</Label>
									<Input
										value={editForm?.address || ""}
										onChange={(e) =>
											setEditForm((prev: UserFormData) => ({
												...prev,
												address: e.target.value,
											}))
										}
									/>
								</div>

								<div className='space-y-2'>
									<Label>Status</Label>
									<Select
										value={editForm.isActive}
										onValueChange={(value) =>
											setEditForm((prev: UserFormData) => ({
												...prev,
												isActive: value,
											}))
										}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='active'>
												Active
											</SelectItem>
											<SelectItem value='blocked'>
												Blocked
											</SelectItem>
											<SelectItem value='deleted'>
												Deleted
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className='flex justify-end gap-2 pt-4'>
									<Button
										variant='outline'
										onClick={() => setEditingUser(null)}>
										Cancel
									</Button>
									<Button
										onClick={handleUpdateUser}
										className='bg-purple-600 hover:bg-purple-700'>
										Update User
									</Button>
								</div>
							</div>
						)}
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
