"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { Issue, Activity } from "@/lib/api"
import { IssueHeader } from "./issue-header"
import { SidebarProperties } from "./sidebar-properties"
import { ActivityTimeline } from "./activity-timeline"
import { CommentsInput } from "./comments-input"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { io, type Socket } from "socket.io-client"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface IssueDetailPageProps {
  issue: Issue
}

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL

export function IssueDetailComponent({ issue }: IssueDetailPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [localIssue, setLocalIssue] = useState<Issue>(issue)
  const [socket, setSocket] = useState<Socket | null>(null)

  // Sync localIssue with prop when issue changes
  useEffect(() => {
    setLocalIssue(issue)
  }, [issue])

  // Socket.IO connection for realtime chat/activity updates
  useEffect(() => {
    const authToken = localStorage.getItem("authToken")
    if (!authToken) return

    const s = io(socketUrl, {
      auth: {
        token: authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`
      },
    })

    s.on("connect", () => {
      s.emit("issue:join", { issueId: issue.id })
    })

    s.on("activity:new", (activity: Activity) => {
      setLocalIssue((prev) => ({
        ...prev,
        activity: [...prev.activity, activity],
      }))
    })

    setSocket(s)

    return () => {
      s.disconnect()
      setSocket(null)
    }
  }, [issue.id])

  const handleStatusChange = useCallback(async (newStatus: Issue['status']) => {
    try {
      // Optimistic update
      setLocalIssue(prev => prev ? { ...prev, status: newStatus } : issue)
      // API call would go here
      // await updateIssue(issue.id, { status: newStatus })
    } catch (error) {
      // Revert on error - but keep optimistic update for demo
      console.error("Failed to update status:", error)
    }
  }, [issue])

  const handleCommentSubmit = useCallback(async (text: string) => {
    try {
      // For now, comments UI is used as realtime chat between creator & assignee.
      if (!socket) return
      socket.emit("chat:send", { issueId: issue.id, text })
    } catch (error) {
      console.error("Failed to add comment:", error)
    }
  }, [issue.id, socket])

  const handleEditToggle = useCallback(() => {
    setIsEditing(prev => !prev)
  }, [])

  const commentActivities = useMemo(() => {
    return localIssue.activity.filter(a => a.type === 'comment' || a.type === 'chats')
  }, [localIssue.activity])

  const descriptionParagraphs = useMemo(() => {
    return localIssue.description.split('\n')
  }, [localIssue.description])

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Header */}
          <div className="px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Issues
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <IssueHeader 
                  issue={localIssue} 
                  isEditing={isEditing}
                  onEditToggle={handleEditToggle}
                />
                
                {/* Description */}
                <div className="bg-card rounded-lg border p-6">
                  <h2 className="text-lg font-semibold mb-4">Description</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    {descriptionParagraphs.map((paragraph, index) => (
                      <p key={index} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Sub-issues */}
                {localIssue.subIssues && localIssue.subIssues.length > 0 && (
                  <div className="bg-card rounded-lg border p-6">
                    <h3 className="text-lg font-semibold mb-4">Sub-issues</h3>
                    <div className="space-y-3">
                      {localIssue.subIssues.map((subIssue) => (
                        <div 
                          key={subIssue.id}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="font-medium">{subIssue.title}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activity Timeline */}
                <ActivityTimeline activities={localIssue.activity} />
                
                {/* Comments */}
                <CommentsInput 
                  onSubmit={handleCommentSubmit}
                  activities={commentActivities}
                />
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                <SidebarProperties 
                  issue={localIssue}
                  onStatusChange={handleStatusChange}
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
