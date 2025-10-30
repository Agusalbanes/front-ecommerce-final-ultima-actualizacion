import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import './UserManager.css';

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getUsers();
            setUsers(data);
        } catch (error) {
            setMessage('Error cargando usuarios');
            console.error('Error en loadUsers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await userService.updateUser(userId, { role: newRole });
            setMessage('✅ Rol actualizado exitosamente');
            loadUsers(); // Recargar la lista
        } catch (error) {
            setMessage('❌ Error actualizando rol');
            console.error('Error en handleRoleChange:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

        try {
            await userService.deleteUser(userId);
            setMessage('✅ Usuario eliminado exitosamente');
            loadUsers();
        } catch (error) {
            setMessage('❌ Error eliminando usuario');
            console.error('Error en handleDeleteUser:', error);
        }
    };

    // Filtrar usuarios basado en la búsqueda
    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="user-manager">
            <h2>Gestión de Usuarios</h2>

            {message && (
                <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

            {/* Barra de búsqueda y estadísticas */}
            <div className="user-header">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar usuarios por nombre o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="user-stats">
                    <span>Total: {users.length}</span>
                    <span>Admins: {users.filter(u => u.role === 'admin').length}</span>
                    <span>Usuarios: {users.filter(u => u.role === 'user').length}</span>
                </div>
            </div>

            {/* Tabla de usuarios */}
            <div className="users-table-container">
                {loading ? (
                    <div className="loading">Cargando usuarios...</div>
                ) : (
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Fecha Registro</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="no-users">
                                        {searchTerm ? 'No se encontraron usuarios' : 'No hay usuarios registrados'}
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="user-row">
                                        <td>
                                            <div className="user-info">
                                                <strong>{user.name} {user.lastName}</strong>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <select
                                                value={user.role || 'user'}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                className={`role-select ${user.role === 'admin' ? 'admin' : 'user'}`}
                                            >
                                                <option value="user">Usuario</option>
                                                <option value="admin">Administrador</option>
                                            </select>
                                        </td>
                                        <td>
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td>
                                            <div className="user-actions">
                                                <button
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    className="delete-btn"
                                                    disabled={user.role === 'admin'} // No permitir eliminar admins
                                                    title={user.role === 'admin' ? 'No se puede eliminar un admin' : 'Eliminar usuario'}
                                                >
                                                    🗑️ Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default UserManager;