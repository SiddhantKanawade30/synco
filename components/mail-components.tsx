"use client"

import * as React from "react"
import { IconArchive, IconClock, IconMail, IconMailOpened, IconSearch, IconStar, IconTrash, IconSend } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export const emails = [
  {
    id: "MSG001",
    from: "john.doe@example.com",
    fromName: "John Doe",
    subject: "Project Update - Mobile App Redesign",
    preview: "Hi team, I wanted to share the latest progress on the mobile app redesign...",
    fullMessage: `Hi team,

I wanted to share the latest progress on the mobile app redesign project. We've made significant progress on the following areas:

1. **UI/UX Improvements**
   - Redesigned navigation flow
   - Improved color scheme consistency
   - Enhanced accessibility features

2. **Performance Optimizations**
   - Reduced app load time by 40%
   - Optimized image loading
   - Improved scroll performance

3. **New Features**
   - Dark mode support
   - Push notifications
   - Offline mode

Please review the attached mockups and let me know your thoughts. We're on track to meet our deadline next week.

Best regards,
John Doe`,
    date: "2024-01-15",
    time: "10:30 AM",
    status: "unread",
    tags: ["important", "project"],
    isStarred: true,
  },
  {
    id: "MSG002",
    from: "sarah.smith@example.com",
    fromName: "Sarah Smith",
    subject: "Meeting Reminder: Sprint Planning",
    preview: "Don't forget about our sprint planning meeting tomorrow at 10 AM...",
    fullMessage: `Hi everyone,

This is a friendly reminder about our sprint planning meeting tomorrow at 10 AM in Conference Room B.

Agenda:
- Review previous sprint
- Plan new sprint backlog
- Resource allocation
- Timeline discussions

Please come prepared with your updates and any blockers you're facing.

Thanks,
Sarah Smith`,
    date: "2024-01-14",
    time: "4:15 PM",
    status: "read",
    tags: ["meeting", "sprint"],
    isStarred: false,
  },
  {
    id: "MSG003",
    from: "mike.johnson@example.com",
    fromName: "Mike Johnson",
    subject: "Code Review Request",
    preview: "Could you please review my latest pull request for the API integration...",
    fullMessage: `Hey,

Could you please review my latest pull request for the API integration? I've implemented the following endpoints:

- GET /api/users
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id

The PR includes comprehensive tests and documentation. Link: github.com/project/pr/123

Thanks for your time!
Mike Johnson`,
    date: "2024-01-14",
    time: "2:45 PM",
    status: "unread",
    tags: ["code-review", "api"],
    isStarred: false,
  },
  {
    id: "MSG004",
    from: "emily.brown@example.com",
    fromName: "Emily Brown",
    subject: "Bug Report: Dashboard Analytics",
    preview: "I found an issue with dashboard analytics not loading properly...",
    fullMessage: `Hi Team,

I found an issue with dashboard analytics not loading properly on the production environment.

Issue Details:
- Environment: Production
- Browser: Chrome 120
- Steps to reproduce: Navigate to Analytics tab
- Expected: Analytics data should load
- Actual: Loading spinner continues indefinitely

This seems to be affecting multiple users. Can someone investigate urgently?

Best,
Emily Brown`,
    date: "2024-01-13",
    time: "9:20 AM",
    status: "read",
    tags: ["bug", "urgent"],
    isStarred: true,
  },
  {
    id: "MSG005",
    from: "alex.wilson@example.com",
    fromName: "Alex Wilson",
    subject: "New Feature Request",
    preview: "I'd like to request a new feature for the project management system...",
    fullMessage: `Hello,

I'd like to request a new feature for the project management system. It would be great to have:

1. **Kanban Board View**
   - Drag and drop functionality
   - Column customization
   - Swimlanes for different teams

2. **Time Tracking**
   - Manual time entry
   - Automatic time tracking
   - Reporting features

3. **Advanced Filtering**
   - Filter by multiple criteria
   - Saved filter presets
   - Quick filter shortcuts

This would significantly improve our team's productivity. Happy to discuss this further.

Regards,
Alex Wilson`,
    date: "2024-01-13",
    time: "3:30 PM",
    status: "read",
    tags: ["feature-request"],
    isStarred: false,
  },
]

export function MailList({ selectedEmail, onSelectEmail }: { 
  selectedEmail: typeof emails[0] | null
  onSelectEmail: (email: typeof emails[0]) => void 
}) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filter, setFilter] = React.useState<"all" | "unread">("all")

  const filteredEmails = emails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.preview.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filter === "all" || (filter === "unread" && email.status === "unread")
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex h-full flex-col">
      {/* Search and Filters */}
      <div className="border-b p-4">
        <div className="relative mb-3">
          <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-neutral-300"
          />
        </div>
        <div className="flex gap-2 p-2 bg-muted/50 rounded-lg">
          <Button
            variant={filter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
            className="flex-1"
          >
            All Mail
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("unread")}
            className="flex-1"
          >
            Unread
          </Button>
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredEmails.map((email) => (
          <div
            key={email.id}
            className={`cursor-pointer transition-all duration-200 rounded-lg border p-4 hover:shadow-md ${
              selectedEmail?.id === email.id ? "bg-white border-primary shadow-sm" : "bg-card hover:bg-muted/50 border-border"
            } ${email.status === "unread" ? "border-l-4 border-l-primary" : ""}`}
            onClick={() => onSelectEmail(email)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`font-medium ${
                  email.status === "unread" ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {email.fromName}
                </span>
                {email.isStarred && <IconStar className="size-4 fill-yellow-400 text-yellow-400" />}
              </div>
              <div className="text-xs text-muted-foreground">
                {email.date} • {email.time}
              </div>
            </div>
            <div className={`text-sm mb-2 ${
              email.status === "unread" ? "font-medium text-foreground" : "text-muted-foreground"
            }`}>
              {email.subject}
            </div>
            <div className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {email.preview}
            </div>
            <div className="flex gap-1 flex-wrap">
              {email.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className={`text-xs ${
                    (tag === 'work' || tag === 'project') ? 'bg-blue-100 text-blue-800' : ''
                  }`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MailViewer({ email, onClose }: { 
  email: typeof emails[0] | null
  onClose: () => void 
}) {
  const [replyText, setReplyText] = React.useState("")

  if (!email) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <div className="text-center">
          <IconMail className="mx-auto size-12 mb-4" />
          <p>Select an email to read</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Email Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
              {email.fromName.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-semibold">{email.subject}</h2>
              <div className="text-sm text-muted-foreground">
                {email.fromName} • {email.from}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {email.isStarred && <IconStar className="size-4 fill-yellow-400 text-yellow-400" />}
            <Button size="icon" variant="ghost">
              <IconArchive className="size-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <IconTrash className="size-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <IconClock className="size-4" />
            </Button>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {email.date} • {email.time}
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {email.fullMessage}
        </div>
      </div>

      {/* Email Actions */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Button size="sm">
              <IconMailOpened className="mr-2 size-4" />
              Reply
            </Button>
            <Button size="sm" variant="outline">
              Reply All
            </Button>
            <Button size="sm" variant="outline">
              Forward
            </Button>
          </div>
        </div>
        
        {/* Reply Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Type your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="flex-1 border-neutral-300"
          />
          <Button size="icon" disabled={!replyText.trim()}>
            <IconSend className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
