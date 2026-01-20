"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Users, CheckCircle, Clock, Plus, UserPlus } from "lucide-react"
import { format } from "date-fns"
import { TeamMember, teamMembers } from "@/lib/team-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectOverviewProps {
  projectId: string
  projectName: string
}

export function ProjectOverview({ projectId, projectName }: ProjectOverviewProps) {
  const [projectTeam, setProjectTeam] = useState<TeamMember[]>([
    teamMembers[0], // Siddhant as project lead
    teamMembers[1], // John Doe
    teamMembers[2], // Jane Smith
  ])
  const [openAddMember, setOpenAddMember] = useState(false)
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [pendingMemberEmails, setPendingMemberEmails] = useState<string[]>([])
  const [isSavingMembers, setIsSavingMembers] = useState(false)

  // Mock project data
  const projectData = useMemo(() => ({
    deadline: new Date("2026-03-15"),
    totalIssues: 24,
    solvedIssues: 18,
    lead: teamMembers[0], // Siddhant Kanawade
    status: "In Progress",
    priority: "High"
  }), [])

  const completionRate = useMemo(() => 
    Math.round((projectData.solvedIssues / projectData.totalIssues) * 100),
    [projectData.solvedIssues, projectData.totalIssues]
  )

  const handleAddEmailToList = () => {
    const email = newMemberEmail.trim()
    if (!email) return

    const alreadyInPending = pendingMemberEmails.includes(email)
    const alreadyInTeam = projectTeam.some(member => member.email === email)

    if (alreadyInPending || alreadyInTeam) {
      setNewMemberEmail("")
      return
    }

    setPendingMemberEmails(prev => [...prev, email])
    setNewMemberEmail("")
  }

  const handleSaveMembers = async () => {
    if (!pendingMemberEmails.length) return

    try {
      setIsSavingMembers(true)

      const authToken = localStorage.getItem("authToken")
      if (!authToken) {
        console.error("No auth token found")
        setIsSavingMembers(false)
        return
      }
      const authorizationHeader = authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`

      // Call backend to add each member
      const responses = await Promise.all(
        pendingMemberEmails.map(email =>
          fetch(`/api/projects/${projectId}/members`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": authorizationHeader,
            },
            body: JSON.stringify({ email, role: "MEMBER" }),
          }),
        ),
      )

      const failed = responses.filter(r => !r.ok)
      if (failed.length > 0) {
        const firstErrorText = await failed[0].text().catch(() => "Unknown error")
        console.error("Failed to add some members:", firstErrorText)
        return
      }

      // Optimistically update local team list for UI
      const newMembers: TeamMember[] = pendingMemberEmails.map(email => ({
        id: `new-${email}-${Date.now()}`,
        name: email.split("@")[0],
        email,
        avatar: `https://ui-avatars.com/api/?name=${email.split("@")[0]}&background=random`,
        role: "Team Member",
      }))

      setProjectTeam(prev => [...prev, ...newMembers])
      setPendingMemberEmails([])
      setNewMemberEmail("")
      setOpenAddMember(false)
    } catch (error) {
      console.error("Failed to add members", error)
    } finally {
      setIsSavingMembers(false)
    }
  }

  
  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{projectName}</h1>
          <p className="text-muted-foreground">Project Management Dashboard</p>
        </div>
        <Badge variant={projectData.status === "In Progress" ? "default" : "secondary"}>
          {projectData.status}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectData.totalIssues}</div>
            <p className="text-xs text-muted-foreground">
              {projectData.totalIssues - projectData.solvedIssues} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solved Issues</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{projectData.solvedIssues}</div>
            <p className="text-xs text-muted-foreground">
              {completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deadline</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{format(projectData.deadline, "MMM dd")}</div>
            <p className="text-xs text-muted-foreground">
              {format(projectData.deadline, "yyyy")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectTeam.length}</div>
            <p className="text-xs text-muted-foreground">
              Active members
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Project Lead & Team */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Lead */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Project Lead
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={projectData.lead.avatar} alt={projectData.lead.name} />
                <AvatarFallback>{projectData.lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{projectData.lead.name}</div>
                <div className="text-sm text-muted-foreground">{projectData.lead.email}</div>
                <Badge variant="outline" className="mt-1">{projectData.lead.role}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members
            </CardTitle>
            <Dialog open={openAddMember} onOpenChange={setOpenAddMember}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Team Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex gap-2">
                      <Input
                        id="email"
                        type="email"
                        value={newMemberEmail}
                        onChange={(e) => setNewMemberEmail(e.target.value)}
                        placeholder="Enter team member email"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddEmailToList()
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddEmailToList}
                        disabled={!newMemberEmail.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  {pendingMemberEmails.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Members to be added:</p>
                      <div className="flex flex-wrap gap-2">
                        {pendingMemberEmails.map(email => (
                          <Badge key={email} variant="secondary" className="text-xs">
                            {email}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setOpenAddMember(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveMembers}
                      disabled={!pendingMemberEmails.length || isSavingMembers}
                    >
                      {isSavingMembers ? "Adding..." : "Add Members"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projectTeam.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                  {member.id === projectData.lead.id && (
                    <Badge variant="secondary" className="text-xs">Lead</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      
    </div>
  )
}
