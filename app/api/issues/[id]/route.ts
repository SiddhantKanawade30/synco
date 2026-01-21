import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"
import { getUserFromRequest } from "@/src/lib/auth"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const auth = getUserFromRequest(request)
    if (!auth?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const issue = await prisma.issue.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        projectId: true,
        creatorId: true,
        assigneeId: true,
        createdAt: true,
        project: {
          select: {
            id: true,
            name: true,
            ownerId: true,
            members: { select: { userId: true } },
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!issue) {
      return NextResponse.json({ error: `Issue ${id} not found` }, { status: 404 })
    }

    const canAccess =
      issue.project.ownerId === auth.userId ||
      issue.project.members.some((m: { userId: string }) => m.userId === auth.userId)

    if (!canAccess) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const activities = await prisma.activity.findMany({
      where: { issueId: issue.id },
      orderBy: { createdAt: "asc" },
      include: {
        user: { select: { name: true } },
      },
    })

    const toUiStatus = (value: string) => {
      switch (value) {
        case "BACKLOG":
          return "Backlog"
        case "OPEN":
          return "Todo"
        case "IN_PROGRESS":
          return "In Progress"
        case "DONE":
          return "Done"
        case "REJECTED":
          return "Closed"
        default:
          return "Todo"
      }
    }

    const toUiPriority = (value: string) => {
      switch (value) {
        case "HIGH":
          return "High"
        case "MEDIUM":
          return "Medium"
        case "LOW":
          return "Low"
        default:
          return "Low"
      }
    }

    // Ensure there's always at least one "created" event for UI (used in IssueHeader)
    const createdActivity = {
      id: `created-${issue.id}`,
      type: "created" as const,
      text: "Issue created",
      author: issue.creator?.name ?? "Unknown",
      timestamp: issue.createdAt.toISOString(),
    }

    const mappedActivities = activities.map((a: any) => ({
      id: a.id,
      type: (a.type as any) ?? "comment",
      text: a.content ?? "",
      author: a.user?.name ?? "Unknown",
      timestamp: a.createdAt.toISOString(),
    }))

    return NextResponse.json({
      id: issue.id,
      title: issue.title,
      description: issue.description ?? "",
      status: toUiStatus(issue.status),
      priority: toUiPriority(issue.priority),
      assignee: {
        id: issue.assignee?.id ?? "",
        name: issue.assignee?.name ?? "Unassigned",
        avatar: issue.assignee?.image ?? undefined,
      },
      project: {
        id: issue.project.id,
        name: issue.project.name,
      },
      labels: [],
      subIssues: [],
      activity: [createdActivity, ...mappedActivities],
    })
  } catch (error) {
    console.error("Issue API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch issue" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    // TODO: Implement issue update logic
    return NextResponse.json({ success: true, message: `Issue ${id} updated` })
  } catch (error) {
    console.error('Issue PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update issue' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    // TODO: Implement issue deletion logic
    return NextResponse.json({ success: true, message: `Issue ${id} deleted` })
  } catch (error) {
    console.error('Issue DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to delete issue' },
      { status: 500 }
    )
  }
}