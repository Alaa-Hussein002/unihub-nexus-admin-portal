
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UsersPage from "./pages/UsersPage";
import RolesPage from "./pages/RolesPage";
import AccessControlPage from "./pages/AccessControlPage";
import TimetablePage from "./pages/TimetablePage";
import EnrollmentPage from "./pages/EnrollmentPage";
import ExcusesPage from "./pages/ExcusesPage";
import ReportsPage from "./pages/ReportsPage";
import IntegrationPage from "./pages/IntegrationPage";
import SettingsPage from "./pages/SettingsPage";
import AuditLogPage from "./pages/AuditLogPage";
import AcademicStaffPage from "./pages/AcademicStaffPage";
import CourseManagementPage from "./pages/CourseManagementPage";
import LoginPage from "./components/auth/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Index />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/roles" element={<RolesPage />} />
          <Route path="/users/access-control" element={<AccessControlPage />} />
          <Route path="/timetable/*" element={<TimetablePage />} />
          <Route path="/enrollment/*" element={<EnrollmentPage />} />
          <Route path="/excuses/*" element={<ExcusesPage />} />
          <Route path="/reports/*" element={<ReportsPage />} />
          <Route path="/integration/*" element={<IntegrationPage />} />
          <Route path="/academic-staff" element={<AcademicStaffPage />} />
          <Route path="/course-management/*" element={<CourseManagementPage />} />
          <Route path="/auditlog" element={<AuditLogPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
