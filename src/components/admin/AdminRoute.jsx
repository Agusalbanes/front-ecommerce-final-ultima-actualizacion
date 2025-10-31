import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

const AdminRoute = ({ children }) => {
  const auth = useAuth();
  
  return children;
};

export default AdminRoute;