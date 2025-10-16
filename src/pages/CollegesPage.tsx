import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus, ArrowLeft, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Data types
interface College {
  id: string;
  name: string;
  academicCode: string;
  randomCode: string;
}

interface Department {
  id: string;
  name: string;
  code: string;
  collegeId: string;
}

interface Classroom {
  id: string;
  name: string;
  type: "CLASSROOM" | "LAB";
  capacity: number;
  isAvailable: boolean;
  notes: string;
  collegeId: string;
}

interface Program {
  id: string;
  name: string;
  degreeType: "BACHELOR" | "MASTER" | "DIPLOMA" | "OTHER";
  code: string;
  description: string;
  collegeId: string;
  departmentId: string;
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

const generateRandomCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

// Initial mock data
const initialColleges: College[] = [
  { id: "1", name: "كلية الحاسوب", academicCode: "CS-100", randomCode: generateRandomCode() },
  { id: "2", name: "كلية الطب", academicCode: "MED-300", randomCode: generateRandomCode() },
  { id: "3", name: "كلية اللغات", academicCode: "LANG-200", randomCode: generateRandomCode() },
  { id: "4", name: "كلية الإعلام", academicCode: "MEDIA-400", randomCode: generateRandomCode() }
];

const initialDepartments: Department[] = [
  { id: "d1", name: "نظم المعلومات", code: "IS", collegeId: "1" },
  { id: "d2", name: "الذكاء الاصطناعي", code: "AI", collegeId: "1" },
  { id: "d3", name: "علوم الحاسوب", code: "CS", collegeId: "1" },
  { id: "d4", name: "هندسة البرمجيات", code: "SE", collegeId: "1" }
];

const initialClassrooms: Classroom[] = [
  { id: "c1", name: "C-101", type: "CLASSROOM", capacity: 60, isAvailable: true, notes: "", collegeId: "1" },
  { id: "c2", name: "C-102", type: "CLASSROOM", capacity: 40, isAvailable: false, notes: "", collegeId: "1" },
  { id: "c3", name: "Lab-1", type: "LAB", capacity: 30, isAvailable: true, notes: "", collegeId: "1" }
];

const initialPrograms: Program[] = [
  { id: "p1", name: "بكالوريوس نظم المعلومات", degreeType: "BACHELOR", code: "IS-B", description: "", collegeId: "1", departmentId: "d1" },
  { id: "p2", name: "ماجستير نظم المعلومات", degreeType: "MASTER", code: "IS-M", description: "", collegeId: "1", departmentId: "d1" }
];

const initialLevels: ProgramLevel[] = [
  { id: "l1", programId: "p1", levelNumber: 1, title: "المستوى 1" },
  { id: "l2", programId: "p1", levelNumber: 2, title: "المستوى 2" },
  { id: "l3", programId: "p1", levelNumber: 3, title: "المستوى 3" },
  { id: "l4", programId: "p1", levelNumber: 4, title: "المستوى 4" }
];

const initialTerms: ProgramTerm[] = [
  { id: "t1", programLevelId: "l1", termNumber: 1, title: "الترم 1" },
  { id: "t2", programLevelId: "l1", termNumber: 2, title: "الترم 2" }
];

const initialCourses: ProgramCourse[] = [
  { id: "co1", programTermId: "t1", courseCode: "CS101", courseName: "مدخل إلى علوم الحاسوب", creditHours: 3, isElective: false, notes: "" }
];

export default function CollegesPage() {
  // State
  const [colleges, setColleges] = useState<College[]>(initialColleges);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [classrooms, setClassrooms] = useState<Classroom[]>(initialClassrooms);
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [levels, setLevels] = useState<ProgramLevel[]>(initialLevels);
  const [terms, setTerms] = useState<ProgramTerm[]>(initialTerms);
  const [courses, setCourses] = useState<ProgramCourse[]>(initialCourses);

  // UI state
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<ProgramLevel | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<ProgramTerm | null>(null);

  // Form states
  const [isCollegeFormOpen, setIsCollegeFormOpen] = useState(false);
  const [editingCollegeId, setEditingCollegeId] = useState<string | null>(null);
  const [collegeFormData, setCollegeFormData] = useState({ name: "", academicCode: "", randomCode: "" });

  const [isDeptFormOpen, setIsDeptFormOpen] = useState(false);
  const [editingDeptId, setEditingDeptId] = useState<string | null>(null);
  const [deptFormData, setDeptFormData] = useState({ name: "", code: "" });

  const [isClassroomFormOpen, setIsClassroomFormOpen] = useState(false);
  const [editingClassroomId, setEditingClassroomId] = useState<string | null>(null);
  const [classroomFormData, setClassroomFormData] = useState({ name: "", type: "CLASSROOM" as "CLASSROOM" | "LAB", capacity: 0, isAvailable: true, notes: "" });

  const [isProgramFormOpen, setIsProgramFormOpen] = useState(false);
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
  const [programFormData, setProgramFormData] = useState({ name: "", degreeType: "BACHELOR" as "BACHELOR" | "MASTER" | "DIPLOMA" | "OTHER", code: "", description: "" });

  const [isLevelFormOpen, setIsLevelFormOpen] = useState(false);
  const [editingLevelId, setEditingLevelId] = useState<string | null>(null);
  const [levelFormData, setLevelFormData] = useState({ levelNumber: 1 });

  const [isTermFormOpen, setIsTermFormOpen] = useState(false);
  const [editingTermId, setEditingTermId] = useState<string | null>(null);
  const [termFormData, setTermFormData] = useState({ termNumber: 1 as 1 | 2 });

  const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseFormData, setCourseFormData] = useState({ courseCode: "", courseName: "", creditHours: 3, isElective: false, departmentId: "", notes: "" });

