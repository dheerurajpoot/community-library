"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, MapPin, BookOpen, Users, Heart, ArrowRight, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"
import { getBooks } from "@/lib/api"
import type { Book } from "@/models"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = async () => {
    try {
      const data = await getBooks()
      setBooks(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to load books:", error)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const featuredBooks = books.slice(0, 8)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <BookOpen className="h-16 w-16" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Community Library</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Share knowledge, build community, learn together. Connect with neighbors and discover amazing books in your
            area.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <Input
                type="text"
                placeholder="Search for books, authors, or genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg border-0 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-6 w-6 text-emerald-200" />
                <span className="text-2xl font-bold">1,234</span>
              </div>
              <p className="text-emerald-100">Active Members</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="h-6 w-6 text-emerald-200" />
                <span className="text-2xl font-bold">5,678</span>
              </div>
              <p className="text-emerald-100">Books Shared</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="h-6 w-6 text-emerald-200" />
                <span className="text-2xl font-bold">892</span>
              </div>
              <p className="text-emerald-100">Successful Exchanges</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Community Library?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make book sharing simple, safe, and rewarding for everyone in the community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                <BookOpen className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
              <p className="text-gray-600">List your books in minutes and connect with readers in your area.</p>
            </div>
            <div className="text-center group">
              <div className="bg-teal-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-teal-200 transition-colors">
                <Shield className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Verified users and secure transactions for peace of mind.</p>
            </div>
            <div className="text-center group">
              <div className="bg-cyan-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-cyan-200 transition-colors">
                <Users className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Community</h3>
              <p className="text-gray-600">Meet like-minded readers and build lasting friendships.</p>
            </div>
            <div className="text-center group">
              <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Everything</h3>
              <p className="text-gray-600">Monitor your lending history and discover new favorites.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Books Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Featured Books</h2>
              <p className="text-gray-600">Discover popular books in your community</p>
            </div>
            <Link href="/books">
              <Button
                variant="outline"
                className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-transparent"
              >
                View All Books
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-32 bg-gray-200 rounded mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))
              : featuredBooks.map((book) => (
                  <Card
                    key={book.id}
                    className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
                            {book.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">by {book.author}</p>
                        </div>
                        <Badge
                          variant={book.status === "available" ? "default" : "secondary"}
                          className={
                            book.status === "available" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : ""
                          }
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
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="w-full space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-emerald-100 text-emerald-600">
                              {book.owner.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{book.owner}</span>
                          <div className="flex items-center gap-1 ml-auto">
                            <MapPin className="h-3 w-3" />
                            <span className="text-xs">{book.location}</span>
                          </div>
                        </div>
                        <Link href={`/book/${book.id}`} className="block">
                          <Button
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                            disabled={book.status !== "available"}
                          >
                            {book.status === "available" ? "View Details" : "Not Available"}
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started is easy! Follow these simple steps to begin sharing and borrowing books.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up & Verify</h3>
              <p className="text-gray-600">Create your account and verify your email to join our trusted community.</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">List Your Books</h3>
              <p className="text-gray-600">
                Add books you'd like to share with details and photos to attract borrowers.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-cyan-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Share</h3>
              <p className="text-gray-600">
                Browse, borrow, and lend books while building connections in your community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Sharing?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of book lovers who are already building stronger communities through reading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3">
                Get Started Free
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-3 bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
