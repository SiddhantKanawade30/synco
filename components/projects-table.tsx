import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"

const projects = [
  {
    id: "PRJ001",
    name: "Mobile App Redesign",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-01-15",
    team: "Design Team",
  },
  {
    id: "PRJ002",
    name: "API Integration",
    status: "Completed",
    priority: "Medium",
    dueDate: "2024-01-10",
    team: "Backend Team",
  },
  {
    id: "PRJ003",
    name: "Dashboard Analytics",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-01-20",
    team: "Frontend Team",
  },
  {
    id: "PRJ004",
    name: "Security Audit",
    status: "Planning",
    priority: "Critical",
    dueDate: "2024-01-25",
    team: "Security Team",
  },
  {
    id: "PRJ005",
    name: "User Testing",
    status: "Completed",
    priority: "Low",
    dueDate: "2024-01-08",
    team: "QA Team",
  },
  {
    id: "PRJ006",
    name: "Database Migration",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-01-18",
    team: "DevOps Team",
  },
  {
    id: "PRJ007",
    name: "Marketing Campaign",
    status: "Planning",
    priority: "Medium",
    dueDate: "2024-01-30",
    team: "Marketing Team",
  },
]

export function ProjectsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Team</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
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
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    project.status === 'Completed' 
                      ? 'bg-green-100 text-green-800 '
                      : project.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/projects/${project.id}`} className="block">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    project.priority === 'Critical'
                      ? 'bg-red-100 text-red-800'
                      : project.priority === 'High'
                      ? 'bg-orange-100 text-orange-800'
                      : project.priority === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.priority}
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/projects/${project.id}`} className="block">
                  {project.dueDate}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/projects/${project.id}`} className="block">
                  {project.team}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
