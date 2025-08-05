import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		phone: String,
		address: String,
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		isActive: {
			type: Boolean,
			default: false,
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
		emailVerificationOtp: String,
		emailVerificationExpires: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
		avatar: String,
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.User || mongoose.model("User", userSchema);

export interface LoginRequest {
	email: string;
	password: string;
}

export interface ForgotPasswordRequest {
	email: string;
}

export interface ResetPasswordRequest {
	token: string;
	password: string;
}

export interface VerifyOTPRequest {
	email: string;
	otp: string;
}

export interface UpdateProfileRequest {
	firstName: string;
	lastName: string;
	phone?: string;
	address?: string;
	city?: string;
	state?: string;
	zipCode?: string;
}
