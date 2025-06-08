import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Clock, DollarSign, CheckCircle, XCircle, AlertTriangle, User, MessageSquare } from "lucide-react";

const excuseRequests = [
  {
    id: 1,
    instructor: "Dr. Sarah Johnson",
    type: "Medical Leave",
    reason: "Surgery appointment",
    dateRequested: "2024-01-10",
    dateFrom: "2024-01-15",
    dateTo: "2024-01-17",
    status: "Pending",
    sessionsAffected: 6,
    salaryImpact: -450,
    replacementInstructor: "Prof. Ahmed Hassan",
    documents: ["medical_certificate.pdf"],
    comments: []
  },
  {
    id: 2,
    instructor: "Prof. Ahmed Hassan",
    type: "Salary Adjustment",
    reason: "Additional research supervision hours",
    dateRequested: "2024-01-12",
    dateFrom: "2024-01-01",
    dateTo: "2024-01-31",
    status: "Approved",
    sessionsAffected: 0,
    salaryImpact: +800,
    replacementInstructor: null,
    documents: ["research_hours_log.pdf"],
    comments: [
      { user: "Department Head", date: "2024-01-13", comment: "Approved due to excellent research output and additional responsibilities.", action: "Approved" }
    ]
  },
  {
    id: 3,
    instructor: "Dr. Chen Liu",
    type: "Personal Leave",
    reason: "Family emergency",
    dateRequested: "2024-01-14",
    dateFrom: "2024-01-20",
    dateTo: "2024-01-22",
    status: "Pending",
    sessionsAffected: 4,
    salaryImpact: -300,
    replacementInstructor: "Dr. Martinez",
    documents: [],
    comments: []
  },
  {
    id: 4,
    instructor: "Prof. Wilson",
    type: "Conference Leave",
    reason: "International Academic Conference",
    dateRequested: "2024-01-08",
    dateFrom: "2024-01-25",
    dateTo: "2024-01-28",
    status: "Rejected",
    sessionsAffected: 8,
    salaryImpact: -600,
    replacementInstructor: null,
    documents: ["conference_invitation.pdf"],
    comments: [
      { user: "Department Head", date: "2024-01-09", comment: "Unable to arrange suitable replacement instructor for this period. Please reschedule.", action: "Rejected" }
    ]
  }
];

export function ExcuseManagement() {
  const [selectedExcuse, setSelectedExcuse] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [newComment, setNewComment] = useState("");
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [actionType, setActionType] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Salary Adjustment":
        return "bg-blue-100 text-blue-700";
      case "Medical Leave":
        return "bg-purple-100 text-purple-700";
      case "Personal Leave":
        return "bg-orange-100 text-orange-700";
      case "Conference Leave":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleApproveReject = (requestId: number, action: string) => {
    setSelectedExcuse(requestId);
    setActionType(action);
    setShowCommentDialog(true);
  };

  const submitComment = () => {
    console.log("Submitting comment:", {
      requestId: selectedExcuse,
      action: actionType,
      comment: newComment,
      user: "Current User",
      date: new Date().toISOString().split('T')[0]
    });
    setNewComment("");
    setShowCommentDialog(false);
    setSelectedExcuse(null);
    setActionType("");
  };

  const filteredRequests = filterStatus === "All" 
    ? excuseRequests 
    : excuseRequests.filter(req => req.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Excuse Management</h1>
          <p className="text-gray-600">Manage instructor requests and salary adjustments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
          <FileText className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-3xl font-bold text-yellow-600">3</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-blue-600">12</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Salary Impact</p>
                <p className="text-3xl font-bold text-green-600">+$350</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approval Rate</p>
                <p className="text-3xl font-bold text-purple-600">78%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card className="shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>All Requests</span>
            </div>
            <div className="flex items-center space-x-2">
              {["All", "Pending", "Approved", "Rejected"].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instructor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{request.instructor}</p>
                        <p className="text-sm text-gray-500">ID: {request.id.toString().padStart(4, '0')}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(request.type)}>
                      {request.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-900">{request.reason}</p>
                    <p className="text-xs text-gray-500">Requested: {request.dateRequested}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-900">{request.dateFrom} to {request.dateTo}</p>
                    {request.sessionsAffected > 0 && (
                      <p className="text-xs text-gray-500">{request.sessionsAffected} sessions affected</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className={`font-medium ${request.salaryImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {request.salaryImpact >= 0 ? '+' : ''}{request.salaryImpact}
                      </span>
                    </div>
                    {request.replacementInstructor && (
                      <p className="text-xs text-gray-500">Replacement: {request.replacementInstructor}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                      {request.comments.length > 0 && (
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {request.status === "Pending" && (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveReject(request.id, "Approve")}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleApproveReject(request.id, "Reject")}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Request Details - {request.instructor}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Type</Label>
                                <Badge className={getTypeColor(request.type)}>{request.type}</Badge>
                              </div>
                              <div>
                                <Label>Status</Label>
                                <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                              </div>
                            </div>
                            <div>
                              <Label>Reason</Label>
                              <p className="text-sm text-gray-700">{request.reason}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>From Date</Label>
                                <Input value={request.dateFrom} readOnly />
                              </div>
                              <div>
                                <Label>To Date</Label>
                                <Input value={request.dateTo} readOnly />
                              </div>
                            </div>
                            {request.type === "Salary Adjustment" && (
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-medium text-blue-900 mb-2">Salary Adjustment Details</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-blue-700">Amount:</span>
                                    <span className="ml-2 font-medium">${Math.abs(request.salaryImpact)}</span>
                                  </div>
                                  <div>
                                    <span className="text-blue-700">Type:</span>
                                    <span className="ml-2 font-medium">
                                      {request.salaryImpact >= 0 ? 'Increase' : 'Deduction'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                            {request.documents.length > 0 && (
                              <div>
                                <Label>Supporting Documents</Label>
                                <div className="space-y-2">
                                  {request.documents.map((doc, index) => (
                                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                                      <FileText className="w-4 h-4 text-gray-500" />
                                      <span className="text-sm text-gray-700">{doc}</span>
                                      <Button variant="ghost" size="sm">Download</Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Comments Section */}
                            {request.comments.length > 0 && (
                              <div>
                                <Label className="flex items-center space-x-2">
                                  <MessageSquare className="w-4 h-4" />
                                  <span>Comments & Audit Trail</span>
                                </Label>
                                <div className="space-y-3 mt-2">
                                  {request.comments.map((comment, index) => (
                                    <div key={index} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-900">{comment.user}</span>
                                        <div className="flex items-center space-x-2">
                                          <Badge className={comment.action === "Approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                                            {comment.action}
                                          </Badge>
                                          <span className="text-sm text-gray-500">{comment.date}</span>
                                        </div>
                                      </div>
                                      <p className="text-sm text-gray-700">{comment.comment}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Comment Dialog */}
      <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionType} Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Action</Label>
              <Badge className={actionType === "Approve" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                {actionType}
              </Badge>
            </div>
            <div>
              <Label>Add Comment (Optional)</Label>
              <Textarea
                placeholder="Add your comment explaining the decision..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex items-center justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowCommentDialog(false)}>
                Cancel
              </Button>
              <Button onClick={submitComment} className={actionType === "Approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}>
                {actionType} Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
