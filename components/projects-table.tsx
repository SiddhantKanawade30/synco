"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

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

interface ProjectsTableProps {
  projects?: Project[]
  onLoadMore?: () => void
  hasMore?: boolean
  isLoading?: boolean
}

export function ProjectsTable({ 
  projects = [], 
  onLoadMore, 
  hasMore = false, 
  isLoading = false 
}: ProjectsTableProps) {
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 100) {
      if (hasMore && !isLoading && onLoadMore) {
        onLoadMore()
      }
    }
  }, [hasMore, isLoading, onLoadMore])

  const getStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return { status: "Overdue", color: "bg-red-100 text-red-800" }
    if (diffDays <= 7) return { status: "Due Soon", color: "bg-orange-100 text-orange-800" }
    return { status: "On Track", color: "bg-green-100 text-green-800" }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => {
            const statusInfo = getStatus(project.deadline)
            return (
              <TableRow key={project.id} className="hover:bg-muted/50 cursor-pointer">
                <TableCell className="font-medium">
                  <Link href={`/projects/${project.id}`} className="block hover:underline">
                    {project.id}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/projects/${project.id}`} className="block hover:underline">
                    {project.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/projects/${project.id}`} className="block">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusInfo.color}`}>
                      {statusInfo.status}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/projects/${project.id}`} className="block">
                    {format(new Date(project.deadline), "MMM dd, yyyy")}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/projects/${project.id}`} className="block">
                    {format(new Date(project.createdAt), "MMM dd, yyyy")}
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      
      {hasMore && (
        <div className="p-4 text-center">
          <Button 
            onClick={onLoadMore} 
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  )
}
