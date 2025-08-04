import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	FileText,
	Users,
	Shield,
	AlertTriangle,
	Scale,
	Mail,
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { companyAddress, companyEmail, companyPhone } from "@/lib/constant";

export default function TermsOfServicePage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
			<Navigation />

			{/* Hero Section */}
			<div className='bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16'>
				<div className='container mx-auto px-4 text-center'>
					<div className='flex justify-center mb-6'>
						<div className='bg-white/20 p-4 rounded-full'>
							<FileText className='h-12 w-12' />
						</div>
					</div>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>
						Terms of Service
					</h1>
					<p className='text-xl opacity-90 max-w-3xl mx-auto'>
						Please read these terms carefully before using our
						book-sharing platform.
					</p>
					<p className='text-sm opacity-75 mt-4'>
						Last updated: January 15, 2024
					</p>
				</div>
			</div>

			<div className='container mx-auto px-4 py-16'>
				<div className='max-w-4xl mx-auto'>
					{/* Introduction */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<FileText className='h-5 w-5' />
								Agreement to Terms
							</CardTitle>
						</CardHeader>
						<CardContent className='prose prose-gray max-w-none'>
							<p>
								Welcome to Community Library! These Terms of
								Service (&quot;Terms&quot;) govern your use of
								our book-sharing platform and related services
								operated by Community Library Inc.
								(&quot;we,&quot; &quot;our,&quot; or
								&quot;us&quot;).
							</p>
							<p>
								By accessing or using our service, you agree to
								be bound by these &quot;Terms&quot;. If you
								disagree with any part of these
								&quot;Terms&quot;, then you may not access the
								service.
							</p>
						</CardContent>
					</Card>

					{/* User Accounts */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Users className='h-5 w-5' />
								User Accounts and Registration
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Account Creation
								</h3>
								<ul className='list-disc list-inside space-y-2 text-gray-600'>
									<li>
										You must be at least 18 years old to
										create an account
									</li>
									<li>
										You must provide accurate and complete
										information during registration
									</li>
									<li>
										You are responsible for maintaining the
										security of your account credentials
									</li>
									<li>
										You must verify your email address to
										activate your account
									</li>
									<li>
										One person may not maintain more than
										one account
									</li>
								</ul>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Account Responsibilities
								</h3>
								<ul className='list-disc list-inside space-y-2 text-gray-600'>
									<li>
										You are responsible for all activities
										that occur under your account
									</li>
									<li>
										You must notify us immediately of any
										unauthorized use of your account
									</li>
									<li>
										You must keep your contact information
										current and accurate
									</li>
									<li>
										You may not transfer your account to
										another person
									</li>
								</ul>
							</div>
						</CardContent>
					</Card>

					{/* Platform Rules */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Shield className='h-5 w-5' />
								Platform Rules and Conduct
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-6'>
							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Acceptable Use
								</h3>
								<p className='text-gray-600 mb-3'>
									You agree to use our platform only for
									lawful purposes and in accordance with these
									&quot;Terms&quot;. You agree NOT to:
								</p>
								<ul className='list-disc list-inside space-y-2 text-gray-600'>
									<li>
										Violate any applicable laws or
										regulations
									</li>
									<li>
										Infringe on intellectual property rights
									</li>
									<li>
										Post false, misleading, or fraudulent
										content
									</li>
									<li>Harass, abuse, or harm other users</li>
									<li>
										Spam or send unsolicited communications
									</li>
									<li>
										Attempt to gain unauthorized access to
										our systems
									</li>
									<li>
										Use automated tools to access our
										service
									</li>
								</ul>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Book Listings
								</h3>
								<ul className='list-disc list-inside space-y-2 text-gray-600'>
									<li>
										You must own or have permission to share
										the books you list
									</li>
									<li>
										Book descriptions must be accurate and
										honest
									</li>
									<li>
										You may not list prohibited items
										(damaged beyond use, illegal content,
										etc.)
									</li>
									<li>
										You are responsible for the condition
										and availability of your listed books
									</li>
								</ul>
							</div>
						</CardContent>
					</Card>

					{/* Book Sharing */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Users className='h-5 w-5' />
								Book Sharing and Borrowing
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-6'>
							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Lender Responsibilities
								</h3>
								<ul className='list-disc list-inside space-y-2 text-gray-600'>
									<li>
										Ensure books are in the condition
										described
									</li>
									<li>
										Respond promptly to borrowing requests
									</li>
									<li>
										Arrange safe and convenient
										pickup/delivery methods
									</li>
									<li>
										Communicate clearly about lending terms
										and expectations
									</li>
								</ul>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Borrower Responsibilities
								</h3>
								<ul className='list-disc list-inside space-y-2 text-gray-600'>
									<li>
										Treat borrowed books with care and
										respect
									</li>
									<li>
										Return books in the same condition as
										received
									</li>
									<li>Adhere to agreed-upon return dates</li>
									<li>
										Communicate any issues or delays
										promptly
									</li>
									<li>
										Pay for replacement if a book is lost or
										severely damaged
									</li>
								</ul>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Dispute Resolution
								</h3>
								<p className='text-gray-600'>
									While we facilitate connections between
									users, we are not responsible for disputes
									between lenders and borrowers. We encourage
									users to communicate openly and resolve
									issues amicably. For serious disputes, we
									may provide mediation assistance.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Intellectual Property */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Scale className='h-5 w-5' />
								Intellectual Property Rights
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Our Content
								</h3>
								<p className='text-gray-600'>
									The Community Library platform, including
									its design, features, and content, is owned
									by us and protected by copyright, trademark,
									and other intellectual property laws. You
									may not copy, modify, or distribute our
									content without permission.
								</p>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3'>
									User Content
								</h3>
								<p className='text-gray-600'>
									You retain ownership of content you post on
									our platform. However, by posting content,
									you grant us a non-exclusive, worldwide,
									royalty-free license to use, display, and
									distribute your content in connection with
									our service.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Privacy and Data */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Shield className='h-5 w-5' />
								Privacy and Data Protection
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600 mb-4'>
								Your privacy is important to us. Our collection
								and use of personal information is governed by
								our Privacy Policy, which is incorporated into
								these Terms by reference.
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li>
									We collect only necessary information to
									provide our service
								</li>
								<li>
									We implement security measures to protect
									your data
								</li>
								<li>
									We do not sell your personal information to
									third parties
								</li>
								<li>
									You have rights regarding your personal data
									as outlined in our Privacy Policy
								</li>
							</ul>
						</CardContent>
					</Card>

					{/* Disclaimers */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<AlertTriangle className='h-5 w-5' />
								Disclaimers and Limitations
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-6'>
							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Service Availability
								</h3>
								<p className='text-gray-600'>
									We strive to maintain service availability
									but cannot guarantee uninterrupted access.
									We may temporarily suspend service for
									maintenance, updates, or other operational
									reasons.
								</p>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3'>
									User Interactions
								</h3>
								<p className='text-gray-600'>
									We are not responsible for the actions,
									content, or conduct of our users. We do not
									verify the identity of users or the accuracy
									of their listings. Use caution when
									interacting with other users and meeting in
									person.
								</p>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Limitation of Liability
								</h3>
								<p className='text-gray-600'>
									To the maximum extent permitted by law,
									Community Library shall not be liable for
									any indirect, incidental, special,
									consequential, or punitive damages,
									including but not limited to loss of
									profits, data, or use, arising from your use
									of our service.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Termination */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<AlertTriangle className='h-5 w-5' />
								Account Termination
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Termination by You
								</h3>
								<p className='text-gray-600'>
									You may terminate your account at any time
									by contacting us or using the account
									deletion feature. Upon termination, your
									access to the service will cease, but these
									Terms will continue to apply to your prior
									use.
								</p>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Termination by Us
								</h3>
								<p className='text-gray-600'>
									We may suspend or terminate your account at
									any time for violations of these Terms,
									illegal activity, or other reasons we deem
									necessary. We will provide notice when
									possible, but reserve the right to terminate
									immediately in serious cases.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Changes to Terms */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<FileText className='h-5 w-5' />
								Changes to Terms
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600'>
								We reserve the right to modify these Terms at
								any time. We will notify users of significant
								changes via email or platform notification. Your
								continued use of the service after changes
								constitutes acceptance of the new Terms. If you
								do not agree to the changes, you must stop using
								our service.
							</p>
						</CardContent>
					</Card>

					{/* Governing Law */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Scale className='h-5 w-5' />
								Governing Law and Jurisdiction
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600'>
								These Terms shall be governed by and construed
								in accordance with the laws of the State of
								California, without regard to its conflict of
								law provisions. Any disputes arising from these
								Terms or your use of our service shall be
								resolved in the courts of California.
							</p>
						</CardContent>
					</Card>

					{/* Contact Information */}
					<Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Mail className='h-5 w-5' />
								Contact Information
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600 mb-4'>
								If you have any questions about these Terms of
								Service, please contact us:
							</p>
							<div className='space-y-2 text-gray-600'>
								<p>
									<strong>Email:</strong> {companyEmail}
								</p>
								<p>
									<strong>Phone:</strong> {companyPhone}
								</p>
								<p>
									<strong>Address:</strong> {companyAddress}
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			<Footer />
		</div>
	);
}
