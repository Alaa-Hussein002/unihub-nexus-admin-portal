
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Calendar, Users, MapPin, Clock, Download, RefreshCw } from "lucide-react";

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const sampleTimetable = {
  "Monday": {
    "09:00": { course: "CS101", instructor: "Dr. Smith", room: "A101", students: 45 },
    "11:00": { course: "MATH201", instructor: "Prof. Johnson", room: "B205", students: 38 },
    "14:00": { course: "PHY301", instructor: "Dr. Chen", room: "C301", students: 28 }
  },
  "Tuesday": {
    "08:00": { course: "CS102", instructor: "Dr. Ahmed", room: "A102", students: 42 },
    "10:00": { course: "ENG101", instructor: "Prof. Wilson", room: "D101", students: 50 },
    "15:00": { course: "CHEM201", instructor: "Dr. Garcia", room: "E201", students: 35 }
  },
  "Wednesday": {
    "09:00": { course: "CS101", instructor: "Dr. Smith", room: "A101", students: 45 },
    "13:00": { course: "MATH202", instructor: "Prof. Johnson", room: "B206", students: 32 },
    "16:00": { course: "BIO101", instructor: "Dr. Brown", room: "F101", students: 40 }
  }
};

export function TimetableManagement() {
  const [importStatus, setImportStatus] = useState("idle");
  const [lastImport, setLastImport] = useState("2024-01-10 14:30");

  const handleImport = () => {
    setImportStatus("importing");
    setTimeout(() => {
      setImportStatus("success");
      setLastImport(new Date().toLocaleString());
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Timetable Management</h1>
          <p className="text-gray-600">Import and manage academic schedules</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="shadow-lg">
            <Download className="w-4 h-4 mr-2" />
            Export Schedule
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 shadow-lg"
            onClick={handleImport}
            disabled={importStatus === "importing"}
          >
            {importStatus === "importing" ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {importStatus === "importing" ? "Importing..." : "Import from ASC"}
          </Button>
        </div>
      </div>

      {/* Import Status */}
      <Card className="shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-blue-600" />
            <span>Import Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-gray-500">Total Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">142</div>
              <div className="text-sm text-gray-500">Mapped Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">8</div>
              <div className="text-sm text-gray-500">Conflicts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">98%</div>
              <div className="text-sm text-gray-500">Coverage</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Last Import: <span className="font-medium">{lastImport}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Source: ASC Timetable System v2.1
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Timetable Grid */}
      <Card className="shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Weekly Schedule Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-3 text-left font-medium text-gray-700 border-b">Time</th>
                  {weekDays.map(day => (
                    <th key={day} className="p-3 text-center font-medium text-gray-700 border-b min-w-48">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(time => (
                  <tr key={time} className="border-b border-gray-100">
                    <td className="p-3 font-medium text-gray-600 bg-gray-50">
                      {time}
                    </td>
                    {weekDays.map(day => {
                      const session = sampleTimetable[day as keyof typeof sampleTimetable]?.[time];
                      return (
                        <td key={`${day}-${time}`} className="p-2">
                          {session ? (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
                              <div className="font-semibold text-blue-900 text-sm">
                                {session.course}
                              </div>
                              <div className="text-xs text-blue-700 mt-1">
                                <div className="flex items-center">
                                  <Users className="w-3 h-3 mr-1" />
                                  {session.instructor}
                                </div>
                                <div className="flex items-center mt-1">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {session.room}
                                </div>
                                <div className="flex items-center mt-1">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {session.students} students
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="h-20 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:border-gray-300 transition-colors duration-200">
                              <span className="text-xs">Free</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Course-Instructor Mapping */}
      <Card className="shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Course-Instructor Mapping</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { course: "CS101", instructor: "Dr. Smith", sessions: 3, students: 45, status: "mapped" },
              { course: "MATH201", instructor: "Prof. Johnson", sessions: 2, students: 38, status: "mapped" },
              { course: "PHY301", instructor: "Dr. Chen", sessions: 2, students: 28, status: "mapped" },
              { course: "ENG102", instructor: "Unassigned", sessions: 2, students: 35, status: "conflict" },
              { course: "CHEM201", instructor: "Dr. Garcia", sessions: 1, students: 35, status: "mapped" },
              { course: "BIO101", instructor: "Dr. Brown", sessions: 1, students: 40, status: "mapped" }
            ].map((mapping, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{mapping.course}</h3>
                  <Badge className={mapping.status === "mapped" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                    {mapping.status === "mapped" ? "Mapped" : "Conflict"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{mapping.instructor}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{mapping.sessions} sessions/week</span>
                  <span>{mapping.students} students</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
