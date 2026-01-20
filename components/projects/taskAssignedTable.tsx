"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Timer, HelpCircle, Circle, XCircle, CheckCircle, ArrowUp, ArrowDown, ArrowRight, Bug, AlertCircle, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { issuesData, type Issue } from "../issues-data"

const data: Payment[] = [
  {
    id: "m5gr84i9",
        title: "Design new landing page",
    status: "done",
    priority: "high",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
        title: "Implement user authentication",
    status: "in-progress",
    priority: "medium",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
        title: "Fix responsive design issues",
    status: "backlog",
    priority: "low",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
        title: "Add payment integration",
    status: "todo",
    priority: "high",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
        title: "Update documentation",
    status: "canceled",
    priority: "medium",
    email: "carmella@example.com",
  },
  {
    id: "f8j2k3l9",
        title: "Optimize database queries",
    status: "in-progress",
    priority: "high",
    email: "john.doe@example.com",
  },
  {
    id: "a2b4c6d8",
    title: "Create API documentation",
    status: "todo",
    priority: "medium",
    email: "jane.smith@example.com",
  },
  {
    id: "e7f9g1h3",
    title: "Implement caching strategy",
    status: "backlog",
    priority: "low",
    email: "mike.johnson@example.com",
  },
  {
    id: "k5l8m2n4",
    title: "Add unit tests",
    status: "in-progress",
    priority: "high",
    email: "sarah.wilson@example.com",
  },
  {
    id: "p1q3r5s7",
    title: "Refactor legacy code",
    status: "todo",
    priority: "medium",
    email: "david.brown@example.com",
  },
  {
    id: "t6u8v0w2",
    title: "Implement dark mode",
    status: "done",
    priority: "low",
    email: "emily.davis@example.com",
  },
  {
    id: "x4y6z8a0",
    title: "Add search functionality",
    status: "in-progress",
    priority: "high",
    email: "chris.miller@example.com",
  },
  {
    id: "b2c4d6e8",
    title: "Improve accessibility",
    status: "todo",
    priority: "medium",
    email: "lisa.anderson@example.com",
  },
  {
    id: "f0h2j4k6",
    title: "Setup CI/CD pipeline",
    status: "backlog",
    priority: "high",
    email: "robert.taylor@example.com",
  },
  {
    id: "m8n0p2q4",
    title: "Add error logging",
    status: "in-progress",
    priority: "medium",
    email: "patricia.moore@example.com",
  },
  {
    id: "r6s8t0u2",
    title: "Implement rate limiting",
    status: "todo",
    priority: "high",
    email: "james.jackson@example.com",
  },
  {
    id: "v4w6x8y0",
    title: "Create user dashboard",
    status: "done",
    priority: "medium",
    email: "mary.white@example.com",
  },
  {
    id: "z2a4c6e8",
    title: "Add email notifications",
    status: "in-progress",
    priority: "low",
    email: "william.harris@example.com",
  },
  {
    id: "g0h2j4k6",
    title: "Implement data backup",
    status: "backlog",
    priority: "high",
    email: "linda.martin@example.com",
  },
  {
    id: "j8l0n2p4",
    title: "Add social media integration",
    status: "todo",
    priority: "low",
    email: "thompson.k@example.com",
  },
  {
    id: "q6s8t0u2",
    title: "Improve page load speed",
    status: "in-progress",
    priority: "high",
    email: "jennifer.garcia@example.com",
  },
  {
    id: "w4x6y8z0",
    title: "Add multi-language support",
    status: "backlog",
    priority: "medium",
    email: "michael.rodriguez@example.com",
  },
  {
    id: "a2b4c6d8",
    title: "Implement real-time updates",
    status: "todo",
    priority: "high",
    email: "susan.martinez@example.com",
  },
  {
    id: "e0f2h4j6",
    title: "Create admin panel",
    status: "done",
    priority: "medium",
    email: "joseph.hernandez@example.com",
  },
  {
    id: "i8k0l2n4",
    title: "Add file upload feature",
    status: "in-progress",
    priority: "low",
    email: "nancy.lopez@example.com",
  },
  {
    id: "o6p8r0t2",
    title: "Implement user roles",
    status: "todo",
    priority: "high",
    email: "david.gonzalez@example.com",
  },
  {
    id: "s4u6w8x0",
    title: "Add analytics tracking",
    status: "backlog",
    priority: "medium",
    email: "karen.wilson@example.com",
  },
  {
    id: "y2a4c6e8",
    title: "Improve mobile responsiveness",
    status: "in-progress",
    priority: "high",
    email: "steven.anderson@example.com",
  },
  {
    id: "b0d2f4h6",
    title: "Add chat functionality",
    status: "todo",
    priority: "low",
    email: "helen.thomas@example.com",
  },
  {
    id: "f8j0k2l4",
    title: "Implement data export",
    status: "done",
    priority: "medium",
    email: "paul.jackson@example.com",
  },
  {
    id: "n6p8r0t2",
    title: "Add user profiles",
    status: "in-progress",
    priority: "high",
    email: "mark.white@example.com",
  },
  {
    id: "r4t6v8x0",
    title: "Create email templates",
    status: "backlog",
    priority: "low",
    email: "sandra.harris@example.com",
  },
  {
    id: "v2x4z6b8",
    title: "Add calendar integration",
    status: "todo",
    priority: "medium",
    email: "donald.martin@example.com",
  },
  {
    id: "z0b2d4f6",
    title: "Implement search filters",
    status: "in-progress",
    priority: "high",
    email: "amy.thompson@example.com",
  },
  {
    id: "c8e0g2i4",
    title: "Add payment gateway",
    status: "done",
    priority: "medium",
    email: "kevin.garcia@example.com",
  },
  {
    id: "g6i8k0m2",
    title: "Create mobile app",
    status: "backlog",
    priority: "high",
    email: "michelle.martinez@example.com",
  },
  {
    id: "k4m6o8q0",
    title: "Add video streaming",
    status: "todo",
    priority: "low",
    email: "brian.rodriguez@example.com",
  },
  {
    id: "o2q4s6u8",
    title: "Implement AI features",
    status: "in-progress",
    priority: "high",
    email: "deborah.hernandez@example.com",
  },
  {
    id: "s0w2y4a6",
    title: "Add blockchain integration",
    status: "backlog",
    priority: "medium",
    email: "ronald.lopez@example.com",
  },
  {
    id: "w8x0z2b4",
    title: "Create recommendation engine",
    status: "todo",
    priority: "low",
    email: "laura.gonzalez@example.com",
  },
  {
    id: "a6c8e0g2",
    title: "Add voice commands",
    status: "in-progress",
    priority: "high",
    email: "jason.wilson@example.com",
  },
  {
    id: "e4g6i8k0",
    title: "Implement AR features",
    status: "done",
    priority: "medium",
    email: "cynthia.anderson@example.com",
  },
  {
    id: "i2k4m6o8",
    title: "Add VR support",
    status: "backlog",
    priority: "low",
    email: "justin.thomas@example.com",
  },
  {
    id: "m0o2q4s6",
    title: "Create IoT integration",
    status: "todo",
    priority: "high",
    email: "amy.jackson@example.com",
  },
  {
    id: "q8s0u2w4",
    title: "Add machine learning",
    status: "in-progress",
    priority: "medium",
    email: "ryan.white@example.com",
  },
  {
    id: "u6w8y0a2",
    title: "Implement quantum computing",
    status: "backlog",
    priority: "low",
    email: "ashley.harris@example.com",
  },
  {
    id: "y4a6c8e0",
    title: "Add 5G connectivity",
    status: "todo",
    priority: "high",
    email: "brandon.martin@example.com",
  },
  {
    id: "b2d4f6h8",
    title: "Create edge computing",
    status: "done",
    priority: "medium",
    email: "maria.thompson@example.com",
  },
  {
    id: "f0h2j4l6",
    title: "Add cybersecurity features",
    status: "in-progress",
    priority: "high",
    email: "patrick.garcia@example.com",
  },
  {
    id: "j8l0n2p4",
    title: "Implement cloud storage",
    status: "backlog",
    priority: "low",
    email: "nicole.martinez@example.com",
  },
  {
    id: "n6p8r0t2",
    title: "Add serverless architecture",
    status: "todo",
    priority: "medium",
    email: "jeremy.rodriguez@example.com",
  },
  {
    id: "r4t6v8x0",
    title: "Create microservices",
    status: "in-progress",
    priority: "high",
    email: "heather.hernandez@example.com",
  },
  {
    id: "v2x4z6b8",
    title: "Add container orchestration",
    status: "done",
    priority: "medium",
    email: "sean.lopez@example.com",
  },
  {
    id: "z0b2d4f6",
    title: "Implement DevOps pipeline",
    status: "backlog",
    priority: "low",
    email: "tiffany.gonzalez@example.com",
  },
  {
    id: "d4f6h8j0",
    title: "Add infrastructure as code",
    status: "todo",
    priority: "high",
    email: "christopher.wilson@example.com",
  },
  {
    id: "h8j0l2n4",
    title: "Create monitoring system",
    status: "in-progress",
    priority: "medium",
    email: "samantha.anderson@example.com",
  },
  {
    id: "l6n8p0r2",
    title: "Add alerting system",
    status: "backlog",
    priority: "low",
    email: "matthew.thomas@example.com",
  },
  {
    id: "p4r6t8v0",
    title: "Implement log aggregation",
    status: "todo",
    priority: "high",
    email: "katherine.jackson@example.com",
  },
]

