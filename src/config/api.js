import axios from "axios";

export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    
    USER: {
        CREATE: '/user/create',
        GET_ALL: '/user/getUsers', 
        UPDATE: '/user/updateUser',
        DELETE: '/user/deleteUser',
        LOGIN: '/user/login'
    },
    
    PRODUCT: {
        GET_ALL: '/product',
        CREATE: '/product/create',
        UPDATE: '/product/update', 
        DELETE: '/product/delete',
        FIND_BY_ID: '/product/find-by-id',
        FIND_BY_NAME: '/product/name',
        STATUS: '/product/status'
    },
    
    CATEGORY: {
        GET_ALL: '/category',
        CREATE: '/category',
        DELETE: '/category',
        UPDATE: '/category'
    }
};

export const buildApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: 10000,
});

// Interceptor para agregar el token automáticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('🔐 Request interceptor - Token agregado a:', config.url);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores globalmente - CON DEBUG DETALLADO
api.interceptors.response.use(
    (response) => {
        console.log('✅ Response interceptor - Status:', response.status, 'URL:', response.config.url);
        return response;
    },
    (error) => {
        console.log('❌ Response interceptor - ERROR DETECTADO:', {
            status: error.response?.status,
            url: error.config?.url,
            method: error.config?.method,
            message: error.message,
            data: error.response?.data
        });
        
        if (error.response?.status === 401) {
            console.log('🔄 INTERCEPTOR: Redirigiendo a login por error 401 en:', error.config?.url);
            console.log('🔄 Token actual:', localStorage.getItem('token'));
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export { api };