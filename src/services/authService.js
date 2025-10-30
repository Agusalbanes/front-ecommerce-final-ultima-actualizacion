import { api } from '../config/api';

export const authService = {
    login: async (email, password) => {
        const response = await api.post('/user/login', { 
            email, 
            password 
        });
        return response.data;
    },

    register: async (userData) => {
        const registerData = {
            name: userData.name,
            lastName: userData.lastName,
            email: userData.email,
            age: userData.age,
            password: userData.password
        };
        
        const response = await api.post('/user/create', registerData);
        return response.data;
    },

    getProfile: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');
            
            // Decodificar el token
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log('🔐 Token payload completo:', payload);
            
            // Usar los nombres de campos correctos según el backend
            // Del token vimos: userId, userEmail, role
            return {
                id: payload.userId || payload.id,           // ← userId del token
                email: payload.userEmail || payload.email,  // ← userEmail del token  
                name: payload.name || 'Administrador',      // ← name puede no venir
                lastName: payload.lastName || '',           // ← lastName puede no venir
                role: payload.role                          // ← role sí viene
            };
            
        } catch (error) {
            console.error('Error getting profile:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    }
};