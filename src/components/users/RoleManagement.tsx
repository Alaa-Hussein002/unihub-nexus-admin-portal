import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Users, Settings, Eye, Edit, Trash2, Plus, UserPlus, Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const roles = [
  {
    id: 1,
    name: "System Administrator",
    description: "Full system access and user management",
    userCount: 3,
    color: "red"
  },
  {
    id: 2,
    name: "Department Head",
    description: "Manage department resources and staff",
    userCount: 8,
    color: "purple"
  },
  {
    id: 3,
    name: "Academic Staff",
    description: "Teaching and academic responsibilities",
    userCount: 45,
    color: "blue"
  },
  {
    id: 4,
    name: "Administrative Staff",
    description: "Administrative and support functions",
    userCount: 12,
    color: "green"
  }
];

const permissions = {
  dashboard: {
    name: "Dashboard",
    actions: ["view", "manage"]
  },
  userManagement: {
    name: "User Management",
    actions: ["view", "create", "edit", "delete"]
  },
  timetableManagement: {
    name: "Timetable Management",
    actions: ["view", "create", "edit", "delete", "import"]
  },
  courseManagement: {
    name: "Course Management",
    actions: ["view", "create", "edit", "delete"]
  },
  enrollmentManagement: {
    name: "Enrollment Management",
    actions: ["view", "create", "edit", "delete", "import"]
  },
  excuseManagement: {
    name: "Excuse Management",
    actions: ["view", "create", "approve", "reject"]
  },
  reports: {
    name: "Reports",
    actions: ["view", "generate", "export"]
  },
  settings: {
    name: "System Settings",
    actions: ["view", "manage"]
  },
  integrations: {
    name: "Integrations",
    actions: ["view", "configure"]
  },
  auditLogs: {
    name: "Audit Logs",
    actions: ["view", "export"]
  }
};

const users = [
  { id: 1, name: "Dr. Sarah Johnson", email: "sarah.johnson@unihub.edu", role: "" },
  { id: 2, name: "Prof. Ahmed Hassan", email: "ahmed.hassan@unihub.edu", role: "Department Head" },
  { id: 3, name: "John Smith", email: "john.smith@unihub.edu", role: "" },
  { id: 4, name: "Mary Rodriguez", email: "mary.rodriguez@unihub.edu", role: "System Administrator" }
];

// Form schemas
const roleSchema = z.object({
  name: z.string().min(2, "Role name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

const assignRoleSchema = z.object({
  userId: z.string().min(1, "Please select a user"),
  roleId: z.string().min(1, "Please select a role"),
});

type RoleFormData = z.infer<typeof roleSchema>;
type AssignRoleFormData = z.infer<typeof assignRoleSchema>;

export function RoleManagement() {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isAssignRoleOpen, setIsAssignRoleOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rolePermissions, setRolePermissions] = useState<{[key: string]: string[]}>({});
  const { toast } = useToast();

  // Forms
  const createRoleForm = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const editRoleForm = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const assignRoleForm = useForm<AssignRoleFormData>({
    resolver: zodResolver(assignRoleSchema),
    defaultValues: {
      userId: "",
      roleId: "",
    },
  });

  const onCreateRole = async (data: RoleFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Role created successfully",
      });
      
      createRoleForm.reset();
      setIsCreateRoleOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create role",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onEditRole = async (data: RoleFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Role updated successfully",
      });
      
      editRoleForm.reset();
      setIsEditRoleOpen(false);
      setEditingRole(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update role",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onAssignRole = async (data: AssignRoleFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Role assigned successfully",
      });
      
      assignRoleForm.reset();
      setIsAssignRoleOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign role",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditRole = (role: any) => {
    setEditingRole(role);
    editRoleForm.reset({
      name: role.name,
      description: role.description,
    });
    setIsEditRoleOpen(true);
  };

  const handleDeleteRole = (roleId: number) => {
    toast({
      title: "Success",
      description: "Role deleted successfully",
    });
  };

  const handlePermissionChange = (module: string, action: string, checked: boolean) => {
    const key = `${module}-${action}`;
    setRolePermissions(prev => {
      const updated = { ...prev };
      if (!updated[selectedRole.name]) {
        updated[selectedRole.name] = [];
      }
      
      if (checked) {
        updated[selectedRole.name] = [...updated[selectedRole.name], key];
      } else {
        updated[selectedRole.name] = updated[selectedRole.name].filter(p => p !== key);
      }
      
      return updated;
    });
  };

  const savePermissions = () => {
    toast({
      title: "Success",
      description: "Permissions updated successfully",
    });
  };

  const getRoleColor = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-100 text-red-700 border-red-200";
      case "purple":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "blue":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "green":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage user roles and system permissions</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Dialog open={isAssignRoleOpen} onOpenChange={setIsAssignRoleOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Assign Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Role to User</DialogTitle>
              </DialogHeader>
              <Form {...assignRoleForm}>
                <form onSubmit={assignRoleForm.handleSubmit(onAssignRole)} className="space-y-4">
                  <FormField
                    control={assignRoleForm.control}
                    name="userId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select User</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a user" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {users.map((user) => (
                              <SelectItem key={user.id} value={user.id.toString()}>
                                {user.name} ({user.email})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={assignRoleForm.control}
                    name="roleId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.id.toString()}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsAssignRoleOpen(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Assign Role
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
              </DialogHeader>
              <Form {...createRoleForm}>
                <form onSubmit={createRoleForm.handleSubmit(onCreateRole)} className="space-y-4">
                  <FormField
                    control={createRoleForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter role name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createRoleForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter role description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsCreateRoleOpen(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Create Role
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
          </DialogHeader>
          <Form {...editRoleForm}>
            <form onSubmit={editRoleForm.handleSubmit(onEditRole)} className="space-y-4">
              <FormField
                control={editRoleForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter role name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editRoleForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter role description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditRoleOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Update Role
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Role Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className={`${getRoleColor(role.color)} transition-all duration-200 hover:shadow-lg`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{role.name}</h3>
                  <p className="text-sm opacity-80 mt-1">{role.userCount} users</p>
                </div>
                <Shield className="h-8 w-8 opacity-60" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedRole.id === role.id ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedRole(role)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{role.name}</h4>
                      <p className="text-sm text-muted-foreground">{role.userCount} users</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditRole(role);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRole(role.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Permissions Matrix */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Permissions for {selectedRole.name}
              </CardTitle>
              <Button onClick={savePermissions}>
                Save Permissions
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(permissions).map(([module, config]) => (
                <div key={module} className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    {config.name}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {config.actions.map((action) => (
                      <div key={`${module}-${action}`} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${module}-${action}`}
                          checked={rolePermissions[selectedRole.name]?.includes(`${module}-${action}`) || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange(module, action, checked as boolean)
                          }
                        />
                        <Label 
                          htmlFor={`${module}-${action}`}
                          className="text-sm font-medium capitalize cursor-pointer"
                        >
                          {action}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}