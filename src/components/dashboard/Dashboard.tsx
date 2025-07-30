
import { KPICards } from "./KPICards";
import { QuickActions } from "./QuickActions";
import { RecentActivities } from "./RecentActivities";
import { SystemHealth } from "./SystemHealth";
import { EnrollmentChart } from "./EnrollmentChart";
import { InstructorWorkload } from "./InstructorWorkload";

export function Dashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Welcome to UniHub Admin Portal</p>
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      <KPICards />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
          <EnrollmentChart />
          <InstructorWorkload />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <QuickActions />
          <RecentActivities />
          <SystemHealth />
        </div>
      </div>
    </div>
  );
}
