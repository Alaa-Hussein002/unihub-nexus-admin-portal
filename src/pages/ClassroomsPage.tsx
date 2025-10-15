import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Classroom {
  id: string;
  name: string;
  type: "CLASSROOM" | "LAB";
  capacity: number;
  isAvailable: boolean;
  notes: string;
  collegeId: string;
}

const colleges = [
  { id: "1", name: "كلية الحاسوب" },
  { id: "2", name: "كلية الهندسة" },
  { id: "3", name: "كلية الطب" },
  { id: "4", name: "كلية التجارة" }
];

const initialClassrooms: Classroom[] = [
  { id: "1", name: "C-101", type: "CLASSROOM", capacity: 60, isAvailable: true, notes: "", collegeId: "1" },
  { id: "2", name: "C-102", type: "CLASSROOM", capacity: 40, isAvailable: false, notes: "", collegeId: "1" },
  { id: "3", name: "Lab-1", type: "LAB", capacity: 30, isAvailable: true, notes: "", collegeId: "1" },
  { id: "4", name: "E-201", type: "CLASSROOM", capacity: 80, isAvailable: true, notes: "", collegeId: "2" },
  { id: "5", name: "Lab-2", type: "LAB", capacity: 25, isAvailable: true, notes: "", collegeId: "2" }
];

export default function ClassroomsPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>(initialClassrooms);
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "CLASSROOM" as "CLASSROOM" | "LAB",
    capacity: 0,
    isAvailable: true,
    notes: ""
  });

  const filteredClassrooms = selectedCollegeId
    ? classrooms.filter(c => c.collegeId === selectedCollegeId)
    : [];

  const handleAdd = () => {
    if (!selectedCollegeId) return;
    setIsFormOpen(true);
    setEditingId(null);
    setFormData({ name: "", type: "CLASSROOM", capacity: 0, isAvailable: true, notes: "" });
  };

  const handleEdit = (classroom: Classroom) => {
    setIsFormOpen(true);
    setEditingId(classroom.id);
    setFormData({
      name: classroom.name,
      type: classroom.type,
      capacity: classroom.capacity,
      isAvailable: classroom.isAvailable,
      notes: classroom.notes
    });
  };

  const handleDelete = (id: string) => {
    setClassrooms(classrooms.filter(c => c.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setClassrooms(classrooms.map(c => c.id === id ? { ...c, isAvailable: !c.isAvailable } : c));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setClassrooms(classrooms.map(c => c.id === editingId ? { ...c, ...formData } : c));
    } else {
      setClassrooms([...classrooms, { id: Date.now().toString(), ...formData, collegeId: selectedCollegeId }]);
    }
    setIsFormOpen(false);
    setFormData({ name: "", type: "CLASSROOM", capacity: 0, isAvailable: true, notes: "" });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">القاعات الدراسية</h1>
          <Button onClick={handleAdd} disabled={!selectedCollegeId}>
            <Plus className="w-4 h-4 mr-2" />
            إضافة قاعة
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
              <CardTitle>{editingId ? "تعديل قاعة" : "إضافة قاعة جديدة"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>الاسم *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>النوع *</Label>
                  <Select value={formData.type} onValueChange={(value: "CLASSROOM" | "LAB") => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLASSROOM">قاعة</SelectItem>
                      <SelectItem value="LAB">معمل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>السعة *</Label>
                  <Input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div>
                  <Label>الحالة</Label>
                  <Select value={formData.isAvailable.toString()} onValueChange={(value) => setFormData({ ...formData, isAvailable: value === "true" })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">متاحة</SelectItem>
                      <SelectItem value="false">غير متاحة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>ملاحظات</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
                    <TableHead>الاسم</TableHead>
                    <TableHead>النوع (قاعة/معمل)</TableHead>
                    <TableHead>السعة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>ملاحظات</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClassrooms.map((classroom) => (
                    <TableRow key={classroom.id}>
                      <TableCell>{classroom.name}</TableCell>
                      <TableCell>{classroom.type === "CLASSROOM" ? "قاعة" : "معمل"}</TableCell>
                      <TableCell>{classroom.capacity}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant={classroom.isAvailable ? "default" : "outline"}
                          onClick={() => toggleAvailability(classroom.id)}
                        >
                          {classroom.isAvailable ? "متاحة" : "غير متاحة"}
                        </Button>
                      </TableCell>
                      <TableCell>{classroom.notes}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(classroom)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(classroom.id)}>
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
