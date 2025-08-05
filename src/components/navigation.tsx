"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	BookOpen,
	Plus,
	Library,
	RotateCcw,
	Menu,
	Home,
	User,
	LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const { user, signOut } = useAuth();

	const navItems = [
		{ href: "/", label: "Home", icon: Home },
		{ href: "/add-book", label: "Add Book", icon: Plus, protected: true },
		{
			href: "/my-books",
			label: "My Books",
			icon: Library,
			protected: true,
		},
		{
			href: "/borrowed",
			label: "Borrowed",
			icon: RotateCcw,
			protected: true,
		},
	];

	const handleLogout = () => {
		signOut();
		router.push("/");
	};

	const NavContent = () => (
		<>
			{navItems.map((item) => {
				if (item.protected && !user) return null;
				const Icon = item.icon;
				const isActive = pathname === item.href;
				return (
					<Link
						key={item.href}
						href={item.href}
						onClick={() => setIsOpen(false)}>
						<Button
							variant={isActive ? "default" : "ghost"}
							className={`w-full justify-start gap-2 ${
								isActive
									? "bg-emerald-600 hover:bg-emerald-700 text-white"
									: "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
							}`}>
							<Icon className='h-4 w-4' />
							{item.label}
						</Button>
					</Link>
				);
			})}
		</>
	);

	return (
		<nav className='bg-white/95 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50'>
			<div className='container mx-auto px-4'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<Link
						href='/'
						className='flex items-center gap-2 font-bold text-xl text-emerald-600'>
						<div className='bg-emerald-600 p-2 rounded-lg'>
							<BookOpen className='h-5 w-5 text-white' />
						</div>
						Community Library
					</Link>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center gap-4'>
						<div className='flex items-center gap-2'>
							<NavContent />
						</div>

						{user ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='ghost'
										className='relative h-8 w-8 rounded-full'>
										<Avatar className='h-8 w-8'>
											<AvatarFallback className='bg-emerald-100 text-emerald-600'>
												{user.name
													.charAt(0)
													.toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className='w-56'
									align='end'
									forceMount>
									<div className='flex items-center justify-start gap-2 p-2'>
										<div className='flex flex-col space-y-1 leading-none'>
											<p className='font-medium'>
												{user.name}
											</p>
											<p className='w-[200px] truncate text-sm text-muted-foreground'>
												{user.email}
											</p>
										</div>
									</div>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link
											href='/profile'
											className='cursor-pointer'>
											<User className='mr-2 h-4 w-4' />
											Profile
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={handleLogout}
										className='cursor-pointer'>
										<LogOut className='mr-2 h-4 w-4' />
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<div className='flex items-center gap-2'>
								<Link href='/login'>
									<Button
										variant='ghost'
										className='text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'>
										Login
									</Button>
								</Link>
								<Link href='/signup'>
									<Button className='bg-emerald-600 hover:bg-emerald-700'>
										Sign Up
									</Button>
								</Link>
							</div>
						)}
					</div>

					{/* Mobile Navigation */}
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild className='md:hidden'>
							<Button variant='ghost' size='icon'>
								<Menu className='h-5 w-5' />
							</Button>
						</SheetTrigger>
						<SheetContent side='right' className='w-64 p-4'>
							<div className='flex flex-col gap-4 mt-8'>
								<NavContent />
								{user ? (
									<>
										<div className='border-t pt-4'>
											<div className='flex items-center gap-2 mb-4'>
												<Avatar className='h-8 w-8'>
													<AvatarFallback className='bg-emerald-100 text-emerald-600'>
														{user.name
															.charAt(0)
															.toUpperCase()}
													</AvatarFallback>
												</Avatar>
												<div>
													<p className='font-medium text-sm'>
														{user.name}
													</p>
													<p className='text-xs text-gray-500'>
														{user.email}
													</p>
												</div>
											</div>
											<Link
												href='/profile'
												onClick={() =>
													setIsOpen(false)
												}>
												<Button
													variant='ghost'
													className='w-full justify-start gap-2'>
													<User className='h-4 w-4' />
													Profile
												</Button>
											</Link>
											<Button
												variant='ghost'
												onClick={handleLogout}
												className='w-full justify-start gap-2'>
												<LogOut className='h-4 w-4' />
												Logout
											</Button>
										</div>
									</>
								) : (
									<div className='border-t pt-4 space-y-2'>
										<Link
											href='/login'
											onClick={() => setIsOpen(false)}>
											<Button
												variant='ghost'
												className='w-full'>
												Login
											</Button>
										</Link>
										<Link
											href='/signup'
											onClick={() => setIsOpen(false)}>
											<Button className='w-full bg-emerald-600 hover:bg-emerald-700'>
												Sign Up
											</Button>
										</Link>
									</div>
								)}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</nav>
	);
}
