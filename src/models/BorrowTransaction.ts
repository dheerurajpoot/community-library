import type { Book } from "./Book"

export interface BorrowTransaction {
  id: string
  bookId: string
  book: Book
  borrowerId: string
  borrower: string
  ownerId: string
  borrowDate: string
  returnDate?: string
  dueDate: string
  status: "borrowed" | "returned" | "overdue"
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface BorrowRequest {
  bookId: string
  notes?: string
}