export type Payment = {
  id: string
  title: string
  status: "todo" | "in-progress" | "backlog" | "done" | "canceled" | "open" | "resolved" | "closed"
  priority: "low" | "medium" | "high"
  email: string
  projectName?: string
  deadline?: string
}

export type UnifiedIssue = Issue & { deadline?: string }

export type UnifiedData = Payment | UnifiedIssue

const getApiIssueStatus = (uiStatus: Issue["status"]) => {
  switch (uiStatus) {
    case "open":
      return "OPEN"
    case "in-progress":
      return "IN_PROGRESS"
    case "resolved":
      return "DONE"
    case "closed":
      return "REJECTED"
    default:
      return "OPEN"
  }
}

export const columns: ColumnDef<UnifiedData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-2 border-gray-300"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-2 border-gray-300"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const id = row.original.id
      const title = row.getValue("title") as string
      return (
        <a 
          href={`/issues/${id}`}
          className="font-medium text-primary hover:underline cursor-pointer"
        >
          {title}
        </a>
      )
    },
  },
  {
    accessorKey: "projectName",
    header: "Project",
    cell: ({ row }) => {
      const projectName = row.getValue("projectName") as string
      return projectName ? (
        <div className="font-medium">{projectName}</div>
      ) : (
        <div className="text-muted-foreground">-</div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => {
      const deadline = row.getValue("deadline") as string | undefined
      if (!deadline) return <div className="text-muted-foreground">-</div>
      const date = new Date(deadline)
      return (
        <div className="text-sm">
          {date.toLocaleDateString()}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const getStatusIcon = (status: string) => {
        switch (status) {
          case "in-progress":
            return <Timer className="h-4 w-4 text-blue-600" />
          case "backlog":
            return <HelpCircle className="h-4 w-4 text-gray-600" />
          case "todo":
            return <Circle className="h-4 w-4 text-gray-400" />
          case "canceled":
            return <XCircle className="h-4 w-4 text-red-600" />
          case "done":
            return <CheckCircle className="h-4 w-4 text-green-600" />
          case "open":
            return <Bug className="h-4 w-4 text-red-600" />
          case "resolved":
            return <CheckCircle className="h-4 w-4 text-green-600" />
          case "closed":
            return <AlertCircle className="h-4 w-4 text-gray-600" />
          default:
            return <Circle className="h-4 w-4 text-gray-400" />
        }
      }
      
      return (
        <div className="flex items-center gap-2 capitalize">
          {getStatusIcon(status)}
          <span>{status.replace("-", " ")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string
      const getPriorityDisplay = (priority: string) => {
        switch (priority) {
          case "high":
            return (
              <div className="flex items-center gap-1 text-red-600 font-medium">
                <ArrowUp className="h-4 w-4" />
                <span className="capitalize">{priority}</span>
              </div>
            )
          case "medium":
            return (
              <div className="flex items-center gap-1 text-yellow-600 font-medium">
                <ArrowRight className="h-4 w-4" />
                <span className="capitalize">{priority}</span>
              </div>
            )
          case "low":
            return (
              <div className="flex items-center gap-1 text-green-600 font-medium">
                <ArrowDown className="h-4 w-4" />
                <span className="capitalize">{priority}</span>
              </div>
            )
          default:
            return <div className="capitalize font-medium">{priority}</div>
        }
      }
      
      return getPriorityDisplay(priority)
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original
      const [isOpen, setIsOpen] = React.useState(false)

      const handleAction = (action: () => void) => {
        try {
          action()
          setIsOpen(false)
        } catch (error) {
          console.error("Action failed:", error)
        }
      }

      return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-50">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => handleAction(() => {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(task.id)
                }
              })}
            >
              Copy task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
            {"projectId" in task ? (
              <>
                <DropdownMenuItem onClick={() => handleAction(() => console.log("Issue status: open"))}>
                  <Circle className="h-4 w-4 mr-2 text-gray-400" />
                  Open
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction(() => console.log("Issue status: in-progress"))}>
                  <Timer className="h-4 w-4 mr-2 text-blue-600" />
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction(() => console.log("Issue status: resolved"))}>
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Resolved
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction(() => console.log("Issue status: closed"))}>
                  <XCircle className="h-4 w-4 mr-2 text-red-600" />
                  Closed
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={() => handleAction(() => console.log("Status changed to todo"))}>
                  <Circle className="h-4 w-4 mr-2 text-gray-400" />
                  Todo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction(() => console.log("Status changed to in-progress"))}>
                  <Timer className="h-4 w-4 mr-2 text-blue-600" />
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction(() => console.log("Status changed to backlog"))}>
                  <HelpCircle className="h-4 w-4 mr-2 text-gray-600" />
                  Backlog
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction(() => console.log("Status changed to done"))}>
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Done
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction(() => console.log("Status changed to canceled"))}>
                  <XCircle className="h-4 w-4 mr-2 text-red-600" />
                  Canceled
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo({
  filterType = "assigned",
  dataSource = "tasks",
  showProjectColumn = false,
  data: externalData,
  projectId,
  onIssueUpdated,
}: {
  filterType?: string
  dataSource?: string
  showProjectColumn?: boolean
  data?: UnifiedData[]
  projectId?: string
  onIssueUpdated?: (issueId: string, newStatus: string) => void
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [statusFilter, setStatusFilter] = React.useState<string>("")
  const [priorityFilter, setPriorityFilter] = React.useState<string>("")

  React.useEffect(() => {
    setColumnFilters((prev) => {
      const next = prev.filter((f) => f.id !== "status")
      if (statusFilter) next.push({ id: "status", value: statusFilter })
      return next
    })
  }, [statusFilter])

  React.useEffect(() => {
    setColumnFilters((prev) => {
      const next = prev.filter((f) => f.id !== "priority")
      if (priorityFilter) next.push({ id: "priority", value: priorityFilter })
      return next
    })
  }, [priorityFilter])

  // Filter data based on filterType and dataSource
  const filteredData = React.useMemo(() => {
    const sourceData = externalData ?? (dataSource === "issues" ? issuesData : data)
    
    if (dataSource === "issues") {
      switch (filterType) {
        case "assigned":
          return (sourceData as Issue[]).filter(issue => issue.status === "open" || issue.status === "in-progress")
        case "created":
          return (sourceData as Issue[]).filter(issue => issue.status === "open")
        case "completed":
          return (sourceData as Issue[]).filter(issue => issue.status === "resolved" || issue.status === "closed")
        default:
          return sourceData
      }
    } else {
      switch (filterType) {
        case "assigned":
          return (sourceData as Payment[]).filter(task => task.status === "in-progress" || task.status === "todo")
        case "created":
          return (sourceData as Payment[]).filter(task => task.status === "backlog")
        case "completed":
          return (sourceData as Payment[]).filter(task => task.status === "done")
        default:
          return sourceData
      }
    }
  }, [externalData, dataSource, filterType])

  // Create dynamic columns based on showProjectColumn prop
  const dynamicColumns = React.useMemo(() => {
    const baseColumns = [...columns]
    
    if (!showProjectColumn) {
      // Remove project column if showProjectColumn is false
      return baseColumns.filter(col => col.id !== "projectName")
    }
    
    return baseColumns
  }, [showProjectColumn])

  const columnsWithActions = React.useMemo(() => {
    if (dataSource !== "issues" || !projectId) return dynamicColumns

    return dynamicColumns.map((col) => {
      if (col.id !== "actions") return col

      return {
        ...col,
        cell: ({ row }: any) => {
          const issue = row.original as Issue
          const [isOpen, setIsOpen] = React.useState(false)

          const changeIssueStatus = async (next: Issue["status"]) => {
            const authToken = localStorage.getItem("authToken")
            if (!authToken) {
              console.error("No auth token found")
              return
            }
            const authorizationHeader = authToken.startsWith("Bearer ") ? authToken : `Bearer ${authToken}`

            const res = await fetch(`/api/projects/${projectId}/issues/${issue.id}/status`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Authorization": authorizationHeader,
              },
              body: JSON.stringify({ status: getApiIssueStatus(next) }),
            })

            if (!res.ok) {
              const text = await res.text().catch(() => "Unknown error")
              console.error("Failed to update issue status:", text)
              return
            }

            const updated = await res.json().catch(() => null)
            onIssueUpdated?.(issue.id, updated?.status ?? getApiIssueStatus(next))
          }

          return (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-50">
                <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={async () => {
                    await changeIssueStatus("open")
                    setIsOpen(false)
                  }}
                >
                  <Circle className="h-4 w-4 mr-2 text-gray-400" />
                  Open
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await changeIssueStatus("in-progress")
                    setIsOpen(false)
                  }}
                >
                  <Timer className="h-4 w-4 mr-2 text-blue-600" />
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await changeIssueStatus("resolved")
                    setIsOpen(false)
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Resolved
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await changeIssueStatus("closed")
                    setIsOpen(false)
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2 text-red-600" />
                  Closed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      } as any
    })
  }, [dataSource, dynamicColumns, onIssueUpdated, projectId])

  const table = useReactTable({
    data: filteredData,
    columns: columnsWithActions,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filter by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm shadow-sm border border-gray-200 focus:shadow-md transition-shadow"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Status {statusFilter && `(${statusFilter})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setStatusFilter("")}> 
              All
            </DropdownMenuItem>
            {dataSource === "issues" ? (
              <>
                <DropdownMenuItem onClick={() => setStatusFilter("open")}>
                  Open
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("resolved")}>
                  Resolved
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("closed")}>
                  Closed
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={() => setStatusFilter("todo")}>
                  Todo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("backlog")}>
                  Backlog
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("done")}>
                  Done
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("canceled")}>
                  Canceled
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Priority {priorityFilter && `(${priorityFilter})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setPriorityFilter("")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriorityFilter("low")}>
              Low
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriorityFilter("medium")}>
              Medium
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriorityFilter("high")}>
              High
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="transition-all duration-300 ease-in-out hover:bg-muted/50 animate-in slide-in-from-bottom-2 fade-in-0"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="transition-colors duration-200">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center transition-all duration-300"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
