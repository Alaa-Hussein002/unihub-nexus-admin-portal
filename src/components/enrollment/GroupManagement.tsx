import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit2, Trash2, Save, Users, GripVertical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Types
interface Student {
  id: string;
  name: string;
  studentId: string;
  gender: "male" | "female";
  groupId?: string;
}

interface Group {
  id: string;
  name: string;
  type: "theory" | "practical";
  gender?: "male" | "female" | "mixed";
  students: Student[];
}

// Mock data
const departments = [
  { id: "is", name: "Information Systems Department" },
  { id: "it", name: "Information Technology Department" },
  { id: "cs", name: "Computer Science Department" },
];

const levels = [
  { id: "1", name: "Level 1" },
  { id: "2", name: "Level 2" },
  { id: "3", name: "Level 3" },
  { id: "4", name: "Level 4" },
];

const mockStudents: Student[] = [
  { id: "1", name: "Ahmed Ali", studentId: "2024001", gender: "male" },
  { id: "2", name: "Sara Mohammed", studentId: "2024002", gender: "female" },
  { id: "3", name: "Omar Hassan", studentId: "2024003", gender: "male" },
  { id: "4", name: "Fatima Ibrahim", studentId: "2024004", gender: "female" },
  { id: "5", name: "Khalid Saeed", studentId: "2024005", gender: "male" },
  { id: "6", name: "Mona Ahmed", studentId: "2024006", gender: "female" },
  { id: "7", name: "Hassan Ali", studentId: "2024007", gender: "male" },
  { id: "8", name: "Layla Mohammed", studentId: "2024008", gender: "female" },
];

