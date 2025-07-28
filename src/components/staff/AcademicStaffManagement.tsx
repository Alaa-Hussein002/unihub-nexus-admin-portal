import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Send,
  User,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Building,
  GraduationCap,
  Users,
  BarChart3
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for demonstration
const staffMembers = [
  {
    id: "STAFF-001",
    name: "Dr. Ahmed Hassan",
    rank: "Professor",
    department: "Computer Science",
    hourlyRate: 150,
    multiUniversity: true,
    totalLectures: 48,
    attendedLectures: 42,
    missedLectures: 6,
    grossPay: 6300,
    taxDeduction: 945,
    bonuses: 500,
    netPay: 5855,
    email: "ahmed.hassan@unihub.edu",
    phone: "+20 12 345 6789"
  },
  {
    id: "STAFF-002",
    name: "Dr. Sarah Wilson",
    rank: "Associate Professor",
    department: "Mathematics",
    hourlyRate: 120,
    multiUniversity: false,
    totalLectures: 36,
    attendedLectures: 35,
    missedLectures: 1,
    grossPay: 4320,
    taxDeduction: 648,
    bonuses: 200,
    netPay: 3872,
    email: "sarah.wilson@unihub.edu",
    phone: "+20 12 567 8901"
  },
  {
    id: "STAFF-003",
    name: "Prof. Mohamed Ali",
    rank: "Lecturer",
    department: "Physics",
    hourlyRate: 100,
    multiUniversity: true,
    totalLectures: 40,
    attendedLectures: 38,
    missedLectures: 2,
    grossPay: 4000,
    taxDeduction: 600,
    bonuses: 150,
    netPay: 3550,
    email: "mohamed.ali@unihub.edu",
    phone: "+20 12 789 0123"
  }
];

const attendanceData = [
  { month: "Sep", attended: 8, missed: 1 },
  { month: "Oct", attended: 12, missed: 0 },
  { month: "Nov", attended: 10, missed: 2 },
  { month: "Dec", attended: 9, missed: 1 },
  { month: "Jan", attended: 11, missed: 1 }
];

const compensatoryLectures = [
  {
    id: "COMP-001",
    date: "2024-01-20",
    time: "14:00-15:30",
    course: "Advanced Algorithms",
    reason: "Missed due to conference",
    status: "Approved"
  },
  {
    id: "COMP-002",
    date: "2024-01-25",
    time: "10:00-11:30",
    course: "Database Systems",
    reason: "Medical leave",
    status: "Pending"
  }
];

const lectureDetails = [
  {
    date: "2024-01-15",
    course: "Data Structures",
    hours: 1.5,
    rate: 150,
    deduction: 22.5,
    bonus: 0,
    netAmount: 127.5,
    status: "attended"
  },
  {
    date: "2024-01-16",
    course: "Algorithms",
    hours: 1.5,
    rate: 150,
    deduction: 22.5,
    bonus: 25,
    netAmount: 152.5,
    status: "attended"
  },
  {
    date: "2024-01-17",
    course: "Programming",
    hours: 1.5,
    rate: 150,
    deduction: 22.5,
    bonus: 0,
    netAmount: 0,
    status: "missed"
  }
];

