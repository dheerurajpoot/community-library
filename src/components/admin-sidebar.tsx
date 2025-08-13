"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	BarChart3,
	Users,
	BookOpen,
	LogOut,
	Menu,
	X,
	Shield,
	ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface AdminSidebarProps {
	className?: string;
}

export default function AdminSidebar({ className }: AdminSidebarProps) {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const { user, signOut } = useAuth();

	const navItems = [
		{ href: "/admin", label: "Dashboard", icon: BarChart3 },
		{ href: "/admin/users", label: "Users", icon: Users },
		{ href: "/admin/books", label: "Books", icon: BookOpen },
		{ href: "/add-book", label: "Add Book", icon: BookOpen },
	];

	const handleLogout = () => {
		signOut();
		window.location.href = "/login";
	};

	return (
		<div
			className={`bg-slate-900 text-white h-screen flex flex-col ${
				isCollapsed ? "w-16" : "w-64"
			} transition-all duration-300 ${className}`}>
			{/* Header */}
			<div className='p-4 border-b border-slate-700'>
				<div className='flex items-center justify-between'>
					{!isCollapsed && (
						<div className='flex items-center gap-2'>
							<Shield className='h-8 w-8 text-purple-400' />
							<span className='text-xl font-bold'>
								Admin Panel
							</span>
						</div>
					)}
					<Button
						variant='ghost'
						size='sm'
						onClick={() => setIsCollapsed(!isCollapsed)}
						className='text-slate-400 hover:text-white hover:bg-slate-800'>
						{isCollapsed ? (
							<Menu className='h-4 w-4' />
						) : (
							<X className='h-4 w-4' />
						)}
					</Button>
				</div>
			</div>

			{/* Navigation */}
			<nav className='flex-1 p-4'>
				<ul className='space-y-2'>
					{navItems.map((item) => {
						const Icon = item.icon;
						const isActive = pathname === item.href;
						return (
							<li key={item.href}>
								<Link href={item.href}>
									<Button
										variant={
											isActive ? "secondary" : "ghost"
										}
										className={`w-full justify-start gap-3 ${
											isActive
												? "bg-purple-600 hover:bg-purple-700 text-white"
												: "text-slate-300 hover:text-white hover:bg-slate-800"
										} ${isCollapsed ? "px-2" : "px-3"}`}>
										<Icon className='h-5 w-5 flex-shrink-0' />
										{!isCollapsed && (
											<span>{item.label}</span>
										)}
									</Button>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
			<Button
				variant='ghost'
				onClick={() => router.push("/")}
				className={`w-full justify-start gap-3 my-4 text-slate-300 hover:text-white hover:bg-slate-800 ${
					isCollapsed ? "px-2" : "px-3"
				}`}>
				{!isCollapsed && (
					<div className='flex items-center mx-4'>
						<ArrowLeft className='h-4 w-4 mr-2' />
						<span className='text-sm font-medium'>
							Back to Home
						</span>
					</div>
				)}
			</Button>
			<div className='p-4 border-t border-slate-700'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className={`w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800 ${
								isCollapsed ? "px-2" : "px-3"
							}`}>
							<Avatar className='h-8 w-8 flex-shrink-0'>
								<AvatarFallback className='bg-purple-600 text-white text-sm'>
									{user?.name.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							{!isCollapsed && (
								<div className='flex flex-col items-start'>
									<span className='text-sm font-medium'>
										{user?.name}
									</span>
									<span className='text-xs text-slate-400 capitalize'>
										{user?.role.replace("_", " ")}
									</span>
								</div>
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-56'
						align='end'
						forceMount>
						<div className='flex items-center justify-start gap-2 p-2'>
							<div className='flex flex-col space-y-1 leading-none'>
								<p className='font-medium'>{user?.name}</p>
								<p className='w-[200px] truncate text-sm text-muted-foreground'>
									{user?.email}
								</p>
							</div>
						</div>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={handleLogout}
							className='cursor-pointer text-red-600'>
							<LogOut className='mr-2 h-4 w-4' />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
