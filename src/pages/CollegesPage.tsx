import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";

interface College {
  id: string;
  name: string;
  academicCode: string;
  randomCode: string;
}

const generateRandomCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

const initialColleges: College[] = [
  { id: "1", name: "كلية الحاسوب", academicCode: "CS-100", randomCode: generateRandomCode() },
  { id: "2", name: "كلية الهندسة", academicCode: "ENG-200", randomCode: generateRandomCode() },
  { id: "3", name: "كلية الطب", academicCode: "MED-300", randomCode: generateRandomCode() },
  { id: "4", name: "كلية التجارة", academicCode: "BUS-400", randomCode: generateRandomCode() }
];

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>(initialColleges);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    academicCode: "",
    randomCode: ""
  });

  const handleAdd = () => {
    setIsFormOpen(true);
    setEditingId(null);
    setFormData({ name: "", academicCode: "", randomCode: generateRandomCode() });
  };

  const handleEdit = (college: College) => {
    setIsFormOpen(true);
    setEditingId(college.id);
    setFormData({
      name: college.name,
      academicCode: college.academicCode,
      randomCode: college.randomCode
    });
  };

  const handleDelete = (id: string) => {
    setColleges(colleges.filter(c => c.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setColleges(colleges.map(c => c.id === editingId ? { ...c, ...formData } : c));
    } else {
      setColleges([...colleges, { id: Date.now().toString(), ...formData }]);
    }
    setIsFormOpen(false);
    setFormData({ name: "", academicCode: "", randomCode: "" });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">الكليات</h1>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            إضافة كلية
          </Button>
        </div>

        {isFormOpen && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingId ? "تعديل كلية" : "إضافة كلية جديدة"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>اسم الكلية *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>الكود الأكاديمي *</Label>
                  <Input
                    value={formData.academicCode}
                    onChange={(e) => setFormData({ ...formData, academicCode: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>الرقم العشوائي</Label>
                  <Input
                    value={formData.randomCode}
                    onChange={(e) => setFormData({ ...formData, randomCode: e.target.value })}
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

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم الكلية</TableHead>
                  <TableHead>الكود الأكاديمي</TableHead>
                  <TableHead>الرقم العشوائي</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {colleges.map((college) => (
                  <TableRow key={college.id}>
                    <TableCell>{college.name}</TableCell>
                    <TableCell>{college.academicCode}</TableCell>
                    <TableCell>{college.randomCode}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(college)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(college.id)}>
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
      </div>
    </AdminLayout>
  );
}
