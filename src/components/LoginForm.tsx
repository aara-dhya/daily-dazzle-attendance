import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Shield } from "lucide-react";

interface LoginFormProps {
  onLogin: (userType: 'worker' | 'admin', username: string) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [workerCredentials, setWorkerCredentials] = useState({ username: '', password: '' });
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });

  const handleWorkerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (workerCredentials.username && workerCredentials.password) {
      onLogin('worker', workerCredentials.username);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCredentials.username && adminCredentials.password) {
      onLogin('admin', adminCredentials.username);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-success bg-clip-text text-transparent mb-2">
            WorkerTrack
          </h1>
          <p className="text-muted-foreground">Modern Attendance Management System</p>
        </div>

        <Card className="card-elevated animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="worker" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="worker" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Worker
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value="worker">
                <form onSubmit={handleWorkerLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="worker-username">Username</Label>
                    <Input
                      id="worker-username"
                      type="text"
                      placeholder="Enter your username"
                      value={workerCredentials.username}
                      onChange={(e) => setWorkerCredentials(prev => ({ ...prev, username: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="worker-password">Password</Label>
                    <Input
                      id="worker-password"
                      type="password"
                      placeholder="Enter your password"
                      value={workerCredentials.password}
                      onChange={(e) => setWorkerCredentials(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full btn-gradient-primary">
                    Sign In as Worker
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-username">Admin Username</Label>
                    <Input
                      id="admin-username"
                      type="text"
                      placeholder="Enter admin username"
                      value={adminCredentials.username}
                      onChange={(e) => setAdminCredentials(prev => ({ ...prev, username: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Enter admin password"
                      value={adminCredentials.password}
                      onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full btn-gradient-secondary">
                    Sign In as Admin
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>Demo Credentials:</p>
          <p>Worker: demo_user/password | Admin: admin/admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;