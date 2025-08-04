import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cookie, Settings, Eye, Shield, Database, Mail } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { companyAddress, companyEmail, companyPhone } from "@/lib/constant";

export default function CookiePolicyPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
			<Navigation />

			{/* Hero Section */}
			<div className='bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16'>
				<div className='container mx-auto px-4 text-center'>
					<div className='flex justify-center mb-6'>
						<div className='bg-white/20 p-4 rounded-full'>
							<Cookie className='h-12 w-12' />
						</div>
					</div>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>
						Cookie Policy
					</h1>
					<p className='text-xl opacity-90 max-w-3xl mx-auto'>
						Learn about how we use cookies and similar technologies
						to improve your experience.
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
								<Cookie className='h-5 w-5' />
								What Are Cookies?
							</CardTitle>
						</CardHeader>
						<CardContent className='prose prose-gray max-w-none'>
							<p>
								Cookies are small text files that are stored on
								your device when you visit our website. They
								help us provide you with a better experience by
								remembering your preferences, analyzing how you
								use our site, and personalizing content.
							</p>
							<p>
								This Cookie Policy explains what cookies are,
								how we use them, the types of cookies we use,
								and how you can control your cookie preferences.
							</p>
						</CardContent>
					</Card>

					{/* Types of Cookies */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Database className='h-5 w-5' />
								Types of Cookies We Use
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-6'>
							<div>
								<h3 className='text-lg font-semibold mb-3 text-emerald-700'>
									Essential Cookies
								</h3>
								<p className='text-gray-600 mb-3'>
									These cookies are necessary for our website
									to function properly. They enable core
									functionality such as security, network
									management, and accessibility.
								</p>
								<ul className='list-disc list-inside space-y-1 text-gray-600'>
									<li>Authentication and login status</li>
									<li>Security and fraud prevention</li>
									<li>Load balancing and site performance</li>
									<li>Accessibility features</li>
								</ul>
								<p className='text-sm text-gray-500 mt-2'>
									<strong>Duration:</strong> Session cookies
									(deleted when you close your browser) or up
									to 1 year
								</p>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3 text-teal-700'>
									Functional Cookies
								</h3>
								<p className='text-gray-600 mb-3'>
									These cookies allow us to remember choices
									you make and provide enhanced, personalized
									features.
								</p>
								<ul className='list-disc list-inside space-y-1 text-gray-600'>
									<li>Language and region preferences</li>
									<li>User interface customizations</li>
									<li>
										Search filters and sorting preferences
									</li>
									<li>Recently viewed books</li>
								</ul>
								<p className='text-sm text-gray-500 mt-2'>
									<strong>Duration:</strong> Up to 2 years
								</p>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3 text-cyan-700'>
									Analytics Cookies
								</h3>
								<p className='text-gray-600 mb-3'>
									These cookies help us understand how
									visitors interact with our website by
									collecting and reporting information
									anonymously.
								</p>
								<ul className='list-disc list-inside space-y-1 text-gray-600'>
									<li>Page views and user journeys</li>
									<li>Time spent on different pages</li>
									<li>Click patterns and popular features</li>
									<li>
										Error tracking and performance
										monitoring
									</li>
								</ul>
								<p className='text-sm text-gray-500 mt-2'>
									<strong>Duration:</strong> Up to 2 years
								</p>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3 text-emerald-700'>
									Marketing Cookies
								</h3>
								<p className='text-gray-600 mb-3'>
									These cookies are used to deliver relevant
									advertisements and track the effectiveness
									of our marketing campaigns.
								</p>
								<ul className='list-disc list-inside space-y-1 text-gray-600'>
									<li>Personalized book recommendations</li>
									<li>
										Targeted advertising on other websites
									</li>
									<li>Social media integration</li>
									<li>Email marketing optimization</li>
								</ul>
								<p className='text-sm text-gray-500 mt-2'>
									<strong>Duration:</strong> Up to 1 year
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Third-Party Cookies */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Shield className='h-5 w-5' />
								Third-Party Cookies and Services
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-6'>
							<p className='text-gray-600'>
								We work with trusted third-party services that
								may also set cookies on your device. These
								services help us provide better functionality
								and analyze our website performance.
							</p>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='bg-gray-50 p-4 rounded-lg'>
									<h4 className='font-semibold mb-2'>
										Google Analytics
									</h4>
									<p className='text-sm text-gray-600 mb-2'>
										Helps us understand website usage and
										improve user experience.
									</p>
									<p className='text-xs text-gray-500'>
										<strong>Privacy Policy:</strong>{" "}
										<a
											href='https://policies.google.com/privacy'
											className='text-emerald-600 hover:underline'>
											Google Privacy Policy
										</a>
									</p>
								</div>

								<div className='bg-gray-50 p-4 rounded-lg'>
									<h4 className='font-semibold mb-2'>
										Social Media Platforms
									</h4>
									<p className='text-sm text-gray-600 mb-2'>
										Enable social sharing and login
										functionality.
									</p>
									<p className='text-xs text-gray-500'>
										Includes Facebook, Twitter, and other
										platforms
									</p>
								</div>

								<div className='bg-gray-50 p-4 rounded-lg'>
									<h4 className='font-semibold mb-2'>
										Payment Processors
									</h4>
									<p className='text-sm text-gray-600 mb-2'>
										Secure payment processing and fraud
										prevention.
									</p>
									<p className='text-xs text-gray-500'>
										Stripe, PayPal, and other payment
										services
									</p>
								</div>

								<div className='bg-gray-50 p-4 rounded-lg'>
									<h4 className='font-semibold mb-2'>
										Email Services
									</h4>
									<p className='text-sm text-gray-600 mb-2'>
										Email delivery and marketing automation.
									</p>
									<p className='text-xs text-gray-500'>
										Mailchimp, SendGrid, and similar
										services
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Cookie Management */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Settings className='h-5 w-5' />
								Managing Your Cookie Preferences
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-6'>
							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Browser Settings
								</h3>
								<p className='text-gray-600 mb-4'>
									You can control cookies through your browser
									settings. Most browsers allow you to:
								</p>
								<ul className='list-disc list-inside space-y-2 text-gray-600'>
									<li>View and delete existing cookies</li>
									<li>
										Block cookies from specific websites
									</li>
									<li>Block third-party cookies</li>
									<li>
										Delete all cookies when you close your
										browser
									</li>
									<li>
										Receive notifications when cookies are
										set
									</li>
								</ul>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Browser-Specific Instructions
								</h3>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='bg-gray-50 p-4 rounded-lg'>
										<h4 className='font-semibold mb-2'>
											Google Chrome
										</h4>
										<p className='text-sm text-gray-600'>
											Settings → Privacy and Security →
											Cookies and other site data
										</p>
									</div>
									<div className='bg-gray-50 p-4 rounded-lg'>
										<h4 className='font-semibold mb-2'>
											Mozilla Firefox
										</h4>
										<p className='text-sm text-gray-600'>
											Options → Privacy & Security →
											Cookies and Site Data
										</p>
									</div>
									<div className='bg-gray-50 p-4 rounded-lg'>
										<h4 className='font-semibold mb-2'>
											Safari
										</h4>
										<p className='text-sm text-gray-600'>
											Preferences → Privacy → Manage
											Website Data
										</p>
									</div>
									<div className='bg-gray-50 p-4 rounded-lg'>
										<h4 className='font-semibold mb-2'>
											Microsoft Edge
										</h4>
										<p className='text-sm text-gray-600'>
											Settings → Cookies and site
											permissions → Cookies
										</p>
									</div>
								</div>
							</div>

							<div>
								<h3 className='text-lg font-semibold mb-3'>
									Opt-Out Tools
								</h3>
								<p className='text-gray-600 mb-3'>
									You can also use these tools to opt out of
									tracking:
								</p>
								<ul className='list-disc list-inside space-y-2 text-gray-600'>
									<li>
										<a
											href='https://tools.google.com/dlpage/gaoptout'
											className='text-emerald-600 hover:underline'>
											Google Analytics Opt-out Browser
											Add-on
										</a>
									</li>
									<li>
										<a
											href='http://optout.networkadvertising.org/'
											className='text-emerald-600 hover:underline'>
											Network Advertising Initiative
											Opt-out
										</a>
									</li>
									<li>
										<a
											href='http://optout.aboutads.info/'
											className='text-emerald-600 hover:underline'>
											Digital Advertising Alliance Opt-out
										</a>
									</li>
								</ul>
							</div>
						</CardContent>
					</Card>

					{/* Impact of Disabling */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Eye className='h-5 w-5' />
								Impact of Disabling Cookies
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600 mb-4'>
								While you can disable cookies, please note that
								doing so may affect your experience on our
								website:
							</p>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div>
									<h4 className='font-semibold mb-2 text-red-600'>
										Potential Issues
									</h4>
									<ul className='list-disc list-inside space-y-1 text-gray-600 text-sm'>
										<li>Difficulty staying logged in</li>
										<li>Loss of personalized settings</li>
										<li>Reduced website functionality</li>
										<li>
											Less relevant content
											recommendations
										</li>
										<li>
											Inability to use certain features
										</li>
									</ul>
								</div>
								<div>
									<h4 className='font-semibold mb-2 text-emerald-600'>
										What Still Works
									</h4>
									<ul className='list-disc list-inside space-y-1 text-gray-600 text-sm'>
										<li>Basic website browsing</li>
										<li>Viewing book listings</li>
										<li>Reading public content</li>
										<li>Accessing help pages</li>
										<li>Contacting support</li>
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Updates to Policy */}
					<Card className='mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Settings className='h-5 w-5' />
								Updates to This Cookie Policy
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600'>
								We may update this Cookie Policy from time to
								time to reflect changes in our practices or for
								other operational, legal, or regulatory reasons.
								We will notify you of any material changes by
								posting the updated policy on our website and
								updating the "Last updated" date. We encourage
								you to review this policy periodically to stay
								informed about our use of cookies.
							</p>
						</CardContent>
					</Card>

					{/* Contact Information */}
					<Card className='shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-emerald-600'>
								<Mail className='h-5 w-5' />
								Questions About Cookies?
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600 mb-4'>
								If you have any questions about our use of
								cookies or this Cookie Policy, please contact
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
							<div className='mt-6 p-4 bg-emerald-50 rounded-lg'>
								<p className='text-sm text-emerald-800'>
									<strong>Quick Tip:</strong> You can also
									manage your cookie preferences by clicking
									the "Cookie Settings" link in our website
									footer at any time.
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