  // College CRUD
  const handleAddCollege = () => {
    setIsCollegeFormOpen(true);
    setEditingCollegeId(null);
    setCollegeFormData({ name: "", academicCode: "", randomCode: generateRandomCode() });
  };

  const handleEditCollege = (college: College) => {
    setIsCollegeFormOpen(true);
    setEditingCollegeId(college.id);
    setCollegeFormData({ name: college.name, academicCode: college.academicCode, randomCode: college.randomCode });
  };

  const handleDeleteCollege = (id: string) => {
    setColleges(colleges.filter(c => c.id !== id));
    if (selectedCollege?.id === id) setSelectedCollege(null);
  };

  const handleSubmitCollege = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCollegeId) {
      setColleges(colleges.map(c => c.id === editingCollegeId ? { ...c, ...collegeFormData } : c));
    } else {
      setColleges([...colleges, { id: Date.now().toString(), ...collegeFormData }]);
    }
    setIsCollegeFormOpen(false);
  };

  // Department CRUD
  const handleAddDept = () => {
    if (!selectedCollege) return;
    setIsDeptFormOpen(true);
    setEditingDeptId(null);
    setDeptFormData({ name: "", code: "" });
  };

  const handleEditDept = (dept: Department) => {
    setIsDeptFormOpen(true);
    setEditingDeptId(dept.id);
    setDeptFormData({ name: dept.name, code: dept.code });
  };

  const handleDeleteDept = (id: string) => {
    setDepartments(departments.filter(d => d.id !== id));
    if (selectedDepartment?.id === id) setSelectedDepartment(null);
  };

  const handleSubmitDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCollege) return;
    if (editingDeptId) {
      setDepartments(departments.map(d => d.id === editingDeptId ? { ...d, ...deptFormData } : d));
    } else {
      setDepartments([...departments, { id: Date.now().toString(), collegeId: selectedCollege.id, ...deptFormData }]);
    }
    setIsDeptFormOpen(false);
  };

  // Classroom CRUD
  const handleAddClassroom = () => {
    if (!selectedCollege) return;
    setIsClassroomFormOpen(true);
    setEditingClassroomId(null);
    setClassroomFormData({ name: "", type: "CLASSROOM", capacity: 0, isAvailable: true, notes: "" });
  };

  const handleEditClassroom = (classroom: Classroom) => {
    setIsClassroomFormOpen(true);
    setEditingClassroomId(classroom.id);
    setClassroomFormData({ name: classroom.name, type: classroom.type, capacity: classroom.capacity, isAvailable: classroom.isAvailable, notes: classroom.notes });
  };

  const handleDeleteClassroom = (id: string) => {
    setClassrooms(classrooms.filter(c => c.id !== id));
  };

  const handleSubmitClassroom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCollege) return;
    if (editingClassroomId) {
      setClassrooms(classrooms.map(c => c.id === editingClassroomId ? { ...c, ...classroomFormData } : c));
    } else {
      setClassrooms([...classrooms, { id: Date.now().toString(), collegeId: selectedCollege.id, ...classroomFormData }]);
    }
    setIsClassroomFormOpen(false);
  };

  // Program CRUD
  const handleAddProgram = () => {
    if (!selectedDepartment) return;
    setIsProgramFormOpen(true);
    setEditingProgramId(null);
    setProgramFormData({ name: "", degreeType: "BACHELOR", code: "", description: "" });
  };

  const handleEditProgram = (program: Program) => {
    setIsProgramFormOpen(true);
    setEditingProgramId(program.id);
    setProgramFormData({ name: program.name, degreeType: program.degreeType, code: program.code, description: program.description });
  };

  const handleDeleteProgram = (id: string) => {
    setPrograms(programs.filter(p => p.id !== id));
    if (selectedProgram?.id === id) setSelectedProgram(null);
  };

  const handleSubmitProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDepartment || !selectedCollege) return;
    if (editingProgramId) {
      setPrograms(programs.map(p => p.id === editingProgramId ? { ...p, ...programFormData } : p));
    } else {
      setPrograms([...programs, { id: Date.now().toString(), collegeId: selectedCollege.id, departmentId: selectedDepartment.id, ...programFormData }]);
    }
    setIsProgramFormOpen(false);
  };

  // Level CRUD
  const handleAddLevel = () => {
    if (!selectedProgram) return;
    setIsLevelFormOpen(true);
    setEditingLevelId(null);
    setLevelFormData({ levelNumber: 1 });
  };

  const handleEditLevel = (level: ProgramLevel) => {
    setIsLevelFormOpen(true);
    setEditingLevelId(level.id);
    setLevelFormData({ levelNumber: level.levelNumber });
  };

  const handleDeleteLevel = (id: string) => {
    setLevels(levels.filter(l => l.id !== id));
    if (selectedLevel?.id === id) setSelectedLevel(null);
  };

  const handleSubmitLevel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) return;
    if (editingLevelId) {
      setLevels(levels.map(l => l.id === editingLevelId ? { ...l, levelNumber: levelFormData.levelNumber, title: `المستوى ${levelFormData.levelNumber}` } : l));
    } else {
      setLevels([...levels, { id: Date.now().toString(), programId: selectedProgram.id, levelNumber: levelFormData.levelNumber, title: `المستوى ${levelFormData.levelNumber}` }]);
    }
    setIsLevelFormOpen(false);
  };

  // Term CRUD
  const handleAddTerm = () => {
    if (!selectedLevel) return;
    setIsTermFormOpen(true);
    setEditingTermId(null);
    setTermFormData({ termNumber: 1 });
  };

  const handleEditTerm = (term: ProgramTerm) => {
    setIsTermFormOpen(true);
    setEditingTermId(term.id);
    setTermFormData({ termNumber: term.termNumber });
  };

  const handleDeleteTerm = (id: string) => {
    setTerms(terms.filter(t => t.id !== id));
    if (selectedTerm?.id === id) setSelectedTerm(null);
  };

  const handleSubmitTerm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLevel) return;
    if (editingTermId) {
      setTerms(terms.map(t => t.id === editingTermId ? { ...t, termNumber: termFormData.termNumber, title: `الترم ${termFormData.termNumber}` } : t));
    } else {
      setTerms([...terms, { id: Date.now().toString(), programLevelId: selectedLevel.id, termNumber: termFormData.termNumber, title: `الترم ${termFormData.termNumber}` }]);
    }
    setIsTermFormOpen(false);
  };

  // Course CRUD
  const handleAddCourse = () => {
    if (!selectedTerm) return;
    setIsCourseFormOpen(true);
    setEditingCourseId(null);
    setCourseFormData({ courseCode: "", courseName: "", creditHours: 3, isElective: false, departmentId: "", notes: "" });
  };

  const handleEditCourse = (course: ProgramCourse) => {
    setIsCourseFormOpen(true);
    setEditingCourseId(course.id);
    setCourseFormData({ courseCode: course.courseCode, courseName: course.courseName, creditHours: course.creditHours, isElective: course.isElective, departmentId: course.departmentId || "", notes: course.notes });
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const handleSubmitCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTerm) return;
    if (editingCourseId) {
      setCourses(courses.map(c => c.id === editingCourseId ? { ...c, ...courseFormData, departmentId: courseFormData.departmentId || undefined } : c));
    } else {
      setCourses([...courses, { id: Date.now().toString(), programTermId: selectedTerm.id, ...courseFormData, departmentId: courseFormData.departmentId || undefined }]);
    }
    setIsCourseFormOpen(false);
  };

  const collegeDepartments = selectedCollege ? departments.filter(d => d.collegeId === selectedCollege.id) : [];
  const collegeClassrooms = selectedCollege ? classrooms.filter(c => c.collegeId === selectedCollege.id) : [];
  const departmentPrograms = selectedDepartment ? programs.filter(p => p.departmentId === selectedDepartment.id) : [];
  const programLevels = selectedProgram ? levels.filter(l => l.programId === selectedProgram.id) : [];
  const levelTerms = selectedLevel ? terms.filter(t => t.programLevelId === selectedLevel.id) : [];
  const termCourses = selectedTerm ? courses.filter(c => c.programTermId === selectedTerm.id) : [];

  return (
    <AdminLayout>
      <div className="p-3 sm:p-6">
        {!selectedCollege ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold">الكليات</h1>
              <Button onClick={handleAddCollege}>
                <Plus className="w-4 h-4 mr-2" />
                إضافة كلية
              </Button>
            </div>

            {isCollegeFormOpen && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{editingCollegeId ? "تعديل كلية" : "إضافة كلية جديدة"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitCollege} className="space-y-4">
                    <div>
                      <Label>اسم الكلية *</Label>
                      <Input value={collegeFormData.name} onChange={(e) => setCollegeFormData({ ...collegeFormData, name: e.target.value })} required />
                    </div>
                    <div>
                      <Label>الكود الأكاديمي *</Label>
                      <Input value={collegeFormData.academicCode} onChange={(e) => setCollegeFormData({ ...collegeFormData, academicCode: e.target.value })} required />
                    </div>
                    <div>
                      <Label>الرقم العشوائي</Label>
                      <Input value={collegeFormData.randomCode} onChange={(e) => setCollegeFormData({ ...collegeFormData, randomCode: e.target.value })} />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">حفظ</Button>
                      <Button type="button" variant="outline" onClick={() => setIsCollegeFormOpen(false)}>إلغاء</Button>
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
                      <TableRow key={college.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedCollege(college)}>
                        <TableCell className="font-medium">{college.name}</TableCell>
                        <TableCell>{college.academicCode}</TableCell>
                        <TableCell>{college.randomCode}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleEditCollege(college); }}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleDeleteCollege(college.id); }}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setSelectedCollege(college); }}>
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <div className="mb-6">
              <Button variant="outline" onClick={() => { setSelectedCollege(null); setSelectedDepartment(null); setSelectedProgram(null); setSelectedLevel(null); setSelectedTerm(null); }}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                العودة للكليات
              </Button>
              <h1 className="text-2xl sm:text-3xl font-bold mt-4">{selectedCollege.name}</h1>
            </div>

            <Tabs defaultValue="departments" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="departments">الأقسام</TabsTrigger>
                <TabsTrigger value="classrooms">القاعات الدراسية</TabsTrigger>
                <TabsTrigger value="Academic Staff">أعضاء هيئة التدريس</TabsTrigger>
                <TabsTrigger value="programs">لوحة التحكم</TabsTrigger>
              </TabsList>

              <TabsContent value="departments">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">الأقسام</h2>
                    <Button onClick={handleAddDept}>
                      <Plus className="w-4 h-4 mr-2" />
                      إضافة قسم
                    </Button>
                  </div>

                  {isDeptFormOpen && (
                    <Card>
                      <CardHeader>
                        <CardTitle>{editingDeptId ? "تعديل قسم" : "إضافة قسم جديد"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmitDept} className="space-y-4">
                          <div>
                            <Label>اسم القسم *</Label>
                            <Input value={deptFormData.name} onChange={(e) => setDeptFormData({ ...deptFormData, name: e.target.value })} required />
                          </div>
                          <div>
                            <Label>كود القسم</Label>
                            <Input value={deptFormData.code} onChange={(e) => setDeptFormData({ ...deptFormData, code: e.target.value })} />
                          </div>
                          <div className="flex gap-2">
                            <Button type="submit">حفظ</Button>
                            <Button type="button" variant="outline" onClick={() => setIsDeptFormOpen(false)}>إلغاء</Button>
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
                            <TableHead>اسم القسم</TableHead>
                            <TableHead>كود القسم</TableHead>
                            <TableHead>الإجراءات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {collegeDepartments.map((dept) => (
                            <TableRow key={dept.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedDepartment(dept)}>
                              <TableCell className="font-medium">{dept.name}</TableCell>
                              <TableCell>{dept.code}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleEditDept(dept); }}>
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleDeleteDept(dept.id); }}>
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

                  {selectedDepartment && (
                    <Card className="mt-6">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>البرامج - {selectedDepartment.name}</CardTitle>
                          <Button onClick={handleAddProgram} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            إضافة برنامج
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {isProgramFormOpen && (
                          <Card className="mb-4">
                            <CardContent className="pt-6">
                              <form onSubmit={handleSubmitProgram} className="space-y-4">
                                <div>
                                  <Label>اسم البرنامج *</Label>
                                  <Input value={programFormData.name} onChange={(e) => setProgramFormData({ ...programFormData, name: e.target.value })} required />
                                </div>
                                <div>
                                  <Label>الدرجة *</Label>
                                  <Select value={programFormData.degreeType} onValueChange={(value: any) => setProgramFormData({ ...programFormData, degreeType: value })}>
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
                                  <Input value={programFormData.code} onChange={(e) => setProgramFormData({ ...programFormData, code: e.target.value })} required />
                                </div>
                                <div>
                                  <Label>الوصف</Label>
                                  <Textarea value={programFormData.description} onChange={(e) => setProgramFormData({ ...programFormData, description: e.target.value })} />
                                </div>
                                <div className="flex gap-2">
                                  <Button type="submit">حفظ</Button>
                                  <Button type="button" variant="outline" onClick={() => setIsProgramFormOpen(false)}>إلغاء</Button>
                                </div>
                              </form>
                            </CardContent>
                          </Card>
                        )}

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
                            {departmentPrograms.map((program) => (
                              <TableRow key={program.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedProgram(program)}>
                                <TableCell className="font-medium">{program.name}</TableCell>
                                <TableCell>{program.degreeType === "BACHELOR" ? "بكالوريوس" : program.degreeType === "MASTER" ? "ماجستير" : program.degreeType === "DIPLOMA" ? "دبلوم" : "أخرى"}</TableCell>
                                <TableCell>{program.code}</TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleEditProgram(program); }}>
                                      <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleDeleteProgram(program.id); }}>
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        {selectedProgram && (
                          <Card className="mt-6">
                            <CardHeader>
                              <CardTitle>الخطة الدراسية - {selectedProgram.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-6">
                                {/* Levels */}
                                <div>
                                  <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">المستويات</h3>
                                    <Button onClick={handleAddLevel} size="sm">
                                      <Plus className="w-4 h-4 mr-2" />
                                      إضافة مستوى
                                    </Button>
                                  </div>

                                  {isLevelFormOpen && (
                                    <Card className="mb-4">
                                      <CardContent className="pt-6">
                                        <form onSubmit={handleSubmitLevel} className="space-y-4">
                                          <div>
                                            <Label>رقم المستوى *</Label>
                                            <Input type="number" value={levelFormData.levelNumber} onChange={(e) => setLevelFormData({ levelNumber: parseInt(e.target.value) })} required />
                                          </div>
                                          <div className="flex gap-2">
                                            <Button type="submit">حفظ</Button>
                                            <Button type="button" variant="outline" onClick={() => setIsLevelFormOpen(false)}>إلغاء</Button>
                                          </div>
                                        </form>
                                      </CardContent>
                                    </Card>
                                  )}

                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {programLevels.map((level) => (
                                      <Card key={level.id} className={cn("cursor-pointer", selectedLevel?.id === level.id && "border-primary")} onClick={() => setSelectedLevel(level)}>
                                        <CardContent className="pt-6">
                                          <div className="flex justify-between items-start">
                                            <div>
                                              <h4 className="font-semibold">{level.title}</h4>
                                            </div>
                                            <div className="flex gap-1">
                                              <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleEditLevel(level); }}>
                                                <Pencil className="w-3 h-3" />
                                              </Button>
                                              <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDeleteLevel(level.id); }}>
                                                <Trash2 className="w-3 h-3" />
                                              </Button>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                </div>

                                {/* Terms */}
                                {selectedLevel && (
                                  <div>
                                    <div className="flex justify-between items-center mb-4">
                                      <h3 className="text-lg font-semibold">الفصول - {selectedLevel.title}</h3>
                                      <Button onClick={handleAddTerm} size="sm">
                                        <Plus className="w-4 h-4 mr-2" />
                                        إضافة فصل
                                      </Button>
                                    </div>

                                    {isTermFormOpen && (
                                      <Card className="mb-4">
                                        <CardContent className="pt-6">
                                          <form onSubmit={handleSubmitTerm} className="space-y-4">
                                            <div>
                                              <Label>رقم الترم *</Label>
                                              <Select value={termFormData.termNumber.toString()} onValueChange={(value) => setTermFormData({ termNumber: parseInt(value) as 1 | 2 })}>
                                                <SelectTrigger>
                                                  <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="1">الترم 1</SelectItem>
                                                  <SelectItem value="2">الترم 2</SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </div>
                                            <div className="flex gap-2">
                                              <Button type="submit">حفظ</Button>
                                              <Button type="button" variant="outline" onClick={() => setIsTermFormOpen(false)}>إلغاء</Button>
                                            </div>
                                          </form>
                                        </CardContent>
                                      </Card>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {levelTerms.map((term) => (
                                        <Card key={term.id} className={cn("cursor-pointer", selectedTerm?.id === term.id && "border-primary")} onClick={() => setSelectedTerm(term)}>
                                          <CardContent className="pt-6">
                                            <div className="flex justify-between items-start">
                                              <div>
                                                <h4 className="font-semibold">{term.title}</h4>
                                              </div>
                                              <div className="flex gap-1">
                                                <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleEditTerm(term); }}>
                                                  <Pencil className="w-3 h-3" />
                                                </Button>
                                                <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDeleteTerm(term.id); }}>
                                                  <Trash2 className="w-3 h-3" />
                                                </Button>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Courses */}
                                {selectedTerm && (
                                  <div>
                                    <div className="flex justify-between items-center mb-4">
                                      <h3 className="text-lg font-semibold">المواد - {selectedTerm.title}</h3>
                                      <Button onClick={handleAddCourse} size="sm">
                                        <Plus className="w-4 h-4 mr-2" />
                                        إضافة مادة
                                      </Button>
                                    </div>

                                    {isCourseFormOpen && (
                                      <Card className="mb-4">
                                        <CardContent className="pt-6">
                                          <form onSubmit={handleSubmitCourse} className="space-y-4">
                                            <div>
                                              <Label>كود المادة *</Label>
                                              <Input value={courseFormData.courseCode} onChange={(e) => setCourseFormData({ ...courseFormData, courseCode: e.target.value })} required />
                                            </div>
                                            <div>
                                              <Label>اسم المادة *</Label>
                                              <Input value={courseFormData.courseName} onChange={(e) => setCourseFormData({ ...courseFormData, courseName: e.target.value })} required />
                                            </div>
                                            <div>
                                              <Label>الساعات المعتمدة *</Label>
                                              <Input type="number" value={courseFormData.creditHours} onChange={(e) => setCourseFormData({ ...courseFormData, creditHours: parseInt(e.target.value) })} required />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <Switch checked={courseFormData.isElective} onCheckedChange={(checked) => setCourseFormData({ ...courseFormData, isElective: checked })} />
                                              <Label>اختيارية؟</Label>
                                            </div>
                                            <div>
                                              <Label>القسم (اختياري)</Label>
                                              <Select value={courseFormData.departmentId} onValueChange={(value) => setCourseFormData({ ...courseFormData, departmentId: value })}>
                                                <SelectTrigger>
                                                  <SelectValue placeholder="اختر قسم" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  {collegeDepartments.map((dept) => (
                                                    <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                                                  ))}
                                                </SelectContent>
                                              </Select>
                                            </div>
                                            <div>
                                              <Label>ملاحظات</Label>
                                              <Textarea value={courseFormData.notes} onChange={(e) => setCourseFormData({ ...courseFormData, notes: e.target.value })} />
                                            </div>
                                            <div className="flex gap-2">
                                              <Button type="submit">حفظ</Button>
                                              <Button type="button" variant="outline" onClick={() => setIsCourseFormOpen(false)}>إلغاء</Button>
                                            </div>
                                          </form>
                                        </CardContent>
                                      </Card>
                                    )}

                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>كود المادة</TableHead>
                                          <TableHead>اسم المادة</TableHead>
                                          <TableHead>الساعات</TableHead>
                                          <TableHead>النوع</TableHead>
                                          <TableHead>الإجراءات</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {termCourses.map((course) => (
                                          <TableRow key={course.id}>
                                            <TableCell>{course.courseCode}</TableCell>
                                            <TableCell>{course.courseName}</TableCell>
                                            <TableCell>{course.creditHours}</TableCell>
                                            <TableCell>{course.isElective ? "اختيارية" : "إجبارية"}</TableCell>
                                            <TableCell>
                                              <div className="flex gap-2">
                                                <Button size="sm" variant="outline" onClick={() => handleEditCourse(course)}>
                                                  <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button size="sm" variant="outline" onClick={() => handleDeleteCourse(course.id)}>
                                                  <Trash2 className="w-4 h-4" />
                                                </Button>
                                              </div>
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="classrooms">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">القاعات الدراسية</h2>
                    <Button onClick={handleAddClassroom}>
                      <Plus className="w-4 h-4 mr-2" />
                      إضافة قاعة
                    </Button>
                  </div>

                  {isClassroomFormOpen && (
                    <Card>
                      <CardHeader>
                        <CardTitle>{editingClassroomId ? "تعديل قاعة" : "إضافة قاعة جديدة"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmitClassroom} className="space-y-4">
                          <div>
                            <Label>الاسم *</Label>
                            <Input value={classroomFormData.name} onChange={(e) => setClassroomFormData({ ...classroomFormData, name: e.target.value })} required />
                          </div>
                          <div>
                            <Label>النوع *</Label>
                            <Select value={classroomFormData.type} onValueChange={(value: any) => setClassroomFormData({ ...classroomFormData, type: value })}>
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
                            <Input type="number" value={classroomFormData.capacity} onChange={(e) => setClassroomFormData({ ...classroomFormData, capacity: parseInt(e.target.value) })} required />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch checked={classroomFormData.isAvailable} onCheckedChange={(checked) => setClassroomFormData({ ...classroomFormData, isAvailable: checked })} />
                            <Label>متاحة؟</Label>
                          </div>
                          <div>
                            <Label>ملاحظات</Label>
                            <Textarea value={classroomFormData.notes} onChange={(e) => setClassroomFormData({ ...classroomFormData, notes: e.target.value })} />
                          </div>
                          <div className="flex gap-2">
                            <Button type="submit">حفظ</Button>
                            <Button type="button" variant="outline" onClick={() => setIsClassroomFormOpen(false)}>إلغاء</Button>
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
                            <TableHead>الاسم</TableHead>
                            <TableHead>النوع</TableHead>
                            <TableHead>السعة</TableHead>
                            <TableHead>الحالة</TableHead>
                            <TableHead>ملاحظات</TableHead>
                            <TableHead>الإجراءات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {collegeClassrooms.map((classroom) => (
                            <TableRow key={classroom.id}>
                              <TableCell className="font-medium">{classroom.name}</TableCell>
                              <TableCell>{classroom.type === "CLASSROOM" ? "قاعة" : "معمل"}</TableCell>
                              <TableCell>{classroom.capacity}</TableCell>
                              <TableCell>{classroom.isAvailable ? "متاحة" : "غير متاحة"}</TableCell>
                              <TableCell>{classroom.notes}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" onClick={() => handleEditClassroom(classroom)}>
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => handleDeleteClassroom(classroom.id)}>
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
              </TabsContent>

              <TabsContent value="programs">
                <div className="text-muted-foreground">
                  اختر قسم من تبويب "الأقسام" لإدارة البرامج الدراسية
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
