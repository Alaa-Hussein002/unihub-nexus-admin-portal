
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, TrendingUp, TrendingDown, Minus } from "lucide-react";

const studentProgressData = [
  {
    id: "2024001",
    name: "Ahmed Al-Rashid",
    email: "ahmed.rashid@student.unihub.edu",
    gpa: 3.2,
    academicStanding: "Good Standing",
    courses: [
      { code: "CS101", name: "Programming Fundamentals", attendance: 92, grade: "B+", status: "Pass", credits: 3 },
      { code: "MATH201", name: "Calculus II", attendance: 88, grade: "A-", status: "Pass", credits: 4 },
      { code: "PHY101", name: "Physics I", attendance: 76, grade: "C+", status: "Pass", credits: 3 },
      { code: "ENG102", name: "Academic Writing", attendance: 95, grade: "A", status: "Pass", credits: 2 }
    ]
  },
  {
    id: "2024002",
    name: "Sarah Johnson",
    email: "sarah.johnson@student.unihub.edu",
    gpa: 2.8,
    academicStanding: "Academic Probation",
    courses: [
      { code: "CS101", name: "Programming Fundamentals", attendance: 65, grade: "C-", status: "Pass", credits: 3 },
      { code: "MATH201", name: "Calculus II", attendance: 72, grade: "D+", status: "Pass", credits: 4 },
      { code: "PHY101", name: "Physics I", attendance: 58, grade: "F", status: "Fail", credits: 3 },
      { code: "ENG102", name: "Academic Writing", attendance: 89, grade: "B", status: "Pass", credits: 2 }
    ]
  }
];

export function StudentProgressReport() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(studentProgressData[0]);

  const filteredStudents = studentProgressData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return "text-green-600";
    if (gpa >= 3.0) return "text-blue-600";
    if (gpa >= 2.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getStandingColor = (standing: string) => {
    if (standing === "Good Standing") return "bg-green-100 text-green-700";
    if (standing === "Academic Probation") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return "bg-green-100 text-green-700";
    if (grade.startsWith('B')) return "bg-blue-100 text-blue-700";
    if (grade.startsWith('C')) return "bg-yellow-100 text-yellow-700";
    if (grade.startsWith('D')) return "bg-orange-100 text-orange-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-blue-600" />
            <span>Student Academic Progress Report</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              Export Report
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-lg">Students</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedStudent.id === student.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <h3 className="font-medium text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-500">{student.id}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-sm font-medium ${getGPAColor(student.gpa)}`}>
                        GPA: {student.gpa}
                      </span>
                      <Badge className={getStandingColor(student.academicStanding)}>
                        {student.academicStanding}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="lg:col-span-2">
              <Card className="border">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{selectedStudent.name} - Academic Progress</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-lg font-bold ${getGPAColor(selectedStudent.gpa)}`}>
                        GPA: {selectedStudent.gpa}
                      </span>
                      <Badge className={getStandingColor(selectedStudent.academicStanding)}>
                        {selectedStudent.academicStanding}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Student ID:</span>
                        <span className="ml-2">{selectedStudent.id}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="ml-2">{selectedStudent.email}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Total Courses:</span>
                        <span className="ml-2">{selectedStudent.courses.length}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Total Credits:</span>
                        <span className="ml-2">
                          {selectedStudent.courses.reduce((sum, course) => sum + course.credits, 0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Credits</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedStudent.courses.map((course, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{course.code}</p>
                              <p className="text-sm text-gray-500">{course.name}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
                                <div 
                                  className={`h-2 rounded-full ${
                                    course.attendance >= 85 ? 'bg-green-500' : 
                                    course.attendance >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${course.attendance}%` }}
                                />
                              </div>
                              <span className="text-sm">{course.attendance}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getGradeColor(course.grade)}>
                              {course.grade}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={course.status === "Pass" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                              {course.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{course.credits}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
