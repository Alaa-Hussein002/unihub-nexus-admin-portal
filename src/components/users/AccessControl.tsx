import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Shield, Globe, Clock, Eye, Download, Plus, Trash2, Users, Settings, CheckCircle, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

// Mock data
const securityPolicies = {
  passwordComplexity: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: false,
  },
  twoFactorAuth: {
    enabled: true,
    requiredForRoles: ["Admin", "Department Head"],
  },
  loginPolicy: {
    maxFailedAttempts: 5,
    lockoutDuration: 30,
    sessionTimeout: 120,
  }
};

const ipRestrictions = [
  { id: 1, type: "whitelist", address: "192.168.1.0/24", description: "Internal network", status: "active" },
  { id: 2, type: "whitelist", address: "10.0.0.0/8", description: "VPN network", status: "active" },
  { id: 3, type: "blacklist", address: "203.0.113.0/24", description: "Blocked region", status: "active" },
];

const sessionSettings = {
  globalTimeout: 120,
  maxConcurrentSessions: 3,
  rememberMeEnabled: true,
  rememberMeDuration: 30,
};

const activeSessions = [
  { id: 1, user: "Dr. Sarah Johnson", ip: "192.168.1.100", location: "Office", device: "Windows Chrome", loginTime: "2024-01-15 09:30", lastActivity: "2024-01-15 10:45" },
  { id: 2, user: "Prof. Ahmed Hassan", ip: "10.0.1.50", location: "Home", device: "MacOS Safari", loginTime: "2024-01-15 08:00", lastActivity: "2024-01-15 10:50" },
  { id: 3, user: "Mary Rodriguez", ip: "192.168.1.200", location: "Admin Office", device: "Windows Edge", loginTime: "2024-01-15 07:45", lastActivity: "2024-01-15 10:48" },
];

const auditLogs = [
  { id: 1, timestamp: "2024-01-15 10:45:32", user: "Dr. Sarah Johnson", action: "Login", resource: "System", ip: "192.168.1.100", status: "Success" },
  { id: 2, timestamp: "2024-01-15 10:44:15", user: "System", action: "Policy Change", resource: "Security Settings", ip: "127.0.0.1", status: "Success" },
  { id: 3, timestamp: "2024-01-15 10:43:21", user: "Unknown", action: "Failed Login", resource: "Login Page", ip: "203.0.113.45", status: "Failed" },
  { id: 4, timestamp: "2024-01-15 10:42:10", user: "Prof. Ahmed Hassan", action: "Data Export", resource: "User Reports", ip: "10.0.1.50", status: "Success" },
];

// Form schemas
const securityPolicySchema = z.object({
  minPasswordLength: z.number().min(6).max(50),
  maxFailedAttempts: z.number().min(3).max(10),
  lockoutDuration: z.number().min(5).max(120),
});

const ipRestrictionSchema = z.object({
  type: z.enum(["whitelist", "blacklist"]),
  address: z.string().min(7, "Please enter a valid IP address or CIDR range"),
  description: z.string().min(1, "Description is required"),
});

const sessionSettingsSchema = z.object({
  globalTimeout: z.number().min(15).max(480),
  maxConcurrentSessions: z.number().min(1).max(10),
  rememberMeDuration: z.number().min(1).max(90),
});

type SecurityPolicyFormData = z.infer<typeof securityPolicySchema>;
type IpRestrictionFormData = z.infer<typeof ipRestrictionSchema>;
type SessionSettingsFormData = z.infer<typeof sessionSettingsSchema>;

