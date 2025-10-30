import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const AdminAccessButton = () => {
    const { isAuthenticated, isAdmin } = useAuth();

    // Solo mostrar si está autenticado y es admin
    if (!isAuthenticated || !isAdmin) {
        return null;
    }

    return (
        <Link to="/admin" className="admin-access-btn">
            🛠️ Panel Admin
        </Link>
    );
};

export default AdminAccessButton;