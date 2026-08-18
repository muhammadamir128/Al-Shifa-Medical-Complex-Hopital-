"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ClipboardList,
  PlusCircle,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  Calendar,
  UserRound,
  Syringe,
  Activity,
  FileText,
  Users,
  MoreHorizontal,
  Trash2,
  Edit,
  ArrowUpDown,
} from "lucide-react"
import { useState } from "react"

interface Task {
  id: string
  title: string
  description: string
  patient?: { name: string; room: string }
  type: "medication" | "vitals" | "procedure" | "transfer" | "documentation" | "other"
  priority: "HIGH" | "MEDIUM" | "LOW"
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED"
  dueTime: string
  createdAt: string
}

const initialTasks: Task[] = [
  {
    id: "T001",
    title: "Administer medication to Room 101-A",
    description: "Administer prescribed antibiotics to Emma Johnson",
    patient: { name: "Emma Johnson", room: "101-A" },
    type: "medication",
    priority: "HIGH",
    status: "PENDING",
    dueTime: "11:00 AM",
    createdAt: "2024-01-20",
  },
  {
    id: "T002",
    title: "Record vitals for Room 102-B",
    description: "Hourly vitals monitoring for cardiac patient",
    patient: { name: "Michael Chen", room: "102-B" },
    type: "vitals",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    dueTime: "11:30 AM",
    createdAt: "2024-01-20",
  },
  {
    id: "T003",
    title: "Assist Dr. Wilson with procedure",
    description: "Prepare patient and assist with minor surgical procedure",
    patient: { name: "Sarah Williams", room: "103-C" },
    type: "procedure",
    priority: "HIGH",
    status: "PENDING",
    dueTime: "12:00 PM",
    createdAt: "2024-01-20",
  },
  {
    id: "T004",
    title: "Patient transfer to Radiology",
    description: "Transfer Robert Davis to Radiology for CT scan",
    patient: { name: "Robert Davis", room: "104-A" },
    type: "transfer",
    priority: "LOW",
    status: "PENDING",
    dueTime: "01:00 PM",
    createdAt: "2024-01-20",
  },
  {
    id: "T005",
    title: "Update patient records",
    description: "Document morning assessments and vitals in patient charts",
    type: "documentation",
    priority: "MEDIUM",
    status: "COMPLETED",
    dueTime: "02:00 PM",
    createdAt: "2024-01-20",
  },
  {
    id: "T006",
    title: "Wound dressing change",
    description: "Change dressing for post-surgical wound on right leg",
    patient: { name: "Lisa Thompson", room: "105-B" },
    type: "procedure",
    priority: "HIGH",
    status: "PENDING",
    dueTime: "11:15 AM",
    createdAt: "2024-01-20",
  },
  {
    id: "T007",
    title: "Blood glucose test",
    description: "Perform blood glucose test before meals",
    patient: { name: "Sarah Williams", room: "103-C" },
    type: "vitals",
    priority: "MEDIUM",
    status: "COMPLETED",
    dueTime: "10:00 AM",
    createdAt: "2024-01-20",
  },
]

export default function NurseTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    type: "other",
    priority: "MEDIUM",
    dueTime: "",
  })

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === "PENDING").length,
    inProgress: tasks.filter(t => t.status === "IN_PROGRESS").length,
    completed: tasks.filter(t => t.status === "COMPLETED").length,
    highPriority: tasks.filter(t => t.priority === "HIGH" && t.status !== "COMPLETED").length,
  }

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "medication":
        return <Syringe className="h-4 w-4" />
      case "vitals":
        return <Activity className="h-4 w-4" />
      case "procedure":
        return <UserRound className="h-4 w-4" />
      case "transfer":
        return <Users className="h-4 w-4" />
      case "documentation":
        return <FileText className="h-4 w-4" />
      default:
        return <ClipboardList className="h-4 w-4" />
    }
  }

  const getTaskIconBg = (type: string) => {
    switch (type) {
      case "medication":
        return "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
      case "vitals":
        return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
      case "procedure":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
      case "transfer":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
      case "documentation":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400"
    }
  }

  const handleStatusChange = (taskId: string, newStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED") => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const handleAddTask = () => {
    const task: Task = {
      id: `T${String(tasks.length + 1).padStart(3, '0')}`,
      title: newTask.title,
      description: newTask.description,
      type: newTask.type as Task["type"],
      priority: newTask.priority as Task["priority"],
      status: "PENDING",
      dueTime: newTask.dueTime,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setTasks([task, ...tasks])
    setIsAddDialogOpen(false)
    setNewTask({ title: "", description: "", type: "other", priority: "MEDIUM", dueTime: "" })
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Task Management</h1>
            <p className="text-muted-foreground">
              Manage and track your daily nursing tasks
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                  Create a new task to track your daily activities
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter task description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Task Type</Label>
                    <Select value={newTask.type} onValueChange={(value) => setNewTask({ ...newTask, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medication">Medication</SelectItem>
                        <SelectItem value="vitals">Vitals</SelectItem>
                        <SelectItem value="procedure">Procedure</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                        <SelectItem value="documentation">Documentation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="LOW">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueTime">Due Time</Label>
                  <Input
                    id="dueTime"
                    type="time"
                    value={newTask.dueTime}
                    onChange={(e) => setNewTask({ ...newTask, dueTime: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTask} disabled={!newTask.title}>
                  Add Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ClipboardList className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{taskStats.total}</p>
                  <p className="text-xs text-muted-foreground">Total Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{taskStats.pending}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <PlayCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{taskStats.inProgress}</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{taskStats.completed}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{taskStats.highPriority}</p>
                  <p className="text-xs text-muted-foreground">High Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Today&apos;s Progress</CardTitle>
            <CardDescription>Your task completion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {taskStats.completed} of {taskStats.total} tasks completed
                </span>
                <span className="text-lg font-bold text-primary">
                  {Math.round((taskStats.completed / taskStats.total) * 100)}%
                </span>
              </div>
              <Progress value={(taskStats.completed / taskStats.total) * 100} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <Card className="border-none shadow-md">
              <CardContent className="p-8 text-center">
                <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No tasks found matching your criteria</p>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card key={task.id} className={`border-none shadow-md transition-all ${
                task.status === "COMPLETED" ? "opacity-75" : ""
              }`}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Task Icon */}
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 ${getTaskIconBg(task.type)}`}>
                      {getTaskIcon(task.type)}
                    </div>

                    {/* Task Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${task.status === "COMPLETED" ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </h3>
                        <Badge variant={
                          task.priority === "HIGH" ? "destructive" :
                          task.priority === "MEDIUM" ? "secondary" :
                          "outline"
                        }>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        {task.patient && (
                          <span className="flex items-center gap-1">
                            <UserRound className="h-3 w-3" />
                            {task.patient.name} - Room {task.patient.room}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Due: {task.dueTime}
                        </span>
                        <span className="capitalize">{task.type}</span>
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex items-center gap-3 shrink-0">
                      <Select
                        value={task.status}
                        onValueChange={(value) => handleStatusChange(task.id, value as Task["status"])}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">
                            <span className="flex items-center gap-2">
                              <Clock className="h-3 w-3" /> Pending
                            </span>
                          </SelectItem>
                          <SelectItem value="IN_PROGRESS">
                            <span className="flex items-center gap-2">
                              <PlayCircle className="h-3 w-3" /> In Progress
                            </span>
                          </SelectItem>
                          <SelectItem value="COMPLETED">
                            <span className="flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3" /> Completed
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  )
}
