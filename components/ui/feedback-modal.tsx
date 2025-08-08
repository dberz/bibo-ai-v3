"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface FeedbackModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeedbackModal({ open, onOpenChange }: FeedbackModalProps) {
  const handleOpenForm = () => {
    // Updated feedback form URL for v3
    window.open('https://forms.gle/wujaU6En8edL28pD8', '_blank')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl p-8 bg-background shadow-2xl border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Help Us Improve Bibo</DialogTitle>
          <DialogDescription className="mt-2 text-base text-muted-foreground">
            Your feedback helps us make Bibo better. We'd love to hear your thoughts on our AI-powered audiobook app.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We'll ask you a few quick questions about:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>How valuable you find the app concept</li>
              <li>Your likelihood to use it regularly</li>
              <li>What features would make it more useful</li>
              <li>Any other feedback you'd like to share</li>
            </ul>
          </div>

          <div className="flex justify-end gap-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button onClick={handleOpenForm}>
              Take Survey
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 