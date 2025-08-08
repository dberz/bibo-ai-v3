import { BookDetail } from "@/components/book-detail"
import { BookDetailLoading } from "@/components/book-detail-loading"
import { getBookById } from "@/lib/books"
import { notFound } from "next/navigation"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ConsistentHeader } from "@/components/consistent-header"
import { Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"

export default async function BookPage({ params }: { params: { id: string } }) {
  const awaitedParams = await params;
  const book = await getBookById(awaitedParams.id)

  if (!book) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <ConsistentHeader />
      <div className="container mx-auto px-4 py-8 pb-32">
        <ErrorBoundary>
          <Suspense fallback={<BookDetailLoading />}>
            <BookDetail book={book} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
