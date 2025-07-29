import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Shield, Clock, Users, Key, Eye, Lock, Settings } from "lucide-react";

const AccessControl = () => {
  const [activeTab, setActiveTab] = useState("security");

  // Sample data for IP restrictions
  const [ipRestrictions] = useState([
    { id: 1, ip: "192.168.1.0/24", description: "Main Campus Network", status: "active", users: 245 },
    { id: 2, ip: "10.0.0.0/16", description: "Administrative Building", status: "active", users: 89 },
    { id: 3, ip: "172.16.0.0/24", description: "Library Network", status: "active", users: 156 },
    { id: 4, ip: "203.45.67.89", description: "Remote Admin Access", status: "restricted", users: 3 }
  ]);

  // Sample data for session management
  const [sessionSettings] = useState({
    maxSessionDuration: 480, // minutes
    idleTimeout: 30,
    maxConcurrentSessions: 3,
    forceLogoutEnabled: true,
    rememberMeEnabled: true,
    rememberMeDuration: 30 // days
  });

  // Sample data for access logs
  const [accessLogs] = useState([
    { id: 1, user: "Dr. Sarah Johnson", action: "Login", ip: "192.168.1.45", time: "2024-01-15 09:23", status: "Success", location: "Main Campus" },
    { id: 2, user: "Prof. Michael Chen", action: "Failed Login", ip: "203.45.67.89", time: "2024-01-15 09:18", status: "Failed", location: "Remote" },
    { id: 3, user: "Admin User", action: "Permission Change", ip: "192.168.1.10", time: "2024-01-15 09:15", status: "Success", location: "Admin Building" },
    { id: 4, user: "Dr. Emily Brown", action: "Data Export", ip: "172.16.0.23", time: "2024-01-15 09:12", status: "Success", location: "Library" },
    { id: 5, user: "System", action: "Auto Logout", ip: "10.0.0.156", time: "2024-01-15 09:10", status: "System", location: "Main Campus" }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "restricted": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "blocked": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getActionColor = (status: string) => {
    switch (status) {
      case "Success": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Failed": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "System": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Access Control</h1>
          <p className="text-muted-foreground">
            Manage system security, IP restrictions, sessions, and access logs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            View Security Report
          </Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Security Settings
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security Policy
          </TabsTrigger>
          <TabsTrigger value="ip" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            IP Restrictions
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Session Management
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Access Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Password Policy
                </CardTitle>
                <CardDescription>Configure password requirements and security rules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minLength">Minimum Length</Label>
                    <Input id="minLength" type="number" defaultValue="8" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxAge">Password Age (days)</Label>
                    <Input id="maxAge" type="number" defaultValue="90" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="uppercase">Require Uppercase</Label>
                    <Switch id="uppercase" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="lowercase">Require Lowercase</Label>
                    <Switch id="lowercase" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="numbers">Require Numbers</Label>
                    <Switch id="numbers" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="special">Require Special Characters</Label>
                    <Switch id="special" defaultChecked />
                  </div>
                </div>
                <Button className="w-full">Update Password Policy</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Two-Factor Authentication
                </CardTitle>
                <CardDescription>Configure 2FA requirements for different user roles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>System Administrators</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Department Heads</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for department heads</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Academic Staff</Label>
                      <p className="text-sm text-muted-foreground">Optional 2FA for instructors</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Students</Label>
                      <p className="text-sm text-muted-foreground">Optional 2FA for students</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <Button className="w-full">Update 2FA Settings</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Account Lockout Policy
              </CardTitle>
              <CardDescription>Configure automatic account lockout for failed login attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxAttempts">Max Failed Attempts</Label>
                  <Input id="maxAttempts" type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                  <Input id="lockoutDuration" type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resetTime">Reset Counter After (minutes)</Label>
                  <Input id="resetTime" type="number" defaultValue="15" />
                </div>
              </div>
              <div className="mt-4">
                <Button>Update Lockout Policy</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ip" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">IP Address Restrictions</h3>
              <p className="text-sm text-muted-foreground">Whitelist/Blacklist IPv4 and CIDR ranges</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Test Connectivity</Button>
              <Button>Add IP Range</Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IP Address/Range</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Active Users</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ipRestrictions.map((restriction) => (
                    <TableRow key={restriction.id}>
                      <TableCell className="font-mono">{restriction.ip}</TableCell>
                      <TableCell>{restriction.description}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(restriction.status)}>
                          {restriction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {restriction.users}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Block</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          {/* 3D-style Session Management Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Session Timeout
                </CardTitle>
                <CardDescription>Configure automatic session expiration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionDuration">Maximum Session Duration (minutes)</Label>
                  <Input id="sessionDuration" type="number" defaultValue={sessionSettings.maxSessionDuration} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idleTimeout">Idle Timeout (minutes)</Label>
                  <Input id="idleTimeout" type="number" defaultValue={sessionSettings.idleTimeout} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="forceLogout">Force Logout on Timeout</Label>
                  <Switch id="forceLogout" defaultChecked={sessionSettings.forceLogoutEnabled} />
                </div>
                <Button className="w-full">Update Session Settings</Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Concurrent Sessions
                </CardTitle>
                <CardDescription>Manage multiple session access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="maxSessions">Max Concurrent Sessions</Label>
                  <Input id="maxSessions" type="number" defaultValue={sessionSettings.maxConcurrentSessions} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="rememberMe">Enable "Remember Me"</Label>
                    <p className="text-sm text-muted-foreground">Allow extended login sessions</p>
                  </div>
                  <Switch id="rememberMe" defaultChecked={sessionSettings.rememberMeEnabled} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rememberDuration">Remember Me Duration (days)</Label>
                  <Input id="rememberDuration" type="number" defaultValue={sessionSettings.rememberMeDuration} />
                </div>
                <Button className="w-full">Update Concurrent Settings</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                  Active Sessions
                </CardTitle>
                <CardDescription>247 sessions currently active</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-700">247</p>
                  <p className="text-sm text-purple-600">Active Sessions</p>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  View All Sessions
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Session Management Tools</CardTitle>
              <CardDescription>Monitor and manage currently active user sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Input placeholder="Search active sessions..." className="w-64" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="admins">Administrators</SelectItem>
                        <SelectItem value="instructors">Instructors</SelectItem>
                        <SelectItem value="students">Students</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline">Refresh Sessions</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-2xl font-bold">247</p>
                    <p className="text-sm text-muted-foreground">Total Active</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-2xl font-bold">45</p>
                    <p className="text-sm text-muted-foreground">Admin Sessions</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Force Logout Available</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Access Logs</h3>
              <p className="text-sm text-muted-foreground">Searchable log of login attempts, policy changes, and security events</p>
            </div>
            <div className="flex items-center gap-2">
              <Input placeholder="Search logs..." className="w-64" />
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="failed">Failed Login</SelectItem>
                  <SelectItem value="permission">Permission Change</SelectItem>
                  <SelectItem value="export">Data Export</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="24h">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Export CSV</Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                      <TableCell>{log.location}</TableCell>
                      <TableCell>{log.time}</TableCell>
                      <TableCell>
                        <Badge className={getActionColor(log.status)}>
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccessControl;