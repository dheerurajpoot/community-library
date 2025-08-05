"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function VerifyOTPPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(false);
	const [otp, setOtp] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		const emailParam = searchParams.get("email");
		if (emailParam) {
			setEmail(emailParam);
		}
	}, [searchParams]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await axios.post("/api/auth/verify-otp", {
				email,
				otp: otp.trim(),
			});

			if (response.data.success) {
				localStorage.removeItem("verificationEmail");

				toast("Email verified successfully! Redirecting...");
				setTimeout(() => {
					router.push("/login");
				}, 2000);
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				toast.error(err.response?.data?.error || "Invalid OTP");
			} else {
				toast.error("An unknown error occurred");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleResendOTP = async () => {
		setLoading(true);

		try {
			await axios.post("/api/auth/resend-otp", { email });
			toast("New OTP sent to your email");
		} catch (err) {
			if (axios.isAxiosError(err)) {
				toast.error(
					err.response?.data?.error || "Failed to resend OTP"
				);
			} else {
				toast.error("An unexpected error occurred");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				<div className='text-center mb-8'>
					<div className='bg-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
						<Mail className='h-8 w-8 text-white' />
					</div>
					<h1 className='text-3xl font-bold text-gray-800 mb-2'>
						Verify Your Email
					</h1>
					<p className='text-gray-600'>
						We&apos;ve sent a 6-digit verification code to
						<br />
						<span className='font-medium text-emerald-600'>
							{email}
						</span>
					</p>
				</div>

				<Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
					<CardHeader>
						<CardTitle className='text-center text-emerald-600'>
							Enter Verification Code
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className='space-y-6'>
							<div className='space-y-2'>
								<Label htmlFor='otp'>Verification Code</Label>
								<Input
									id='otp'
									type='text'
									value={otp}
									onChange={(e) =>
										setOtp(
											e.target.value
												.replace(/\D/g, "")
												.slice(0, 6)
										)
									}
									placeholder='123456'
									maxLength={6}
									className='border-emerald-200 focus:border-emerald-500 text-center text-2xl tracking-widest'
									required
								/>
								<p className='text-xs text-gray-500 text-center'>
									Enter the 6-digit code sent to your email
								</p>
							</div>

							<Button
								type='submit'
								disabled={loading || otp.length !== 6}
								className='w-full bg-emerald-600 hover:bg-emerald-700'>
								{loading ? "Verifying..." : "Verify Account"}
							</Button>
						</form>

						<div className='mt-6 text-center space-y-4'>
							<p className='text-sm text-gray-600'>
								Didn&apos;t receive the code?{" "}
								<button
									onClick={handleResendOTP}
									className='text-emerald-600 hover:text-emerald-700 font-medium hover:underline'>
									Resend OTP
								</button>
							</p>

							<p className='text-sm text-gray-600'>
								Wrong email?{" "}
								<Link
									href='/signup'
									className='text-emerald-600 hover:text-emerald-700 font-medium hover:underline'>
									Go back to signup
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
