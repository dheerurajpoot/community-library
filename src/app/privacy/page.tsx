import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Users, Database, Mail } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { companyAddress, companyEmail, companyPhone } from "@/lib/constant";

export default function PrivacyPolicyPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
			<Navigation />

			{/* Hero Section */}
			<div className='bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16'>
				<div className='container mx-auto px-4 text-center'>
					<div className='flex justify-center mb-6'>
						<div className='bg-white/20 p-4 rounded-full'>
							<Shield className='h-12 w-12' />
						</div>
					</div>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>
						Privacy Policy
					</h1>
					<p className='text-xl opacity-90 max-w-3xl mx-auto'>
						Your privacy is important to us. Learn how we collect,
						use, and protect your information.
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
								<Eye className='h-5 w-5' />
								Introduction
							</CardTitle>
						</CardHeader>
						<CardContent className='prose prose-gray max-w-none'>
							<p>
								Community Library (&quot;we,&quot;
								&quot;our,&quot; or &quot;us&quot;) is committed
								to protecting your privacy. This Privacy Policy
								explains how we collect, use, disclose, and
								safeguard your information when you use our
								book-sharing platform and related services.
							</p>
							<p>
								By using our service, you agree to the
								collection and use of information in accordance
								with this policy. We will not use or share your
								information with anyone except as described in
								this Privacy Policy.
							</p>
						</CardContent>
					</Card>

					{/* Information We Collect */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Database className='h-5 w-5' />
								Information We Collect
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-6'>
							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Personal Information
								</h3>
								<p className='text-gray-600 mb-3'>
									We collect information you provide directly
									to us, including:
								</p>
								<ul className='list-disc list-inside space-y-2 text-gray-600'>
									<li>
										Name, email address, and phone number
									</li>
									<li>Profile information and preferences</li>
									<li>
										Address and location information for
										book exchanges
									</li>
									<li>Book listings and descriptions</li>
									<li>
										Messages and communications with other
										users
									</li>
									<li>
										Payment information (processed securely
										by third-party providers)
									</li>
								</ul>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Automatically Collected Information
								</h3>
								<p className='text-gray-600 mb-3'>
									When you use our service, we automatically
									collect certain information:
								</p>
								<ul className='list-disc list-inside space-y-2 text-gray-600'>
									<li>
										Device information (IP address, browser
										type, operating system)
									</li>
									<li>
										Usage data (pages visited, time spent,
										features used)
									</li>
									<li>
										Location data (with your permission)
									</li>
									<li>
										Cookies and similar tracking
										technologies
									</li>
								</ul>
							</div>
						</CardContent>
					</Card>

					{/* How We Use Your Information */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Users className='h-5 w-5' />
								How We Use Your Information
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600 mb-4'>
								We use the information we collect to:
							</p>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<ul className='list-disc list-inside space-y-2 text-gray-600'>
									<li>Provide and maintain our service</li>
									<li>
										Process transactions and send
										confirmations
									</li>
									<li>
										Communicate with you about your account
									</li>
									<li>
										Send you updates and promotional
										materials
									</li>
									<li>
										Improve our service and user experience
									</li>
								</ul>
								<ul className='list-disc list-inside space-y-2 text-gray-600'>
									<li>Prevent fraud and ensure security</li>
									<li>Comply with legal obligations</li>
									<li>
										Resolve disputes and provide support
									</li>
									<li>Analyze usage patterns and trends</li>
									<li>Personalize your experience</li>
								</ul>
							</div>
						</CardContent>
					</Card>

					{/* Information Sharing */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Lock className='h-5 w-5' />
								Information Sharing and Disclosure
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-6'>
							<div>
								<h3 className='text-lg font-semibold mb-3'>
									With Other Users
								</h3>
								<p className='text-gray-600'>
									When you list a book or request to borrow,
									certain information (name, general location,
									profile information) is shared with other
									users to facilitate the exchange.
								</p>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3'>
									With Service Providers
								</h3>
								<p className='text-gray-600'>
									We may share your information with trusted
									third-party service providers who help us
									operate our platform, including payment
									processors, email services, and analytics
									providers.
								</p>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Legal Requirements
								</h3>
								<p className='text-gray-600'>
									We may disclose your information if required
									by law, court order, or government request,
									or to protect our rights, property, or
									safety.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Data Security */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Shield className='h-5 w-5' />
								Data Security
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600 mb-4'>
								We implement appropriate technical and
								organizational security measures to protect your
								personal information against unauthorized
								access, alteration, disclosure, or destruction.
								These measures include:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li>
									Encryption of data in transit and at rest
								</li>
								<li>
									Regular security assessments and updates
								</li>
								<li>
									Access controls and authentication measures
								</li>
								<li>Employee training on data protection</li>
								<li>Incident response procedures</li>
							</ul>
							<p className='text-gray-600 mt-4'>
								However, no method of transmission over the
								internet or electronic storage is 100% secure.
								While we strive to protect your information, we
								cannot guarantee absolute security.
							</p>
						</CardContent>
					</Card>

					{/* Your Rights */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Users className='h-5 w-5' />
								Your Rights and Choices
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600 mb-4'>
								You have the following rights regarding your
								personal information:
							</p>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div>
									<h4 className='font-semibold mb-2'>
										Access and Update
									</h4>
									<p className='text-gray-600 text-sm'>
										You can access and update your account
										information at any time through your
										profile settings.
									</p>
								</div>
								<div>
									<h4 className='font-semibold mb-2'>
										Data Portability
									</h4>
									<p className='text-gray-600 text-sm'>
										You can request a copy of your personal
										data in a structured, machine-readable
										format.
									</p>
								</div>
								<div>
									<h4 className='font-semibold mb-2'>
										Deletion
									</h4>
									<p className='text-gray-600 text-sm'>
										You can request deletion of your account
										and personal information, subject to
										legal requirements.
									</p>
								</div>
								<div>
									<h4 className='font-semibold mb-2'>
										Marketing Opt-out
									</h4>
									<p className='text-gray-600 text-sm'>
										You can unsubscribe from marketing
										communications at any time using the
										unsubscribe link.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Cookies */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Database className='h-5 w-5' />
								Cookies and Tracking Technologies
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600 mb-4'>
								We use cookies and similar tracking technologies
								to enhance your experience on our platform.
								These technologies help us:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600 mb-4'>
								<li>Remember your preferences and settings</li>
								<li>Analyze site traffic and usage patterns</li>
								<li>
									Provide personalized content and
									recommendations
								</li>
								<li>Improve our service performance</li>
							</ul>
							<p className='text-gray-600'>
								You can control cookie settings through your
								browser preferences. However, disabling cookies
								may limit some functionality of our service.
							</p>
						</CardContent>
					</Card>

					{/* Children's Privacy */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Shield className='h-5 w-5' />
								Children's Privacy
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600'>
								Our service is not intended for children under
								13 years of age. We do not knowingly collect
								personal information from children under 13. If
								you are a parent or guardian and believe your
								child has provided us with personal information,
								please contact us immediately so we can delete
								such information.
							</p>
						</CardContent>
					</Card>

					{/* Changes to Policy */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Eye className='h-5 w-5' />
								Changes to This Privacy Policy
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600'>
								We may update this Privacy Policy from time to
								time. We will notify you of any changes by
								posting the new Privacy Policy on this page and
								updating the "Last updated" date. We encourage
								you to review this Privacy Policy periodically
								for any changes. Your continued use of our
								service after any modifications constitutes
								acceptance of the updated Privacy Policy.
							</p>
						</CardContent>
					</Card>

					{/* Contact Information */}
					<Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Mail className='h-5 w-5' />
								Contact Us
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600 mb-4'>
								If you have any questions about this Privacy
								Policy or our privacy practices, please contact
								us:
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
