export interface Book {
  id: string
  title: string
  author: string
  genre: string
  description: string
  condition: string
  owner: string
  location: string
  status: "available" | "borrowed"
  createdAt?: string
}

export interface BorrowTransaction {
  id: string
  bookId: string
  book: Book
  borrower: string
  borrowDate: string
  returnDate?: string
  status: "borrowed" | "returned"
}

export interface AddBookRequest {
  title: string
  author: string
  genre: string
  description: string
  condition: string
  owner: string
  location: string
}

export interface BorrowRequest {
  bookId: string
  borrower: string
}
