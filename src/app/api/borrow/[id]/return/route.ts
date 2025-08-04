import { type NextRequest, NextResponse } from "next/server"
import type { BorrowTransaction, Book } from "@/lib/models"

// In-memory storage (should be shared with other APIs)
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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const transactionIndex = transactions.findIndex((t) => t.id === params.id)

    if (transactionIndex === -1) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    const transaction = transactions[transactionIndex]

    if (transaction.status === "returned") {
      return NextResponse.json({ error: "Book already returned" }, { status: 400 })
    }

    // Update transaction
    transactions[transactionIndex] = {
      ...transaction,
      status: "returned",
      returnDate: new Date().toISOString(),
    }

    // Update book status back to available
    const bookIndex = books.findIndex((b) => b.id === transaction.bookId)
    if (bookIndex !== -1) {
      books[bookIndex].status = "available"
    }

    return NextResponse.json(transactions[transactionIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to return book" }, { status: 500 })
  }
}
