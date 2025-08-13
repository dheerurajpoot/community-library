"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import axios from "axios";

export interface User {
	_id: string;
	name: string;
	email: string;
	avatar: string;
	phone: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	role: "user" | "admin";
	token?: string;
	isActive: string;
	isEmailVerified: boolean;
	createdAt: string;
}

interface AuthContextType {
	user: User | null;
	loading: boolean;
	setUser: (user: User | null) => void;
	signOut: () => Promise<void>;
	isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check if user is logged in
		const checkAuth = async () => {
			try {
				const storedUser = localStorage.getItem("user");
				if (storedUser) {
					const parsedUser = JSON.parse(storedUser);
					setUser(parsedUser);

					if (parsedUser.role === "admin") {
						document.cookie = `user_role=admin; path=/; max-age=${
							60 * 60 * 24 * 7
						}`; // 7 days
					}
				}
			} catch (error) {
				console.error("Auth check failed:", error);
			} finally {
				setLoading(false);
			}
		};

		checkAuth();
	}, []);

	const signOut = async () => {
		try {
			setLoading(true);
			await axios.get("/api/auth/logout");
			localStorage.removeItem("user");
			document.cookie = "session=; path=/; max-age=0";
			document.cookie = "user_role=; path=/; max-age=0";
			window.location.reload();
			setUser(null);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const errorMessage =
					error.response?.data?.message || "Logout failed";
				console.error("Sign out failed:", errorMessage);
			} else if (error instanceof Error) {
				console.error("Sign out failed:", error.message);
			} else {
				console.error("Sign out failed: Unknown error");
			}
		} finally {
			setLoading(false);
		}
	};

	const isAdmin = () => {
		return user?.role === "admin";
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				setUser,
				signOut,
				isAdmin,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
