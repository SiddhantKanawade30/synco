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
  type: "created" | "comment" | "status" | "assigned" | "closed"
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

// Mock data
const mockIssues: Record<string, Issue> = {
  "PRO-7": {
    id: "PRO-7",
    title: "Update UI button",
    description: "Add better styling for primary CTA button. The current button doesn't follow our design system and needs to be updated to match the new brand guidelines.",
    status: "In Progress",
    priority: "High",
    assignee: {
      id: "123",
      name: "Siddhant Kanawade",
      avatar: "https://images.unsplash.com/photo-1472099645785-6a1a2d6d5a?w=64&h=64&fit=crop&crop=faces"
    },
    project: {
      id: "project-beta",
      name: "Project Beta"
    },
    labels: ["UI", "UX"],
    subIssues: [
      { id: "PRO-8", title: "Fix light mode bug" },
      { id: "PRO-9", title: "Add hover states" }
    ],
    activity: [
      {
        id: "1",
        type: "created",
        text: "Issue created",
        author: "Siddhant",
        timestamp: "2026-01-10T10:00:00Z"
      },
      {
        id: "2",
        type: "comment",
        text: "No profile page is supporting light mode",
        author: "Siddhant",
        timestamp: "2026-01-10T10:01:00Z"
      },
      {
        id: "3",
        type: "status",
        text: "Moved from Todo → In Progress",
        author: "Siddhant",
        timestamp: "2026-01-10T10:05:00Z"
      }
    ]
  },
  // Add all issues from the issues data
  "iss001": {
    id: "iss001",
    title: "Fix authentication bug",
    description: "Users are experiencing login issues with OAuth providers. The authentication flow is failing intermittently, causing users to be unable to access their accounts.",
    status: "Todo",
    priority: "High",
    assignee: {
      id: "456",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-6a1a2d6d5a?w=64&h=64&fit=crop&crop=faces"
    },
    project: {
      id: "ecommerce",
      name: "E-commerce Platform"
    },
    labels: ["Bug", "Authentication"],
    subIssues: [],
    activity: [
      {
        id: "4",
        type: "created",
        text: "Issue created",
        author: "John Doe",
        timestamp: "2026-01-11T09:00:00Z"
      }
    ]
  },
  "iss002": {
    id: "iss002",
    title: "Add dark mode support",
    description: "Implement dark mode theme across the entire application to improve user experience in low-light environments.",
    status: "In Progress",
    priority: "Medium",
    assignee: {
      id: "789",
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1472099645785-6a1a2d6d5a?w=64&h=64&fit=crop&crop=faces"
    },
    project: {
      id: "mobile",
      name: "Mobile App"
    },
    labels: ["Feature", "UI"],
    subIssues: [
      { id: "iss002-1", title: "Update color palette" },
      { id: "iss002-2", title: "Test contrast ratios" }
    ],
    activity: [
      {
        id: "5",
        type: "created",
        text: "Issue created",
        author: "Jane Smith",
        timestamp: "2026-01-10T14:00:00Z"
      },
      {
        id: "6",
        type: "status",
        text: "Moved from Backlog → Todo",
        author: "Jane Smith",
        timestamp: "2026-01-11T10:00:00Z"
      }
    ]
  },
  "iss003": {
    id: "iss003",
    title: "Database performance optimization",
    description: "Optimize database queries and add proper indexing to improve application performance under heavy load.",
    status: "Todo",
    priority: "High",
    assignee: {
      id: "321",
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-6a1a2d6d5a?w=64&h=64&fit=crop&crop=faces"
    },
    project: {
      id: "analytics",
      name: "Analytics Dashboard"
    },
    labels: ["Performance", "Database"],
    subIssues: [],
    activity: [
      {
        id: "7",
        type: "created",
        text: "Issue created",
        author: "Mike Johnson",
        timestamp: "2026-01-12T11:00:00Z"
      }
    ]
  },
  "iss004": {
    id: "iss004",
    title: "Update documentation",
    description: "Update API documentation to include new endpoints and improve code examples for better developer experience.",
    status: "Done",
    priority: "Low",
    assignee: {
      id: "654",
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-6a1a2d6d5a?w=64&h=64&fit=crop&crop=faces"
    },
    project: {
      id: "ecommerce",
      name: "E-commerce Platform"
    },
    labels: ["Documentation"],
    subIssues: [],
    activity: [
      {
        id: "8",
        type: "created",
        text: "Issue created",
        author: "Sarah Wilson",
        timestamp: "2026-01-09T15:00:00Z"
      },
      {
        id: "9",
        type: "status",
        text: "Moved from In Progress → Done",
        author: "Sarah Wilson",
        timestamp: "2026-01-10T16:00:00Z"
      }
    ]
  },
  "iss005": {
    id: "iss005",
    title: "Security vulnerability patch",
    description: "Address critical security vulnerability in authentication system to prevent unauthorized access.",
    status: "In Progress",
    priority: "High",
    assignee: {
      id: "987",
      name: "David Brown",
      avatar: "https://images.unsplash.com/photo-1472099645785-6a1a2d6d5a?w=64&h=64&fit=crop&crop=faces"
    },
    project: {
      id: "payment",
      name: "Payment Gateway"
    },
    labels: ["Security", "Critical"],
    subIssues: [],
    activity: [
      {
        id: "10",
        type: "created",
        text: "Issue created",
        author: "David Brown",
        timestamp: "2026-01-13T08:00:00Z"
      }
    ]
  },
  "iss006": {
    id: "iss006",
    title: "Mobile responsiveness issues",
    description: "Fix mobile layout issues across different screen sizes and devices to ensure proper user experience.",
    status: "Todo",
    priority: "Medium",
    assignee: {
      id: "654",
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1472099645785-6a1a2d6d5a?w=64&h=64&fit=crop&crop=faces"
    },
    project: {
      id: "ecommerce",
      name: "E-commerce Platform"
    },
    labels: ["Mobile", "UI"],
    subIssues: [],
    activity: [
      {
        id: "11",
        type: "created",
        text: "Issue created",
        author: "Emily Davis",
        timestamp: "2026-01-12T16:00:00Z"
      }
    ]
  },
  "iss007": {
    id: "iss007",
    title: "Add export functionality",
    description: "Implement data export feature allowing users to download reports in CSV and PDF formats.",
    status: "Todo",
    priority: "Medium",
    assignee: {
      id: "321",
      name: "Chris Miller",
      avatar: "https://images.unsplash.com/photo-1472099645785-6a1a2d6d5a?w=64&h=64&fit=crop&crop=faces"
    },
    project: {
      id: "analytics",
      name: "Analytics Dashboard"
    },
    labels: ["Feature", "Export"],
    subIssues: [],
    activity: [
      {
        id: "12",
        type: "created",
        text: "Issue created",
        author: "Chris Miller",
        timestamp: "2026-01-13T09:00:00Z"
      }
    ]
  },
  "iss008": {
    id: "iss008",
    title: "Memory leak investigation",
    description: "Investigate and fix memory leaks causing application to slow down over extended usage periods.",
    status: "In Progress",
    priority: "High",
    assignee: {
      id: "789",
      name: "Lisa Anderson",
      avatar: "https://images.unsplash.com/photo-1472099645785-6a1a2d6d5a?w=64&h=64&fit=crop&crop=faces"
    },
    project: {
      id: "mobile",
      name: "Mobile App"
    },
    labels: ["Performance", "Bug"],
    subIssues: [],
    activity: [
      {
        id: "13",
        type: "created",
        text: "Issue created",
        author: "Lisa Anderson",
        timestamp: "2026-01-11T11:00:00Z"
      }
    ]
  },
  "iss009": {
    id: "iss009",
    title: "Improve error handling",
    description: "Enhance error handling throughout the application to provide better user feedback and debugging information.",
    status: "Done",
    priority: "Low",
    assignee: {
      id: "456",
      name: "Robert Taylor",
      avatar: "https://images.unsplash.com/photo-1472099645785-6a1a2d6d5a?w=64&h=64&fit=crop&crop=faces"
    },
    project: {
      id: "payment",
      name: "Payment Gateway"
    },
    labels: ["Improvement", "Error Handling"],
    subIssues: [],
    activity: [
      {
        id: "14",
        type: "created",
        text: "Issue created",
        author: "Robert Taylor",
        timestamp: "2026-01-10T13:00:00Z"
      },
      {
        id: "15",
        type: "status",
        text: "Moved from In Progress → Done",
        author: "Robert Taylor",
        timestamp: "2026-01-12T14:00:00Z"
      }
    ]
  },
  "iss010": {
    id: "iss010",
    title: "Add search functionality",
    description: "Implement global search feature allowing users to search across all content and data.",
    status: "Todo",
    priority: "Medium",
    assignee: {
      id: "987",
      name: "Patricia Moore",
      avatar: "https://images.unsplash.com/photo-1472099645785-6a1a2d6d5a?w=64&h=64&fit=crop&crop=faces"
    },
    project: {
      id: "ecommerce",
      name: "E-commerce Platform"
    },
    labels: ["Feature", "Search"],
    subIssues: [],
    activity: [
      {
        id: "16",
        type: "created",
        text: "Issue created",
        author: "Patricia Moore",
        timestamp: "2026-01-13T10:00:00Z"
      }
    ]
  },
  "iss011": {
    id: "iss011",
    title: "API rate limiting",
    description: "Implement API rate limiting to prevent abuse and ensure fair usage of system resources.",
    status: "In Progress",
    priority: "High",
    assignee: {
      id: "321",
      name: "James Jackson",
      avatar: "https://images.unsplash.com/photo-1472099645785-6a1a2d6d5a?w=64&h=64&fit=crop&crop=faces"
    },
    project: {
      id: "analytics",
      name: "Analytics Dashboard"
    },
    labels: ["API", "Security"],
    subIssues: [],
    activity: [
      {
        id: "17",
        type: "created",
        text: "Issue created",
        author: "James Jackson",
        timestamp: "2026-01-12T15:00:00Z"
      }
    ]
  },
  "iss012": {
    id: "iss012",
    title: "UI/UX improvements",
    description: "Enhance user interface and experience based on user feedback and modern design principles.",
    status: "Todo",
    priority: "Medium",
    assignee: {
      id: "654",
      name: "Mary White",
      avatar: "https://images.unsplash.com/photo-1472099645785-6a1a2d6d5a?w=64&h=64&fit=crop&crop=faces"
    },
    project: {
      id: "mobile",
      name: "Mobile App"
    },
    labels: ["UI", "UX"],
    subIssues: [],
    activity: [
      {
        id: "18",
        type: "created",
        text: "Issue created",
        author: "Mary White",
        timestamp: "2026-01-13T11:00:00Z"
      }
    ]
  }
}

export async function getIssueById(issueId: string): Promise<Issue> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const issue = mockIssues[issueId]
  if (!issue) {
    throw new Error("Issue not found")
  }
  
  return issue
}

export async function updateIssue(issueId: string, updates: Partial<Issue>): Promise<Issue> {
  await new Promise(resolve => setTimeout(resolve, 100))
  
  if (mockIssues[issueId]) {
    mockIssues[issueId] = { ...mockIssues[issueId], ...updates }
  }
  
  return mockIssues[issueId]
}

export async function addComment(issueId: string, text: string): Promise<Activity> {
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const comment: Activity = {
    id: Date.now().toString(),
    type: "comment",
    text,
    author: "Current User",
    timestamp: new Date().toISOString()
  }
  
  if (mockIssues[issueId]) {
    mockIssues[issueId].activity.push(comment)
  }
  
  return comment
}
