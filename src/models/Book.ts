export interface Book {
  id: string
  title: string
  author: string
  isbn?: string
  genre: string
  description: string
  condition: string
  ownerId: string
  owner: string
  location: string
  status: "available" | "borrowed"
  images?: string[]
  createdAt: string
  updatedAt: string
}

export interface AddBookRequest {
  title: string
  author: string
  isbn?: string
  genre: string
  description: string
  condition: string
  location: string
}
