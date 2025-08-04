"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { getMyBooks, deleteBook } from "@/lib/api"
import type { Book } from "@/lib/models"
import Navigation from "@/components/navigation"
import { useToast } from "@/hooks/use-toast"

export default function MyBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadMyBooks()
  }, [])

  const loadMyBooks = async () => {
    try {
      const data = await getMyBooks()
      setBooks(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to load books:", error)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (bookId: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return

    try {
      await deleteBook(bookId)
      setBooks(books.filter((book) => book.id !== bookId))
      toast({
        title: "Success!",
        description: "Book deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete book. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="bg-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Books</h1>
          <p className="text-gray-600">Manage the books you've shared with the community</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No books yet</h3>
            <p className="text-gray-500 mb-4">Start sharing your books with the community!</p>
            <Link href="/add-book">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Add Your First Book</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Card
                key={book.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2">{book.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">by {book.author}</p>
                    </div>
                    <Badge
                      variant={book.status === "available" ? "default" : "secondary"}
                      className={book.status === "available" ? "bg-emerald-100 text-emerald-800" : ""}
                    >
                      {book.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="aspect-[3/4] bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {book.genre}
                    </Badge>
                    <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
                    <p className="text-xs text-gray-500">Condition: {book.condition}</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="w-full flex gap-2">
                    <Link href={`/book/${book.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(book.id)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
