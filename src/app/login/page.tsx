"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
	const router = useRouter();
	const { setUser } = useAuth();
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await axios.post("/api/auth/login", formData);
			if (response.data.success) {
				localStorage.setItem(
					"user",
					JSON.stringify(response.data.user)
				);
				setUser(response.data.user);
				setLoading(false);
				toast.success("Login successful");
				setTimeout(() => {
					router.push("/");
				}, 1000);
			} else {
				toast.error(response.data.message || "Login failed");
				setLoading(false);
				console.log("Login failed:", response.data);
			}
		} catch (error) {
			const err = error as AxiosError<{
				message?: string;
				error?: string;
			}>;
			const apiError = err.response?.data?.message || "Login failed";
			setLoading(false);
			console.error("Login failed:", error);
		}
	};

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				<div className='text-center mb-8'>
					<div className='bg-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
						<BookOpen className='h-8 w-8 text-white' />
					</div>
					<h1 className='text-3xl font-bold text-gray-800 mb-2'>
						Welcome Back
					</h1>
					<p className='text-gray-600'>
						Sign in to your Community Library account
					</p>
				</div>

				<Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
					<CardHeader>
						<CardTitle className='text-center text-emerald-600'>
							Sign In
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email Address</Label>
								<Input
									id='email'
									type='email'
									value={formData.email}
									onChange={(e) =>
										handleChange("email", e.target.value)
									}
									placeholder='Enter your email'
									required
									className='border-emerald-200 focus:border-emerald-500'
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='password'>Password</Label>
								<div className='relative'>
									<Input
										id='password'
										type={
											showPassword ? "text" : "password"
										}
										value={formData.password}
										onChange={(e) =>
											handleChange(
												"password",
												e.target.value
											)
										}
										placeholder='Enter your password'
										required
										className='border-emerald-200 focus:border-emerald-500 pr-10'
									/>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
										onClick={() =>
											setShowPassword(!showPassword)
										}>
										{showPassword ? (
											<EyeOff className='h-4 w-4 text-gray-400' />
										) : (
											<Eye className='h-4 w-4 text-gray-400' />
										)}
									</Button>
								</div>
							</div>

							<div className='flex items-center justify-between'>
								<Link
									href='/forgot-password'
									className='text-sm text-emerald-600 hover:text-emerald-700 hover:underline'>
									Forgot password?
								</Link>
							</div>

							<Button
								type='submit'
								disabled={loading}
								className='w-full bg-emerald-600 hover:bg-emerald-700'>
								{loading ? "Signing in..." : "Sign In"}
							</Button>
						</form>

						<div className='mt-6 text-center'>
							<p className='text-sm text-gray-600'>
								Don&apos;t have an account?{" "}
								<Link
									href='/signup'
									className='text-emerald-600 hover:text-emerald-700 font-medium hover:underline'>
									Sign up here
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
