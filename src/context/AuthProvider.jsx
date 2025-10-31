import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { authService } from '../services/authService';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        console.log('🔄 AuthProvider montado - checking auth...');
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('🔄 checkAuth - Token existe:', !!token);
            
            if (token) {
                console.log('🔄 checkAuth - Obteniendo perfil...');
                const userData = await authService.getProfile();
                console.log('🔄 checkAuth - User data obtenido:', userData);
                setUser(userData);
            } else {
                console.log('🔄 checkAuth - No hay token, usuario null');
                setUser(null);
            }
        } catch (error) {
            console.error('❌ checkAuth - Error:', error);
            console.log('❌ Eliminando token inválido');
            authService.logout();
            setUser(null);
        } finally {
            setLoading(false);
            console.log('🔄 checkAuth - Loading terminado');
        }
    };

    const login = async (email, password) => {
        try {
            setLoading(true);
            setError('');
            console.log('🔑 Iniciando login...');
            
            const response = await authService.login(email, password);

            localStorage.setItem('token', response.token);
            console.log('🔑 Token guardado:', response.token ? 'SÍ' : 'NO');
            
            const userProfile = await authService.getProfile();
            console.log('🔑 Login exitoso, setting user:', userProfile);
            setUser(userProfile);
            setSuccess('Login exitoso');

            return { 
                success: true, 
                message: response.message, 
                user: userProfile 
            };

        } catch (error) {
            console.error('❌ Error en login:', error);
            const message = error.response?.data?.message || error.message;
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            setError('');
            console.log('📝 Iniciando registro...');

            const response = await authService.register(userData);

            if (response.token) {
                localStorage.setItem('token', response.token);
                const userProfile = await authService.getProfile();
                setUser(userProfile);
                setSuccess('Registro exitoso');
                return { 
                    success: true, 
                    message: response.message, 
                    user: userProfile 
                };
            } else {
                setSuccess('Registro exitoso. Por favor inicia sesión.');
                return { 
                    success: true, 
                    message: response.message, 
                    needsLogin: true 
                };
            }

        } catch (error) {
            console.error('❌ Error en registro:', error);
            const message = error.response?.data?.message || error.message;
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        console.log('🚪 Ejecutando logout');
        authService.logout();
        setUser(null);
        setSuccess('Sesión cerrada exitosamente');
    };

    const clearError = () => {
        setError('');
    };

    const clearSuccess = () => {
        setSuccess('');
    };

    const clearAllMessages = () => {
        setError('');
        setSuccess('');
    };

    const isAdmin = user?.role === 'admin';

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        error,
        success,
        clearError,
        clearSuccess,
        clearAllMessages,
        isAuthenticated: !!user,
        isAdmin: isAdmin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};