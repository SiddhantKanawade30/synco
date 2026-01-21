export type Issue = {
  id: string
  title: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high"
  email: string
  projectName: string
}

export const issuesData: Issue[] = [
  {
    id: "iss001",
    title: "Fix authentication bug",
    status: "open",
    priority: "high",
    email: "john.doe@example.com",
    projectName: "E-commerce Platform",
  },
  {
    id: "iss002",
    title: "Add dark mode support",
    status: "in-progress",
    priority: "medium",
    email: "jane.smith@example.com",
    projectName: "Mobile App",
  },
  {
    id: "iss003",
    title: "Database performance optimization",
    status: "open",
    priority: "high",
    email: "mike.johnson@example.com",
    projectName: "Analytics Dashboard",
  },
  {
    id: "iss004",
    title: "Update documentation",
    status: "resolved",
    priority: "low",
    email: "sarah.wilson@example.com",
    projectName: "E-commerce Platform",
  },
  {
    id: "iss005",
    title: "Security vulnerability patch",
    status: "in-progress",
    priority: "high",
    email: "david.brown@example.com",
    projectName: "Payment Gateway",
  },
  {
    id: "iss006",
    title: "Mobile responsiveness issues",
    status: "open",
    priority: "medium",
    email: "emily.davis@example.com",
    projectName: "E-commerce Platform",
  },
  {
    id: "iss007",
    title: "Add export functionality",
    status: "open",
    priority: "medium",
    email: "chris.miller@example.com",
    projectName: "Analytics Dashboard",
  },
  {
    id: "iss008",
    title: "Memory leak investigation",
    status: "in-progress",
    priority: "high",
    email: "lisa.anderson@example.com",
    projectName: "Mobile App",
  },
  {
    id: "iss009",
    title: "Improve error handling",
    status: "resolved",
    priority: "low",
    email: "robert.taylor@example.com",
    projectName: "Payment Gateway",
  },
  {
    id: "iss010",
    title: "Add search functionality",
    status: "open",
    priority: "medium",
    email: "patricia.moore@example.com",
    projectName: "E-commerce Platform",
  },
  {
    id: "iss011",
    title: "API rate limiting",
    status: "in-progress",
    priority: "high",
    email: "james.jackson@example.com",
    projectName: "Analytics Dashboard",
  },
  {
    id: "iss012",
    title: "UI/UX improvements",
    status: "open",
    priority: "medium",
    email: "mary.white@example.com",
    projectName: "Mobile App",
  },
]