export function AcademicStaffManagement() {
  const [selectedStaff, setSelectedStaff] = useState<typeof staffMembers[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRank, setFilterRank] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [isCompensatoryDialogOpen, setIsCompensatoryDialogOpen] = useState(false);

  const filteredStaff = staffMembers.filter(staff => {
    return (
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterRank === "" || filterRank === "all" || staff.rank === filterRank) &&
      (filterDepartment === "" || filterDepartment === "all" || staff.department === filterDepartment)
    );
  });

  const getRankBadgeColor = (rank: string) => {
    switch (rank) {
      case "Professor":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Associate Professor":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Lecturer":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAttendancePercentage = (attended: number, total: number) => {
    return Math.round((attended / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Academic Staff Management</h1>
        <p className="text-muted-foreground">
          Manage academic staff details, teaching loads, and financial compensation
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              Active academic staff
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Multi-University</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {staffMembers.filter(s => s.multiUniversity).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Teaching at multiple institutions
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(staffMembers.reduce((acc, s) => acc + getAttendancePercentage(s.attendedLectures, s.totalLectures), 0) / staffMembers.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall attendance rate
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${staffMembers.reduce((acc, s) => acc + s.netPay, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Monthly net payroll
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Staff Directory */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Staff Directory</CardTitle>
              <CardDescription>Manage academic staff information and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="mb-4 grid gap-4 md:grid-cols-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search staff..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={filterRank} onValueChange={setFilterRank}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by rank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ranks</SelectItem>
                    <SelectItem value="Professor">Professor</SelectItem>
                    <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                    <SelectItem value="Lecturer">Lecturer</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>

              {/* Staff Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Rank</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Hourly Rate</TableHead>
                      <TableHead>Multi-Uni</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.map((staff) => (
                      <TableRow 
                        key={staff.id}
                        className={cn(
                          "cursor-pointer hover:bg-muted/50",
                          selectedStaff?.id === staff.id && "bg-muted"
                        )}
                        onClick={() => setSelectedStaff(staff)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {staff.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRankBadgeColor(staff.rank)}>
                            {staff.rank}
                          </Badge>
                        </TableCell>
                        <TableCell>{staff.department}</TableCell>
                        <TableCell>${staff.hourlyRate}/hr</TableCell>
                        <TableCell>
                          {staff.multiUniversity ? (
                            <Badge variant="secondary">Yes</Badge>
                          ) : (
                            <Badge variant="outline">No</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">
                              {getAttendancePercentage(staff.attendedLectures, staff.totalLectures)}%
                            </span>
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 rounded-full"
                                style={{ 
                                  width: `${getAttendancePercentage(staff.attendedLectures, staff.totalLectures)}%` 
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Details Panel */}
        <div className="space-y-6">
          {selectedStaff ? (
            <>
              {/* Staff Info Card */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    {selectedStaff.name}
                  </CardTitle>
                  <CardDescription>
                    {selectedStaff.rank} • {selectedStaff.department}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Email:</span>
                      <span className="text-sm">{selectedStaff.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Phone:</span>
                      <span className="text-sm">{selectedStaff.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Hourly Rate:</span>
                      <span className="text-sm font-medium">${selectedStaff.hourlyRate}</span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Attended</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">{selectedStaff.attendedLectures}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Missed</span>
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">{selectedStaff.missedLectures}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Telegram
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Summary */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Financial Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Gross Pay</span>
                      <span className="text-lg font-bold text-blue-600">
                        ${selectedStaff.grossPay.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium">Tax Deduction</span>
                      <span className="text-lg font-bold text-red-600">
                        -${selectedStaff.taxDeduction.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Bonuses</span>
                      <span className="text-lg font-bold text-green-600">
                        +${selectedStaff.bonuses.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
                      <span className="text-sm font-medium">Net Pay</span>
                      <span className="text-xl font-bold text-purple-600">
                        ${selectedStaff.netPay.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Chart */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Monthly Attendance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="attended" fill="hsl(var(--primary))" />
                      <Bar dataKey="missed" fill="hsl(var(--destructive))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <User className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Select a staff member to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Detailed Tabs for Selected Staff */}
      {selectedStaff && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Detailed Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="lectures" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lectures">Lecture Details</TabsTrigger>
                <TabsTrigger value="compensatory">Compensatory Lectures</TabsTrigger>
                <TabsTrigger value="financial">Financial Breakdown</TabsTrigger>
              </TabsList>

              <TabsContent value="lectures" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Net Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lectureDetails.map((lecture, index) => (
                        <TableRow key={index}>
                          <TableCell>{lecture.date}</TableCell>
                          <TableCell>{lecture.course}</TableCell>
                          <TableCell>{lecture.hours}h</TableCell>
                          <TableCell>
                            {lecture.status === "attended" ? (
                              <Badge className="bg-green-100 text-green-800">Attended</Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800">Missed</Badge>
                            )}
                          </TableCell>
                          <TableCell>${lecture.netAmount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="compensatory" className="mt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Compensatory Lectures</h3>
                    <Dialog open={isCompensatoryDialogOpen} onOpenChange={setIsCompensatoryDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Compensatory
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Compensatory Lecture</DialogTitle>
                          <DialogDescription>
                            Schedule a make-up lecture for missed sessions
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="comp-date">Date & Time</Label>
                            <Input id="comp-date" type="datetime-local" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="comp-course">Course</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select course" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cs101">Data Structures</SelectItem>
                                <SelectItem value="cs102">Algorithms</SelectItem>
                                <SelectItem value="cs103">Programming</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="comp-reason">Reason</Label>
                            <Textarea id="comp-reason" placeholder="Reason for missed lecture..." />
                          </div>
                          <Button className="w-full">Schedule Compensatory Lecture</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Course</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {compensatoryLectures.map((lecture) => (
                          <TableRow key={lecture.id}>
                            <TableCell>{lecture.date} {lecture.time}</TableCell>
                            <TableCell>{lecture.course}</TableCell>
                            <TableCell>{lecture.reason}</TableCell>
                            <TableCell>
                              <Badge 
                                className={
                                  lecture.status === "Approved" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {lecture.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Deduction</TableHead>
                        <TableHead>Bonus</TableHead>
                        <TableHead>Net Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lectureDetails.map((lecture, index) => (
                        <TableRow key={index}>
                          <TableCell>{lecture.date}</TableCell>
                          <TableCell>{lecture.hours}h</TableCell>
                          <TableCell>${lecture.rate}</TableCell>
                          <TableCell className="text-red-600">-${lecture.deduction}</TableCell>
                          <TableCell className="text-green-600">+${lecture.bonus}</TableCell>
                          <TableCell className="font-medium">${lecture.netAmount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}