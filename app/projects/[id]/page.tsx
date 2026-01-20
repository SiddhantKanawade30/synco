"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DataTableDemo } from "@/components/projects/taskAssignedTable"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { ProjectOverview } from "@/components/project-overview"
import { CreateIssueForm } from "@/components/create-issue-form"
import type { Issue as TableIssue } from "@/components/issues-data"
import { ErrorBoundary } from "@/components/error-boundary"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useState, useEffect, use, useMemo, useCallback } from "react"

interface ProjectMember {
  id: string
  user: {
    id: string
    name: string
    email: string
  }
}

export default function ProjectsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const projectId = resolvedParams.id
  const [activeFilter, setActiveFilter] = useState("assigned")
  const [activeTab, setActiveTab] = useState("details")
  const [issues, setIssues] = useState<any[]>([])
  const [isIssuesLoading, setIsIssuesLoading] = useState(false)
  const [isCreatingIssue, setIsCreatingIssue] = useState(false)
  const [projectMembers, setProjectMembers] = useState<ProjectMember[]>([])
  const [project, setProject] = useState<any>(null)

  const toTableStatus = (value: unknown): TableIssue["status"] => {
    const raw = String(value ?? "").toUpperCase()
    switch (raw) {
      case "OPEN":
        return "open"
      case "IN_PROGRESS":
        return "in-progress"
      case "DONE":
        return "resolved"
      case "REJECTED":
        return "closed"
      default:
        return "open"
    }
  }

  const toTablePriority = (value: unknown): TableIssue["priority"] => {
    const raw = String(value ?? "").toUpperCase()
    switch (raw) {
      case "HIGH":
        return "high"
      case "MEDIUM":
        return "medium"
      default:
        return "low"
    }
  }

  const issuesTableData: TableIssue[] = useMemo(() => {
    return issues.map((issue) => {
      return {
        id: String(issue.id),
        title: String(issue.title ?? ""),
        status: toTableStatus(issue.status),
        priority: toTablePriority(issue.priority),
        email: String(issue.assignee?.email ?? "-"),
        projectName: String(project?.name ?? "-"),
      }
    })
  }, [issues, project?.name])

  const handleCreateIssue = useCallback(async (issue: {
    title: string
    description: string
    assignee: any
    deadline: Date
    priority: "LOW" | "MEDIUM" | "HIGH"
  }) => {
    console.log("handleCreateIssue called with:", issue)
    
    const authToken = localStorage.getItem("authToken")
    if (!authToken) {
      console.error("No auth token found")
      return
    }
    const authorizationHeader = authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`

    setIsCreatingIssue(true)
    
    try {
      console.log("Making API call to:", `/api/projects/${projectId}/issues`)
      
      const response = await fetch(`/api/projects/${projectId}/issues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authorizationHeader
        },
        body: JSON.stringify({
          title: issue.title,
          description: issue.description,
          assigneeId: issue.assignee?.id || null,
          deadline: issue.deadline.toISOString(),
          priority: issue.priority,
          status: "OPEN"
        }),
      })

      console.log("API response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Error creating issue:", errorText)
        setIsCreatingIssue(false)
        return
      }

      const newIssue = await response.json()
      console.log("Issue created successfully:", newIssue)
      setIssues((prevIssues) => [...prevIssues, newIssue])
    } catch (error) {
      console.error("Network error creating issue:", error)
    } finally {
      setIsCreatingIssue(false)
    }
  }, [projectId])

  const getFilteredData = () => {
    return activeFilter
  }

  const fetchProjectAndMembers = useCallback(async () => {
    const authToken = localStorage.getItem("authToken")
    if (!authToken) {
      console.error("No auth token found")
      return
    }

    try {
      // Fetch project details
      const projectResponse = await fetch(`/api/projects/${projectId}`, {
        headers: {
          "Authorization": authToken
        }
      })

      if (!projectResponse.ok) {
        console.error("Error fetching project")
        return
      }

      const projectData = await projectResponse.json()
      setProject(projectData)

      // Fetch project members
      const membersResponse = await fetch(`/api/projects/${projectId}/members`, {
        headers: {
          "Authorization": authToken
        }
      })

      if (membersResponse.ok) {
        const membersData = await membersResponse.json()
        setProjectMembers(membersData)
        console.log("Project members fetched:", membersData)
      }
    } catch (error) {
      console.error("Error fetching project data:", error)
    }
  }, [projectId])

  const fetchIssues = useCallback(async () => {
    setIsIssuesLoading(true)
    const authToken = localStorage.getItem("authToken")

    if (!authToken) {
      console.error("No auth token found")
      setIsIssuesLoading(false)
      return
    }

    try {
      const response = await fetch(`/api/projects/${projectId}/issues`, {
        headers: {
          "Authorization": authToken
        }
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Error fetching issues:", errorText)
        setIsIssuesLoading(false)
        return
      }

      const data = await response.json()
      setIssues(data)
      console.log("Issues fetched:", data)
    } catch (error) {
      console.error("Network error fetching issues:", error)
    } finally {
      setIsIssuesLoading(false)
    }
  }, [projectId])

  useEffect(() => {
    fetchProjectAndMembers()
    fetchIssues()
  }, [projectId, fetchProjectAndMembers, fetchIssues])

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <ErrorBoundary>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Project Details</h1>
              <CreateIssueForm
                onSubmit={handleCreateIssue}
                assignees={projectMembers}
              />
            </div>

            <div className="grid gap-6">
              <div className="flex gap-2">
                <Button
                  variant={activeTab === "details" ? "default" : "outline"}
                  onClick={() => setActiveTab("details")}
                >
                  Project Details
                </Button>
                <Button
                  variant={activeTab === "tasks" ? "default" : "outline"}
                  onClick={() => setActiveTab("tasks")}
                >
                  Tasks
                </Button>
              </div>

              {activeTab === "details" && (
                <div className="space-y-6">
                  <ProjectOverview projectId={projectId} projectName={project?.name || "Loading..."} />
                  
                  {/* Project Information */}
                  <div className="bg-card p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Project Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Project Name</p>
                        <p className="font-medium">{project?.name || "Loading..."}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Deadline</p>
                      <p className="font-medium">
                        {project?.deadline ? new Date(project.deadline).toLocaleDateString() : "Not set"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">{project?.status || "Active"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="font-medium">
                        {project?.createdAt ? new Date(project.createdAt).toLocaleDateString() : "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div className="bg-card p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Team Members</h3>
                  {projectMembers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {projectMembers.map((member) => (
                        <div key={member.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {member.user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{member.user.name}</p>
                            <p className="text-sm text-muted-foreground">{member.user.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No team members found.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "tasks" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant={activeFilter === "assigned" ? "default" : "outline"}
                      onClick={() => setActiveFilter("assigned")}
                    >
                      Assigned to Me
                    </Button>
                    <Button
                      variant={activeFilter === "created" ? "default" : "outline"}
                      onClick={() => setActiveFilter("created")}
                    >
                      Created
                    </Button>
                    <Button
                      variant={activeFilter === "completed" ? "default" : "outline"}
                      onClick={() => setActiveFilter("completed")}
                    >
                      Completed
                    </Button>
                  </div>
                  <CreateIssueForm
                    onSubmit={handleCreateIssue}
                    assignees={projectMembers}
                    trigger={<Button>Create Issue</Button>}
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Issues</h3>
                  {isIssuesLoading ? (
                    <div className="text-center py-8">Loading issues...</div>
                  ) : issuesTableData.length > 0 ? (
                    <DataTableDemo filterType={activeFilter} dataSource="issues" data={issuesTableData} />
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No issues found. Create your first issue above.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        </ErrorBoundary>
      </SidebarInset>
    </SidebarProvider>
  )
}
