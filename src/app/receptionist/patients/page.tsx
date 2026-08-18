"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Filter,
  UserPlus,
  Phone,
  Mail,
  MoreHorizontal,
  Eye,
  Edit,
  FileText,
  Calendar,
  UserRound,
  MapPin,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

const patients = [
  { 
    id: "P001", 
    name: "John Smith", 
    email: "john.smith@email.com",
    phone: "+1 234-567-8901", 
    dateOfBirth: "1985-03-15",
    gender: "Male",
    bloodGroup: "O+",
    address: "123 Main St, New York, NY 10001",
    registeredAt: "2024-01-10",
    lastVisit: "2024-01-14",
    status: "active",
    totalVisits: 12
  },
  { 
    id: "P002", 
    name: "Emily Davis", 
    email: "emily.davis@email.com",
    phone: "+1 234-567-8902", 
    dateOfBirth: "1992-07-22",
    gender: "Female",
    bloodGroup: "A+",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    registeredAt: "2024-01-08",
    lastVisit: "2024-01-15",
    status: "active",
    totalVisits: 8
  },
  { 
    id: "P003", 
    name: "Robert Johnson", 
    email: "robert.johnson@email.com",
    phone: "+1 234-567-8903", 
    dateOfBirth: "1978-11-08",
    gender: "Male",
    bloodGroup: "B+",
    address: "789 Pine Rd, Chicago, IL 60601",
    registeredAt: "2024-01-05",
    lastVisit: "2024-01-15",
    status: "active",
    totalVisits: 15
  },
  { 
    id: "P004", 
    name: "Sarah Miller", 
    email: "sarah.miller@email.com",
    phone: "+1 234-567-8904", 
    dateOfBirth: "2018-04-20",
    gender: "Female",
    bloodGroup: "AB+",
    address: "321 Elm St, Houston, TX 77001",
    registeredAt: "2024-01-12",
    lastVisit: "2024-01-14",
    status: "active",
    totalVisits: 4
  },
  { 
    id: "P005", 
    name: "Michael Lee", 
    email: "michael.lee@email.com",
    phone: "+1 234-567-8905", 
    dateOfBirth: "1990-09-30",
    gender: "Male",
    bloodGroup: "O-",
    address: "654 Cedar Ln, Phoenix, AZ 85001",
    registeredAt: "2024-01-11",
    lastVisit: "2024-01-15",
    status: "active",
    totalVisits: 6
  },
  { 
    id: "P006", 
    name: "Jennifer White", 
    email: "jennifer.white@email.com",
    phone: "+1 234-567-8906", 
    dateOfBirth: "1988-12-12",
    gender: "Female",
    bloodGroup: "A-",
    address: "987 Birch Dr, Philadelphia, PA 19101",
    registeredAt: "2024-01-09",
    lastVisit: "2024-01-13",
    status: "inactive",
    totalVisits: 3
  },
  { 
    id: "P007", 
    name: "David Brown", 
    email: "david.brown@email.com",
    phone: "+1 234-567-8907", 
    dateOfBirth: "1975-06-25",
    gender: "Male",
    bloodGroup: "B-",
    address: "147 Maple Ave, San Antonio, TX 78201",
    registeredAt: "2024-01-07",
    lastVisit: "2024-01-12",
    status: "active",
    totalVisits: 20
  },
  { 
    id: "P008", 
    name: "Lisa Anderson", 
    email: "lisa.anderson@email.com",
    phone: "+1 234-567-8908", 
    dateOfBirth: "1995-02-14",
    gender: "Female",
    bloodGroup: "AB-",
    address: "258 Walnut St, San Diego, CA 92101",
    registeredAt: "2024-01-14",
    lastVisit: "2024-01-15",
    status: "active",
    totalVisits: 2
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
    case "inactive":
      return <Badge variant="secondary">Inactive</Badge>
    case "pending":
      return <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function PatientsPage() {
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Patient Registry</h1>
            <p className="text-muted-foreground">
              Manage and view all registered patients
            </p>
          </div>
          <Button asChild>
            <Link href="/receptionist/patients/register">
              <UserPlus className="mr-2 h-4 w-4" />
              Register New Patient
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <UserRound className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-xs text-muted-foreground">Total Patients</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <UserRound className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1,180</p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-xs text-muted-foreground">New Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-muted-foreground">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name, ID, or phone..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="visits">Most Visits</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients Table */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>All Patients</CardTitle>
            <CardDescription>
              A list of all registered patients in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead className="hidden md:table-cell">Contact</TableHead>
                    <TableHead className="hidden lg:table-cell">Blood Group</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Visit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center">
                            <UserRound className="h-4 w-4 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {patient.gender}, DOB: {patient.dateOfBirth}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="space-y-1">
                          <p className="text-sm flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {patient.phone}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {patient.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge variant="outline">{patient.bloodGroup}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div>
                          <p>{patient.lastVisit}</p>
                          <p className="text-xs text-muted-foreground">
                            {patient.totalVisits} total visits
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(patient.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Patient Details</DialogTitle>
                                  <DialogDescription>
                                    Complete information for {patient.name}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
                                      <UserRound className="h-8 w-8 text-amber-600" />
                                    </div>
                                    <div>
                                      <h3 className="text-lg font-semibold">{patient.name}</h3>
                                      <p className="text-sm text-muted-foreground">{patient.id}</p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="text-muted-foreground">Gender</p>
                                      <p className="font-medium">{patient.gender}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Blood Group</p>
                                      <p className="font-medium">{patient.bloodGroup}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Date of Birth</p>
                                      <p className="font-medium">{patient.dateOfBirth}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Total Visits</p>
                                      <p className="font-medium">{patient.totalVisits}</p>
                                    </div>
                                  </div>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <p className="text-muted-foreground flex items-center gap-1">
                                        <Phone className="h-3 w-3" /> Phone
                                      </p>
                                      <p className="font-medium">{patient.phone}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground flex items-center gap-1">
                                        <Mail className="h-3 w-3" /> Email
                                      </p>
                                      <p className="font-medium">{patient.email}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> Address
                                      </p>
                                      <p className="font-medium">{patient.address}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 pt-4">
                                    <Button className="flex-1" asChild>
                                      <Link href={`/receptionist/appointments/book?patient=${patient.id}`}>
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Book Appointment
                                      </Link>
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Patient
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/receptionist/appointments/book?patient=${patient.id}`}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Book Appointment
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Medical History
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
