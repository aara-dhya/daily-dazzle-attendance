import { Button } from "@/components/ui/button";
import { Clock, Users, BarChart3, LogOut } from "lucide-react";

interface NavigationProps {
  userType: 'worker' | 'admin';
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

const Navigation = ({ userType, currentView, onViewChange, onLogout }: NavigationProps) => {
  const workerMenuItems = [
    { id: 'attendance', label: 'Mark Attendance', icon: Clock },
    { id: 'history', label: 'My History', icon: BarChart3 },
  ];

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'workers', label: 'Manage Workers', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  const menuItems = userType === 'admin' ? adminMenuItems : workerMenuItems;

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              WorkerTrack
            </h1>
            <div className="hidden md:flex space-x-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? "default" : "ghost"}
                    className={currentView === item.id ? "btn-gradient-primary" : ""}
                    onClick={() => onViewChange(item.id)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground capitalize">
              {userType} Dashboard
            </span>
            <Button variant="outline" onClick={onLogout} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;