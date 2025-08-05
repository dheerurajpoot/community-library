"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { BookOpen, Plus } from "lucide-react";
import axios from "axios";
import Navigation from "@/components/navigation";
import { toast } from "sonner";

export default function AddBookPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		author: "",
		genre: "",
		isbn: "",
		image: "",
		description: "",
		condition: "",
		address: "",
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			setLoading(true);
			const res = await axios.post("/api/books", formData);
			console.log(res.data);
			if (res.data.success) {
				setLoading(false);
				toast("Your book has been added to the community library.");
				setTimeout(() => {
					router.push("/my-books");
				}, 2000);
			}
		} catch (error) {
			setLoading(false);
			console.log("Error adding book:", error);
			toast(
				(error as { response: { data: { message: string } } }).response
					.data.message || "Failed to add book. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
			<Navigation />

			<div className='container mx-auto px-4 py-8'>
				<div className='max-w-2xl mx-auto'>
					<div className='text-center mb-8'>
						<div className='bg-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
							<Plus className='h-8 w-8 text-white' />
						</div>
						<h1 className='text-3xl font-bold text-gray-800 mb-2'>
							Add a Book
						</h1>
						<p className='text-gray-600'>
							Share your books with the community and help others
							learn
						</p>
					</div>

					<Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<BookOpen className='h-5 w-5' />
								Book Details
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className='space-y-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label htmlFor='title'>
											Book Title *
										</Label>
										<Input
											id='title'
											value={formData.title}
											onChange={(e) =>
												handleChange(
													"title",
													e.target.value
												)
											}
											placeholder='Enter book title'
											required
											className='border-emerald-200 focus:border-emerald-500'
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='author'>Author *</Label>
										<Input
											id='author'
											value={formData.author}
											onChange={(e) =>
												handleChange(
													"author",
													e.target.value
												)
											}
											placeholder='Enter author name'
											required
											className='border-emerald-200 focus:border-emerald-500'
										/>
									</div>
								</div>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label htmlFor='isbn'>ISBN *</Label>
										<Input
											id='isbn'
											value={formData.isbn}
											onChange={(e) =>
												handleChange(
													"isbn",
													e.target.value
												)
											}
											placeholder='Enter ISBN'
											required
											className='border-emerald-200 focus:border-emerald-500'
										/>
									</div>
								</div>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label htmlFor='genre'>Genre *</Label>
										<Select
											value={formData.genre}
											onValueChange={(value) =>
												handleChange("genre", value)
											}>
											<SelectTrigger className='border-emerald-200 focus:border-emerald-500'>
												<SelectValue placeholder='Select genre' />
											</SelectTrigger>
											<SelectContent>
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
										<Label htmlFor='condition'>
											Condition *
										</Label>
										<Select
											value={formData.condition}
											onValueChange={(value) =>
												handleChange("condition", value)
											}>
											<SelectTrigger className='border-emerald-200 focus:border-emerald-500'>
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
									<Label htmlFor='description'>
										Description
									</Label>
									<Textarea
										id='description'
										value={formData.description}
										onChange={(e) =>
											handleChange(
												"description",
												e.target.value
											)
										}
										placeholder='Brief description of the book...'
										rows={3}
										className='border-emerald-200 focus:border-emerald-500'
									/>
								</div>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label htmlFor='image'>Image *</Label>
										<Input
											id='image'
											type='file'
											value={formData.image}
											onChange={(e) =>
												handleChange(
													"image",
													e.target.value
												)
											}
											placeholder='Enter your name'
											required
											className='border-emerald-200 focus:border-emerald-500'
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='address'>
											Address *
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
											placeholder='City, State'
											required
											className='border-emerald-200 focus:border-emerald-500'
										/>
									</div>
								</div>

								<div className='flex gap-4 pt-4'>
									<Button
										type='button'
										variant='outline'
										onClick={() => router.back()}
										className='flex-1 border-emerald-200 text-emerald-600 hover:bg-emerald-50'>
										Cancel
									</Button>
									<Button
										type='submit'
										disabled={loading}
										className='flex-1 bg-emerald-600 hover:bg-emerald-700'>
										{loading ? "Adding..." : "Add Book"}
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
