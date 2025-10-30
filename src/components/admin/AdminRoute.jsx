import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

const AdminRoute = ({ children }) => {
  const auth = useAuth();
  
  console.log('🔐 === ADMIN ROUTE DEBUG ===');
  console.log('User:', auth.user);
  console.log('isAuthenticated:', auth.isAuthenticated);
  console.log('isAdmin:', auth.isAdmin);
  console.log('Role:', auth.user?.role);
  console.log('Loading:', auth.loading);
  console.log('Token en localStorage:', !!localStorage.getItem('token'));
  console.log('=== FIN DEBUG ===');

  // TEMPORAL: Forzar acceso para debug
  console.log('✅ TEMPORAL: Acceso forzado para ProductManager');
  return children;

  // Código comentado temporalmente:
  /*
  if (auth.loading) {
    console.log('⏳ AdminRoute: Cargando...');
    return <div>Cargando...</div>;
  }

  if (!auth.user || !auth.isAuthenticated) {
    console.log('❌ AdminRoute: Redirigiendo a login');
    return <Navigate to="/login" replace />;
  }

  if (auth.user.role !== 'admin') {
    console.log('❌ AdminRoute: Redirigiendo a home');
    return <Navigate to="/" replace />;
  }

  console.log('✅ AdminRoute: Acceso permitido');
  return children;
  */
};

export default AdminRoute;