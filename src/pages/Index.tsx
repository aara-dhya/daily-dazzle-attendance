import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import WorkerDashboard from '@/components/WorkerDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import Navigation from '@/components/Navigation';
import heroImage from '@/assets/hero-attendance.jpg';

interface User {
  type: 'worker' | 'admin';
  username: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('attendance');

  const handleLogin = (userType: 'worker' | 'admin', username: string) => {
    setUser({ type: userType, username });
    setCurrentView(userType === 'admin' ? 'dashboard' : 'attendance');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('attendance');
  };

  // Landing page for non-authenticated users
  if (!user) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-success bg-clip-text text-transparent mb-6">
                  WorkerTrack
                </h1>
                <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-6">
                  Modern Attendance Management
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                  Streamline your workforce management with our intuitive attendance tracking system. 
                  Real-time monitoring, automated payroll calculations, and comprehensive reporting all in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn-hero">
                    Get Started Today
                  </button>
                  <button className="btn-gradient-secondary">
                    Watch Demo
                  </button>
                </div>
              </div>
              <div className="animate-scale-in">
                <img 
                  src={heroImage} 
                  alt="Modern office workspace with attendance tracking"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Everything You Need for Workforce Management
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From simple attendance tracking to complex payroll calculations, we've got you covered.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
              <div className="card-elevated p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-4">Real-time Tracking</h4>
                <p className="text-muted-foreground">
                  Monitor attendance in real-time with instant check-in/check-out functionality and live status updates.
                </p>
              </div>

              <div className="card-elevated p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-4">Automated Payroll</h4>
                <p className="text-muted-foreground">
                  Automatically calculate wages based on attendance records, overtime rules, and individual pay rates.
                </p>
              </div>

              <div className="card-elevated p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-success to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-4">Smart Analytics</h4>
                <p className="text-muted-foreground">
                  Generate comprehensive reports and insights to optimize workforce productivity and costs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Section */}
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  // Authenticated user interface
  return (
    <div className="min-h-screen bg-background">
      <Navigation
        userType={user.type}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
      />
      
      <main>
        {user.type === 'worker' ? (
          <WorkerDashboard username={user.username} />
        ) : (
          <AdminDashboard username={user.username} />
        )}
      </main>
    </div>
  );
};

export default Index;