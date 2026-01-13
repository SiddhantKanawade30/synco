"use client"

import { useState } from "react"
import { Issue } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit3, Calendar, User } from "lucide-react"

interface IssueHeaderProps {
  issue: Issue
  isEditing: boolean
  onEditToggle: () => void
}

export function IssueHeader({ issue, isEditing, onEditToggle }: IssueHeaderProps) {
  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'Backlog': return 'bg-gray-100 text-gray-700'
      case 'Todo': return 'bg-blue-100 text-blue-700'
      case 'In Progress': return 'bg-yellow-100 text-yellow-700'
      case 'Done': return 'bg-green-100 text-green-700'
      case 'Closed': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: Issue['priority']) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200'
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Title and Status */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {issue.title}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge className={getStatusColor(issue.status)}>
              {issue.status}
            </Badge>
            <Badge className={`${getPriorityColor(issue.priority)} border`}>
              {issue.priority}
            </Badge>
            {issue.labels.map((label) => (
              <Badge key={label} variant="outline" className="text-xs">
                {label}
              </Badge>
            ))}
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onEditToggle}
          className="shrink-0"
        >
          <Edit3 className="h-4 w-4 mr-2" />
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Assigned to {issue.assignee.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Created {new Date(issue.activity[0]?.timestamp).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Project:</span>
          <a 
            href={`/projects/${issue.project.id}`}
            className="text-primary hover:underline font-medium"
          >
            {issue.project.name}
          </a>
        </div>
      </div>
    </div>
  )
}
