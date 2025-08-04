import { type NextRequest, NextResponse } from "next/server"
import type { Book, AddBookRequest } from "@/lib/models"

// In-memory storage (in production, use a real database)
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
    const { searchParams } = new URL(request.url)
    const owner = searchParams.get("owner")

    let filteredBooks = books

    if (owner === "current") {
      // In a real app, filter by authenticated user
      // For demo, return books from specific owners
      filteredBooks = books.filter((book) => ["Alice Johnson", "Bob Smith"].includes(book.owner))
    }

    return NextResponse.json(filteredBooks)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: AddBookRequest = await request.json()

    // Validate required fields
    if (!body.title || !body.author || !body.genre || !body.owner || !body.location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newBook: Book = {
      id: (books.length + 1).toString(),
      title: body.title,
      author: body.author,
      genre: body.genre,
      description: body.description || "",
      condition: body.condition,
      owner: body.owner,
      location: body.location,
      status: "available",
      createdAt: new Date().toISOString(),
    }

    books.push(newBook)

    return NextResponse.json(newBook, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 })
  }
}
