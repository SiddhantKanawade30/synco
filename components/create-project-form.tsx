"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { TeamMember, teamMembers } from "@/lib/team-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface CreateProjectFormProps {
  onSubmit: (project: {
    name: string
    description: string
    deadline: Date
    lead: TeamMember
    members: TeamMember[]
  }) => void
  trigger?: React.ReactNode
  currentUser?: TeamMember
}

export function CreateProjectForm({ onSubmit, trigger, currentUser }: CreateProjectFormProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState<Date>()
  const [lead, setLead] = useState<TeamMember>(currentUser || teamMembers[0])
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !description || !deadline || !lead) return

    onSubmit({
      name,
      description,
      deadline,
      lead,
      members: selectedMembers
    })

    // Reset form
    setName("")
    setDescription("")
    setDeadline(undefined)
    setLead(currentUser || teamMembers[0])
    setSelectedMembers([])
    setSearchTerm("")
    setOpen(false)
  }

  const handleAddMember = (member: TeamMember) => {
    if (!selectedMembers.find(m => m.id === member.id) && member.id !== lead.id) {
      setSelectedMembers([...selectedMembers, member])
    }
    setSearchTerm("")
  }

  const handleRemoveMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter(m => m.id !== memberId))
  }

  const availableTeamMembers = teamMembers.filter(
    member => !selectedMembers.find(m => m.id === member.id) && member.id !== lead.id
  )

  const filteredAvailableMembers = searchTerm
    ? availableTeamMembers.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : availableTeamMembers

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
              className="border-neutral-400"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
                rows={3}
                required
                className="border-neutral-400"
              />
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
                    {deadline ? format(deadline, "PPP") : "Pick a deadline"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={setDeadline}
                    className="rounded-md border shadow-sm"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Project Lead</Label>
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={lead.avatar} alt={lead.name} />
                  <AvatarFallback>{lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{lead.name}</div>
                  <div className="text-sm text-muted-foreground">{lead.email}</div>
                </div>
                
              </div>
              <p className="text-xs text-muted-foreground">
                The project creator automatically becomes the project lead
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Team Members</Label>
            
            {/* Add Member Search */}
            <div className="space-y-2">
              <Input
                className="border-neutral-400"
                placeholder="Search and add team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              {searchTerm && filteredAvailableMembers.length > 0 && (
                <div className="border rounded-lg max-h-40 overflow-y-auto">
                  {filteredAvailableMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
                      onClick={() => handleAddMember(member)}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Members */}
            {selectedMembers.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Selected Members ({selectedMembers.length})</Label>
                <div className="space-y-2">
                  {selectedMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name || !description || !deadline || !lead}>
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
