import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const AdminGuard: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Simple check for admin status (can be expanded to real token check later)
  const isAdmin = localStorage.getItem('sindhudyog_admin') === 'true';

  if (!isAdmin) {
    // If not admin, redirect to home or a login page
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminGuard;
