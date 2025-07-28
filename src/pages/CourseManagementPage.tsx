import { AdminLayout } from "@/components/layout/AdminLayout";
import { CourseManagement } from "@/components/courses/CourseManagement";

export default function CourseManagementPage() {
  return (
    <AdminLayout>
      <CourseManagement />
    </AdminLayout>
  );
}