"use client"

import { useState, useMemo } from "react"
import { Activity } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Paperclip, Send } from "lucide-react"

interface CommentsInputProps {
  onSubmit: (text: string) => void
  activities: Activity[]
}

export function CommentsInput({ onSubmit, activities }: CommentsInputProps) {
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!comment.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await onSubmit(comment.trim())
      setComment("")
    } catch (error) {
      console.error("Failed to submit comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const comments = useMemo(() => activities.filter(a => a.type === 'comment' || a.type === 'chats'), [activities])

  return (
    <div className="space-y-6">
      {/* <h3 className="text-lg font-semibold mb-4">Comments</h3> */}
      
      {/* Existing Comments */}
      {/* {comments.length > 0 && (
        <div className="space-y-4 mb-6">
          {comments.map((activity) => (
            <div key={activity.id} className="bg-card rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-muted-foreground rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{activity.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )} */}

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="min-h-[100px] resize-none pr-12"
            disabled={isSubmitting}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                if (!comment.trim() || isSubmitting) return
                // Manually submit when Enter is pressed
                const fakeEvent = { preventDefault: () => {} } as React.FormEvent<HTMLFormElement>
                void handleSubmit(fakeEvent)
              }
            }}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!comment.trim() || isSubmitting}
            className="absolute bottom-2 right-2"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent"></div>
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {/* Optional Attachments */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Paperclip className="h-4 w-4" />
          <span>Attach files by dragging & dropping, or</span>
          <Button type="button" variant="ghost" size="sm" className="text-primary">
            selecting
          </Button>
        </div>
      </form>
    </div>
  )
}
