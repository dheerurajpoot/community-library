"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Search, Edit, Trash2, Eye, Plus } from "lucide-react";
import AdminSidebar from "@/components/admin-sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Book } from "@/app/my-books/page";
import axios from "axios";

export default function AdminBooksPage() {
	const { isAdmin } = useAuth();
	const router = useRouter();
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedBook, setSelectedBook] = useState<Book | null>(null);
	const [editingBook, setEditingBook] = useState<Book | null>(null);
	const [editForm, setEditForm] = useState<Partial<Book>>({});
	const [filters, setFilters] = useState({
		search: "",
		status: "",
		genre: "",
	});

	const genres = [
		"Fiction",
		"Non-Fiction",
		"Mystery",
		"Romance",
		"Science Fiction",
		"Fantasy",
		"Biography",
		"History",
		"Self-Help",
		"Technology",
		"Business",
		"Health",
		"Travel",
		"Cooking",
		"Art",
		"Other",
	];

	const conditions = ["Excellent", "Good", "Fair", "Poor"];

	useEffect(() => {
		if (!isAdmin) {
			router.push("/");
			return;
		}

		loadBooks();
	}, [isAdmin, router]);

	const loadBooks = async () => {
		try {
			setLoading(true);
			const data = await axios.get("/api/admin/books");
			setBooks(data.data.books);
		} catch (error) {
			console.error("Failed to load books:", error);
			toast("Failed to load books.");
		} finally {
			setLoading(false);
		}
	};

	const handleViewBook = async (bookId: string) => {
		try {
			const book = await axios.post(`/api/admin/books/book`, { bookId });
			setSelectedBook(book.data.book);
		} catch (error) {
			toast("Failed to load book details.");
		}
	};

	const handleEditBook = (book: Book) => {
		setEditingBook(book);
		setEditForm(book);
	};

	const handleUpdateBook = async () => {
		if (!editingBook) return;

		try {
			const data = { ...editForm, bookId: editingBook._id };
			const updatedBook = await axios.put(`/api/admin/books/book`, data);
			if (updatedBook.data.success) {
				loadBooks();
				setEditingBook(null);
				setEditForm({});
				toast("Book updated successfully.");
			}
		} catch (error) {
			toast("Failed to update book.");
		}
	};

	const handleDeleteBook = async (bookId: string) => {
		if (!confirm("Are you sure you want to delete this book?")) return;

		try {
			const res = await axios.delete(`/api/admin/books/book`, {
				data: { bookId },
			});
			if (res.data.success) {
				loadBooks();
				toast("Book deleted successfully.");
			}
		} catch (error) {
			toast("Failed to delete book.");
		}
	};

	const handleFilterChange = (key: string, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
	};

	return (
		<div className='flex min-h-screen bg-gray-50'>
			<AdminSidebar />

			<div className='flex-1 p-8'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						Book Management
					</h1>
					<p className='text-gray-600'>
						Manage and monitor all books in the community library.
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
						<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
							<div className='space-y-2'>
								<Label>Search Books</Label>
								<div className='relative'>
									<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
									<Input
										placeholder='Search by title, author...'
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
										<SelectValue placeholder='All statuses' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>
											All statuses
										</SelectItem>
										<SelectItem value='available'>
											Available
										</SelectItem>
										<SelectItem value='borrowed'>
											Borrowed
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className='space-y-2'>
								<Label>Genre</Label>
								<Select
									value={filters.genre}
									onValueChange={(value) =>
										handleFilterChange("genre", value)
									}>
									<SelectTrigger>
										<SelectValue placeholder='All genres' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>
											All genres
										</SelectItem>
										{genres.map((genre) => (
											<SelectItem
												key={genre}
												value={genre}>
												{genre}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Books Table */}
				<Card>
					<CardHeader>
						<div className='flex items-center justify-between'>
							<CardTitle className='flex items-center gap-2'>
								<BookOpen className='h-5 w-5' />
								Books ({books.length})
							</CardTitle>
							<Button
								onClick={() => router.push("/add-book")}
								className='bg-purple-600 hover:bg-purple-700'>
								<Plus className='h-4 w-4 mr-2' />
								Add Book
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
										<div className='rounded bg-gray-200 h-16 w-12'></div>
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
											<TableHead>Book</TableHead>
											<TableHead>Author</TableHead>
											<TableHead>Genre</TableHead>
											<TableHead>Owner</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Added</TableHead>
											<TableHead>Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{books.map((book) => (
											<TableRow key={book._id}>
												<TableCell>
													<div className='flex items-center gap-3'>
														<div className='w-12 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded flex items-center justify-center'>
															<BookOpen className='h-6 w-6 text-emerald-600' />
														</div>
														<div>
															<div className='font-medium'>
																{book.title}
															</div>
															<div className='text-sm text-gray-500 line-clamp-1'>
																{
																	book.description
																}
															</div>
														</div>
													</div>
												</TableCell>
												<TableCell>
													{book.author}
												</TableCell>
												<TableCell>
													<Badge variant='outline'>
														{book.genre}
													</Badge>
												</TableCell>
												<TableCell>
													<div>
														<div className='font-medium'>
															{book.owner?.name}
														</div>
														<div className='text-sm text-gray-500'>
															{book.address}
														</div>
													</div>
												</TableCell>
												<TableCell>
													<Badge
														variant={
															book.status ===
															"available"
																? "default"
																: "secondary"
														}>
														{book.status}
													</Badge>
												</TableCell>
												<TableCell>
													<div className='text-sm'>
														{book.createdAt
															? new Date(
																	book.createdAt
															  ).toLocaleDateString()
															: "N/A"}
													</div>
												</TableCell>
												<TableCell>
													<div className='flex items-center gap-2'>
														<Button
															variant='ghost'
															size='sm'
															onClick={() =>
																handleViewBook(
																	book._id
																)
															}>
															<Eye className='h-4 w-4' />
														</Button>
														<Button
															variant='ghost'
															size='sm'
															onClick={() =>
																handleEditBook(
																	book
																)
															}>
															<Edit className='h-4 w-4' />
														</Button>
														<Button
															variant='ghost'
															size='sm'
															onClick={() =>
																handleDeleteBook(
																	book._id
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

				{/* View Book Dialog */}
				<Dialog
					open={!!selectedBook}
					onOpenChange={() => setSelectedBook(null)}>
					<DialogContent className='max-w-2xl'>
						<DialogHeader>
							<DialogTitle>Book Details</DialogTitle>
						</DialogHeader>
						{selectedBook && (
							<div className='space-y-6'>
								<div className='flex items-start gap-4'>
									<div className='w-24 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center'>
										<BookOpen className='h-12 w-12 text-emerald-600' />
									</div>
									<div className='flex-1'>
										<h3 className='text-xl font-semibold'>
											{selectedBook.title}
										</h3>
										<p className='text-gray-600 mb-2'>
											by {selectedBook.author}
										</p>
										<div className='flex gap-2 mb-3'>
											<Badge variant='outline'>
												{selectedBook.genre}
											</Badge>
											<Badge
												variant={
													selectedBook.status ===
													"available"
														? "default"
														: "secondary"
												}>
												{selectedBook.status}
											</Badge>
										</div>
										<p className='text-gray-700'>
											{selectedBook.description}
										</p>
									</div>
								</div>

								<div className='grid grid-cols-2 gap-4'>
									<div>
										<Label className='text-sm font-medium text-gray-500'>
											Owner
										</Label>
										<p className='mt-1'>
											{selectedBook.owner?.name}
										</p>
									</div>
									<div>
										<Label className='text-sm font-medium text-gray-500'>
											Location
										</Label>
										<p className='mt-1'>
											{selectedBook.address}
										</p>
									</div>
									<div>
										<Label className='text-sm font-medium text-gray-500'>
											Condition
										</Label>
										<p className='mt-1'>
											{selectedBook.condition}
										</p>
									</div>
									<div>
										<Label className='text-sm font-medium text-gray-500'>
											Added
										</Label>
										<p className='mt-1'>
											{selectedBook.createdAt
												? new Date(
														selectedBook.createdAt
												  ).toLocaleDateString()
												: "N/A"}
										</p>
									</div>
								</div>
							</div>
						)}
					</DialogContent>
				</Dialog>

				{/* Edit Book Dialog */}
				<Dialog
					open={!!editingBook}
					onOpenChange={() => setEditingBook(null)}>
					<DialogContent className='max-w-2xl'>
						<DialogHeader>
							<DialogTitle>Edit Book</DialogTitle>
						</DialogHeader>
						{editingBook && (
							<div className='space-y-4'>
								<div className='grid grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label>Title</Label>
										<Input
											value={editForm.title || ""}
											onChange={(e) =>
												setEditForm((prev) => ({
													...prev,
													title: e.target.value,
												}))
											}
										/>
									</div>
									<div className='space-y-2'>
										<Label>Author</Label>
										<Input
											value={editForm.author || ""}
											onChange={(e) =>
												setEditForm((prev) => ({
													...prev,
													author: e.target.value,
												}))
											}
										/>
									</div>
								</div>

								<div className='grid grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label>Genre</Label>
										<Select
											value={editForm.genre || "all"}
											onValueChange={(value) =>
												setEditForm((prev) => ({
													...prev,
													genre: value,
												}))
											}>
											<SelectTrigger>
												<SelectValue placeholder='Select genre' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='all'>
													All genres
												</SelectItem>
												{genres.map((genre) => (
													<SelectItem
														key={genre}
														value={genre}>
														{genre}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className='space-y-2'>
										<Label>Condition</Label>
										<Select
											value={
												editForm.condition ||
												"Excellent"
											}
											onValueChange={(value) =>
												setEditForm((prev) => ({
													...prev,
													condition: value,
												}))
											}>
											<SelectTrigger>
												<SelectValue placeholder='Select condition' />
											</SelectTrigger>
											<SelectContent>
												{conditions.map((condition) => (
													<SelectItem
														key={condition}
														value={condition}>
														{condition}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className='space-y-2'>
									<Label>Description</Label>
									<Textarea
										value={editForm.description || ""}
										onChange={(e) =>
											setEditForm((prev) => ({
												...prev,
												description: e.target.value,
											}))
										}
										rows={3}
									/>
								</div>

								<div className='space-y-2'>
									<Label>Status</Label>
									<Select
										value={editForm.status || "available"}
										onValueChange={(value) =>
											setEditForm((prev) => ({
												...prev,
												status: value as
													| "available"
													| "borrowed",
											}))
										}>
										<SelectTrigger>
											<SelectValue placeholder='Select status' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='available'>
												Available
											</SelectItem>
											<SelectItem value='borrowed'>
												Borrowed
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className='flex justify-end gap-2 pt-4'>
									<Button
										variant='outline'
										onClick={() => setEditingBook(null)}>
										Cancel
									</Button>
									<Button
										onClick={handleUpdateBook}
										className='bg-purple-600 hover:bg-purple-700'>
										Update Book
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