const AccessControl = () => {
  const [activeTab, setActiveTab] = useState("security");
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingIpRule, setIsAddingIpRule] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [logFilter, setLogFilter] = useState("all");
  const { toast } = useToast();

  // Forms
  const securityForm = useForm<SecurityPolicyFormData>({
    resolver: zodResolver(securityPolicySchema),
    defaultValues: {
      minPasswordLength: securityPolicies.passwordComplexity.minLength,
      maxFailedAttempts: securityPolicies.loginPolicy.maxFailedAttempts,
      lockoutDuration: securityPolicies.loginPolicy.lockoutDuration,
    },
  });

  const ipForm = useForm<IpRestrictionFormData>({
    resolver: zodResolver(ipRestrictionSchema),
    defaultValues: {
      type: "whitelist",
      address: "",
      description: "",
    },
  });

  const sessionForm = useForm<SessionSettingsFormData>({
    resolver: zodResolver(sessionSettingsSchema),
    defaultValues: {
      globalTimeout: sessionSettings.globalTimeout,
      maxConcurrentSessions: sessionSettings.maxConcurrentSessions,
      rememberMeDuration: sessionSettings.rememberMeDuration,
    },
  });

  const onUpdateSecurityPolicy = async (data: SecurityPolicyFormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: "Security policy updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update security policy",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onAddIpRestriction = async (data: IpRestrictionFormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: "IP restriction added successfully",
      });
      ipForm.reset();
      setIsAddingIpRule(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add IP restriction",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdateSessionSettings = async (data: SessionSettingsFormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: "Session settings updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update session settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnectivity = () => {
    toast({
      title: "Connectivity Test",
      description: "Testing connectivity from current IP address...",
    });
    
    // Simulate test
    setTimeout(() => {
      toast({
        title: "Test Successful",
        description: "Your current IP can access the system",
      });
    }, 2000);
  };

  const handleForceLogout = (sessionId: number) => {
    toast({
      title: "Success",
      description: "User session terminated successfully",
    });
  };

  const handleExportLogs = () => {
    toast({
      title: "Success",
      description: "Audit logs exported successfully",
    });
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchQuery === "" || 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = logFilter === "all" || log.status.toLowerCase() === logFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Access Control</h1>
          <p className="text-muted-foreground">Manage security policies and access controls</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security Policy
          </TabsTrigger>
          <TabsTrigger value="ip" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            IP Restrictions
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Session Management
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Access Logs
          </TabsTrigger>
        </TabsList>

        {/* Security Policy Tab */}
        <TabsContent value="security" className="space-y-6">
          <Form {...securityForm}>
            <form onSubmit={securityForm.handleSubmit(onUpdateSecurityPolicy)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Password Policy
                    </CardTitle>
                    <CardDescription>Configure password complexity requirements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={securityForm.control}
                      name="minPasswordLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Password Length</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Require Uppercase</Label>
                          <p className="text-sm text-muted-foreground">At least one uppercase letter</p>
                        </div>
                        <Switch defaultChecked={securityPolicies.passwordComplexity.requireUppercase} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Require Lowercase</Label>
                          <p className="text-sm text-muted-foreground">At least one lowercase letter</p>
                        </div>
                        <Switch defaultChecked={securityPolicies.passwordComplexity.requireLowercase} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Require Numbers</Label>
                          <p className="text-sm text-muted-foreground">At least one number</p>
                        </div>
                        <Switch defaultChecked={securityPolicies.passwordComplexity.requireNumbers} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Require Symbols</Label>
                          <p className="text-sm text-muted-foreground">At least one special character</p>
                        </div>
                        <Switch defaultChecked={securityPolicies.passwordComplexity.requireSymbols} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-green-600" />
                      Authentication Policy
                    </CardTitle>
                    <CardDescription>Configure login and authentication settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={securityForm.control}
                      name="maxFailedAttempts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Failed Login Attempts</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={securityForm.control}
                      name="lockoutDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Lockout Duration (minutes)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Require 2FA for privileged accounts</p>
                      </div>
                      <Switch defaultChecked={securityPolicies.twoFactorAuth.enabled} />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Update Security Policy
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        {/* IP Restrictions Tab */}
        <TabsContent value="ip" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">IP Address Restrictions</h3>
              <p className="text-sm text-muted-foreground">Control access based on IP addresses and networks</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleTestConnectivity}>
                Test Connectivity
              </Button>
              <Button onClick={() => setIsAddingIpRule(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </div>
          </div>

          {isAddingIpRule && (
            <Card>
              <CardHeader>
                <CardTitle>Add IP Restriction Rule</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...ipForm}>
                  <form onSubmit={ipForm.handleSubmit(onAddIpRestriction)} className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={ipForm.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rule Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="whitelist">Whitelist (Allow)</SelectItem>
                                <SelectItem value="blacklist">Blacklist (Block)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={ipForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>IP Address/CIDR</FormLabel>
                            <FormControl>
                              <Input placeholder="192.168.1.0/24" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={ipForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input placeholder="Description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsAddingIpRule(false)}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Add Rule
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>IP Address/CIDR</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ipRestrictions.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell>
                        <Badge className={rule.type === "whitelist" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                          {rule.type === "whitelist" ? "Allow" : "Block"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">{rule.address}</TableCell>
                      <TableCell>{rule.description}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700">
                          {rule.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Session Management Tab */}
        <TabsContent value="sessions" className="space-y-6">
          <Form {...sessionForm}>
            <form onSubmit={sessionForm.handleSubmit(onUpdateSessionSettings)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      Session Timeout
                    </CardTitle>
                    <CardDescription>Configure global session timeout</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={sessionForm.control}
                      name="globalTimeout"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timeout (minutes)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Warn Before Timeout</Label>
                        <p className="text-sm text-muted-foreground">Show warning 5 minutes before</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Update Timeout
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-600" />
                      Concurrent Sessions
                    </CardTitle>
                    <CardDescription>Manage multiple session access</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={sessionForm.control}
                      name="maxConcurrentSessions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Concurrent Sessions</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable "Remember Me"</Label>
                        <p className="text-sm text-muted-foreground">Allow extended login sessions</p>
                      </div>
                      <Switch defaultChecked={sessionSettings.rememberMeEnabled} />
                    </div>
                    <FormField
                      control={sessionForm.control}
                      name="rememberMeDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Remember Me Duration (days)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Update Concurrent Settings
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-purple-600" />
                      Active Sessions
                    </CardTitle>
                    <CardDescription>{activeSessions.length} sessions currently active</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-700">{activeSessions.length}</p>
                      <p className="text-sm text-purple-600">Active Sessions</p>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      View All Sessions
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </form>
          </Form>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active User Sessions</CardTitle>
                <div className="flex items-center gap-2">
                  <Input placeholder="Search active sessions..." className="w-64" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Login Time</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.user}</TableCell>
                      <TableCell className="font-mono">{session.ip}</TableCell>
                      <TableCell>{session.location}</TableCell>
                      <TableCell>{session.device}</TableCell>
                      <TableCell>{session.loginTime}</TableCell>
                      <TableCell>{session.lastActivity}</TableCell>
                      <TableCell>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleForceLogout(session.id)}
                        >
                          Force Logout
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Access Logs</h3>
              <p className="text-sm text-muted-foreground">Monitor system access and security events</p>
            </div>
            <div className="flex items-center gap-4">
              <Input 
                placeholder="Search logs..." 
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select value={logFilter} onValueChange={setLogFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExportLogs}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell className="font-mono">{log.ip}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {log.status === "Success" ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : log.status === "Failed" ? (
                            <XCircle className="h-4 w-4 text-red-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          )}
                          <Badge 
                            className={
                              log.status === "Success" 
                                ? "bg-green-100 text-green-700" 
                                : "bg-red-100 text-red-700"
                            }
                          >
                            {log.status}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccessControl;