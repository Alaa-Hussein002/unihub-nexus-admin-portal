
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { User, TrendingUp, Clock, FileText } from "lucide-react";

const instructorEffectivenessData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    courses: ["CS101", "CS201", "CS301"],
    avgAttendanceRate: 88.5,
    totalSessions: 72,
    excusesSubmitted: 2,
    gradeDistribution: {
      A: 28, B: 35, C: 22, D: 12, F: 3
    },
    studentFeedback: 4.2,
    performanceTrend: [
      { month: "Jan", attendance: 85 },
      { month: "Feb", attendance: 87 },
      { month: "Mar", attendance: 89 },
      { month: "Apr", attendance: 91 },
      { month: "May", attendance: 88 }
    ]
  },
  {
    id: 2,
    name: "Prof. Ahmed Hassan",
    department: "Mathematics",
    courses: ["MATH201", "MATH301"],
    avgAttendanceRate: 82.3,
    totalSessions: 84,
    excusesSubmitted: 4,
    gradeDistribution: {
      A: 22, B: 28, C: 25, D: 18, F: 7
    },
    studentFeedback: 3.8,
    performanceTrend: [
      { month: "Jan", attendance: 80 },
      { month: "Feb", attendance: 82 },
      { month: "Mar", attendance: 83 },
      { month: "Apr", attendance: 84 },
      { month: "May", attendance: 82 }
    ]
  }
];

export function InstructorEffectivenessReport() {
  const getAttendanceColor = (rate: number) => {
    if (rate >= 85) return "bg-green-100 text-green-700";
    if (rate >= 75) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getFeedbackColor = (score: number) => {
    if (score >= 4.0) return "text-green-600";
    if (score >= 3.5) return "text-blue-600";
    if (score >= 3.0) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Instructors</p>
                <p className="text-3xl font-bold text-blue-600">{instructorEffectivenessData.length}</p>
              </div>
              <User className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                <p className="text-3xl font-bold text-green-600">
                  {(instructorEffectivenessData.reduce((sum, inst) => sum + inst.avgAttendanceRate, 0) / instructorEffectivenessData.length).toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-3xl font-bold text-purple-600">
                  {instructorEffectivenessData.reduce((sum, inst) => sum + inst.totalSessions, 0)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Excuses</p>
                <p className="text-3xl font-bold text-orange-600">
                  {instructorEffectivenessData.reduce((sum, inst) => sum + inst.excusesSubmitted, 0)}
                </p>
              </div>
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Instructor Effectiveness Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instructor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Avg Attendance</TableHead>
                <TableHead>Total Sessions</TableHead>
                <TableHead>Excuses</TableHead>
                <TableHead>Feedback Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instructorEffectivenessData.map((instructor) => (
                <TableRow key={instructor.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{instructor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{instructor.department}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {instructor.courses.map((course, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getAttendanceColor(instructor.avgAttendanceRate)}>
                      {instructor.avgAttendanceRate}%
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{instructor.totalSessions}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {instructor.excusesSubmitted}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getFeedbackColor(instructor.studentFeedback)}`}>
                      {instructor.studentFeedback}/5.0
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {instructorEffectivenessData.map((instructor) => (
        <Card key={instructor.id} className="shadow-xl bg-white">
          <CardHeader>
            <CardTitle>{instructor.name} - Detailed Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Attendance Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={instructor.performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Attendance Rate']} />
                    <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Grade Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={Object.entries(instructor.gradeDistribution).map(([grade, count]) => ({ grade, count }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grade" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} students`, 'Count']} />
                    <Bar dataKey="count" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Performance Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Average Attendance:</span>
                  <p className="font-medium text-gray-900">{instructor.avgAttendanceRate}%</p>
                </div>
                <div>
                  <span className="text-gray-600">Total Sessions:</span>
                  <p className="font-medium text-gray-900">{instructor.totalSessions}</p>
                </div>
                <div>
                  <span className="text-gray-600">Excuses Submitted:</span>
                  <p className="font-medium text-gray-900">{instructor.excusesSubmitted}</p>
                </div>
                <div>
                  <span className="text-gray-600">Student Feedback:</span>
                  <p className={`font-medium ${getFeedbackColor(instructor.studentFeedback)}`}>
                    {instructor.studentFeedback}/5.0
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
