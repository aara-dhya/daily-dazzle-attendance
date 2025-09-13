import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Clock, DollarSign, TrendingUp, Search, Download, Filter } from "lucide-react";
import { format } from 'date-fns';

interface AdminDashboardProps {
  username: string;
}

const AdminDashboard = ({ username }: AdminDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app this would come from backend
  const workers = [
    { id: 1, name: 'Worker_X7K9', department: 'Production', rate: 400, daysWorked: 18, totalHours: 144, status: 'present' },
    { id: 2, name: 'User_M3R8', department: 'Quality Control', rate: 440, daysWorked: 20, totalHours: 160, status: 'present' },
    { id: 3, name: 'Emp_Q5T2', department: 'Packaging', rate: 360, daysWorked: 15, totalHours: 120, status: 'absent' },
    { id: 4, name: 'Staff_L9W4', department: 'Maintenance', rate: 500, daysWorked: 19, totalHours: 152, status: 'present' },
    { id: 5, name: 'Team_R6P1', department: 'Logistics', rate: 420, daysWorked: 17, totalHours: 136, status: 'present' },
  ];

  const todayAttendance = [
    { worker: 'Worker_X7K9', checkIn: '08:45', status: 'present' },
    { worker: 'User_M3R8', checkIn: '09:00', status: 'present' },
    { worker: 'Emp_Q5T2', checkIn: null, status: 'absent' },
    { worker: 'Staff_L9W4', checkIn: '08:30', status: 'present' },
    { worker: 'Team_R6P1', checkIn: '09:15', status: 'present' },
  ];

  const totalStats = {
    totalWorkers: workers.length,
    presentToday: todayAttendance.filter(w => w.status === 'present').length,
    totalPayroll: workers.reduce((sum, worker) => sum + (worker.totalHours * worker.rate), 0),
    averageHours: workers.reduce((sum, worker) => sum + worker.totalHours, 0) / workers.length,
  };

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="animate-fade-in">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Admin Dashboard
        </h2>
        <p className="text-muted-foreground">
          Welcome back, {username} • {format(new Date(), 'EEEE, MMMM do, yyyy')}
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Workers</p>
                <p className="text-2xl font-bold">{totalStats.totalWorkers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-success to-secondary rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Present Today</p>
                <p className="text-2xl font-bold">{totalStats.presentToday}/{totalStats.totalWorkers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-secondary to-primary rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Payroll</p>
                <p className="text-2xl font-bold">₹{totalStats.totalPayroll.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-accent to-success rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Hours</p>
                <p className="text-2xl font-bold">{Math.round(totalStats.averageHours)}h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Attendance */}
      <Card className="card-elevated animate-scale-in">
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
          <CardDescription>Real-time attendance status for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayAttendance.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{record.worker}</p>
                  <p className="text-sm text-muted-foreground">
                    {record.checkIn ? `Checked in: ${record.checkIn}` : 'Not checked in'}
                  </p>
                </div>
                <Badge variant={record.status === 'present' ? "default" : "destructive"}>
                  {record.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Worker Management */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Worker Management</CardTitle>
              <CardDescription>Manage workers and calculate payments</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search workers by name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Worker</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Rate/Hour</TableHead>
                  <TableHead>Days Worked</TableHead>
                  <TableHead>Total Hours</TableHead>
                  <TableHead>Total Pay</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkers.map((worker) => (
                  <TableRow key={worker.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{worker.name}</TableCell>
                    <TableCell>{worker.department}</TableCell>
                    <TableCell>₹{worker.rate}/hr</TableCell>
                    <TableCell>{worker.daysWorked}</TableCell>
                    <TableCell>{worker.totalHours}h</TableCell>
                    <TableCell className="font-medium text-success">
                      ₹{(worker.totalHours * worker.rate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={worker.status === 'present' ? "default" : "destructive"}>
                        {worker.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;