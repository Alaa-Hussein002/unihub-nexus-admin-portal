
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, Users, Calendar, GraduationCap, FileText, 
  BarChart3, Settings, ChevronDown, Shield, 
  Clock, DollarSign, Database
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
    badge: null
  },
  {
    title: "User Management",
    icon: Users,
    href: "/users",
    badge: null,
    subItems: [
      { title: "All Users", href: "/users" },
      { title: "Roles & Permissions", href: "/users/roles" },
      { title: "Access Control", href: "/users/access" }
    ]
  },
  {
    title: "Timetable",
    icon: Calendar,
    href: "/timetable",
    badge: null,
    subItems: [
      { title: "Import Schedule", href: "/timetable/import" },
      { title: "View Timetable", href: "/timetable/view" },
      { title: "Course Mapping", href: "/timetable/mapping" }
    ]
  },
  {
    title: "Student Enrollment",
    icon: GraduationCap,
    href: "/enrollment",
    badge: null,
    subItems: [
      { title: "Import Students", href: "/enrollment/import" },
      { title: "Manage Groups", href: "/enrollment/groups" },
      { title: "Course Assignment", href: "/enrollment/courses" }
    ]
  },
  {
    title: "Excuse Management",
    icon: FileText,
    href: "/excuses",
    badge: "3",
    subItems: [
      { title: "Pending Requests", href: "/excuses/pending" },
      { title: "Salary Adjustments", href: "/excuses/salary" },
      { title: "Audit Log", href: "/excuses/audit" }
    ]
  },
  {
    title: "Reports",
    icon: BarChart3,
    href: "/reports",
    badge: null,
    subItems: [
      { title: "Financial Reports", href: "/reports/financial" },
      { title: "Teaching Load", href: "/reports/teaching" },
      { title: "Attendance", href: "/reports/attendance" },
      { title: "Grades Overview", href: "/reports/grades" }
    ]
  },
  {
    title: "Integration",
    icon: Database,
    href: "/integration",
    badge: null,
    subItems: [
      { title: "Mobile Sync", href: "/integration/mobile" },
      { title: "API Status", href: "/integration/api" },
      { title: "Real-time Monitor", href: "/integration/monitor" }
    ]
  },
  {
    title: "Academic Staff",
    icon: GraduationCap,
    href: "/academic-staff",
    badge: null
  },
  {
    title: "Audit Log",
    icon: FileText,
    href: "/auditlog",
    badge: null
  },
  {
    title: "System Settings",
    icon: Settings,
    href: "/settings",
    badge: null
  }
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white shadow-2xl z-40 transition-all duration-300 border-r border-gray-200",
      isOpen ? "w-64" : "w-16"
    )}>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          {isOpen && (
            <div className="text-white">
              <h1 className="text-lg font-bold">UniHub</h1>
              <p className="text-xs text-blue-100">Admin Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        {menuItems.map((item) => (
          <div key={item.title} className="mb-2">
            <div
              className={cn(
                "flex items-center justify-between px-3 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 cursor-pointer group",
                location.pathname === item.href && "bg-blue-100 text-blue-700 shadow-md",
                !isOpen && "justify-center"
              )}
              onClick={() => item.subItems ? toggleExpanded(item.title) : null}
            >
              <Link 
                to={item.href} 
                className="flex items-center space-x-3 flex-1"
                onClick={(e) => item.subItems && e.preventDefault()}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && (
                  <>
                    <span className="font-medium">{item.title}</span>
                    {item.badge && (
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
              {isOpen && item.subItems && (
                <ChevronDown 
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    expandedItems.includes(item.title) && "rotate-180"
                  )} 
                />
              )}
            </div>

            {/* Sub Items */}
            {isOpen && item.subItems && expandedItems.includes(item.title) && (
              <div className="ml-6 mt-2 space-y-1">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.href}
                    to={subItem.href}
                    className={cn(
                      "block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200",
                      location.pathname === subItem.href && "text-blue-600 bg-blue-50"
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
