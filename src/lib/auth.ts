import axios from "axios"
import type {
  User,
  LoginRequest,
  CreateUserRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyOTPRequest,
} from "@/models"

const api = axios.create({
  baseURL: "/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
})

export const login = async (credentials: LoginRequest): Promise<{ user: User; token: string }> => {
  const response = await api.post("/login", credentials)
  return response.data
}

export const signup = async (userData: CreateUserRequest): Promise<{ user: User; message: string }> => {
  const response = await api.post("/signup", userData)
  return response.data
}

export const verifyOTP = async (data: VerifyOTPRequest): Promise<{ user: User; token: string }> => {
  const response = await api.post("/verify-otp", data)
  return response.data
}

export const forgotPassword = async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
  const response = await api.post("/forgot-password", data)
  return response.data
}

export const resetPassword = async (data: ResetPasswordRequest): Promise<{ message: string }> => {
  const response = await api.post("/reset-password", data)
  return response.data
}

export const logout = async (): Promise<void> => {
  await api.post("/logout")
}

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/me")
  return response.data
}

export const refreshToken = async (): Promise<{ token: string }> => {
  const response = await api.post("/refresh")
  return response.data
}
