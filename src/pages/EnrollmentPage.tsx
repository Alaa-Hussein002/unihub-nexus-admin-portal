
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { EnrollmentManagement } from "@/components/enrollment/EnrollmentManagement";
import { StudentImport } from "@/components/enrollment/StudentImport";

const EnrollmentPage = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<EnrollmentManagement />} />
        <Route path="import" element={<StudentImport />} />
        <Route path="*" element={<Navigate to="/enrollment" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default EnrollmentPage;
