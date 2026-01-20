"use client"

import { useState, useEffect, useCallback } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ProjectsTable } from "@/components/projects-table"
import { SiteHeader } from "@/components/site-header"
import { CreateProjectForm } from "@/components/create-project-form"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface Project {
  id: string
  name: string
  deadline: string
  createdAt: string
  members?: Array<{
    user: {
      name: string
      email: string
    }
  }>
}

interface PaginationData {
  page: number
  limit: number
  total: number
  totalPages: number
  hasMore: boolean
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasMore: false
  })

  const fetchProjects = useCallback(async (page: number = 1, append: boolean = false) => {
    setIsLoading(true)
    try {
      const authToken = localStorage.getItem("authToken")
      if (!authToken) {
        console.error("No auth token found")
        return
      }

      const response = await fetch(`/api/projects?page=${page}&limit=10`, {
        headers: {
          "Authorization": authToken
        }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }

      const data = await response.json()
      
      if (append) {
        setProjects(prev => [...prev, ...data.projects])
      } else {
        setProjects(data.projects)
      }
      
      setPagination(data.pagination)
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleCreateProject = async(project: {
    name: string
    deadline: Date
    members: string[]
  }) => {
    const authToken = localStorage.getItem("authToken")
    
    if (!authToken) {
      console.error("No auth token found")
      return
    }

    console.log("Sending project data:", project)
    console.log("Members array:", project.members)
    console.log("Members type:", typeof project.members)
    console.log("Members length:", project.members?.length)
    
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authToken
        },
        body: JSON.stringify(project),
      })
      
      console.log("Response status:", response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("Error response:", errorText)
        return
      }
      
      const createdProject = await response.json()
      console.log("Project created:", createdProject)
      
      // Add the new project to the beginning of the list
      setProjects(prev => {
        console.log("Current projects before adding:", prev)
        const newProjects = [createdProject, ...prev]
        console.log("Projects after adding:", newProjects)
        return newProjects
      })
      
      // Update pagination to reflect the new total
      setPagination(prev => {
        console.log("Current pagination before:", prev)
        const newPagination = {
          ...prev,
          total: prev.total + 1
        }
        console.log("Pagination after:", newPagination)
        return newPagination
      })
      
    } catch (error) {
      console.error("Network error:", error)
    }
  }

  const handleLoadMore = () => {
    if (pagination.hasMore && !isLoading) {
      fetchProjects(pagination.page + 1, true)
    }
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                  <p className="text-muted-foreground">
                    Manage and track all your projects in one place.
                  </p>
                </div>
                <CreateProjectForm
                  onSubmit={handleCreateProject}
                />
              </div>
              <div className="px-4 lg:px-6">
                <ProjectsTable 
                  projects={projects}
                  onLoadMore={handleLoadMore}
                  hasMore={pagination.hasMore}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
