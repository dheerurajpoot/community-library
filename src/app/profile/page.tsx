"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Mail,
	Phone,
	MapPin,
	Calendar,
	RotateCcw,
	Edit,
	User2,
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { toast } from "sonner";
import type { User } from "@/contexts/AuthContext";
import axios from "axios";

export default function ProfilePage() {
	const [loading, setLoading] = useState(false);
	const [editing, setEditing] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		phone: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
	});

	const getUser = async () => {
		try {
			setLoading(true);
			const res = await axios.get("/api/auth/me");
			const data = await res.data;
			if (data.success) {
				setUser(data.user);
			}
		} catch (error) {
			console.error("Get user error:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		if (user) {
			setFormData({
				firstName: user.name.split(" ")[0] || "",
				lastName: user.name.split(" ")[1] || "",
				phone: user.phone || "",
				address: user.address || "",
				city: user.city || "",
				state: user.state || "",
				zipCode: user.zipCode || "",
			});
		}
	}, [user]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			await axios.put("/api/auth/me", formData);
			setEditing(false);
			toast("Profile updated successfully");
		} catch (error) {
			toast("Failed to update profile. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	if (!user) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
				<Navigation />
				<div className='container mx-auto px-4 py-8'>
					<div className='text-center py-12'>
						<User2 className='h-16 w-16 text-gray-300 mx-auto mb-4' />
						<h3 className='text-xl font-semibold text-gray-600 mb-2'>
							Please log in
						</h3>
						<p className='text-gray-500'>
							You need to be logged in to view your profile.
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
			<Navigation />

			<div className='container mx-auto px-4 py-8'>
				<div className='max-w-4xl mx-auto'>
					<div className='text-center mb-8'>
						<Avatar className='h-24 w-24 mx-auto mb-4'>
							<AvatarFallback className='text-2xl bg-emerald-100 text-emerald-600'>
								{user?.name.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<h1 className='text-3xl font-bold text-gray-800 mb-2'>
							{user?.name}
						</h1>
						<p className='text-gray-600'>{user?.email}</p>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						{/* Profile Information */}
						<div className='lg:col-span-2'>
							<Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
								<CardHeader>
									<div className='flex items-center justify-between'>
										<CardTitle className='flex items-center gap-2 text-emerald-600'>
											<User2 className='h-5 w-5' />
											Profile Information
										</CardTitle>
										<Button
											variant='outline'
											size='sm'
											onClick={() => setEditing(!editing)}
											className='border-emerald-200 text-emerald-600 hover:bg-emerald-50'>
											<Edit className='h-4 w-4 mr-1' />
											{editing ? "Cancel" : "Edit"}
										</Button>
									</div>
								</CardHeader>
								<CardContent>
									{editing ? (
										<form
											onSubmit={handleSubmit}
											className='space-y-4'>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												<div className='space-y-2'>
													<Label htmlFor='firstName'>
														First Name
													</Label>
													<Input
														id='firstName'
														value={
															formData.firstName
														}
														onChange={(e) =>
															handleChange(
																"firstName",
																e.target.value
															)
														}
														className='border-emerald-200 focus:border-emerald-500'
													/>
												</div>
												<div className='space-y-2'>
													<Label htmlFor='lastName'>
														Last Name
													</Label>
													<Input
														id='lastName'
														value={
															formData.lastName
														}
														onChange={(e) =>
															handleChange(
																"lastName",
																e.target.value
															)
														}
														className='border-emerald-200 focus:border-emerald-500'
													/>
												</div>
											</div>

											<div className='space-y-2'>
												<Label htmlFor='phone'>
													Phone Number
												</Label>
												<Input
													id='phone'
													value={formData.phone}
													onChange={(e) =>
														handleChange(
															"phone",
															e.target.value
														)
													}
													className='border-emerald-200 focus:border-emerald-500'
												/>
											</div>

											<div className='space-y-2'>
												<Label htmlFor='address'>
													Address
												</Label>
												<Input
													id='address'
													value={formData.address}
													onChange={(e) =>
														handleChange(
															"address",
															e.target.value
														)
													}
													className='border-emerald-200 focus:border-emerald-500'
												/>
											</div>

											<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
												<div className='space-y-2'>
													<Label htmlFor='city'>
														City
													</Label>
													<Input
														id='city'
														value={formData.city}
														onChange={(e) =>
															handleChange(
																"city",
																e.target.value
															)
														}
														className='border-emerald-200 focus:border-emerald-500'
													/>
												</div>
												<div className='space-y-2'>
													<Label htmlFor='state'>
														State
													</Label>
													<Input
														id='state'
														value={formData.state}
														onChange={(e) =>
															handleChange(
																"state",
																e.target.value
															)
														}
														className='border-emerald-200 focus:border-emerald-500'
													/>
												</div>
												<div className='space-y-2'>
													<Label htmlFor='zipCode'>
														Zip Code
													</Label>
													<Input
														id='zipCode'
														value={formData.zipCode}
														onChange={(e) =>
															handleChange(
																"zipCode",
																e.target.value
															)
														}
														className='border-emerald-200 focus:border-emerald-500'
													/>
												</div>
											</div>

											<div className='flex gap-4 pt-4'>
												<Button
													type='button'
													variant='outline'
													onClick={() =>
														setEditing(false)
													}
													className='flex-1 border-emerald-200 text-emerald-600 hover:bg-emerald-50'>
													Cancel
												</Button>
												<Button
													type='submit'
													disabled={loading}
													className='flex-1 bg-emerald-600 hover:bg-emerald-700'>
													{loading
														? "Saving..."
														: "Save Changes"}
												</Button>
											</div>
										</form>
									) : (
										<div className='space-y-4'>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												<div className='flex items-center gap-3'>
													<User2 className='h-4 w-4 text-gray-400' />
													<div>
														<p className='text-sm text-gray-500'>
															Name
														</p>
														<p className='font-medium'>
															{user.name}
														</p>
													</div>
												</div>
												<div className='flex items-center gap-3'>
													<Mail className='h-4 w-4 text-gray-400' />
													<div>
														<p className='text-sm text-gray-500'>
															Email
														</p>
														<p className='font-medium'>
															{user.email}
														</p>
													</div>
												</div>
											</div>

											{user.phone && (
												<div className='flex items-center gap-3'>
													<Phone className='h-4 w-4 text-gray-400' />
													<div>
														<p className='text-sm text-gray-500'>
															Phone
														</p>
														<p className='font-medium'>
															{user.phone}
														</p>
													</div>
												</div>
											)}

											{(user.address ||
												user.city ||
												user.state) && (
												<div className='flex items-center gap-3'>
													<MapPin className='h-4 w-4 text-gray-400' />
													<div>
														<p className='text-sm text-gray-500'>
															Address
														</p>
														<p className='font-medium'>
															{[
																user.address,
																user.city,
																user.state,
																user.zipCode,
															]
																.filter(Boolean)
																.join(", ") ||
																"Not provided"}
														</p>
													</div>
												</div>
											)}

											<div className='flex items-center gap-3'>
												<Calendar className='h-4 w-4 text-gray-400' />
												<div>
													<p className='text-sm text-gray-500'>
														Member since
													</p>
													<p className='font-medium'>
														{new Date(
															user.createdAt
														).toLocaleDateString()}
													</p>
												</div>
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						</div>

						{/* Activity Summary */}
						<div className='space-y-6'>
							<Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
								<CardHeader>
									<CardTitle className='flex items-center gap-2 text-emerald-600'>
										<RotateCcw className='h-5 w-5' />
										Quick Actions
									</CardTitle>
								</CardHeader>
								<CardContent className='space-y-3'>
									<Button
										className='w-full bg-emerald-600 hover:bg-emerald-700'
										asChild>
										<a href='/add-book'>Add New Book</a>
									</Button>
									<Button
										variant='outline'
										className='w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-transparent'
										asChild>
										<a href='/my-books'>Manage My Books</a>
									</Button>
									<Button
										variant='outline'
										className='w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-transparent'
										asChild>
										<a href='/borrowed'>
											View Borrowed Books
										</a>
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
