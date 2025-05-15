
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  BarChart,
  Users
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { Link } from "react-router-dom";

// Mock data for demonstration
const RECENT_ISSUES = [
  { id: 1, title: "Pothole on Main Street", status: "pending", category: "Road Damage", createdAt: "2025-05-14T10:30:00Z" },
  { id: 2, title: "Broken Street Light", status: "in_progress", category: "Street Light", createdAt: "2025-05-13T14:20:00Z" },
  { id: 3, title: "Graffiti on Park Wall", status: "resolved", category: "Graffiti", createdAt: "2025-05-12T09:45:00Z" },
  { id: 4, title: "Garbage Pile at 5th Avenue", status: "pending", category: "Garbage", createdAt: "2025-05-11T16:10:00Z" },
];

const CATEGORY_DATA = [
  { name: "Road Damage", value: 35 },
  { name: "Garbage", value: 25 },
  { name: "Street Lights", value: 15 },
  { name: "Graffiti", value: 10 },
  { name: "Water Leaks", value: 15 },
];

const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"];

const TIME_DATA = [
  { name: "Jan", issues: 30, resolved: 25 },
  { name: "Feb", issues: 40, resolved: 35 },
  { name: "Mar", issues: 45, resolved: 38 },
  { name: "Apr", issues: 55, resolved: 48 },
  { name: "May", issues: 65, resolved: 52 },
];

interface DashboardProps {
  userRole?: "citizen" | "municipal" | "admin";
}

const Dashboard = ({ userRole = "citizen" }: DashboardProps) => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    resolutionRate: 0
  });

  useEffect(() => {
    // This would be replaced with actual API calls
    // Simulate different stats based on role
    if (userRole === "citizen") {
      setStats({
        total: 12,
        pending: 5,
        inProgress: 3,
        resolved: 4,
        resolutionRate: 33
      });
    } else if (userRole === "municipal") {
      setStats({
        total: 45,
        pending: 18,
        inProgress: 12,
        resolved: 15,
        resolutionRate: 33
      });
    } else {
      setStats({
        total: 320,
        pending: 85,
        inProgress: 95,
        resolved: 140,
        resolutionRate: 44
      });
    }
  }, [userRole]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "in_progress":
        return "bg-blue-500";
      case "resolved":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in_progress":
        return "In Progress";
      case "resolved":
        return "Resolved";
      default:
        return "Unknown";
    }
  };

  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {userRole === "admin" 
              ? "Admin Dashboard" 
              : userRole === "municipal" 
                ? "Municipal Officer Dashboard" 
                : "Citizen Dashboard"}
          </h1>
          {userRole === "citizen" && (
            <Button asChild>
              <Link to="/report-issue">Report New Issue</Link>
            </Button>
          )}
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{stats.total}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {userRole === "citizen" 
                  ? "Issues you've reported" 
                  : userRole === "municipal" 
                    ? "Issues assigned to you" 
                    : "Total reported issues"}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-yellow-500" />
                <span className="text-2xl font-bold">{stats.pending}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Issues waiting for review
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold">{stats.inProgress}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Issues being addressed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">{stats.resolved}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Successfully resolved issues
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Resolution Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Progress</span>
              <span className="text-sm font-medium">{stats.resolutionRate}%</span>
            </div>
            <Progress value={stats.resolutionRate} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">
              Percentage of total issues that have been resolved
            </p>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Issues */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {RECENT_ISSUES.map(issue => (
                  <div key={issue.id} className="flex items-start justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div>
                      <h3 className="font-medium">{issue.title}</h3>
                      <div className="text-sm text-gray-500">
                        <span className="mr-3">{issue.category}</span>
                        <span>{formatDate(issue.createdAt)}</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(issue.status)}`}>
                      {getStatusText(issue.status)}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to={userRole === "citizen" ? "/my-reports" : userRole === "municipal" ? "/assigned-issues" : "/all-issues"}>
                  View All Issues
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Issue Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CATEGORY_DATA}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {CATEGORY_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Only show these sections for admin and municipal officers */}
        {(userRole === "admin" || userRole === "municipal") && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly Issues & Resolutions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={TIME_DATA}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="issues" fill="#8884d8" name="Reported Issues" />
                      <Bar dataKey="resolved" fill="#82ca9d" name="Resolved Issues" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {userRole === "admin" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg">User Activity</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/users">Manage Users</Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-primary mr-2" />
                          <span className="font-medium">Active Citizens</span>
                        </div>
                        <span className="font-bold">248</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="font-medium">Active Municipal Officers</span>
                        </div>
                        <span className="font-bold">32</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <BarChart className="h-5 w-5 text-green-500 mr-2" />
                          <span className="font-medium">Daily Active Users</span>
                        </div>
                        <span className="font-bold">45</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <BarChart className="h-5 w-5 text-yellow-500 mr-2" />
                          <span className="font-medium">New Registrations (This Week)</span>
                        </div>
                        <span className="font-bold">18</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg">System Performance</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/analytics">Full Analytics</Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Average Response Time</span>
                          <span className="text-sm font-medium">2.3 days</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Average Resolution Time</span>
                          <span className="text-sm font-medium">5.7 days</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">AI Classification Accuracy</span>
                          <span className="text-sm font-medium">89%</span>
                        </div>
                        <Progress value={89} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Citizen Satisfaction Rate</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
