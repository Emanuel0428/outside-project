import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  requireAuth?: boolean; 
  requireAdmin?: boolean; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requireAuth = false, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;