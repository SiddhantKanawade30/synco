"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DataTableDemo } from "@/components/projects/taskAssignedTable"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { ProjectOverview } from "@/components/project-overview"
import { CreateIssueForm } from "@/components/create-issue-form"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useState } from "react"
import { TeamMember } from "@/lib/team-data"

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("assigned")
  const [activeTab, setActiveTab] = useState("tasks")

  const handleCreateIssue = (issue: {
    title: string
    description: string
    assignee: TeamMember
    deadline: Date
  }) => {
    console.log("Creating issue:", issue)
    // Here you would typically make an API call to create the issue
    // and then refresh the data
  }

  const getFilteredData = () => {
    // This will be passed to DataTableDemo to filter the data
    return activeFilter
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
                <div className="flex gap-2">
                  <Button 
                    variant={activeTab === "overview" ? "default" : "dashed"}
                    onClick={() => setActiveTab("overview")}
                    className="transition-all duration-300 ease-in-out"
                  >
                    Overview
                  </Button>
                  <Button 
                    variant={activeTab === "tasks" ? "default" : "dashed"}
                    onClick={() => setActiveTab("tasks")}
                    className="transition-all duration-300 ease-in-out"
                  >
                    Tasks
                  </Button>
                </div>
                
                {activeTab === "tasks" && (
                  <CreateIssueForm onSubmit={handleCreateIssue} />
                )}
              </div>

              <div className="px-4 lg:px-6">
                <div className="transition-all duration-500 ease-in-out">
                  {activeTab === "overview" ? (
                    <ProjectOverview projectId="project-1" projectName="Project Alpha" />
                  ) : (
                    <div>
                      <div className="flex gap-2 mb-4">
                        <Button 
                          variant={activeFilter === "assigned" ? "default" : "dashed"}
                          onClick={() => setActiveFilter("assigned")}
                          className="transition-all duration-300 ease-in-out"
                        >
                          Assigned
                        </Button>
                        <Button 
                          variant={activeFilter === "created" ? "default" : "dashed"}
                          onClick={() => setActiveFilter("created")}
                          className="transition-all duration-300 ease-in-out"
                        >
                          Created
                        </Button>
                        <Button 
                          variant={activeFilter === "completed" ? "default" : "dashed"}
                          onClick={() => setActiveFilter("completed")}
                          className="transition-all duration-300 ease-in-out"
                        >
                          Completed
                        </Button>
                      </div>
                      <DataTableDemo key={activeFilter} filterType={activeFilter} dataSource="tasks" showProjectColumn={false} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
