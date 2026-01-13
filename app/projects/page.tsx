"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ProjectsTable } from "@/components/projects-table"
import { SiteHeader } from "@/components/site-header"
import { CreateProjectForm } from "@/components/create-project-form"
import { TeamMember, teamMembers } from "@/lib/team-data"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: "project-1",
      name: "Project Alpha",
      description: "Mobile app development project",
      deadline: new Date("2026-03-15"),
      lead: teamMembers[0],
      members: [teamMembers[1], teamMembers[2]],
      status: "In Progress"
    },
    {
      id: "project-2", 
      name: "Project Beta",
      description: "Web platform redesign",
      deadline: new Date("2026-04-20"),
      lead: teamMembers[3],
      members: [teamMembers[4], teamMembers[5]],
      status: "Planning"
    }
  ])

  const handleCreateProject = (project: {
    name: string
    description: string
    deadline: Date
    lead: TeamMember
    members: TeamMember[]
  }) => {
    const newProject = {
      id: `project-${Date.now()}`,
      ...project,
      status: "Planning" as const
    }
    setProjects([...projects, newProject])
    console.log("Created project:", newProject)
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
                  currentUser={teamMembers[0]} // Current user as project lead
                />
              </div>
              <div className="px-4 lg:px-6">
                <ProjectsTable />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
