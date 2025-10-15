import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Program {
  id: string;
  name: string;
  degreeType: "BACHELOR" | "MASTER" | "DIPLOMA" | "OTHER";
  code: string;
  description: string;
  collegeId: string;
}

interface ProgramLevel {
  id: string;
  programId: string;
  levelNumber: number;
  title: string;
}

interface ProgramTerm {
  id: string;
  programLevelId: string;
  termNumber: 1 | 2;
  title: string;
}

interface ProgramCourse {
  id: string;
  programTermId: string;
  courseCode: string;
  courseName: string;
  creditHours: number;
  isElective: boolean;
  departmentId?: string;
  notes: string;
}

const colleges = [
  { id: "1", name: "كلية الحاسوب" },
  { id: "2", name: "كلية الهندسة" }
];

const initialPrograms: Program[] = [
  { id: "1", name: "بكالوريوس", degreeType: "BACHELOR", code: "CS-B", description: "", collegeId: "1" },
  { id: "2", name: "ماجستير", degreeType: "MASTER", code: "CS-M", description: "", collegeId: "1" }
];

const initialLevels: ProgramLevel[] = [
  { id: "1", programId: "1", levelNumber: 1, title: "المستوى 1" },
  { id: "2", programId: "1", levelNumber: 2, title: "المستوى 2" },
  { id: "3", programId: "1", levelNumber: 3, title: "المستوى 3" },
  { id: "4", programId: "1", levelNumber: 4, title: "المستوى 4" }
];

const initialTerms: ProgramTerm[] = [
  { id: "1", programLevelId: "1", termNumber: 1, title: "الترم 1" },
  { id: "2", programLevelId: "1", termNumber: 2, title: "الترم 2" }
];

