
import { KPICards } from "./KPICards";
import { QuickActions } from "./QuickActions";
import { RecentActivities } from "./RecentActivities";
import { SystemHealth } from "./SystemHealth";
import { EnrollmentChart } from "./EnrollmentChart";
import { InstructorWorkload } from "./InstructorWorkload";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to UniHub Admin Portal</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      <KPICards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <EnrollmentChart />
          <InstructorWorkload />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <RecentActivities />
          <SystemHealth />
        </div>
      </div>
    </div>
  );
}
