import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function ProtectedRoute() {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;
