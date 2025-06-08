
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Shield, Users, Settings, Eye, Edit, Trash2 } from "lucide-react";

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
          <h1 className="text-3xl font-bold text-gray-900">Role & Permission Management</h1>
          <p className="text-gray-600">Configure user roles and system permissions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
          <Shield className="w-4 h-4 mr-2" />
          Create New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <Card className="shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
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
                  <span className="text-sm text-gray-500">{role.userCount} users</span>
                </div>
                <p className="text-sm text-gray-600">{role.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Permission Matrix */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <span>Permissions for {selectedRole.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(permissionLabels).map(([key, label]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{label}</p>
                        <p className="text-sm text-gray-500">
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

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Interface Access Control</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-700">Dashboard Widgets</h4>
                      <div className="space-y-2">
                        {["KPI Cards", "Charts", "Quick Actions", "Activities"].map((widget) => (
                          <div key={widget} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{widget}</span>
                            <Switch defaultChecked />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-700">Report Types</h4>
                      <div className="space-y-2">
                        {["Financial Reports", "Teaching Load", "Attendance", "Grades"].map((report) => (
                          <div key={report} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{report}</span>
                            <Switch defaultChecked={selectedRole.permissions.reportAccess} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Reset to Default</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
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
