
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RotateCcw, UserX, Calendar, GraduationCap } from "lucide-react";

const failedStudents = [
  {
    id: "2023001",
    name: "Ahmed Al-Rashid",
    course: "CS101 - Programming Fundamentals",
    previousTerm: "Fall 2023",
    grade: "F",
    attendanceRate: 45,
    email: "ahmed.rashid@student.unihub.edu",
    attempts: 1
  },
  {
    id: "2023002",
    name: "Sarah Johnson",
    course: "MATH201 - Calculus II", 
    previousTerm: "Fall 2023",
    grade: "D-",
    attendanceRate: 62,
    email: "sarah.johnson@student.unihub.edu",
    attempts: 2
  },
  {
    id: "2023003",
    name: "Mohamed Hassan",
    course: "PHY301 - Quantum Physics",
    previousTerm: "Fall 2023", 
    grade: "F",
    attendanceRate: 38,
    email: "mohamed.hassan@student.unihub.edu",
    attempts: 1
  }
];

export function FailedStudentCarryover() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isCarryingOver, setIsCarryingOver] = useState(false);

  const handleSelectStudent = (studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
  };

  const handleCarryoverAll = () => {
    setSelectedStudents(failedStudents.map(s => s.id));
  };

  const handleCarryover = () => {
    setIsCarryingOver(true);
    // Simulate carryover process
    setTimeout(() => {
      setIsCarryingOver(false);
      setSelectedStudents([]);
      console.log("Carried over students:", selectedStudents);
    }, 2000);
  };

  return (
    <Card className="shadow-xl bg-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <RotateCcw className="w-5 h-5 text-orange-600" />
            <span>Failed Student Carryover</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleCarryoverAll}>
              Select All
            </Button>
            <Button 
              onClick={handleCarryover}
              disabled={selectedStudents.length === 0 || isCarryingOver}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {isCarryingOver ? "Processing..." : `Carryover Selected (${selectedStudents.length})`}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <UserX className="w-5 h-5 text-orange-600" />
            <h3 className="font-medium text-orange-900">Automatic Carryover Process</h3>
          </div>
          <p className="text-sm text-orange-700">
            Students who failed courses in the previous term will be automatically enrolled in the same courses for the new term. 
            Review and select students to carry over.
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Select</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Previous Term</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Attempts</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {failedStudents.map((student) => (
              <TableRow key={student.id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={(checked) => handleSelectStudent(student.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.id}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-gray-900">{student.course}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{student.previousTerm}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="bg-red-100 text-red-700">
                    {student.grade}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${student.attendanceRate}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{student.attendanceRate}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    Attempt {student.attempts + 1}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Student Details - {student.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Student ID</label>
                            <p className="text-sm text-gray-900">{student.id}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <p className="text-sm text-gray-900">{student.email}</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Failed Course</label>
                          <p className="text-sm text-gray-900">{student.course}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Final Grade</label>
                            <Badge className="bg-red-100 text-red-700">{student.grade}</Badge>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Attendance Rate</label>
                            <p className="text-sm text-gray-900">{student.attendanceRate}%</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Course Attempts</label>
                            <p className="text-sm text-gray-900">{student.attempts}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
