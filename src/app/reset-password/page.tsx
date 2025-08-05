"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Eye, EyeOff, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function ResetPasswordPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [success, setSuccess] = useState(false);
	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});
	const token = searchParams.get("token");

	useEffect(() => {
		if (!token) {
			toast("Invalid reset link");
			router.push("/forgot-password");
			return;
		}
		// Validate token
		const validateToken = async () => {
			try {
				await axios.post("/api/auth/verify-reset-token", { token });
				setLoading(true);
			} catch (err) {
				if (axios.isAxiosError(err)) {
					toast(
						err.response?.data?.error ||
							"Invalid or expired reset link"
					);
				} else {
					toast("An unknown error occurred");
				}
			} finally {
				setLoading(false);
			}
		};

		validateToken();
	}, [token]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			toast("Passwords do not match. Please try again.");
			return;
		}

		if (formData.password.length < 8) {
			toast("Password must be at least 8 characters long.");
			return;
		}

		setLoading(true);

		try {
			await axios.post("/api/auth/reset-password", {
				token,
				password: formData.password,
			});
			setSuccess(true);
			toast("Password reset successful!");
		} catch (error: any) {
			console.error("Reset failed", error);
			toast("Reset failed");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	if (success) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4'>
				<div className='w-full max-w-md'>
					<div className='text-center mb-8'>
						<div className='bg-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
							<CheckCircle className='h-8 w-8 text-white' />
						</div>
						<h1 className='text-3xl font-bold text-gray-800 mb-2'>
							Password Reset Complete
						</h1>
						<p className='text-gray-600'>
							Your password has been successfully updated
						</p>
					</div>

					<Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
						<CardContent className='pt-6'>
							<div className='text-center space-y-4'>
								<p className='text-gray-600'>
									You can now log in to your account with your
									new password.
								</p>

								<Link href='/login'>
									<Button className='w-full bg-emerald-600 hover:bg-emerald-700'>
										Continue to Login
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				<div className='text-center mb-8'>
					<div className='bg-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
						<BookOpen className='h-8 w-8 text-white' />
					</div>
					<h1 className='text-3xl font-bold text-gray-800 mb-2'>
						Reset Your Password
					</h1>
					<p className='text-gray-600'>
						Enter your new password below
					</p>
				</div>

				<Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
					<CardHeader>
						<CardTitle className='text-center text-emerald-600'>
							Create New Password
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='password'>New Password</Label>
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
										placeholder='Enter your new password'
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

							<div className='space-y-2'>
								<Label htmlFor='confirmPassword'>
									Confirm New Password
								</Label>
								<div className='relative'>
									<Input
										id='confirmPassword'
										type={
											showConfirmPassword
												? "text"
												: "password"
										}
										value={formData.confirmPassword}
										onChange={(e) =>
											handleChange(
												"confirmPassword",
												e.target.value
											)
										}
										placeholder='Confirm your new password'
										required
										className='border-emerald-200 focus:border-emerald-500 pr-10'
									/>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
										onClick={() =>
											setShowConfirmPassword(
												!showConfirmPassword
											)
										}>
										{showConfirmPassword ? (
											<EyeOff className='h-4 w-4 text-gray-400' />
										) : (
											<Eye className='h-4 w-4 text-gray-400' />
										)}
									</Button>
								</div>
							</div>

							<div className='text-xs text-gray-600 bg-gray-50 p-3 rounded-lg'>
								<p className='font-medium mb-1'>
									Password requirements:
								</p>
								<ul className='list-disc list-inside space-y-1'>
									<li>At least 8 characters long</li>
									<li>Include both letters and numbers</li>
									<li>
										Use a mix of uppercase and lowercase
										letters
									</li>
								</ul>
							</div>

							<Button
								type='submit'
								disabled={
									loading ||
									!formData.password ||
									!formData.confirmPassword
								}
								className='w-full bg-emerald-600 hover:bg-emerald-700'>
								{loading
									? "Updating Password..."
									: "Update Password"}
							</Button>
						</form>

						<div className='mt-6 text-center'>
							<Link
								href='/login'
								className='text-sm text-emerald-600 hover:text-emerald-700 hover:underline'>
								Back to Login
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
