"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { BookOpen, MapPin, Calendar, ArrowLeft } from "lucide-react";
import Navigation from "@/components/navigation";
import { toast } from "sonner";
import { Book } from "@/app/my-books/page";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function BookDetailsPage() {
	const params = useParams();
	const router = useRouter();
	const [book, setBook] = useState<Book | null>(null);
	const [loading, setLoading] = useState(true);
	const [borrowing, setBorrowing] = useState(false);
	const [returnDate, setReturnDate] = useState<string>("");

	useEffect(() => {
		if (params.id) {
			loadBook(params.id as string);
		}
	}, [params.id]);

	const loadBook = async (id: string) => {
		try {
			const data = await axios.get(`/api/books/${id}`);
			setBook(data.data.book);
		} catch (error) {
			console.error("Failed to load book:", error);
			toast("Failed to load book details.");
		} finally {
			setLoading(false);
		}
	};

	const handleBorrow = async () => {
		if (!book) return;

		setBorrowing(true);
		try {
			await axios.post("/api/borrow", {
				bookId: book._id,
				returnDate,
			});
			toast(
				"Book borrowed successfully! Contact the owner to arrange pickup."
			);
		} catch (error) {
			console.error("Failed to borrow book:", error);
			toast("Failed to borrow book. Please try again.");
		} finally {
			setBorrowing(false);
		}
	};

	if (loading) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
				<Navigation />
				<div className='container mx-auto px-4 py-8'>
					<div className='max-w-4xl mx-auto'>
						<Card className='animate-pulse'>
							<CardHeader>
								<div className='h-8 bg-gray-200 rounded w-3/4'></div>
								<div className='h-4 bg-gray-200 rounded w-1/2'></div>
							</CardHeader>
							<CardContent>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
									<div className='h-96 bg-gray-200 rounded'></div>
									<div className='space-y-4'>
										<div className='h-4 bg-gray-200 rounded w-full'></div>
										<div className='h-4 bg-gray-200 rounded w-3/4'></div>
										<div className='h-4 bg-gray-200 rounded w-1/2'></div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		);
	}

	if (!book) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
				<Navigation />
				<div className='container mx-auto px-4 py-8'>
					<div className='text-center py-12'>
						<BookOpen className='h-16 w-16 text-gray-300 mx-auto mb-4' />
						<h3 className='text-xl font-semibold text-gray-600 mb-2'>
							Book not found
						</h3>
						<p className='text-gray-500 mb-4'>
							The book you&apos;re looking for doesn&apos;t exist.
						</p>
						<Button
							onClick={() => router.push("/")}
							className='bg-emerald-600 hover:bg-emerald-700'>
							Back to Home
						</Button>
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
					<Button
						variant='ghost'
						onClick={() => router.back()}
						className='mb-6 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'>
						<ArrowLeft className='h-4 w-4 mr-2' />
						Back
					</Button>

					<Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<div className='flex items-start justify-between'>
								<div className='flex-1'>
									<CardTitle className='md:text-3xl text-xl font-bold text-gray-800 mb-2'>
										{book.title}
									</CardTitle>
									<p className='text-xl text-gray-600'>
										by {book.author}
									</p>
								</div>
								<Badge
									variant={
										book.status === "available"
											? "default"
											: "secondary"
									}
									className={`text-lg px-4 py-2 ${
										book.status === "available"
											? "bg-emerald-100 text-emerald-800"
											: "bg-gray-100 text-gray-800"
									}`}>
									{book.status}
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
								{/* Book Cover */}
								<div className='aspect-[3/4] bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center shadow-lg'>
									<BookOpen className='h-24 w-24 text-emerald-400' />
								</div>

								{/* Book Details */}
								<div className='space-y-6'>
									<div>
										<h3 className='text-lg font-semibold text-gray-800 mb-3'>
											Book Information
										</h3>
										<div className='space-y-3'>
											<div className='flex items-center gap-3'>
												<Badge
													variant='outline'
													className='text-sm'>
													{book.genre}
												</Badge>
												<span className='text-sm text-gray-600'>
													Condition: {book.condition}
												</span>
											</div>
											{book.description && (
												<p className='text-gray-700 leading-relaxed'>
													{book.description}
												</p>
											)}
										</div>
									</div>

									<Separator />

									<div>
										<h3 className='text-lg font-semibold text-gray-800 mb-3'>
											Owner Information
										</h3>
										<div className='space-y-3'>
											<div className='flex items-center gap-3'>
												<Avatar className='h-10 w-10'>
													<AvatarFallback className='bg-emerald-100 text-emerald-600 font-semibold'>
														{book?.owner?.name
															?.charAt(0)
															.toUpperCase()}
													</AvatarFallback>
												</Avatar>
												<div>
													<p className='font-medium text-gray-800'>
														{book?.owner?.name}
													</p>
													<div className='flex items-center gap-1 text-sm text-gray-600'>
														<MapPin className='h-3 w-3' />
														<span>
															{book?.address}
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>

									<Separator />

									<div>
										<h3 className='text-lg font-semibold text-gray-800 mb-3'>
											Availability
										</h3>
										<div className='space-y-3'>
											<div className='flex items-center gap-2 text-sm text-gray-600'>
												<Calendar className='h-4 w-4' />
												<span>
													Added:{" "}
													{new Date(
														book?.createdAt ||
															Date.now()
													).toLocaleDateString()}
												</span>
											</div>
											<div className='flex items-center gap-2 text-sm text-gray-600'>
												<Calendar className='h-4 w-4' />
												<Label>Return Date: </Label>
												<Input
													className='w-1/2'
													type='date'
													value={returnDate}
													onChange={(e) =>
														setReturnDate(
															e.target.value
														)
													}
												/>
											</div>
											{book?.status === "available" ? (
												<p className='text-emerald-600 font-medium'>
													✓ Available for borrowing
												</p>
											) : (
												<p className='text-gray-500'>
													Currently not available
												</p>
											)}
										</div>
									</div>

									{/* Action Buttons */}
									<div className='flex gap-3 pt-4'>
										<Button
											onClick={handleBorrow}
											disabled={
												book.status !== "available" ||
												borrowing
											}
											className='flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 cursor-pointer'>
											{borrowing
												? "Requesting..."
												: book.status === "available"
												? "Request to Borrow"
												: "Not Available"}
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
