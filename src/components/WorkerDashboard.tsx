import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, CheckCircle, XCircle, DollarSign } from "lucide-react";
import { format } from 'date-fns';

interface WorkerDashboardProps {
  username: string;
}

const WorkerDashboard = ({ username }: WorkerDashboardProps) => {
  const [hasMarkedToday, setHasMarkedToday] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data - in real app this would come from backend
  const attendanceHistory = [
    { date: '2024-01-15', status: 'present', checkIn: '09:00', checkOut: '17:00', hours: 8 },
    { date: '2024-01-14', status: 'present', checkIn: '09:15', checkOut: '17:30', hours: 8.25 },
    { date: '2024-01-13', status: 'absent', checkIn: null, checkOut: null, hours: 0 },
    { date: '2024-01-12', status: 'present', checkIn: '08:45', checkOut: '17:00', hours: 8.25 },
  ];

  const monthlyStats = {
    daysWorked: 18,
    totalDays: 20,
    totalHours: 144,
    estimatedPay: 2880 // $20/hour * 144 hours
  };

  const handleMarkAttendance = () => {
    setHasMarkedToday(true);
    setCurrentTime(new Date());
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="animate-fade-in">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {username}!
        </h2>
        <p className="text-muted-foreground">
          {format(new Date(), 'EEEE, MMMM do, yyyy')}
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Worked</p>
                <p className="text-2xl font-bold">{monthlyStats.daysWorked}/{monthlyStats.totalDays}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-secondary to-primary rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-2xl font-bold">{monthlyStats.totalHours}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-success to-secondary rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Est. Pay</p>
                <p className="text-2xl font-bold">${monthlyStats.estimatedPay}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-accent to-success rounded-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-2xl font-bold">{Math.round((monthlyStats.daysWorked / monthlyStats.totalDays) * 100)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mark Attendance Section */}
      <Card className="card-elevated animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Today's Attendance</span>
          </CardTitle>
          <CardDescription>
            Mark your attendance for today - {format(new Date(), 'MMMM do, yyyy')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Current Time</p>
              <p className="text-2xl font-bold text-primary">
                {format(currentTime, 'HH:mm:ss')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={hasMarkedToday ? "default" : "secondary"} className="text-sm">
                {hasMarkedToday ? "Marked Present" : "Not Marked"}
              </Badge>
            </div>
          </div>
          
          {!hasMarkedToday ? (
            <Button 
              onClick={handleMarkAttendance} 
              className="w-full btn-gradient-success py-3 text-lg"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Mark Present
            </Button>
          ) : (
            <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
              <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="text-success font-medium">Attendance marked successfully!</p>
              <p className="text-sm text-muted-foreground">
                Checked in at {format(currentTime, 'HH:mm')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Attendance History */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
          <CardDescription>Your attendance history for the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {attendanceHistory.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center space-x-4">
                  {record.status === 'present' ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                  <div>
                    <p className="font-medium">{format(new Date(record.date), 'EEEE, MMM do')}</p>
                    {record.checkIn && (
                      <p className="text-sm text-muted-foreground">
                        {record.checkIn} - {record.checkOut}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={record.status === 'present' ? "default" : "destructive"}>
                    {record.status}
                  </Badge>
                  {record.hours > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {record.hours}h
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkerDashboard;