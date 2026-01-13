"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { IssueDetailComponent } from "@/components/issue-detail-page"
import { getIssueById } from "@/lib/api"

export default function IssueDetail() {
  const params = useParams()
  const issueId = params.id as string
  const [issue, setIssue] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setLoading(true)
        const data = await getIssueById(issueId)
        setIssue(data)
        setError(null)
      } catch (err) {
        setError("Failed to load issue")
      } finally {
        setLoading(false)
      }
    }

    fetchIssue()
  }, [issueId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl">
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  if (error || !issue) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-destructive">Issue Not Found</h1>
          <p className="text-muted-foreground">
            {error || "The issue you're looking for doesn't exist."}
          </p>
          <a 
            href="/issues" 
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            ← Back to Issues
          </a>
        </div>
      </div>
    )
  }

  return <IssueDetailComponent issue={issue} key={issue.id} />
}
