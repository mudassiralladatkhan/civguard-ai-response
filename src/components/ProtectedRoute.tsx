
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: Array<'citizen' | 'officer' | 'admin'>;
};

const ProtectedRoute = ({ 
  children, 
  allowedRoles = ['citizen', 'officer', 'admin'] 
}: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useAuth();

  // Show loading state if still checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    toast({
      title: "Authentication required",
      description: "Please log in to access this page",
      variant: "default",
    });
    return <Navigate to="/login" replace />;
  }

  // If authenticated but no profile, something went wrong
  if (!profile) {
    toast({
      title: "Profile error",
      description: "Unable to load your profile. Please try logging in again.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }

  // If authenticated but not having the right role
  if (!allowedRoles.includes(profile.role)) {
    toast({
      title: "Access restricted",
      description: `You don't have permission to access this page`,
      variant: "destructive",
    });
    
    // Redirect based on role
    switch (profile.role) {
      case 'admin':
        return <Navigate to="/admin-dashboard" replace />;
      case 'officer':
        return <Navigate to="/municipal-dashboard" replace />;
      case 'citizen':
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  // If all checks pass, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
