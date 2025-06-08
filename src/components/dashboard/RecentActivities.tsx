
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, User, FileText, Calendar } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "user",
    message: "New instructor registered",
    user: "Dr. Sarah Johnson",
    time: "2 minutes ago",
    icon: User
  },
  {
    id: 2,
    type: "excuse",
    message: "Excuse request submitted",
    user: "Prof. Ahmed Hassan",
    time: "15 minutes ago",
    icon: FileText
  },
  {
    id: 3,
    type: "schedule",
    message: "Timetable updated",
    user: "Admin System",
    time: "1 hour ago",
    icon: Calendar
  },
  {
    id: 4,
    type: "user",
    message: "Student enrollment imported",
    user: "Batch Processing",
    time: "2 hours ago",
    icon: User
  }
];

export function RecentActivities() {
  return (
    <Card className="shadow-xl bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="p-2 bg-blue-100 rounded-full">
              <activity.icon className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
              <p className="text-sm text-gray-500">{activity.user}</p>
              <div className="flex items-center mt-1">
                <Clock className="w-3 h-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
