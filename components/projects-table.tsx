import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  project.status === 'Completed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : project.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {project.status}
                </span>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  project.priority === 'Critical'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : project.priority === 'High'
                    ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    : project.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {project.priority}
                </span>
              </TableCell>
              <TableCell>{project.dueDate}</TableCell>
              <TableCell>{project.team}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
