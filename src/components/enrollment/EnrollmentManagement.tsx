
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Users, FileSpreadsheet, Split, Download } from "lucide-react";

const enrollmentData = [
  {
    id: 1,
    course: "CS101 - Programming Fundamentals",
    totalStudents: 89,
    groups: [
      { name: "Group 1", students: 45, instructor: "Dr. Smith", schedule: "Mon/Wed 9:00-11:00" },
      { name: "Group 2", students: 44, instructor: "Dr. Ahmed", schedule: "Tue/Thu 9:00-11:00" }
    ],
    status: "Active"
  },
  {
    id: 2,
    course: "MATH201 - Calculus II",
    totalStudents: 76,
    groups: [
      { name: "Group 1", students: 38, instructor: "Prof. Johnson", schedule: "Mon/Wed 11:00-13:00" },
      { name: "Group 2", students: 38, instructor: "Dr. Wilson", schedule: "Tue/Thu 11:00-13:00" }
    ],
    status: "Active"
  },
  {
    id: 3,
    course: "PHY301 - Quantum Physics",
    totalStudents: 52,
    groups: [
      { name: "Group 1", students: 28, instructor: "Dr. Chen", schedule: "Wed/Fri 14:00-16:00" },
      { name: "Group 2", students: 24, instructor: "Prof. Garcia", schedule: "Mon/Thu 14:00-16:00" }
    ],
    status: "Active"
  },
  {
    id: 4,
    course: "ENG102 - Academic Writing",
    totalStudents: 95,
    groups: [
      { name: "Group 1", students: 32, instructor: "Dr. Brown", schedule: "Tue/Thu 10:00-12:00" },
      { name: "Group 2", students: 31, instructor: "Prof. Davis", schedule: "Wed/Fri 10:00-12:00" },
      { name: "Group 3", students: 32, instructor: "Dr. Martinez", schedule: "Mon/Wed 13:00-15:00" }
    ],
    status: "Pending"
  }
];

export function EnrollmentManagement() {
  const [selectedCourse, setSelectedCourse] = useState(enrollmentData[0]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Enrollment Management</h1>
          <p className="text-gray-600">Import and manage student course enrollments</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="shadow-lg">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
            <Upload className="w-4 h-4 mr-2" />
            Import Students
          </Button>
        </div>
      </div>

      {/* Import Interface */}
      <Card className="shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5 text-blue-600" />
            <span>Import Student Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200 cursor-pointer">
              <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 mb-2">CSV Upload</h3>
              <p className="text-sm text-gray-500 mb-3">Upload student lists in CSV format</p>
              <Button variant="outline" size="sm">Choose File</Button>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors duration-200 cursor-pointer">
              <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 mb-2">Excel Upload</h3>
              <p className="text-sm text-gray-500 mb-3">Import from Excel spreadsheets</p>
              <Button variant="outline" size="sm">Choose File</Button>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors duration-200 cursor-pointer">
              <Split className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 mb-2">Auto-Split Groups</h3>
              <p className="text-sm text-gray-500 mb-3">Automatically divide students into groups</p>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enrollment Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Course List</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {enrollmentData.map((course) => (
              <div
                key={course.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedCourse.id === course.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCourse(course)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{course.course}</h3>
                  <Badge className={course.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                    {course.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{course.totalStudents} students</span>
                  <span>{course.groups.length} groups</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card className="shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Split className="w-5 h-5 text-blue-600" />
                  <span>Group Management - {selectedCourse.course}</span>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Split className="w-4 h-4 mr-2" />
                  Split Groups
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedCourse.groups.map((group, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{group.name}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{group.students} students</Badge>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Instructor:</span>
                        <span className="ml-2 text-gray-600">{group.instructor}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Schedule:</span>
                        <span className="ml-2 text-gray-600">{group.schedule}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Student List */}
          <Card className="shadow-xl bg-white mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Enrolled Students</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: "2024001", name: "Ahmed Al-Rashid", group: "Group 1", email: "ahmed.rashid@student.unihub.edu", status: "Active" },
                    { id: "2024002", name: "Sarah Johnson", group: "Group 1", email: "sarah.johnson@student.unihub.edu", status: "Active" },
                    { id: "2024003", name: "Mohamed Hassan", group: "Group 2", email: "mohamed.hassan@student.unihub.edu", status: "Active" },
                    { id: "2024004", name: "Lisa Chen", group: "Group 2", email: "lisa.chen@student.unihub.edu", status: "Pending" }
                  ].map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-mono text-sm">{student.id}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.group}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{student.email}</TableCell>
                      <TableCell>
                        <Badge className={student.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                          {student.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
