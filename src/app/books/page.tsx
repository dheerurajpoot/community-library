"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BookOpen, MapPin } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "../my-books/page";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useSearchParams } from "next/navigation";

const BooksPage = () => {
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState(true);
	const searchParams = useSearchParams();
	const searchTerm = searchParams.get("search");

	useEffect(() => {
		loadBooks();
	}, [searchTerm]);

	const loadBooks = async () => {
		try {
			setLoading(true);

			const query = searchTerm
				? `?search=${encodeURIComponent(searchTerm)}`
				: "";
			const res = await axios.get(`/api/books${query}`);
			setBooks(res.data.books);
		} catch (error) {
			console.error("Failed to load books:", error);
			setBooks([]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
			<Navigation />
			<div className='container mx-auto px-4 py-10'>
				<div className='flex items-center justify-between mb-12'>
					<div>
						<h2 className='text-4xl font-bold text-gray-800 mb-2'>
							Featured Books
						</h2>
						<p className='text-gray-600'>
							Discover popular books in your community
						</p>
					</div>
				</div>

				{books.length === 0 && (
					<h2 className='text-gray-600 text-2xl font-bold text-center'>
						No books found
					</h2>
				)}

				<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{loading
						? Array.from({ length: 8 }).map((_, i) => (
								<Card key={i} className='animate-pulse'>
									<CardHeader>
										<div className='h-4 bg-gray-200 rounded w-3/4'></div>
										<div className='h-3 bg-gray-200 rounded w-1/2'></div>
									</CardHeader>
									<CardContent>
										<div className='h-32 bg-gray-200 rounded mb-4'></div>
										<div className='h-3 bg-gray-200 rounded w-full mb-2'></div>
										<div className='h-3 bg-gray-200 rounded w-2/3'></div>
									</CardContent>
								</Card>
						  ))
						: books.map((book) => (
								<Card
									key={book._id}
									className='group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm'>
									<CardHeader className='pb-3'>
										<div className='flex items-start justify-between'>
											<div className='flex-1'>
												<CardTitle className='text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-2'>
													{book.title}
												</CardTitle>
												<p className='text-sm text-gray-600 mt-1'>
													by {book.author}
												</p>
											</div>
											<Badge
												variant={
													book.status === "available"
														? "default"
														: "secondary"
												}
												className={
													book.status === "available"
														? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
														: ""
												}>
												{book.status}
											</Badge>
										</div>
									</CardHeader>
									<CardContent className='pb-3'>
										<div className='aspect-[3/4] overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center'>
											{book.image && book.image !== "" ? (
												<img
													className='h-full w-full object-cover'
													src={book.image}
												/>
											) : (
												<BookOpen className='h-12 w-12 text-emerald-400' />
											)}
										</div>
										<div className='space-y-2'>
											<Badge
												variant='outline'
												className='text-xs'>
												{book.genre}
											</Badge>
											<p className='text-sm text-gray-600 line-clamp-2'>
												{book.description}
											</p>
										</div>
									</CardContent>
									<CardFooter className='pt-0'>
										<div className='w-full space-y-3'>
											<div className='flex items-center gap-2 text-sm text-gray-500'>
												<Avatar className='h-6 w-6'>
													<AvatarFallback className='text-xs bg-emerald-100 text-emerald-600'>
														{book?.owner?.name
															?.charAt(0)
															.toUpperCase()}
													</AvatarFallback>
												</Avatar>
												<span>{book?.owner?.name}</span>
												<div className='flex items-center gap-1 ml-auto'>
													<MapPin className='h-3 w-3' />
													<span className='text-xs'>
														{book?.address}
													</span>
												</div>
											</div>
											<Link
												href={`/book/${book._id}`}
												className='block'>
												<Button
													className='w-full bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
													disabled={
														book.status !==
														"available"
													}>
													{book.status === "available"
														? "View Details"
														: "Not Available"}
												</Button>
											</Link>
										</div>
									</CardFooter>
								</Card>
						  ))}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default BooksPage;
