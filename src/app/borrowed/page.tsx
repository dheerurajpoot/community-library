"use client";

import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, Calendar, User, MapPin, RotateCcw } from "lucide-react";
import Navigation from "@/components/navigation";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";

interface BorrowTransaction {
	_id: string;
	book: {
		_id: string;
		title: string;
		author: string;
		owner: string;
		address: string;
	};
	owner: {
		_id: string;
		name: string;
		address: string;
	};
	borrowDate: string;
	returnDate: string;
	status: string;
}

export default function BorrowedBooksPage() {
	const [transactions, setTransactions] = useState<BorrowTransaction[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadBorrowedBooks();
	}, []);

	const loadBorrowedBooks = async () => {
		try {
			const res = await axios.get("/api/borrow");
			setTransactions(
				Array.isArray(res.data.transactions)
					? res.data.transactions
					: []
			);
		} catch (error) {
			console.error("Failed to load borrowed books:", error);
			setTransactions([]);
		} finally {
			setLoading(false);
		}
	};

	const handleReturn = async (transactionId: string) => {
		try {
			await axios.put(`/api/borrow/${transactionId}/return`);
			setTransactions(
				transactions.map((t) =>
					t._id === transactionId
						? {
								...t,
								status: "returned",
								returnDate: new Date().toISOString(),
						  }
						: t
				)
			);
			toast("Book marked as returned.");
		} catch (error) {
			console.error("Failed to return book:", error);
			toast("Failed to return book. Please try again.");
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString();
	};

	const getDaysOverdue = (borrowDate: string) => {
		const borrowed = new Date(borrowDate);
		const dueDate = new Date(borrowed.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days
		const today = new Date();
		const diffTime = today.getTime() - dueDate.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays > 0 ? diffDays : 0;
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
			<Navigation />

			<div className='container mx-auto px-4 py-8'>
				<div className='text-center mb-8'>
					<div className='bg-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
						<RotateCcw className='h-8 w-8 text-white' />
					</div>
					<h1 className='text-3xl font-bold text-gray-800 mb-2'>
						Borrowed Books
					</h1>
					<p className='text-gray-600'>
						Track your borrowed books and return dates
					</p>
				</div>

				{loading ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{Array.from({ length: 6 }).map((_, i) => (
							<Card key={i} className='animate-pulse'>
								<CardHeader>
									<div className='h-4 bg-gray-200 rounded w-3/4'></div>
									<div className='h-3 bg-gray-200 rounded w-1/2'></div>
								</CardHeader>
								<CardContent>
									<div className='h-32 bg-gray-200 rounded mb-4'></div>
								</CardContent>
							</Card>
						))}
					</div>
				) : transactions.length === 0 ? (
					<div className='text-center py-12'>
						<BookOpen className='h-16 w-16 text-gray-300 mx-auto mb-4' />
						<h3 className='text-xl font-semibold text-gray-600 mb-2'>
							No borrowed books
						</h3>
						<p className='text-gray-500 mb-4'>
							Start exploring and borrowing books from the
							community!
						</p>
						<Button className='bg-emerald-600 hover:bg-emerald-700'>
							<Link href='/'>Browse Books</Link>
						</Button>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{transactions.map((transaction) => {
							const overdueDays =
								transaction.status === "borrowed"
									? getDaysOverdue(transaction.borrowDate)
									: 0;

							return (
								<Card
									key={transaction._id}
									className='group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm'>
									<CardHeader className='pb-3'>
										<div className='flex items-start justify-between'>
											<div className='flex-1'>
												<CardTitle className='text-lg font-bold text-gray-800 line-clamp-2'>
													{transaction.book.title}
												</CardTitle>
												<p className='text-sm text-gray-600 mt-1'>
													by {transaction.book.author}
												</p>
											</div>
											<Badge
												variant={
													transaction.status ===
													"borrowed"
														? "default"
														: "secondary"
												}
												className={
													transaction.status ===
													"borrowed"
														? overdueDays > 0
															? "bg-red-100 text-red-800"
															: "bg-emerald-100 text-emerald-800"
														: "bg-gray-100 text-gray-800"
												}>
												{transaction.status ===
													"borrowed" &&
												overdueDays > 0
													? `${overdueDays} days overdue`
													: transaction.status}
											</Badge>
										</div>
									</CardHeader>
									<CardContent className='pb-3'>
										<div className='aspect-[3/4] bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center'>
											<BookOpen className='h-12 w-12 text-emerald-400' />
										</div>
										<div className='space-y-3'>
											<div className='flex items-center gap-2 text-sm text-gray-600'>
												<User className='h-4 w-4' />
												<span>Owner:</span>
												<div className='flex items-center gap-1'>
													<Avatar className='h-5 w-5'>
														<AvatarFallback className='text-xs bg-emerald-100 text-emerald-600'>
															{transaction.owner.name
																.charAt(0)
																.toUpperCase()}
														</AvatarFallback>
													</Avatar>
													<span>
														{transaction.owner.name}
													</span>
												</div>
											</div>
											<div className='flex items-center gap-2 text-sm text-gray-600'>
												<MapPin className='h-4 w-4' />
												<span>
													{transaction.book.address}
												</span>
											</div>
											<div className='flex items-center gap-2 text-sm text-gray-600'>
												<Calendar className='h-4 w-4' />
												<span>
													Borrowed:{" "}
													{formatDate(
														transaction.borrowDate
													)}
												</span>
											</div>
											{transaction.returnDate && (
												<div className='flex items-center gap-2 text-sm text-gray-600'>
													<Calendar className='h-4 w-4' />
													<span>
														Returned:{" "}
														{formatDate(
															transaction.returnDate
														)}
													</span>
												</div>
											)}
										</div>
									</CardContent>
									<CardFooter className='pt-0'>
										{transaction.status === "borrowed" ? (
											<Button
												onClick={() =>
													handleReturn(
														transaction._id
													)
												}
												className='w-full bg-emerald-600 hover:bg-emerald-700'>
												Mark as Returned
											</Button>
										) : (
											<Button
												variant='outline'
												disabled
												className='w-full bg-transparent'>
												Returned
											</Button>
										)}
									</CardFooter>
								</Card>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
