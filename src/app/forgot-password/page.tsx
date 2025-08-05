"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function ForgotPasswordPage() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			if (!email) {
				toast("Email is required!");
				return;
			}
			await axios.post("/api/auth/forgot-password", {
				email,
			});
			setSent(true);
			toast("Reset link sent!");
		} catch (error) {
			console.error("Failed to send reset email:", error);
			toast("Failed to send reset email. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (sent) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4'>
				<div className='w-full max-w-md'>
					<div className='text-center mb-8'>
						<div className='bg-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
							<BookOpen className='h-8 w-8 text-white' />
						</div>
						<h1 className='text-3xl font-bold text-gray-800 mb-2'>
							Check Your Email
						</h1>
						<p className='text-gray-600'>
							We&apos;ve sent password reset instructions to
							<br />
							<span className='font-medium text-emerald-600'>
								{email}
							</span>
						</p>
					</div>

					<Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
						<CardContent className='pt-6'>
							<div className='text-center space-y-4'>
								<p className='text-sm text-gray-600'>
									Didn&apos;t receive the email? Check your
									spam folder or{" "}
									<button
										onClick={() => setSent(false)}
										className='text-emerald-600 hover:text-emerald-700 font-medium hover:underline'>
										try again
									</button>
								</p>

								<Link href='/login'>
									<Button className='w-full bg-emerald-600 hover:bg-emerald-700'>
										Back to Login
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
						Forgot Password?
					</h1>
					<p className='text-gray-600'>
						Enter your email to reset your password
					</p>
				</div>

				<Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
					<CardHeader>
						<CardTitle className='text-center text-emerald-600'>
							Reset Password
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email Address</Label>
								<Input
									id='email'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder='Enter your email address'
									required
									className='border-emerald-200 focus:border-emerald-500'
								/>
							</div>

							<Button
								type='submit'
								disabled={loading}
								className='w-full bg-emerald-600 hover:bg-emerald-700'>
								{loading ? "Sending..." : "Send Reset Link"}
							</Button>
						</form>

						<div className='mt-6 text-center'>
							<Link
								href='/login'
								className='inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 hover:underline'>
								<ArrowLeft className='h-4 w-4' />
								Back to Login
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
