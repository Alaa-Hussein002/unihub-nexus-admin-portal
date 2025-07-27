import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Calendar as CalendarIcon,
  Eye,
  RotateCcw,
  MapPin,
  Monitor,
  Clock,
  User,
  Shield,
  AlertTriangle,
  Activity,
  PieChart,
  TrendingUp
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell 
} from "recharts";

// Mock data for demonstration
const auditEvents = [
  {
    id: "AUD-001",
    timestamp: "2024-01-15 14:30:25",
    user: "Dr. Sarah Wilson",
    role: "Department Head",
    entity: "Student",
    action: "UPDATE",
    details: "Updated student enrollment status",
    ipAddress: "192.168.1.45",
    device: "Chrome/Windows",
    location: "Cairo, Egypt",
    changes: [
      { field: "Status", oldValue: "Pending", newValue: "Enrolled" },
      { field: "Group", oldValue: "CS-101-A", newValue: "CS-101-B" }
    ]
  },
  {
    id: "AUD-002",
    timestamp: "2024-01-15 14:25:12",
    user: "Ahmed Hassan",
    role: "Admin",
    entity: "Lecture",
    action: "CREATE",
    details: "Created new lecture schedule",
    ipAddress: "10.0.0.123",
    device: "Firefox/MacOS",
    location: "Alexandria, Egypt",
    changes: [
      { field: "Course", oldValue: null, newValue: "Data Structures" },
      { field: "Time", oldValue: null, newValue: "09:00-10:30" }
    ]
  },
  {
    id: "AUD-003",
    timestamp: "2024-01-15 13:45:33",
    user: "System",
    role: "System",
    entity: "Security",
    action: "LOGIN_FAILED",
    details: "Failed login attempt",
    ipAddress: "203.45.67.89",
    device: "Unknown/Linux",
    location: "Unknown",
    changes: []
  }
];

const chartData = [
  { time: "00:00", events: 12 },
  { time: "04:00", events: 8 },
  { time: "08:00", events: 45 },
  { time: "12:00", events: 78 },
  { time: "16:00", events: 65 },
  { time: "20:00", events: 23 }
];

const pieData = [
  { name: "CREATE", value: 45, color: "hsl(var(--chart-1))" },
  { name: "UPDATE", value: 30, color: "hsl(var(--chart-2))" },
  { name: "DELETE", value: 15, color: "hsl(var(--chart-3))" },
  { name: "LOGIN", value: 10, color: "hsl(var(--chart-4))" }
];

export function AuditLog() {
  const [selectedEvent, setSelectedEvent] = useState<typeof auditEvents[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [filterAction, setFilterAction] = useState("");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "LOGIN":
      case "READ":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "CREATE":
      case "UPDATE":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "DELETE":
      case "LOGIN_FAILED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRowStyle = (action: string) => {
    switch (action) {
      case "LOGIN":
      case "READ":
        return "border-l-4 border-l-blue-500 bg-blue-50/30";
      case "CREATE":
      case "UPDATE":
        return "border-l-4 border-l-yellow-500 bg-yellow-50/30";
      case "DELETE":
      case "LOGIN_FAILED":
        return "border-l-4 border-l-red-500 bg-red-50/30";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Audit Log</h1>
        <p className="text-muted-foreground">
          Monitor and analyze all system changes and security events
        </p>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              Currently online
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-red-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Failed logins detected
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">
              Uptime this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Events Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="events" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Events by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Event Filters</CardTitle>
          <CardDescription>Search and filter audit events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={filterUser} onValueChange={setFilterUser}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="dr-sarah">Dr. Sarah Wilson</SelectItem>
                <SelectItem value="ahmed">Ahmed Hassan</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="CREATE">Create</SelectItem>
                <SelectItem value="UPDATE">Update</SelectItem>
                <SelectItem value="DELETE">Delete</SelectItem>
                <SelectItem value="LOGIN">Login</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "PPP") : "From date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal", !dateTo && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "PPP") : "To date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
              </PopoverContent>
            </Popover>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                PDF Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Events Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Audit Events</CardTitle>
          <CardDescription>Detailed log of all system activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Log ID</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditEvents.map((event) => (
                  <TableRow key={event.id} className={getRowStyle(event.action)}>
                    <TableCell className="font-medium">{event.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {event.timestamp}
                      </div>
                    </TableCell>
                    <TableCell>{event.user}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{event.role}</Badge>
                    </TableCell>
                    <TableCell>{event.entity}</TableCell>
                    <TableCell>
                      <Badge className={getActionBadgeColor(event.action)}>
                        {event.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{event.details}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedEvent(event)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-[400px] sm:w-[540px]">
                            <SheetHeader>
                              <SheetTitle>Event Details</SheetTitle>
                              <SheetDescription>
                                Detailed information about this audit event
                              </SheetDescription>
                            </SheetHeader>
                            {selectedEvent && (
                              <div className="mt-6 space-y-6">
                                <div className="grid gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Log ID</label>
                                    <p className="text-sm text-muted-foreground">{selectedEvent.id}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Timestamp</label>
                                    <p className="text-sm text-muted-foreground">{selectedEvent.timestamp}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">User & Role</label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedEvent.user} ({selectedEvent.role})
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Action</label>
                                    <Badge className={getActionBadgeColor(selectedEvent.action)}>
                                      {selectedEvent.action}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Location & Device</label>
                                  <div className="space-y-1 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-4 w-4" />
                                      {selectedEvent.location}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Monitor className="h-4 w-4" />
                                      {selectedEvent.device}
                                    </div>
                                    <p>IP: {selectedEvent.ipAddress}</p>
                                  </div>
                                </div>

                                {selectedEvent.changes.length > 0 && (
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Field Changes</label>
                                    <div className="space-y-2">
                                      {selectedEvent.changes.map((change, index) => (
                                        <Card key={index} className="p-3">
                                          <div className="text-sm">
                                            <div className="font-medium">{change.field}</div>
                                            <div className="mt-1 grid gap-1">
                                              <div className="text-red-600">
                                                Old: {change.oldValue || "None"}
                                              </div>
                                              <div className="text-green-600">
                                                New: {change.newValue}
                                              </div>
                                            </div>
                                          </div>
                                        </Card>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {selectedEvent.action !== "LOGIN_FAILED" && (
                                  <Button variant="outline" className="w-full">
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    Revert Change
                                  </Button>
                                )}
                              </div>
                            )}
                          </SheetContent>
                        </Sheet>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}