"use client";

import Link from "next/link";
import {
	BookOpen,
	Mail,
	Phone,
	MapPin,
	Facebook,
	Twitter,
	Instagram,
	Github,
} from "lucide-react";
import { companyAddress, companyEmail, companyPhone } from "@/lib/constant";

export default function Footer() {
	return (
		<footer className='bg-gray-900 text-white'>
			<div className='container mx-auto px-4 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{/* Brand Section */}
					<div className='space-y-4'>
						<div className='flex items-center gap-2'>
							<div className='bg-emerald-600 p-2 rounded-lg'>
								<BookOpen className='h-6 w-6 text-white' />
							</div>
							<span className='text-xl font-bold'>
								Community Library
							</span>
						</div>
						<p className='text-gray-300 text-sm leading-relaxed'>
							Building stronger communities through book sharing.
							Connect with neighbors, discover new reads, and
							promote learning for everyone.
						</p>
						<div className='flex space-x-4'>
							<a
								href='#'
								className='text-gray-400 hover:text-emerald-400 transition-colors'>
								<Facebook className='h-5 w-5' />
							</a>
							<a
								href='#'
								className='text-gray-400 hover:text-emerald-400 transition-colors'>
								<Twitter className='h-5 w-5' />
							</a>
							<a
								href='#'
								className='text-gray-400 hover:text-emerald-400 transition-colors'>
								<Instagram className='h-5 w-5' />
							</a>
							<a
								href='#'
								className='text-gray-400 hover:text-emerald-400 transition-colors'>
								<Github className='h-5 w-5' />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Quick Links</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/'
									className='text-gray-300 hover:text-emerald-400 transition-colors text-sm'>
									Home
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className='text-gray-300 hover:text-emerald-400 transition-colors text-sm'>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href='/add-book'
									className='text-gray-300 hover:text-emerald-400 transition-colors text-sm'>
									Add Book
								</Link>
							</li>
							<li>
								<Link
									href='/contact'
									className='text-gray-300 hover:text-emerald-400 transition-colors text-sm'>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Legal */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Legal</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/privacy'
									className='text-gray-300 hover:text-emerald-400 transition-colors text-sm'>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href='/terms'
									className='text-gray-300 hover:text-emerald-400 transition-colors text-sm'>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href='/cookies'
									className='text-gray-300 hover:text-emerald-400 transition-colors text-sm'>
									Cookie Policy
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Contact Info</h3>
						<div className='space-y-3'>
							<div className='flex items-center gap-3 text-sm text-gray-300'>
								<Mail className='h-4 w-4 text-emerald-400' />
								<span>{companyEmail}</span>
							</div>
							<div className='flex items-center gap-3 text-sm text-gray-300'>
								<Phone className='h-4 w-4 text-emerald-400' />
								<span>{companyPhone}</span>
							</div>
							<div className='flex items-center gap-3 text-sm text-gray-300'>
								<MapPin className='h-4 w-4 text-emerald-400' />
								<span>{companyAddress}</span>
							</div>
						</div>
					</div>
				</div>

				<div className='border-t border-gray-800 mt-8 pt-8 text-center'>
					<p className='text-gray-400 text-sm'>
						© {new Date().getFullYear()} Community Library. All
						rights reserved. Made with ❤️ for book lovers
						everywhere.
					</p>
				</div>
			</div>
		</footer>
	);
}
