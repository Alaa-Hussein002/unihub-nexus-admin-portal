
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Wifi, Database, RefreshCw, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const integrations = [
  {
    name: "Student Mobile App",
    status: "Connected",
    lastSync: "2 minutes ago",
    users: 2681,
    version: "v2.1.4"
  },
  {
    name: "Instructor Mobile App",
    status: "Connected",
    lastSync: "5 minutes ago",
    users: 156,
    version: "v2.1.4"
  },
  {
    name: "ASC Timetable System",
    status: "Warning",
    lastSync: "2 hours ago",
    users: 1,
    version: "v3.2"
  },
  {
    name: "Financial System",
    status: "Offline",
    lastSync: "1 day ago",
    users: 8,
    version: "v1.8"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Connected":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "Warning":
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case "Offline":
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return <RefreshCw className="w-5 h-5 text-gray-400" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Connected":
      return "bg-green-100 text-green-700";
    case "Warning":
      return "bg-yellow-100 text-yellow-700";
    case "Offline":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function IntegrationHub() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integration Hub</h1>
          <p className="text-gray-600">Manage mobile app sync and system integrations</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync All
        </Button>
      </div>

      {/* Integration Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected Systems</p>
                <p className="text-3xl font-bold text-green-600">2</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mobile Users</p>
                <p className="text-3xl font-bold text-blue-600">2,837</p>
              </div>
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">API Calls/Day</p>
                <p className="text-3xl font-bold text-purple-600">45,231</p>
              </div>
              <Database className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-3xl font-bold text-orange-600">99.8%</p>
              </div>
              <Wifi className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration, index) => (
          <Card key={index} className="shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(integration.status)}
                  <span>{integration.name}</span>
                </div>
                <Badge className={getStatusColor(integration.status)}>
                  {integration.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Last Sync:</span>
                  <p className="font-medium">{integration.lastSync}</p>
                </div>
                <div>
                  <span className="text-gray-500">Active Users:</span>
                  <p className="font-medium">{integration.users.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">Version:</span>
                  <p className="font-medium">{integration.version}</p>
                </div>
                <div>
                  <span className="text-gray-500">Data Flow:</span>
                  <p className="font-medium">Bidirectional</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                  <Button variant="outline" size="sm">
                    Logs
                  </Button>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Data Monitor */}
      <Card className="shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-blue-600" />
            <span>Real-time Data Monitor</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: "Timetable Update", time: "2:34 PM", status: "Success", details: "156 courses synchronized" },
              { type: "Student Attendance", time: "2:31 PM", status: "Success", details: "2,681 records updated" },
              { type: "Excuse Submission", time: "2:28 PM", status: "Success", details: "New request from Dr. Johnson" },
              { type: "Grade Update", time: "2:25 PM", status: "Warning", details: "Partial sync - 3 records failed" },
              { type: "User Login", time: "2:22 PM", status: "Success", details: "Prof. Hassan - Mobile App" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(activity.status)}
                  <div>
                    <p className="font-medium text-gray-900">{activity.type}</p>
                    <p className="text-sm text-gray-500">{activity.details}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
