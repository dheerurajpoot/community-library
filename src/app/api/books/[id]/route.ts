import { type NextRequest, NextResponse } from "next/server"
import type { Book } from "@/lib/models"

// In-memory storage (same as in route.ts)
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const book = books.find((b) => b.id === params.id)

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json(book)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const bookIndex = books.findIndex((b) => b.id === params.id)

    if (bookIndex === -1) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    books[bookIndex] = { ...books[bookIndex], ...body }

    return NextResponse.json(books[bookIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const bookIndex = books.findIndex((b) => b.id === params.id)

    if (bookIndex === -1) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    books.splice(bookIndex, 1)

    return NextResponse.json({ message: "Book deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 })
  }
}