export function GroupManagement() {
  const [selectedDept, setSelectedDept] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [unassignedStudents, setUnassignedStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupType, setNewGroupType] = useState<"theory" | "practical">("theory");
  const [newGroupGender, setNewGroupGender] = useState<"male" | "female" | "mixed">("mixed");
  const [draggedStudent, setDraggedStudent] = useState<Student | null>(null);

  const filteredStudents = unassignedStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.includes(searchQuery)
  );

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    const newGroup: Group = {
      id: Date.now().toString(),
      name: newGroupName,
      type: newGroupType,
      gender: newGroupGender,
      students: [],
    };

    setGroups([...groups, newGroup]);
    setNewGroupName("");
    setNewGroupType("theory");
    setNewGroupGender("mixed");
    setIsCreateGroupOpen(false);
    toast.success("Group created successfully");
  };

  const handleEditGroup = () => {
    if (!editingGroup || !newGroupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    setGroups(
      groups.map((g) =>
        g.id === editingGroup.id
          ? { ...g, name: newGroupName, type: newGroupType, gender: newGroupGender }
          : g
      )
    );
    setIsEditGroupOpen(false);
    setEditingGroup(null);
    setNewGroupName("");
    toast.success("Group updated successfully");
  };

  const handleDeleteGroup = (groupId: string) => {
    const group = groups.find((g) => g.id === groupId);
    if (group) {
      setUnassignedStudents([...unassignedStudents, ...group.students]);
    }
    setGroups(groups.filter((g) => g.id !== groupId));
    toast.success("Group deleted successfully");
  };

  const openEditDialog = (group: Group) => {
    setEditingGroup(group);
    setNewGroupName(group.name);
    setNewGroupType(group.type);
    setNewGroupGender(group.gender || "mixed");
    setIsEditGroupOpen(true);
  };

  const handleDragStart = (student: Student) => {
    setDraggedStudent(student);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropToGroup = (groupId: string) => {
    if (!draggedStudent) return;

    const group = groups.find((g) => g.id === groupId);
    if (!group) return;

    // Check gender compatibility
    if (group.gender !== "mixed" && group.gender !== draggedStudent.gender) {
      toast.error(`This group only accepts ${group.gender} students`);
      return;
    }

    // Remove from unassigned or other groups
    setUnassignedStudents(unassignedStudents.filter((s) => s.id !== draggedStudent.id));
    setGroups(
      groups.map((g) => ({
        ...g,
        students: g.students.filter((s) => s.id !== draggedStudent.id),
      }))
    );

    // Add to target group
    setGroups(
      groups.map((g) =>
        g.id === groupId ? { ...g, students: [...g.students, draggedStudent] } : g
      )
    );

    setDraggedStudent(null);
    toast.success(`${draggedStudent.name} added to ${group.name}`);
  };

  const handleDropToUnassigned = () => {
    if (!draggedStudent) return;

    // Remove from all groups
    setGroups(
      groups.map((g) => ({
        ...g,
        students: g.students.filter((s) => s.id !== draggedStudent.id),
      }))
    );

    // Add to unassigned if not already there
    if (!unassignedStudents.find((s) => s.id === draggedStudent.id)) {
      setUnassignedStudents([...unassignedStudents, draggedStudent]);
    }

    setDraggedStudent(null);
  };

  const handleSaveGrouping = () => {
    // Here you would save to database
    toast.success("Group assignments saved successfully");
  };

  const handleAutoGroup = () => {
    if (unassignedStudents.length === 0) {
      toast.error("No unassigned students to group");
      return;
    }

    // Auto-create groups by gender if they don't exist
    const maleTheoryGroup = groups.find((g) => g.gender === "male" && g.type === "theory");
    const femaleTheoryGroup = groups.find((g) => g.gender === "female" && g.type === "theory");

    let updatedGroups = [...groups];

    if (!maleTheoryGroup) {
      updatedGroups.push({
        id: Date.now().toString(),
        name: "Male Theory Group",
        type: "theory",
        gender: "male",
        students: [],
      });
    }

    if (!femaleTheoryGroup) {
      updatedGroups.push({
        id: (Date.now() + 1).toString(),
        name: "Female Theory Group",
        type: "theory",
        gender: "female",
        students: [],
      });
    }

    // Distribute students
    const males = unassignedStudents.filter((s) => s.gender === "male");
    const females = unassignedStudents.filter((s) => s.gender === "female");

    updatedGroups = updatedGroups.map((g) => {
      if (g.gender === "male" && g.type === "theory") {
        return { ...g, students: [...g.students, ...males] };
      }
      if (g.gender === "female" && g.type === "theory") {
        return { ...g, students: [...g.students, ...females] };
      }
      return g;
    });

    setGroups(updatedGroups);
    setUnassignedStudents([]);
    toast.success("Students auto-grouped by gender");
  };

  return (
    <div className="flex h-[calc(100vh-200px)] gap-4">
      {/* Sidebar */}
      <Card className="w-64 overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-lg">Departments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {departments.map((dept) => (
            <Button
              key={dept.id}
              variant={selectedDept === dept.id ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => {
                setSelectedDept(dept.id);
                setSelectedLevel("");
                setGroups([]);
                setUnassignedStudents(mockStudents);
              }}
            >
              {dept.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="flex-1 space-y-4">
        {!selectedDept ? (
          <Card className="h-full flex items-center justify-center">
            <CardContent>
              <p className="text-muted-foreground text-center">
                Select a department to start managing groups
              </p>
            </CardContent>
          </Card>
        ) : !selectedLevel ? (
          <Card>
            <CardHeader>
              <CardTitle>Select Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {levels.map((level) => (
                  <Button
                    key={level.id}
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2"
                    onClick={() => setSelectedLevel(level.id)}
                  >
                    <Users className="h-8 w-8" />
                    {level.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Header Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search students by name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleAutoGroup}>
                      <Users className="h-4 w-4 mr-2" />
                      Auto Group
                    </Button>
                    <Button onClick={() => setIsCreateGroupOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Group
                    </Button>
                    <Button onClick={handleSaveGrouping}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Grouping
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Groups and Students */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Unassigned Students */}
              <Card
                className="lg:col-span-1"
                onDragOver={handleDragOver}
                onDrop={handleDropToUnassigned}
              >
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    Unassigned Students
                    <Badge variant="secondary">{filteredStudents.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      draggable
                      onDragStart={() => handleDragStart(student)}
                      className="flex items-center gap-2 p-3 border rounded-lg hover:bg-accent cursor-move"
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.studentId}</p>
                      </div>
                      <Badge variant={student.gender === "male" ? "default" : "secondary"}>
                        {student.gender}
                      </Badge>
                    </div>
                  ))}
                  {filteredStudents.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No unassigned students
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Groups */}
              <div className="lg:col-span-2 space-y-4 max-h-[600px] overflow-y-auto">
                {groups.map((group) => (
                  <Card
                    key={group.id}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDropToGroup(group.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{group.name}</CardTitle>
                          <Badge variant="outline">{group.type}</Badge>
                          {group.gender !== "mixed" && (
                            <Badge
                              variant={group.gender === "male" ? "default" : "secondary"}
                            >
                              {group.gender}
                            </Badge>
                          )}
                          <Badge variant="secondary">{group.students.length} students</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(group)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteGroup(group.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {group.students.map((student) => (
                          <div
                            key={student.id}
                            draggable
                            onDragStart={() => handleDragStart(student)}
                            className="flex items-center gap-2 p-2 border rounded-lg hover:bg-accent cursor-move"
                          >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{student.name}</p>
                              <p className="text-xs text-muted-foreground">{student.studentId}</p>
                            </div>
                            <Badge
                              variant={student.gender === "male" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {student.gender}
                            </Badge>
                          </div>
                        ))}
                        {group.students.length === 0 && (
                          <p className="text-sm text-muted-foreground col-span-2 text-center py-4">
                            Drag students here
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {groups.length === 0 && (
                  <Card>
                    <CardContent className="py-12">
                      <p className="text-muted-foreground text-center">
                        No groups created yet. Click "Create Group" to start.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Create Group Dialog */}
      <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                placeholder="e.g., Group A"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="groupType">Type</Label>
              <Select value={newGroupType} onValueChange={(v: any) => setNewGroupType(v)}>
                <SelectTrigger id="groupType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="theory">Theory</SelectItem>
                  <SelectItem value="practical">Practical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="groupGender">Gender</Label>
              <Select value={newGroupGender} onValueChange={(v: any) => setNewGroupGender(v)}>
                <SelectTrigger id="groupGender">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mixed">Mixed</SelectItem>
                  <SelectItem value="male">Male Only</SelectItem>
                  <SelectItem value="female">Female Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateGroupOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateGroup}>Create Group</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Group Dialog */}
      <Dialog open={isEditGroupOpen} onOpenChange={setIsEditGroupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Group</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editGroupName">Group Name</Label>
              <Input
                id="editGroupName"
                placeholder="e.g., Group A"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editGroupType">Type</Label>
              <Select value={newGroupType} onValueChange={(v: any) => setNewGroupType(v)}>
                <SelectTrigger id="editGroupType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="theory">Theory</SelectItem>
                  <SelectItem value="practical">Practical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editGroupGender">Gender</Label>
              <Select value={newGroupGender} onValueChange={(v: any) => setNewGroupGender(v)}>
                <SelectTrigger id="editGroupGender">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mixed">Mixed</SelectItem>
                  <SelectItem value="male">Male Only</SelectItem>
                  <SelectItem value="female">Female Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditGroupOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditGroup}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
