import { api } from '../config/api';

const API_CONFIG = {
    USER: {
        CREATE: '/user/create',
        GET_ALL: '/user/getUsers',
        UPDATE: '/user/updateUser/:id',
        DELETE: '/user/deleteUser/:id',
        LOGIN: '/user/login',
        CREATE_ADMIN: '/user/create-admin'
    }
};

export const userService = {
    getUsers: async () => {
        try {
            console.log('📤 Obteniendo lista de usuarios...');
            const response = await api.get(API_CONFIG.USER.GET_ALL);
            console.log('✅ Usuarios cargados:', response.data);
    
            if (response.data && Array.isArray(response.data.data)) {
                return response.data.data;
            } else if (Array.isArray(response.data)) {
                return response.data;
            } else {
                return [];
            }
        } catch (error) {
            console.error('❌ Error cargando usuarios:', error);
            throw error;
        }
    },

    createUser: async (userData) => {
        try {
            console.log('👤 Creando usuario:', userData);
            const response = await api.post(API_CONFIG.USER.CREATE, userData);
            console.log('✅ Usuario creado:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error creando usuario:', error);
            throw error;
        }
    },

    updateUser: async (id, userData) => {
        try {
            console.log('✏️ Actualizando usuario:', id, userData);
            const endpoint = API_CONFIG.USER.UPDATE.replace(':id', id);
            const response = await api.patch(endpoint, userData);
            console.log('✅ Usuario actualizado:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error actualizando usuario:', error);
            throw error;
        }
    },

    deleteUser: async (id) => {
        try {
            console.log('🗑️ Eliminando usuario:', id);
            const endpoint = API_CONFIG.USER.DELETE.replace(':id', id);
            const response = await api.delete(endpoint);
            console.log('✅ Usuario eliminado:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error eliminando usuario:', error);
            throw error;
        }
    },

    createAdmin: async (adminData) => {
        try {
            console.log('👑 Creando administrador:', adminData);
            const response = await api.post(API_CONFIG.USER.CREATE_ADMIN, adminData);
            console.log('✅ Administrador creado:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error creando administrador:', error);
            throw error;
        }
    }
};