"use client"

import { IconCirclePlusFilled, IconMail, IconFolder, IconBug, IconChevronDown, type Icon } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CreateProjectForm } from "@/components/create-project-form"
import { CreateIssueForm } from "@/components/create-issue-form"
import { TeamMember, teamMembers } from "@/lib/team-data"
import { useState } from "react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const pathname = usePathname()
  const [openCreateProject, setOpenCreateProject] = useState(false)
  const [openCreateIssue, setOpenCreateIssue] = useState(false)

  const handleCreateProject = (project: {
    name: string
    deadline: Date
    members: string[]
  }) => {
    console.log("Quick create project:", project)
    setOpenCreateProject(false)
  }

  const handleCreateIssue = (issue: {
    title: string
    description: string
    assignee: TeamMember
    deadline: Date
    priority: "LOW" | "MEDIUM" | "HIGH"
    project?: string
  }) => {
    console.log("Quick create issue:", issue)
    setOpenCreateIssue(false)
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <SidebarMenuButton
                  tooltip="Quick Create"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                >
                  <IconCirclePlusFilled />
                  <span>Quick Create</span>
                </SidebarMenuButton>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-1">
                <div className="space-y-1">
                  <CreateProjectForm 
                    onSubmit={handleCreateProject}
                    trigger={
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setOpenCreateProject(true)
                        }}
                      >
                        <IconFolder className="h-4 w-4 mr-2" />
                        Create Project
                      </Button>
                    }
                  />
                  <CreateIssueForm 
                    onSubmit={handleCreateIssue}
                    showProjectSelection={true}
                    trigger={
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setOpenCreateIssue(true)
                        }}
                      >
                        <IconBug className="h-4 w-4 mr-2" />
                        Create Issue
                      </Button>
                    }
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
              asChild
            >
              <Link href="/inbox">
                <IconMail />
                <span className="sr-only">Inbox</span>
              </Link>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={pathname === item.url}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
