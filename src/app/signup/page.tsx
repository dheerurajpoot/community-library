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
import axios from "axios";

export default function SignupPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phone: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match. Please try again.");
			return;
		}

		if (formData.password.length < 8) {
			toast.error("Password must be at least 8 characters long.");
			return;
		}

		setLoading(true);

		try {
			const { firstName, lastName, email, password, phone } = formData;
			const res = await axios.post("/api/auth/signup", {
				firstName,
				lastName,
				email,
				phone,
				password,
			});
			console.log(res.data);
			if (res.data.success) {
				toast.success("Account created!", {
					description:
						"Please check your email to verify your account.",
				});

				setTimeout(() => {
					router.push(
						`/verify-otp?email=${encodeURIComponent(email)}`
					);
				}, 2000);
			}
		} catch (error) {
			console.error("Failed to create account:", error);
			toast.error("Failed to create account. Please try again.");
		} finally {
			setLoading(false);
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
						Join Our Community
					</h1>
					<p className='text-gray-600'>
						Create your Community Library account
					</p>
				</div>

				<Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
					<CardHeader>
						<CardTitle className='text-center text-emerald-600'>
							Sign Up
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div className='grid grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='firstName'>
										First Name
									</Label>
									<Input
										id='firstName'
										value={formData.firstName}
										onChange={(e) =>
											handleChange(
												"firstName",
												e.target.value
											)
										}
										placeholder='John'
										required
										className='border-emerald-200 focus:border-emerald-500'
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='lastName'>Last Name</Label>
									<Input
										id='lastName'
										value={formData.lastName}
										onChange={(e) =>
											handleChange(
												"lastName",
												e.target.value
											)
										}
										placeholder='Doe'
										required
										className='border-emerald-200 focus:border-emerald-500'
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='email'>Email Address</Label>
								<Input
									id='email'
									type='email'
									value={formData.email}
									onChange={(e) =>
										handleChange("email", e.target.value)
									}
									placeholder='john@example.com'
									required
									className='border-emerald-200 focus:border-emerald-500'
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='phone'>
									Phone Number (Optional)
								</Label>
								<Input
									id='phone'
									type='tel'
									value={formData.phone}
									onChange={(e) =>
										handleChange("phone", e.target.value)
									}
									placeholder='+1 (555) 123-4567'
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
										placeholder='Create a strong password'
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
									Confirm Password
								</Label>
								<Input
									id='confirmPassword'
									type='password'
									value={formData.confirmPassword}
									onChange={(e) =>
										handleChange(
											"confirmPassword",
											e.target.value
										)
									}
									placeholder='Confirm your password'
									required
									className='border-emerald-200 focus:border-emerald-500'
								/>
							</div>

							<div className='text-xs text-gray-600'>
								By creating an account, you agree to our{" "}
								<Link
									href='/terms'
									className='text-emerald-600 hover:underline'>
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link
									href='/privacy'
									className='text-emerald-600 hover:underline'>
									Privacy Policy
								</Link>
								.
							</div>

							<Button
								type='submit'
								disabled={loading}
								className='w-full bg-emerald-600 hover:bg-emerald-700'>
								{loading
									? "Creating account..."
									: "Create Account"}
							</Button>
						</form>

						<div className='mt-6 text-center'>
							<p className='text-sm text-gray-600'>
								Already have an account?{" "}
								<Link
									href='/login'
									className='text-emerald-600 hover:text-emerald-700 font-medium hover:underline'>
									Sign in here
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
