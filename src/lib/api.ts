import axios from "axios"
import type { Book, BorrowTransaction, AddBookRequest, UpdateProfileRequest } from "@/models"

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Books API
export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await api.get("/books")
    return Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error("Failed to fetch books:", error)
    return []
  }
}

export const getBook = async (id: string): Promise<Book> => {
  const response = await api.get(`/books/${id}`)
  return response.data
}

export const addBook = async (book: AddBookRequest): Promise<Book> => {
  const response = await api.post("/books", book)
  return response.data
}

export const updateBook = async (id: string, book: Partial<Book>): Promise<Book> => {
  const response = await api.put(`/books/${id}`, book)
  return response.data
}

export const deleteBook = async (id: string): Promise<void> => {
  await api.delete(`/books/${id}`)
}

export const getMyBooks = async (): Promise<Book[]> => {
  try {
    const response = await api.get("/books/my-books")
    return Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error("Failed to fetch my books:", error)
    return []
  }
}

// Borrowing API
export const borrowBook = async (bookId: string, notes?: string): Promise<BorrowTransaction> => {
  const response = await api.post("/borrow", { bookId, notes })
  return response.data
}

export const getBorrowedBooks = async (): Promise<BorrowTransaction[]> => {
  try {
    const response = await api.get("/borrow")
    return Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error("Failed to fetch borrowed books:", error)
    return []
  }
}

export const returnBook = async (transactionId: string): Promise<BorrowTransaction> => {
  const response = await api.put(`/borrow/${transactionId}/return`)
  return response.data
}

// Profile API
export const updateProfile = async (data: UpdateProfileRequest): Promise<any> => {
  const response = await api.put("/profile", data)
  return response.data
}

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  },
)
