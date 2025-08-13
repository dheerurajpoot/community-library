"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Users,
	BookOpen,
	Activity,
	TrendingUp,
	AlertCircle,
} from "lucide-react";
import AdminSidebar from "@/components/admin-sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export interface AdminStats {
	totalUsers: number;
	totalBooks: number;
	totalTransactions: number;
	activeLoans: number;
	newUsersThisMonth: number;
	newBooksThisMonth: number;
	popularGenres: { _id: string; genre: string; count: number }[];
}

export default function AdminDashboard() {
	const { user, isAdmin } = useAuth();
	const router = useRouter();
	const [stats, setStats] = useState<AdminStats | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!isAdmin) {
			router.push("/");
			return;
		}
		loadStats();
	}, [isAdmin, router]);

	const loadStats = async () => {
		try {
			const data = await axios.get("/api/admin/stats");
			if (data.data.success) {
				setStats(data.data.stats);
			}
		} catch (error) {
			toast("Unauthorized Access");
			console.error("Failed to load stats:", error);
		} finally {
			setLoading(false);
		}
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
						Dashboard
					</h1>
					<p className='text-gray-600'>
						Welcome back, {user?.name}! Here&apos;s what&apos;s
						happening in your community library.
					</p>
				</div>

				{loading ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
						{Array.from({ length: 4 }).map((_, i) => (
							<Card key={i} className='animate-pulse'>
								<CardHeader className='pb-2'>
									<div className='h-4 bg-gray-200 rounded w-3/4'></div>
								</CardHeader>
								<CardContent>
									<div className='h-8 bg-gray-200 rounded w-1/2 mb-2'></div>
									<div className='h-3 bg-gray-200 rounded w-full'></div>
								</CardContent>
							</Card>
						))}
					</div>
				) : stats ? (
					<>
						{/* Stats Cards */}
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
							<Card className='bg-gradient-to-r from-blue-500 to-blue-600 text-white'>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm font-medium opacity-90'>
										Total Users
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='flex items-center justify-between'>
										<div>
											<div className='text-2xl font-bold'>
												{stats.totalUsers.toLocaleString()}
											</div>
											<p className='text-xs opacity-75'>
												+{stats.newUsersThisMonth} this
												month
											</p>
										</div>
										<Users className='h-8 w-8 opacity-75' />
									</div>
								</CardContent>
							</Card>

							<Card className='bg-gradient-to-r from-green-500 to-green-600 text-white'>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm font-medium opacity-90'>
										Total Books
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='flex items-center justify-between'>
										<div>
											<div className='text-2xl font-bold'>
												{stats.totalBooks.toLocaleString()}
											</div>
											<p className='text-xs opacity-75'>
												+{stats.newBooksThisMonth} this
												month
											</p>
										</div>
										<BookOpen className='h-8 w-8 opacity-75' />
									</div>
								</CardContent>
							</Card>

							<Card className='bg-gradient-to-r from-purple-500 to-purple-600 text-white'>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm font-medium opacity-90'>
										Total Transactions
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='flex items-center justify-between'>
										<div>
											<div className='text-2xl font-bold'>
												{stats.totalTransactions.toLocaleString()}
											</div>
											<p className='text-xs opacity-75'>
												All time
											</p>
										</div>
										<Activity className='h-8 w-8 opacity-75' />
									</div>
								</CardContent>
							</Card>

							<Card className='bg-gradient-to-r from-orange-500 to-orange-600 text-white'>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm font-medium opacity-90'>
										New Users This Month
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='flex items-center justify-between'>
										<div>
											<div className='text-2xl font-bold'>
												{stats.newUsersThisMonth}
											</div>
											<p className='text-xs opacity-75'>
												This month
											</p>
										</div>
										<TrendingUp className='h-8 w-8 opacity-75' />
									</div>
								</CardContent>
							</Card>
						</div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
							{/* Popular Genres */}
							<Card>
								<CardHeader>
									<CardTitle className='flex items-center gap-2'>
										<BookOpen className='h-5 w-5 text-blue-500' />
										Popular Genres
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='space-y-4'>
										{stats.popularGenres.map(
											(genre, index) => (
												<div
													key={index}
													className='flex items-center justify-between'>
													<div className='flex items-center gap-3'>
														<div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600'>
															{index + 1}
														</div>
														<span className='font-medium'>
															{genre._id}
														</span>
													</div>
													<Badge variant='secondary'>
														{genre.count} books
													</Badge>
												</div>
											)
										)}
									</div>
								</CardContent>
							</Card>
						</div>
					</>
				) : (
					<div className='text-center py-12'>
						<AlertCircle className='h-12 w-12 text-gray-400 mx-auto mb-4' />
						<h3 className='text-lg font-medium text-gray-900 mb-2'>
							Failed to load dashboard
						</h3>
						<p className='text-gray-500'>
							Please try refreshing the page.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
