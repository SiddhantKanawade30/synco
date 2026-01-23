"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Sparkles, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { TeamMember as OriginalTeamMember, teamMembers } from "@/lib/team-data"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Check } from "lucide-react"

interface CreateIssueFormProps {
  onSubmit: (issue: {
    title: string
    description: string
    assignee: OriginalTeamMember
    deadline: Date
    priority: "LOW" | "MEDIUM" | "HIGH"
    project?: string
  }) => void
  trigger?: React.ReactNode
  showProjectSelection?: boolean
  assignees?: Array<{
    id: string
    user: {
      id: string
      name: string
      email: string
    }
  }>
  projectId?: string // Add projectId for AI assistant
}

interface TeamMember {
  id: string
  user: {
    name: string
    email: string
  }
}

export function CreateIssueForm({ onSubmit, trigger, showProjectSelection = false, assignees = [], projectId }: CreateIssueFormProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignee, setAssignee] = useState<OriginalTeamMember | null>(null)
  const [deadline, setDeadline] = useState<Date>()
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState("project-1")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // AI Assistant states
  const [aiText, setAiText] = useState("")
  const [isAILoading, setIsAILoading] = useState(false)
  const [showAIDialog, setShowAIDialog] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isSubmitting) return
    
    try {
      console.log("Submit clicked - form data:", { title, description, assignee, deadline, priority })
      
      if (!title || !description || !assignee || !deadline) {
        console.log("Validation failed - missing fields")
        return
      }

      setIsSubmitting(true)

      console.log("Calling onSubmit with:", {
        title,
        description,
        assignee,
        deadline,
        priority,
        ...(showProjectSelection && { project: selectedProject })
      })

      await onSubmit({
        title,
        description,
        assignee,
        deadline,
        priority,
        ...(showProjectSelection && { project: selectedProject })
      })

      // Reset form
      setTitle("")
      setDescription("")
      setAssignee(null)
      setDeadline(undefined)
      setPriority("MEDIUM")
      setOpen(false)
    } catch (error) {
      console.error("Error creating issue:", error)
      // Don't close the dialog on error so user can try again
    } finally {
      setIsSubmitting(false)
    }
  }

  // AI Assistant function
  const handleAISuggest = async () => {
    if (!aiText.trim() || !projectId) {
      console.error("AI text or projectId is missing")
      return
    }

    setIsAILoading(true)
    
    try {
      const authToken = localStorage.getItem("authToken")
      if (!authToken) {
        console.error("No auth token found")
        return
      }

      const res = await fetch("/api/ai/issue-assistant", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`
        },
        body: JSON.stringify({
          text: aiText,
          projectId,
        }),
      })

      if (!res.ok) {
        throw new Error(`AI request failed: ${res.status}`)
      }

      const data = await res.json()
      console.log("AI Response:", data)

      // Auto-fill form state
      setTitle(data.title || "")
      setDescription(data.description || "")
      setPriority(data.priority || "MEDIUM")
      setDeadline(new Date(data.suggestedDeadline) || new Date())
      
      // Close AI dialog and open main form
      setShowAIDialog(false)
      setOpen(true)
      setAiText("") // Clear AI input
      
    } catch (error) {
      console.error("AI Assistant Error:", error)
      // You could show a toast notification here
    } finally {
      setIsAILoading(false)
    }
  }

  // Convert assignees to OriginalTeamMember format
  const displayMembers = assignees.length > 0 ? assignees.map((member: any) => ({
    id: member.user?.id ?? member.id,
    name: member.user?.name || 'Unknown',
    email: member.user?.email || 'unknown@example.com',
    avatar: member.user?.image || "",
    role: "Member"
  })) : teamMembers

  const filteredTeamMembers = searchTerm && searchTerm.trim() !== ""
    ? displayMembers.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase().trim())
      )
    : displayMembers

  return (
    <>
      <div className="flex gap-2 mb-4">
        {/* Main Create Issue Button */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {trigger || (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Issue
              </Button>
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Issue</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter issue title"
                  required
                />
              </div>

              {showProjectSelection && (
                <div className="space-y-2">
                  <Label htmlFor="project">Project</Label>
                  <select
                    id="project"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-neutral-600 bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  >
                    <option value="project-1">Project Alpha</option>
                    <option value="project-2">Project Beta</option>
                    <option value="project-3">Project Gamma</option>
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter issue description"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Assignee</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !assignee && "text-muted-foreground"
                      )}
                    >
                      {assignee ? assignee.name : "Select team member..."}
                      <CalendarIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 z-50" align="start">
                    <Command>
                      <CommandInput 
                        placeholder="Search team members..." 
                        onValueChange={setSearchTerm}
                        className="text-foreground"
                      />
                      <CommandEmpty className="text-muted-foreground">No team member found.</CommandEmpty>
                      <CommandGroup>
                        {filteredTeamMembers.map((member) => (
                          <CommandItem
                            key={member.id}
                            value={member.id}
                            style={{
                              cursor: 'pointer',
                              backgroundColor: 'transparent',
                              color: 'hsl(var(--foreground))',
                              pointerEvents: 'auto'
                            }}
                            className="rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                            onSelect={() => {
                              console.log("CommandItem clicked - member:", member)
                              setAssignee(member)
                              setSearchTerm("")
                            }}
                            onClick={() => {
                              console.log("onClick - member:", member)
                              setAssignee(member)
                              setSearchTerm("")
                            }}
                            onMouseDown={() => {
                              console.log("Mouse down on member:", member)
                            }}
                          >
                            <div className="flex items-center gap-2">
                              {member.avatar ? (
                                <img 
                                  src={member.avatar} 
                                  alt={member.name}
                                  className="h-6 w-6 rounded-full"
                                />
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-sm font-medium">
                                    {member.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              )}
                              <div>
                                <div className="font-medium">{member.name}</div>
                                <div className="text-sm text-muted-foreground">{member.email}</div>
                              </div>
                            </div>
                            {assignee?.id === member.id && (
                              <Check className="ml-auto h-4 w-4" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")}
                  className="flex h-9 w-full rounded-md border border-neutral-600 bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline ? format(deadline, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={setDeadline}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!title || !description || !assignee || !deadline || isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Issue"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* AI Assistant Button */}
        <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Sparkles className="h-4 w-4 mr-2" />
              Smart Create
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>AI Issue Assistant</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-text">Describe your issue</Label>
                <Textarea
                  id="ai-text"
                  value={aiText}
                  onChange={(e) => setAiText(e.target.value)}
                  placeholder="Describe the issue you want to create in natural language..."
                  rows={4}
                  className="min-h-[100px]"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                The AI will automatically generate a title, description, priority, and suggested deadline based on your description.
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAIDialog(false)}
                  disabled={isAILoading}
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  onClick={handleAISuggest}
                  disabled={!aiText.trim() || isAILoading}
                >
                  {isAILoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Issue
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
