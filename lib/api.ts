// Mock API layer for issue management
// In production, replace with actual API calls

export interface User {
  id: string
  name: string
  avatar?: string
}

export interface Project {
  id: string
  name: string
}

export interface Activity {
  id: string
  type: "created" | "comment" | "status" | "assigned" | "closed" | "chats"
  text: string
  author: string
  timestamp: string
}

export interface Issue {
  id: string
  title: string
  description: string
  status: "Backlog" | "Todo" | "In Progress" | "Done" | "Closed"
  priority: "Low" | "Medium" | "High" | "Critical"
  assignee: User
  project: Project
  labels: string[]
  subIssues: Array<{ id: string; title: string }>
  activity: Activity[]
}

export async function getIssueById(issueId: string): Promise<Issue> {
  const authToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null
  if (!authToken) throw new Error("No auth token")
  const authorizationHeader = authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`

  const res = await fetch(`/api/issues/${issueId}`, {
    headers: {
      "Authorization": authorizationHeader,
    },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error")
    throw new Error(text)
  }

  return await res.json()
}

export async function updateIssue(issueId: string, updates: Partial<Issue>): Promise<Issue> {
  throw new Error("Not implemented")
}

export async function addComment(issueId: string, text: string): Promise<Activity> {
  throw new Error("Not implemented")
}