const initialCourses: ProgramCourse[] = [
  { id: "1", programTermId: "1", courseCode: "CS101", courseName: "مدخل إلى علوم الحاسوب", creditHours: 3, isElective: false, notes: "" }
];

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [levels, setLevels] = useState<ProgramLevel[]>(initialLevels);
  const [terms, setTerms] = useState<ProgramTerm[]>(initialTerms);
  const [courses, setCourses] = useState<ProgramCourse[]>(initialCourses);
  
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>("");
  const [selectedProgramId, setSelectedProgramId] = useState<string>("");
  const [selectedLevelId, setSelectedLevelId] = useState<string>("");
  const [selectedTermId, setSelectedTermId] = useState<string>("");
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    degreeType: "BACHELOR" as "BACHELOR" | "MASTER" | "DIPLOMA" | "OTHER",
    code: "",
    description: ""
  });

  const filteredPrograms = selectedCollegeId ? programs.filter(p => p.collegeId === selectedCollegeId) : [];
  const filteredLevels = selectedProgramId ? levels.filter(l => l.programId === selectedProgramId) : [];
  const filteredTerms = selectedLevelId ? terms.filter(t => t.programLevelId === selectedLevelId) : [];
  const filteredCourses = selectedTermId ? courses.filter(c => c.programTermId === selectedTermId) : [];

  const handleAddProgram = () => {
    if (!selectedCollegeId) return;
    setIsFormOpen(true);
    setEditingId(null);
    setFormData({ name: "", degreeType: "BACHELOR", code: "", description: "" });
  };

  const handleEditProgram = (program: Program) => {
    setIsFormOpen(true);
    setEditingId(program.id);
    setFormData({
      name: program.name,
      degreeType: program.degreeType,
      code: program.code,
      description: program.description
    });
  };

  const handleDeleteProgram = (id: string) => {
    setPrograms(programs.filter(p => p.id !== id));
  };

  const handleSubmitProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setPrograms(programs.map(p => p.id === editingId ? { ...p, ...formData } : p));
    } else {
      setPrograms([...programs, { id: Date.now().toString(), ...formData, collegeId: selectedCollegeId }]);
    }
    setIsFormOpen(false);
  };

  const handleAddLevel = () => {
    if (!selectedProgramId) return;
    const nextLevel = filteredLevels.length + 1;
    setLevels([...levels, {
      id: Date.now().toString(),
      programId: selectedProgramId,
      levelNumber: nextLevel,
      title: `المستوى ${nextLevel}`
    }]);
  };

  const handleAddTerm = () => {
    if (!selectedLevelId) return;
    const existingTerms = filteredTerms.length;
    if (existingTerms >= 2) return;
    const termNumber = (existingTerms + 1) as 1 | 2;
    setTerms([...terms, {
      id: Date.now().toString(),
      programLevelId: selectedLevelId,
      termNumber,
      title: `الترم ${termNumber}`
    }]);
  };

  const handleAddCourse = () => {
    if (!selectedTermId) return;
    setCourses([...courses, {
      id: Date.now().toString(),
      programTermId: selectedTermId,
      courseCode: "",
      courseName: "",
      creditHours: 3,
      isElective: false,
      notes: ""
    }]);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">البرامج الدراسية</h1>

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

        {selectedCollegeId && (
          <Tabs defaultValue="programs" className="space-y-4">
            <TabsList>
              <TabsTrigger value="programs">البرامج</TabsTrigger>
              <TabsTrigger value="plan">الخطة الدراسية</TabsTrigger>
            </TabsList>

            <TabsContent value="programs">
              <div className="flex justify-end mb-4">
                <Button onClick={handleAddProgram}>
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة برنامج
                </Button>
              </div>

              {isFormOpen && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>{editingId ? "تعديل برنامج" : "إضافة برنامج جديد"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitProgram} className="space-y-4">
                      <div>
                        <Label>اسم البرنامج *</Label>
                        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                      </div>
                      <div>
                        <Label>الدرجة *</Label>
                        <Select value={formData.degreeType} onValueChange={(value: any) => setFormData({ ...formData, degreeType: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BACHELOR">بكالوريوس</SelectItem>
                            <SelectItem value="MASTER">ماجستير</SelectItem>
                            <SelectItem value="DIPLOMA">دبلوم</SelectItem>
                            <SelectItem value="OTHER">أخرى</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>الكود *</Label>
                        <Input value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} required />
                      </div>
                      <div>
                        <Label>الوصف</Label>
                        <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit">حفظ</Button>
                        <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>إلغاء</Button>
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
                        <TableHead>اسم البرنامج</TableHead>
                        <TableHead>الدرجة</TableHead>
                        <TableHead>الكود</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPrograms.map((program) => (
                        <TableRow key={program.id}>
                          <TableCell>{program.name}</TableCell>
                          <TableCell>{program.degreeType}</TableCell>
                          <TableCell>{program.code}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditProgram(program)}>
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDeleteProgram(program.id)}>
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
            </TabsContent>

            <TabsContent value="plan" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label>اختر البرنامج</Label>
                    <Select value={selectedProgramId} onValueChange={setSelectedProgramId}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر برنامج" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredPrograms.map(program => (
                          <SelectItem key={program.id} value={program.id}>{program.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedProgramId && (
                    <>
                      <div className="flex justify-between items-center">
                        <Label>المستويات</Label>
                        <Button size="sm" onClick={handleAddLevel}>
                          <Plus className="w-4 h-4 mr-2" />
                          إضافة مستوى
                        </Button>
                      </div>
                      <Select value={selectedLevelId} onValueChange={setSelectedLevelId}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر مستوى" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredLevels.map(level => (
                            <SelectItem key={level.id} value={level.id}>{level.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </>
                  )}

                  {selectedLevelId && (
                    <>
                      <div className="flex justify-between items-center">
                        <Label>الترمات</Label>
                        <Button size="sm" onClick={handleAddTerm} disabled={filteredTerms.length >= 2}>
                          <Plus className="w-4 h-4 mr-2" />
                          إضافة ترم
                        </Button>
                      </div>
                      <Select value={selectedTermId} onValueChange={setSelectedTermId}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر ترم" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredTerms.map(term => (
                            <SelectItem key={term.id} value={term.id}>{term.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </>
                  )}

                  {selectedTermId && (
                    <>
                      <div className="flex justify-between items-center">
                        <Label>المواد</Label>
                        <Button size="sm" onClick={handleAddCourse}>
                          <Plus className="w-4 h-4 mr-2" />
                          إضافة مادة
                        </Button>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>كود المادة</TableHead>
                            <TableHead>اسم المادة</TableHead>
                            <TableHead>الساعات المعتمدة</TableHead>
                            <TableHead>اختيارية؟</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCourses.map((course) => (
                            <TableRow key={course.id}>
                              <TableCell>{course.courseCode}</TableCell>
                              <TableCell>{course.courseName}</TableCell>
                              <TableCell>{course.creditHours}</TableCell>
                              <TableCell>{course.isElective ? "نعم" : "لا"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AdminLayout>
  );
}
