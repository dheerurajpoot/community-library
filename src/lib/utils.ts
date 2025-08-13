import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET =
	process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";
const JWT_EXPIRES_IN = "30d";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function hashPassword(password: string): Promise<string> {
	return bcrypt.hash(password, 12);
}

export async function comparePassword(
	password: string,
	hashedPassword: string
): Promise<boolean> {
	return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string): string {
	return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): { userId: string } | null {
	try {
		return jwt.verify(token, JWT_SECRET) as { userId: string };
	} catch {
		return null;
	}
}

export function generateOTP(): string {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateResetToken(): string {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
}

export function formatDate(date: string): string {
	const d = new Date(date);
	return d.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
