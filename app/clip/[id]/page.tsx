import { StoryClipWizard } from "@/components/story-clip-wizard"
import { getBookById } from "@/lib/books"
import { notFound } from "next/navigation"

export default function ClipPage({ params }: { params: { id: string } }) {
  const id = params.id
  const book = getBookById(id)

  if (!book) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Create StoryClip</h1>
      <p className="text-muted-foreground mb-8">
        Select a passage from the book to create a 15-second vertical video with AI-generated visuals.
      </p>

      <StoryClipWizard book={book} />
    </div>
  )
}
