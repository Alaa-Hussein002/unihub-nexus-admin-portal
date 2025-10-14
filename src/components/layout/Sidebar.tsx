
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, Users, Calendar, GraduationCap, FileText, 
  BarChart3, Settings, ChevronDown, 
  Clock, DollarSign, Database, BookOpen
} from "lucide-react";
import logoSidebar from "@/assets/logo-sidebar.png";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
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
    title: "Course Management",
    icon: BookOpen,
    href: "/course-management",
    badge: null,
    subItems: [
      { title: "Department View", href: "/course-management/departments" },
      { title: "Grade Reports", href: "/course-management/grades" },
      { title: "Export Data", href: "/course-management/export" }
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

export function Sidebar({ isOpen, onToggle, isMobile = false }: SidebarProps) {
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
      "fixed left-0 top-0 h-full bg-sidebar shadow-2xl z-40 transition-all duration-300 border-r border-sidebar-border flex flex-col",
      isOpen ? "w-64" : isMobile ? "w-0 overflow-hidden" : "w-16",
      isMobile && "z-50"
    )}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-center px-2 sm:px-4 border-b border-sidebar-border bg-sidebar flex-shrink-0">
        <img src={logoSidebar} alt="UniHub" className={isOpen || isMobile ? "h-14 w-auto" : "h-12 w-auto object-contain"} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-transparent hover:scrollbar-thumb-sidebar-accent/80 pt-4 sm:pt-6 px-2 sm:px-3 pb-6">
        <div className="space-y-1 sm:space-y-2">
          {menuItems.map((item) => (
            <div key={item.title} className="mb-1 sm:mb-2">
              <div
                className={cn(
                  "flex items-center justify-between px-2 sm:px-3 py-2 sm:py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 cursor-pointer group",
                  location.pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground shadow-md",
                  (!isOpen && !isMobile) && "justify-center",
                  "text-sm sm:text-base"
                )}
                onClick={() => {
                  if (item.subItems) {
                    toggleExpanded(item.title);
                  } else if (isMobile) {
                    onToggle();
                  }
                }}
              >
                <Link 
                  to={item.href} 
                  className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0"
                  onClick={(e) => {
                    if (item.subItems) {
                      e.preventDefault();
                    } else if (isMobile) {
                      onToggle();
                    }
                  }}
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  {(isOpen || isMobile) && (
                    <>
                      <span className="font-medium truncate">{item.title}</span>
                      {item.badge && (
                        <span className="bg-destructive/10 text-destructive text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
                {(isOpen || isMobile) && item.subItems && (
                  <ChevronDown 
                    className={cn(
                      "w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 flex-shrink-0",
                      expandedItems.includes(item.title) && "rotate-180"
                    )} 
                  />
                )}
              </div>

              {/* Sub Items */}
              {(isOpen || isMobile) && item.subItems && expandedItems.includes(item.title) && (
                <div className="ml-4 sm:ml-6 mt-1 sm:mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      to={subItem.href}
                      className={cn(
                        "block px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-sidebar-foreground/80 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent rounded-lg transition-colors duration-200",
                        location.pathname === subItem.href && "text-sidebar-accent-foreground bg-sidebar-accent"
                      )}
                      onClick={() => isMobile && onToggle()}
                    >
                      <span className="truncate">{subItem.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
