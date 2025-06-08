
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Database, Filter, Download, BarChart3, TableIcon } from "lucide-react";

const dataSources = [
  { id: "students", name: "Students", description: "Student information and enrollment data" },
  { id: "courses", name: "Courses", description: "Course details and schedules" },
  { id: "attendance", name: "Attendance", description: "Student attendance records" },
  { id: "grades", name: "Grades", description: "Student grades and assessments" },
  { id: "instructors", name: "Instructors", description: "Instructor information and assignments" },
  { id: "excuses", name: "Excuses", description: "Excuse requests and approvals" }
];

const availableFields = {
  students: [
    { id: "student_id", name: "Student ID", type: "text" },
    { id: "student_name", name: "Student Name", type: "text" },
    { id: "email", name: "Email", type: "text" },
    { id: "enrollment_date", name: "Enrollment Date", type: "date" },
    { id: "gpa", name: "GPA", type: "number" },
    { id: "academic_standing", name: "Academic Standing", type: "text" }
  ],
  courses: [
    { id: "course_code", name: "Course Code", type: "text" },
    { id: "course_name", name: "Course Name", type: "text" },
    { id: "instructor", name: "Instructor", type: "text" },
    { id: "credits", name: "Credits", type: "number" },
    { id: "schedule", name: "Schedule", type: "text" }
  ],
  attendance: [
    { id: "student_id", name: "Student ID", type: "text" },
    { id: "course_code", name: "Course Code", type: "text" },
    { id: "attendance_rate", name: "Attendance Rate", type: "number" },
    { id: "sessions_attended", name: "Sessions Attended", type: "number" },
    { id: "total_sessions", name: "Total Sessions", type: "number" }
  ],
  grades: [
    { id: "student_id", name: "Student ID", type: "text" },
    { id: "course_code", name: "Course Code", type: "text" },
    { id: "grade", name: "Grade", type: "text" },
    { id: "points", name: "Grade Points", type: "number" },
    { id: "status", name: "Pass/Fail Status", type: "text" }
  ],
  instructors: [
    { id: "instructor_id", name: "Instructor ID", type: "text" },
    { id: "instructor_name", name: "Instructor Name", type: "text" },
    { id: "department", name: "Department", type: "text" },
    { id: "hourly_rate", name: "Hourly Rate", type: "number" },
    { id: "total_sessions", name: "Total Sessions", type: "number" }
  ],
  excuses: [
    { id: "excuse_id", name: "Excuse ID", type: "text" },
    { id: "instructor_id", name: "Instructor ID", type: "text" },
    { id: "excuse_type", name: "Excuse Type", type: "text" },
    { id: "status", name: "Status", type: "text" },
    { id: "salary_impact", name: "Salary Impact", type: "number" }
  ]
};

