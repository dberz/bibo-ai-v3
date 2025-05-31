import type { Book } from "@/types/book"

// Individual book data files - easier to manage and update
export const bookData: Record<string, Book> = {
  "moby-dick": {
    id: "moby-dick",
    title: "Moby Dick",
    author: "Herman Melville",
    description: "The epic tale of Captain Ahab's obsessive quest to kill the white whale, Moby Dick.",
    coverUrl: "/book-covers/moby-dick.png",
    genres: ["Classics", "Adventure", "Sea Story"],
    duration: "24h",
    pages: 635,
    category: "classics",
    listeners: 23410,
    rating: 4.3,
    reviewCount: 5432,
    peopleReading: 1247,
    comments: 892,
    loves: 2156,
    chapters: [
      { id: "ch-1", title: "Loomings", duration: "45m", audioUrl: "/audio/moby-dick/ch-1.mp3" },
      { id: "ch-2", title: "The Carpet-Bag", duration: "40m", audioUrl: "/audio/moby-dick/ch-2.mp3" },
      { id: "ch-4", title: "The Counterpane", duration: "38m", audioUrl: "/audio/moby-dick/ch-4.mp3" },
      { id: "ch-5", title: "Breakfast", duration: "35m", audioUrl: "/audio/moby-dick/ch-5.mp3" },
    ],
  },
  "pride-and-prejudice": {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet and Fitzwilliam Darcy.",
    coverUrl: "/book-covers/pride-and-prejudice.png",
    genres: ["Classics", "Romance", "Fiction"],
    duration: "11h",
    pages: 432,
    category: "classics",
    listeners: 45620,
    rating: 4.8,
    reviewCount: 8923,
    peopleReading: 3421,
    comments: 2156,
    loves: 5678,
    chapters: [
      { id: "ch-1", title: "Chapter 1", duration: "15m", audioUrl: "/audio/pride-and-prejudice/ch-1.mp3" },
      { id: "ch-2", title: "Chapter 2", duration: "18m", audioUrl: "/audio/pride-and-prejudice/ch-2.mp3" },
      { id: "ch-4", title: "Chapter 4", duration: "17m", audioUrl: "/audio/pride-and-prejudice/ch-4.mp3" },
    ],
  },
  // Add more books here as needed...
}

// Helper functions
export function getAllBooks(): Book[] {
  return Object.values(bookData);
}

export function getBookById(id: string): Book | undefined {
  return bookData[id];
}

export function getBooksByGenre(genre: string): Book[] {
  return getAllBooks().filter(book => 
    book.genres.some(g => g.toLowerCase() === genre.toLowerCase())
  );
}

export function getBooksByCategory(category: string): Book[] {
  return getAllBooks().filter(book => book.category === category);
}

export function searchBooks(query: string): Book[] {
  const lowerQuery = query.toLowerCase();
  return getAllBooks().filter(book =>
    book.title.toLowerCase().includes(lowerQuery) ||
    book.author.toLowerCase().includes(lowerQuery) ||
    book.description.toLowerCase().includes(lowerQuery) ||
    book.genres.some(genre => genre.toLowerCase().includes(lowerQuery))
  );
}

// Add a new book
export function addBook(book: Book): void {
  bookData[book.id] = book;
}

// Update a book
export function updateBook(id: string, updates: Partial<Book>): void {
  if (bookData[id]) {
    bookData[id] = { ...bookData[id], ...updates };
  }
}

// Remove a book
export function removeBook(id: string): void {
  delete bookData[id];
} 