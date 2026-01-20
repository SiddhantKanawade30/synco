"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, X, Mail, Users } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface CreateProjectFormProps {
  onSubmit: (project: {
    name: string
    deadline: Date
    members: string[]
  }) => void
  trigger?: React.ReactNode
  isLoading?: boolean
}

export function CreateProjectForm({ onSubmit, trigger, isLoading }: CreateProjectFormProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [deadline, setDeadline] = useState<Date>()
  const [memberEmail, setMemberEmail] = useState("")
  const [members, setMembers] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !deadline) return

    await onSubmit({
      name,
      deadline,
      members
    })

    // Reset form
    setName("")
    setDeadline(undefined)
    setMemberEmail("")
    setMembers([])
    setOpen(false)
  }

  const handleAddMember = () => {
    if (memberEmail.trim() && !members.includes(memberEmail.trim())) {
      setMembers([...members, memberEmail.trim()])
      setMemberEmail("")
    }
  }

  const handleRemoveMember = (email: string) => {
    setMembers(members.filter(m => m !== email))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddMember()
    }
  }

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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name"
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

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <Label className="text-base font-medium">Team Members</Label>
                <span className="text-sm text-muted-foreground">({members.length} added)</span>
              </div>
              
              {/* Add Member Input */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter member email address"
                      value={memberEmail}
                      onChange={(e) => setMemberEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-10 border-neutral-400"
                    />
                  </div>
                  <Button 
                    type="button" 
                    onClick={handleAddMember}
                    disabled={!memberEmail.trim() || members.includes(memberEmail.trim())}
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              {/* Members Grid */}
              {members.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm text-muted-foreground">Added Members:</Label>
                  <div className="space-y-2">
                    {members.map((email, index) => (
                      <div key={email} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                            <Mail className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">Member {index + 1}</div>
                            <div className="text-sm text-muted-foreground">{email}</div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMember(email)}
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {members.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <div className="text-muted-foreground">
                    <div className="font-medium mb-1">No team members yet</div>
                    <div className="text-sm">Add team members by entering their email addresses above</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name || !deadline || isLoading}>
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