export function CustomReportBuilder() {
  const [selectedDataSource, setSelectedDataSource] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [filters, setFilters] = useState<Array<{field: string, operator: string, value: string}>>([]);
  const [outputFormat, setOutputFormat] = useState("table");
  const [reportName, setReportName] = useState("");

  const handleFieldToggle = (fieldId: string, checked: boolean) => {
    if (checked) {
      setSelectedFields([...selectedFields, fieldId]);
    } else {
      setSelectedFields(selectedFields.filter(id => id !== fieldId));
    }
  };

  const addFilter = () => {
    setFilters([...filters, { field: "", operator: "equals", value: "" }]);
  };

  const updateFilter = (index: number, field: string, value: string) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], [field]: value };
    setFilters(newFilters);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const generateReport = () => {
    console.log("Generating report with:", {
      dataSource: selectedDataSource,
      fields: selectedFields,
      filters,
      outputFormat,
      reportName
    });
  };

  const currentFields = selectedDataSource ? availableFields[selectedDataSource as keyof typeof availableFields] || [] : [];

  return (
    <div className="space-y-6">
      <Card className="shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-blue-600" />
            <span>Custom Report Builder</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Report Name</Label>
              <Input
                placeholder="Enter report name..."
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                className="mt-2"
              />
            </div>

            <Tabs defaultValue="datasource" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="datasource" className="flex items-center space-x-2">
                  <Database className="w-4 h-4" />
                  <span>Data Source</span>
                </TabsTrigger>
                <TabsTrigger value="fields" className="flex items-center space-x-2">
                  <TableIcon className="w-4 h-4" />
                  <span>Fields</span>
                </TabsTrigger>
                <TabsTrigger value="filters" className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </TabsTrigger>
                <TabsTrigger value="output" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Output</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="datasource" className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Select Data Source</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {dataSources.map((source) => (
                      <Card
                        key={source.id}
                        className={`cursor-pointer transition-all ${
                          selectedDataSource === source.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedDataSource(source.id)}
                      >
                        <CardContent className="p-4">
                          <h3 className="font-medium text-gray-900">{source.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{source.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fields" className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Select Fields to Include</Label>
                  {selectedDataSource ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {currentFields.map((field) => (
                        <div key={field.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <Checkbox
                            checked={selectedFields.includes(field.id)}
                            onCheckedChange={(checked) => handleFieldToggle(field.id, checked as boolean)}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{field.name}</p>
                            <Badge variant="outline" className="text-xs">
                              {field.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Please select a data source first
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="filters" className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Apply Filters</Label>
                    <Button onClick={addFilter} variant="outline" size="sm">
                      Add Filter
                    </Button>
                  </div>
                  
                  {filters.length > 0 ? (
                    <div className="space-y-3">
                      {filters.map((filter, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <Select
                            value={filter.field}
                            onValueChange={(value) => updateFilter(index, "field", value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Field" />
                            </SelectTrigger>
                            <SelectContent>
                              {currentFields.map((field) => (
                                <SelectItem key={field.id} value={field.id}>
                                  {field.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Select
                            value={filter.operator}
                            onValueChange={(value) => updateFilter(index, "operator", value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equals">Equals</SelectItem>
                              <SelectItem value="contains">Contains</SelectItem>
                              <SelectItem value="greater">Greater than</SelectItem>
                              <SelectItem value="less">Less than</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Input
                            placeholder="Value"
                            value={filter.value}
                            onChange={(e) => updateFilter(index, "value", e.target.value)}
                            className="flex-1"
                          />
                          
                          <Button
                            onClick={() => removeFilter(index)}
                            variant="outline"
                            size="sm"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No filters applied. Click "Add Filter" to add filters.
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="output" className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Output Format</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {[
                      { id: "table", name: "Table View", icon: TableIcon },
                      { id: "chart", name: "Chart/Graph", icon: BarChart3 },
                      { id: "csv", name: "CSV Export", icon: Download },
                      { id: "pdf", name: "PDF Report", icon: Download }
                    ].map((format) => (
                      <Card
                        key={format.id}
                        className={`cursor-pointer transition-all ${
                          outputFormat === format.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setOutputFormat(format.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <format.icon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                          <p className="font-medium text-gray-900">{format.name}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-between pt-6 border-t">
              <div className="text-sm text-gray-600">
                {selectedFields.length > 0 && (
                  <span>Selected {selectedFields.length} field(s) from {selectedDataSource}</span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline">Save Template</Button>
                <Button
                  onClick={generateReport}
                  disabled={!selectedDataSource || selectedFields.length === 0 || !reportName}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      {selectedFields.length > 0 && (
        <Card className="shadow-xl bg-white">
          <CardHeader>
            <CardTitle>Report Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="font-medium text-gray-900">Report: {reportName || "Untitled Report"}</h3>
              <p className="text-sm text-gray-600">
                Data Source: {dataSources.find(s => s.id === selectedDataSource)?.name}
              </p>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  {selectedFields.map((fieldId) => {
                    const field = currentFields.find(f => f.id === fieldId);
                    return (
                      <TableHead key={fieldId}>{field?.name}</TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  {selectedFields.map((fieldId) => (
                    <TableCell key={fieldId} className="text-gray-500 italic">
                      Sample data
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
