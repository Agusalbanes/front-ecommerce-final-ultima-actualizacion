import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import CategoryManager from './CategoryManager';
import ProductManager from './ProductManager';
import UserManager from './UserManager'; 
import './AdminPanel.css';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('categories');

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <p>Bienvenido, {user?.name} ({user?.role})</p>
        <button 
          onClick={logout}
          className="logout-btn"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'categories' ? 'active' : ''}
          onClick={() => setActiveTab('categories')}
        >
          📁 Gestionar Categorías
        </button>
        <button 
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          📦 Gestionar Productos
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          👥 Gestionar Usuarios
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'categories' && <CategoryManager />}
        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'users' && <UserManager />} 
      </div>
    </div>
  );
};

export default AdminPanel;