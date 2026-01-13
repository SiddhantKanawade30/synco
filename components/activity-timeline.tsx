"use client"

import { Activity } from "@/lib/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ActivityTimelineProps {
  activities: Activity[]
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'created':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>
        )
      case 'comment':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        )
      case 'status':
        return (
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        )
      case 'assigned':
        return (
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        )
      case 'closed':
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        )
      default:
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
          </div>
        )
    }
  }

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'created':
        return `${activity.author} created this issue`
      case 'comment':
        return `${activity.author} commented`
      case 'status':
        return `${activity.author} changed status: ${activity.text}`
      case 'assigned':
        return `${activity.author} assigned this to ${activity.text}`
      case 'closed':
        return `${activity.author} closed this issue`
      default:
        return activity.text
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-4">
            {/* Timeline line */}
            {index < activities.length - 1 && (
              <div className="w-px bg-border relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2"></div>
              </div>
            )}
            
            {/* Activity content */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {getActivityText(activity)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatTimestamp(activity.timestamp)}
                  </div>
                </div>
              </div>
              
              {/* Activity details */}
              {activity.type === 'comment' && (
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <p className="text-sm">{activity.text}</p>
                </div>
              )}
              
              {activity.type === 'status' && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {activity.text}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
