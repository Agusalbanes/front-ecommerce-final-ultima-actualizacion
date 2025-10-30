import React from 'react';
import { useAuth } from '../hooks/useAuth';

const DebugAuth = () => {
  const auth = useAuth();
  
  const checkToken = () => {
    const token = localStorage.getItem('token');
    console.log('🔍 Token en localStorage:', token);
    console.log('🔍 Auth state:', auth);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: '#ffeb3b', 
      padding: '10px', 
      border: '1px solid #ccc',
      zIndex: 1000 
    }}>
      <h4>🔍 Debug Auth</h4>
      <p>User: {auth.user ? JSON.stringify(auth.user) : 'null'}</p>
      <p>Auth: {auth.isAuthenticated ? 'SÍ' : 'NO'}</p>
      <p>Admin: {auth.isAdmin ? 'SÍ' : 'NO'}</p>
      <button onClick={checkToken}>Check Token</button>
      <button onClick={() => console.log('Auth:', auth)}>Log Auth</button>
    </div>
  );
};

export default DebugAuth;