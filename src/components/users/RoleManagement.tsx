
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Shield, Users, Settings, Eye, Edit, Trash2, Plus, UserPlus } from "lucide-react";

const roles = [
  {
    id: 1,
    name: "System Administrator",
    description: "Full system access with all privileges",
    userCount: 2,
    permissions: {
      userManagement: true,
      timetableManagement: true,
      enrollmentManagement: true,
      excuseManagement: true,
      reportAccess: true,
      systemSettings: true,
      apiAccess: true,
      auditLogs: true
    }
  },
  {
    id: 2,
    name: "Department Head",
    description: "Manage department users and approve excuses",
    userCount: 8,
    permissions: {
      userManagement: true,
      timetableManagement: true,
      enrollmentManagement: true,
      excuseManagement: true,
      reportAccess: true,
      systemSettings: false,
      apiAccess: false,
      auditLogs: true
    }
  },
  {
    id: 3,
    name: "Instructor",
    description: "View schedule, submit excuses, and manage classes",
    userCount: 156,
    permissions: {
      userManagement: false,
      timetableManagement: false,
      enrollmentManagement: false,
      excuseManagement: true,
      reportAccess: true,
      systemSettings: false,
      apiAccess: false,
      auditLogs: false
    }
  },
  {
    id: 4,
    name: "Student",
    description: "View schedule and submit attendance",
    userCount: 2681,
    permissions: {
      userManagement: false,
      timetableManagement: false,
      enrollmentManagement: false,
      excuseManagement: false,
      reportAccess: false,
      systemSettings: false,
      apiAccess: false,
      auditLogs: false
    }
  }
];

const permissionLabels = {
  userManagement: "User Management",
  timetableManagement: "Timetable Management",
  enrollmentManagement: "Enrollment Management",
  excuseManagement: "Excuse Management",
  reportAccess: "Report Access",
  systemSettings: "System Settings",
  apiAccess: "API Access",
  auditLogs: "Audit Logs"
};

export function RoleManagement() {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isAssignRoleOpen, setIsAssignRoleOpen] = useState(false);

  const getRoleColor = (name: string) => {
    switch (name) {
      case "System Administrator":
        return "bg-red-100 text-red-700";
      case "Department Head":
        return "bg-purple-100 text-purple-700";
      case "Instructor":
        return "bg-blue-100 text-blue-700";
      case "Student":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Roles & Permissions Management</h1>
          <p className="text-muted-foreground">Configure user roles and system permissions</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAssignRoleOpen} onOpenChange={setIsAssignRoleOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Assign Roles
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Roles to Users</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Select Users</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose users..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user1">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="user2">Prof. Ahmed Hassan</SelectItem>
                      <SelectItem value="user3">John Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Select Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose role..." />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAssignRoleOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsAssignRoleOpen(false)}>Assign Role</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="roleName">Role Name</Label>
                  <Input id="roleName" placeholder="Enter role name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roleDescription">Description</Label>
                  <Textarea id="roleDescription" placeholder="Enter role description" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsCreateRoleOpen(false)}>Create Role</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Role Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">{role.name}</p>
                  <p className="text-2xl font-bold text-blue-700">{role.userCount}</p>
                  <p className="text-xs text-blue-500">users assigned</p>
                </div>
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>System Roles</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedRole.id === role.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedRole(role)}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getRoleColor(role.name)}>
                    {role.name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{role.userCount} users</span>
                </div>
                <p className="text-sm text-muted-foreground">{role.description}</p>
                <Separator className="my-3" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    View Users
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Permission Matrix */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Permissions for {selectedRole.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(permissionLabels).map(([key, label]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors duration-200"
                    >
                      <div>
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-muted-foreground">
                          {getPermissionDescription(key)}
                        </p>
                      </div>
                      <Switch
                        checked={selectedRole.permissions[key as keyof typeof selectedRole.permissions]}
                        disabled={selectedRole.name === "System Administrator"}
                      />
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />
                
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4">Interface Access Control</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Dashboard Widgets</h4>
                      <div className="space-y-3">
                        {["KPI Cards", "Charts", "Quick Actions", "Activities"].map((widget) => (
                          <div key={widget} className="flex items-center justify-between p-3 border rounded-lg">
                            <span className="text-sm">{widget}</span>
                            <Switch defaultChecked />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Report Types</h4>
                      <div className="space-y-3">
                        {["Financial Reports", "Teaching Load", "Attendance", "Grades"].map((report) => (
                          <div key={report} className="flex items-center justify-between p-3 border rounded-lg">
                            <span className="text-sm">{report}</span>
                            <Switch defaultChecked={selectedRole.permissions.reportAccess} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6">
                  <Button variant="outline">Reset to Default</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getPermissionDescription(key: string): string {
  const descriptions = {
    userManagement: "Create, edit, and delete user accounts",
    timetableManagement: "Import and manage academic schedules",
    enrollmentManagement: "Manage student course enrollments",
    excuseManagement: "Submit and approve absence requests",
    reportAccess: "View and generate system reports",
    systemSettings: "Configure system-wide settings",
    apiAccess: "Access to API endpoints",
    auditLogs: "View system audit logs"
  };
  return descriptions[key as keyof typeof descriptions] || "";
}
