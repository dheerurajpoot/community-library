import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Target, Eye, Award } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function AboutPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
			<Navigation />

			{/* Hero Section */}
			<div className='bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20'>
				<div className='container mx-auto px-4 text-center'>
					<div className='flex justify-center mb-6'>
						<div className='bg-white/20 p-4 rounded-full'>
							<BookOpen className='h-16 w-16' />
						</div>
					</div>
					<h1 className='text-5xl md:text-6xl font-bold mb-6'>
						About Community Library
					</h1>
					<p className='text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto'>
						Building stronger communities through the power of
						shared knowledge and reading
					</p>
				</div>
			</div>

			<div className='container mx-auto px-4 py-16'>
				{/* Mission Section */}
				<div className='max-w-4xl mx-auto mb-20'>
					<div className='text-center mb-12'>
						<h2 className='text-4xl font-bold text-gray-800 mb-4'>
							Our Mission
						</h2>
						<p className='text-xl text-gray-600'>
							To create a world where knowledge flows freely and
							communities grow stronger through shared learning
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<Card className='text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
							<CardContent className='pt-8 pb-6'>
								<div className='bg-emerald-100 p-4 rounded-full w-16 h-16 mx-auto mb-4'>
									<Target className='h-8 w-8 text-emerald-600' />
								</div>
								<h3 className='text-xl font-semibold mb-2'>
									Our Mission
								</h3>
								<p className='text-gray-600'>
									To democratize access to books and knowledge
									by connecting readers in local communities.
								</p>
							</CardContent>
						</Card>

						<Card className='text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
							<CardContent className='pt-8 pb-6'>
								<div className='bg-teal-100 p-4 rounded-full w-16 h-16 mx-auto mb-4'>
									<Eye className='h-8 w-8 text-teal-600' />
								</div>
								<h3 className='text-xl font-semibold mb-2'>
									Our Vision
								</h3>
								<p className='text-gray-600'>
									A world where every person has access to the
									books they need to learn, grow, and thrive.
								</p>
							</CardContent>
						</Card>

						<Card className='text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
							<CardContent className='pt-8 pb-6'>
								<div className='bg-cyan-100 p-4 rounded-full w-16 h-16 mx-auto mb-4'>
									<Award className='h-8 w-8 text-cyan-600' />
								</div>
								<h3 className='text-xl font-semibold mb-2'>
									Our Values
								</h3>
								<p className='text-gray-600'>
									Community, sharing, learning,
									sustainability, and building meaningful
									connections.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Story Section */}
				<div className='max-w-4xl mx-auto mb-20'>
					<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12'>
						<h2 className='text-3xl font-bold text-gray-800 mb-6'>
							Our Story
						</h2>
						<div className='prose prose-lg text-gray-600 max-w-none'>
							<p className='mb-6'>
								Community Library was born from a simple
								observation: millions of books sit unused on
								shelves while people struggle to access the
								knowledge they need. We believed there had to be
								a better way to connect book owners with eager
								readers in local communities.
							</p>
							<p className='mb-6'>
								Founded in 2024, our platform started as a small
								experiment in a single neighborhood. We wanted
								to see if technology could help neighbors share
								their personal libraries and build stronger
								connections through the love of reading.
							</p>
							<p className='mb-6'>
								What began as a simple book-sharing app has
								grown into a thriving community of readers,
								learners, and knowledge sharers. Today,
								thousands of books change hands every month,
								creating new friendships and learning
								opportunities along the way.
							</p>
							<p>
								We're proud to be part of the sharing economy
								movement, promoting sustainability while making
								knowledge more accessible to everyone. Every
								book shared is a step toward a more connected
								and educated world.
							</p>
						</div>
					</div>
				</div>

				{/* Impact Section */}
				<div className='max-w-6xl mx-auto mb-20'>
					<div className='text-center mb-12'>
						<h2 className='text-4xl font-bold text-gray-800 mb-4'>
							Our Impact
						</h2>
						<p className='text-xl text-gray-600'>
							See how we&apos;re making a difference in
							communities around the world
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						<div className='text-center'>
							<div className='bg-emerald-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold mx-auto mb-4'>
								1.2K+
							</div>
							<h3 className='text-lg font-semibold mb-2'>
								Active Members
							</h3>
							<p className='text-gray-600'>
								Readers sharing and borrowing books
							</p>
						</div>
						<div className='text-center'>
							<div className='bg-teal-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold mx-auto mb-4'>
								5.6K+
							</div>
							<h3 className='text-lg font-semibold mb-2'>
								Books Shared
							</h3>
							<p className='text-gray-600'>
								Books available in our community
							</p>
						</div>
						<div className='text-center'>
							<div className='bg-cyan-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold mx-auto mb-4'>
								892
							</div>
							<h3 className='text-lg font-semibold mb-2'>
								Successful Exchanges
							</h3>
							<p className='text-gray-600'>
								Books successfully borrowed and returned
							</p>
						</div>
						<div className='text-center'>
							<div className='bg-emerald-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold mx-auto mb-4'>
								45
							</div>
							<h3 className='text-lg font-semibold mb-2'>
								Cities
							</h3>
							<p className='text-gray-600'>
								Communities we serve worldwide
							</p>
						</div>
					</div>
				</div>

				{/* Team Section */}
				<div className='max-w-4xl mx-auto'>
					<div className='text-center mb-12'>
						<h2 className='text-4xl font-bold text-gray-800 mb-4'>
							Meet Our Team
						</h2>
						<p className='text-xl text-gray-600'>
							The passionate people behind Community Library
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<Card className='text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
							<CardContent className='pt-8 pb-6'>
								<div className='bg-emerald-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center'>
									<span className='text-2xl font-bold text-emerald-600'>
										JS
									</span>
								</div>
								<h3 className='text-xl font-semibold mb-1'>
									Jane Smith
								</h3>
								<p className='text-emerald-600 mb-2'>
									Founder & CEO
								</p>
								<p className='text-gray-600 text-sm'>
									Former librarian passionate about making
									books accessible to everyone.
								</p>
							</CardContent>
						</Card>

						<Card className='text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
							<CardContent className='pt-8 pb-6'>
								<div className='bg-teal-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center'>
									<span className='text-2xl font-bold text-teal-600'>
										MD
									</span>
								</div>
								<h3 className='text-xl font-semibold mb-1'>
									Mike Davis
								</h3>
								<p className='text-teal-600 mb-2'>CTO</p>
								<p className='text-gray-600 text-sm'>
									Tech enthusiast building the platform that
									connects book lovers.
								</p>
							</CardContent>
						</Card>

						<Card className='text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm'>
							<CardContent className='pt-8 pb-6'>
								<div className='bg-cyan-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center'>
									<span className='text-2xl font-bold text-cyan-600'>
										SJ
									</span>
								</div>
								<h3 className='text-xl font-semibold mb-1'>
									Sarah Johnson
								</h3>
								<p className='text-cyan-600 mb-2'>
									Community Manager
								</p>
								<p className='text-gray-600 text-sm'>
									Building and nurturing our growing community
									of readers.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
