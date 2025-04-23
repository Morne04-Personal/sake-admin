
import { useUserContext } from "@/lib/auth-context";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: number[];
}

export function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
  const { user, isLoading } = useUserContext();
  const location = useLocation();
  
  // If still loading auth state, show nothing yet
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If allowedRoles is empty, allow all authenticated users
  if (allowedRoles.length === 0) {
    return <>{children}</>;
  }
  
  // If user doesn't have an allowed role, redirect to unauthorized
  if (!allowedRoles.includes(user.roleId)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
}
