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
import { verifyOTP } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function VerifyOTPPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { login } = useAuth();
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

		if (!email) {
			toast("Email required", {
				description: "Please provide your email address.",
			});
			return;
		}

		if (otp.length !== 6) {
			toast("Invalid OTP", {
				description: "Please enter a valid 6-digit OTP.",
			});
			return;
		}

		setLoading(true);

		try {
			const response = await verifyOTP({ email, otp });
			login(response.user, response.token);

			toast("Account verified!", {
				description: "Welcome to Community Library!",
			});

			router.push("/");
		} catch (error: any) {
			toast("Verification failed", {
				description:
					error.response?.data?.message ||
					"Invalid OTP. Please try again.",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleResendOTP = async () => {
		// In a real app, this would call an API to resend the OTP
		toast("OTP Resent", {
			description: "A new verification code has been sent to your email.",
		});
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
						We've sent a 6-digit verification code to
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
								Didn't receive the code?{" "}
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
