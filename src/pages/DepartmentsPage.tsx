import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Department {
  id: string;
  name: string;
  code: string;
  collegeId: string;
}

const colleges = [
  { id: "1", name: "كلية الحاسوب" },
  { id: "2", name: "كلية الهندسة" },
  { id: "3", name: "كلية الطب" },
  { id: "4", name: "كلية التجارة" }
];

const initialDepartments: Department[] = [
  { id: "1", name: "نظم المعلومات", code: "IS", collegeId: "1" },
  { id: "2", name: "الذكاء الاصطناعي", code: "AI", collegeId: "1" },
  { id: "3", name: "علوم الحاسوب", code: "CS", collegeId: "1" },
  { id: "4", name: "هندسة البرمجيات", code: "SE", collegeId: "1" },
  { id: "5", name: "الهندسة المدنية", code: "CE", collegeId: "2" },
  { id: "6", name: "الهندسة الكهربائية", code: "EE", collegeId: "2" },
  { id: "7", name: "الهندسة الميكانيكية", code: "ME", collegeId: "2" }
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    code: ""
  });

  const filteredDepartments = selectedCollegeId
    ? departments.filter(d => d.collegeId === selectedCollegeId)
    : [];

  const handleAdd = () => {
    if (!selectedCollegeId) return;
    setIsFormOpen(true);
    setEditingId(null);
    setFormData({ name: "", code: "" });
  };

  const handleEdit = (department: Department) => {
    setIsFormOpen(true);
    setEditingId(department.id);
    setFormData({
      name: department.name,
      code: department.code
    });
  };

  const handleDelete = (id: string) => {
    setDepartments(departments.filter(d => d.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setDepartments(departments.map(d => d.id === editingId ? { ...d, ...formData } : d));
    } else {
      setDepartments([...departments, { id: Date.now().toString(), ...formData, collegeId: selectedCollegeId }]);
    }
    setIsFormOpen(false);
    setFormData({ name: "", code: "" });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">الأقسام</h1>
          <Button onClick={handleAdd} disabled={!selectedCollegeId}>
            <Plus className="w-4 h-4 mr-2" />
            إضافة قسم
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <Label>اختر الكلية</Label>
            <Select value={selectedCollegeId} onValueChange={setSelectedCollegeId}>
              <SelectTrigger>
                <SelectValue placeholder="اختر كلية" />
              </SelectTrigger>
              <SelectContent>
                {colleges.map(college => (
                  <SelectItem key={college.id} value={college.id}>
                    {college.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {isFormOpen && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingId ? "تعديل قسم" : "إضافة قسم جديد"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>اسم القسم *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>كود القسم (اختياري)</Label>
                  <Input
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">حفظ</Button>
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {selectedCollegeId && (
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم القسم</TableHead>
                    <TableHead>كود القسم (اختياري)</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDepartments.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell>{dept.name}</TableCell>
                      <TableCell>{dept.code}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(dept)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(dept.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
