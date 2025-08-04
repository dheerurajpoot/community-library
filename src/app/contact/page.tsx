"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { companyAddress, companyEmail, companyPhone } from "@/lib/constant";

export default function ContactPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
			<Navigation />

			{/* Hero Section */}
			<div className='bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20'>
				<div className='container mx-auto px-4 text-center'>
					<h1 className='text-5xl md:text-6xl font-bold mb-6'>
						Contact Us
					</h1>
					<p className='text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto'>
						Have questions? We&apos;d love to hear from you. Send us
						a message and we&apos;ll respond as soon as possible.
					</p>
				</div>
			</div>

			<div className='container mx-auto px-4 py-16'>
				<div className='max-w-6xl mx-auto'>
					<div className='space-y-8'>
						<div>
							<h2 className='text-3xl font-bold text-gray-800 mb-6'>
								Get in Touch
							</h2>
							<p className='text-gray-600 mb-8 w-1/2'>
								We are here to help! Whether you have questions
								about using the platform, need technical
								support, or want to share feedback, don't
								hesitate to reach out.
							</p>
						</div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 space-y-6'>
							<Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
								<CardContent className='p-6'>
									<div className='flex items-center gap-4'>
										<div className='bg-emerald-100 p-3 rounded-full'>
											<Mail className='h-6 w-6 text-emerald-600' />
										</div>
										<div>
											<h3 className='font-semibold text-gray-800'>
												Email Us
											</h3>
											<p className='text-gray-600'>
												{companyEmail}
											</p>
											<p className='text-sm text-gray-500'>
												We will respond within 24 hours
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
								<CardContent className='p-6'>
									<div className='flex items-center gap-4'>
										<div className='bg-teal-100 p-3 rounded-full'>
											<Phone className='h-6 w-6 text-teal-600' />
										</div>
										<div>
											<h3 className='font-semibold text-gray-800'>
												Call Us
											</h3>
											<p className='text-gray-600'>
												{companyPhone}
											</p>
											<p className='text-sm text-gray-500'>
												Mon-Fri, 9am-6pm EST
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
								<CardContent className='p-6'>
									<div className='flex items-center gap-4'>
										<div className='bg-cyan-100 p-3 rounded-full'>
											<MapPin className='h-6 w-6 text-cyan-600' />
										</div>
										<div>
											<h3 className='font-semibold text-gray-800'>
												Visit Us
											</h3>
											<p className='text-gray-600'>
												{companyAddress}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
								<CardContent className='p-6'>
									<div className='flex items-center gap-4'>
										<div className='bg-emerald-100 p-3 rounded-full'>
											<Clock className='h-6 w-6 text-emerald-600' />
										</div>
										<div>
											<h3 className='font-semibold text-gray-800'>
												Business Hours
											</h3>
											<p className='text-gray-600'>
												Monday - Friday: 9:00 AM - 6:00
												PM
											</p>
											<p className='text-gray-600'>
												Saturday: 10:00 AM - 4:00 PM
											</p>
											<p className='text-gray-600'>
												Sunday: Closed
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
