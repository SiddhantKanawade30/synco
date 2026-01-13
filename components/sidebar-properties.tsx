"use client"

import { useState } from "react"
import { Issue, User } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarPropertiesProps {
  issue: Issue
  onStatusChange: (status: Issue['status']) => void
}

export function SidebarProperties({ issue, onStatusChange }: SidebarPropertiesProps) {
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false)

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
      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={issue.status} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Backlog">Backlog</SelectItem>
            <SelectItem value="Todo">Todo</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Priority */}
      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Badge className={`${getPriorityColor(issue.priority)} border w-full justify-center py-2`}>
          {issue.priority}
        </Badge>
      </div>

      {/* Assignee */}
      <div className="space-y-2">
        <Label>Assignee</Label>
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
          <Avatar className="h-8 w-8">
            <AvatarImage src={issue.assignee.avatar} alt={issue.assignee.name} />
            <AvatarFallback>
              {issue.assignee.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">{issue.assignee.name}</div>
            <div className="text-sm text-muted-foreground">ID: {issue.assignee.id}</div>
          </div>
        </div>
      </div>

      {/* Labels */}
      {issue.labels && issue.labels.length > 0 && (
        <div className="space-y-2">
          <Label>Labels</Label>
          <div className="flex flex-wrap gap-2">
            {issue.labels.map((label) => (
              <Badge key={label} variant="outline" className="text-xs">
                {label}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Project */}
      <div className="space-y-2">
        <Label>Project</Label>
        <div className="p-3 bg-muted/50 rounded-lg border">
          <a 
            href={`/projects/${issue.project.id}`}
            className="text-primary hover:underline font-medium block"
          >
            {issue.project.name}
          </a>
        </div>
      </div>
    </div>
  )
}
