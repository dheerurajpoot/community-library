import { type NextRequest, NextResponse } from "next/server"
import type { BorrowTransaction, BorrowRequest, Book } from "@/lib/models"

// In-memory storage for transactions
const transactions: BorrowTransaction[] = [
  {
    id: "1",
    bookId: "3",
    book: {
      id: "3",
      title: "Dune",
      author: "Frank Herbert",
      genre: "Science Fiction",
      description: "Epic science fiction novel set in a distant future.",
      condition: "Good",
      owner: "Carol Davis",
      location: "Chicago, IL",
      status: "borrowed",
    },
    borrower: "Current User",
    borrowDate: "2024-01-20T10:00:00Z",
    status: "borrowed",
  },
]

// Mock books data (should be shared with books API)
const books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    description: "A classic American novel about the Jazz Age and the American Dream.",
    condition: "Good",
    owner: "Alice Johnson",
    location: "New York, NY",
    status: "available",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    description: "A gripping tale of racial injustice and childhood innocence.",
    condition: "Excellent",
    owner: "Bob Smith",
    location: "Los Angeles, CA",
    status: "available",
    createdAt: "2024-01-16T14:30:00Z",
  },
  {
    id: "3",
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    description: "Epic science fiction novel set in a distant future.",
    condition: "Good",
    owner: "Carol Davis",
    location: "Chicago, IL",
    status: "borrowed",
    createdAt: "2024-01-17T09:15:00Z",
  },
  {
    id: "4",
    title: "The Lean Startup",
    author: "Eric Ries",
    genre: "Business",
    description: "How to build a successful startup using validated learning.",
    condition: "Excellent",
    owner: "David Wilson",
    location: "San Francisco, CA",
    status: "available",
    createdAt: "2024-01-18T16:45:00Z",
  },
  {
    id: "5",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    description: "A brief history of humankind from the Stone Age to the present.",
    condition: "Good",
    owner: "Eva Martinez",
    location: "Austin, TX",
    status: "available",
    createdAt: "2024-01-19T11:20:00Z",
  },
  {
    id: "6",
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    description: "A philosophical story about following your dreams.",
    condition: "Fair",
    owner: "Frank Brown",
    location: "Miami, FL",
    status: "available",
    createdAt: "2024-01-20T13:10:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    // In a real app, filter by authenticated user
    // For demo, return transactions for "Current User"
    const userTransactions = transactions.filter((t) => t.borrower === "Current User")

    return NextResponse.json(userTransactions)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch borrowed books" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: BorrowRequest = await request.json()

    if (!body.bookId || !body.borrower) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Find the book
    const book = books.find((b) => b.id === body.bookId)
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    if (book.status !== "available") {
      return NextResponse.json({ error: "Book is not available for borrowing" }, { status: 400 })
    }

    // Create transaction
    const newTransaction: BorrowTransaction = {
      id: (transactions.length + 1).toString(),
      bookId: body.bookId,
      book: { ...book, status: "borrowed" },
      borrower: body.borrower,
      borrowDate: new Date().toISOString(),
      status: "borrowed",
    }

    transactions.push(newTransaction)

    // Update book status
    const bookIndex = books.findIndex((b) => b.id === body.bookId)
    if (bookIndex !== -1) {
      books[bookIndex].status = "borrowed"
    }

    return NextResponse.json(newTransaction, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to borrow book" }, { status: 500 })
  }
}
