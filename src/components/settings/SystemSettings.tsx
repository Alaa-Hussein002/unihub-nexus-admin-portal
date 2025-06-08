
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Database, Shield, Bell, Globe } from "lucide-react";

export function SystemSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure system-wide settings and preferences</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
          <Settings className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <span>General Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="university-name">University Name</Label>
              <Input id="university-name" defaultValue="UniHub University" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input id="admin-email" type="email" defaultValue="admin@unihub.edu" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="academic-year">Academic Year</Label>
              <Input id="academic-year" defaultValue="2024-2025" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              <Switch id="maintenance-mode" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>Security Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <Switch id="two-factor" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password-policy">Strong Password Policy</Label>
              <Switch id="password-policy" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" type="number" defaultValue="30" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="audit-logs">Enable Audit Logs</Label>
              <Switch id="audit-logs" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card className="shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-blue-600" />
              <span>Database Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <select className="w-full p-2 border rounded-md">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-backup">Automatic Backups</Label>
              <Switch id="auto-backup" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retention-period">Data Retention (days)</Label>
              <Input id="retention-period" type="number" defaultValue="365" />
            </div>
            <Button variant="outline" className="w-full">
              Run Backup Now
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <Switch id="sms-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch id="push-notifications" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notification-email">Notification Email</Label>
              <Input id="notification-email" type="email" defaultValue="notifications@unihub.edu" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <Card className="shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <span>System Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">Version</h3>
              <p className="text-2xl font-bold text-blue-600">v2.1.4</p>
              <p className="text-sm text-gray-500">Released: Jan 2024</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">Database Size</h3>
              <p className="text-2xl font-bold text-green-600">2.4 GB</p>
              <p className="text-sm text-gray-500">Last backup: 2h ago</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">Server Uptime</h3>
              <p className="text-2xl font-bold text-purple-600">99.8%</p>
              <p className="text-sm text-gray-500">30-day average</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
