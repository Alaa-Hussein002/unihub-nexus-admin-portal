
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { DollarSign, Clock, Users, TrendingUp, Download, Calendar, BarChart3 } from "lucide-react";

const financialData = [
  {
    instructor: "Dr. Sarah Johnson",
    hourlyRate: 75,
    sessionsCount: 24,
    totalHours: 72,
    totalPayout: 5400,
    university: "UniHub Only",
    department: "Computer Science"
  },
  {
    instructor: "Prof. Ahmed Hassan",
    hourlyRate: 85,
    sessionsCount: 28,
    totalHours: 84,
    totalPayout: 7140,
    university: "Multiple",
    department: "Mathematics"
  },
  {
    instructor: "Dr. Chen Liu",
    hourlyRate: 80,
    sessionsCount: 22,
    totalHours: 66,
    totalPayout: 5280,
    university: "UniHub Only",
    department: "Physics"
  },
  {
    instructor: "Prof. Wilson",
    hourlyRate: 90,
    sessionsCount: 20,
    totalHours: 60,
    totalPayout: 5400,
    university: "Multiple",
    department: "Engineering"
  }
];

const attendanceData = [
  { course: "CS101", attendance: 92, totalStudents: 45, avgGrade: 85 },
  { course: "MATH201", attendance: 88, totalStudents: 38, avgGrade: 78 },
  { course: "PHY301", attendance: 95, totalStudents: 28, avgGrade: 82 },
  { course: "ENG102", attendance: 85, totalStudents: 52, avgGrade: 88 }
];

const gradeDistribution = [
  { grade: "A", count: 145, percentage: 35 },
  { grade: "B", count: 168, percentage: 40 },
  { grade: "C", count: 84, percentage: 20 },
  { grade: "D", count: 21, percentage: 5 }
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export function ReportsManagement() {
  const [selectedReport, setSelectedReport] = useState("financial");

  const totalPayout = financialData.reduce((sum, item) => sum + item.totalPayout, 0);
  const avgHourlyRate = financialData.reduce((sum, item) => sum + item.hourlyRate, 0) / financialData.length;
  const totalSessions = financialData.reduce((sum, item) => sum + item.sessionsCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive reporting and data analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="shadow-lg">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Report Navigation */}
      <Card className="shadow-xl bg-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            {[
              { id: "financial", label: "Financial Reports", icon: DollarSign },
              { id: "teaching", label: "Teaching Load", icon: Clock },
              { id: "attendance", label: "Attendance", icon: Users },
              { id: "grades", label: "Grades Overview", icon: TrendingUp }
            ].map((report) => (
              <Button
                key={report.id}
                variant={selectedReport === report.id ? "default" : "outline"}
                className="flex items-center space-x-2"
                onClick={() => setSelectedReport(report.id)}
              >
                <report.icon className="w-4 h-4" />
                <span>{report.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Reports */}
      {selectedReport === "financial" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="shadow-xl bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Payouts</p>
                    <p className="text-3xl font-bold text-green-600">${totalPayout.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-xl bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Hourly Rate</p>
                    <p className="text-3xl font-bold text-blue-600">${avgHourlyRate.toFixed(0)}</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-xl bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                    <p className="text-3xl font-bold text-purple-600">{totalSessions}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-xl bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Multi-University</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {financialData.filter(i => i.university === "Multiple").length}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span>Instructor Financial Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Hourly Rate</TableHead>
                    <TableHead>Sessions</TableHead>
                    <TableHead>Total Hours</TableHead>
                    <TableHead>Total Payout</TableHead>
                    <TableHead>University Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialData.map((instructor, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{instructor.instructor}</TableCell>
                      <TableCell>{instructor.department}</TableCell>
                      <TableCell>${instructor.hourlyRate}/hr</TableCell>
                      <TableCell>{instructor.sessionsCount}</TableCell>
                      <TableCell>{instructor.totalHours}h</TableCell>
                      <TableCell className="font-bold text-green-600">
                        ${instructor.totalPayout.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={instructor.university === "Multiple" 
                          ? "bg-orange-100 text-orange-700" 
                          : "bg-blue-100 text-blue-700"
                        }>
                          {instructor.university}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="shadow-xl bg-white">
            <CardHeader>
              <CardTitle>Instructor Workload vs Payout</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="instructor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalPayout" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Attendance Reports */}
      {selectedReport === "attendance" && (
        <div className="space-y-6">
          <Card className="shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Course Attendance Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Total Students</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                    <TableHead>Average Grade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((course, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{course.course}</TableCell>
                      <TableCell>{course.totalStudents}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${course.attendance}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{course.attendance}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{course.avgGrade}%</TableCell>
                      <TableCell>
                        <Badge className={course.attendance >= 90 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                          {course.attendance >= 90 ? "Excellent" : "Needs Attention"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-xl bg-white">
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="course" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-xl bg-white">
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ grade, percentage }) => `${grade}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
