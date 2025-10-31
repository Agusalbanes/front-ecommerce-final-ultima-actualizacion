import { api }from '../config/api.js';

const API_CONFIG = {
    PRODUCT: {
        GET_ALL: '/product',
        CREATE: '/product',
        UPDATE: '/product/update/:id',
        DELETE: '/product/delete/:id',
        FIND_BY_ID: '/product/find-by-id/:id',
        FIND_BY_NAME: '/product/name/:query',
        STATUS: '/product/status'
    },
    CATEGORY: {
        GET_ALL: '/category'
    }
};

export const productService = {
    getProducts: async () => {
        try {
            console.log(`📤 GET ${API_CONFIG.PRODUCT.GET_ALL}`);
            const response = await api.get(API_CONFIG.PRODUCT.GET_ALL);
        
            if (response.data && Array.isArray(response.data.data)) {
                return response.data.data;
            } else if (Array.isArray(response.data)) {
                return response.data;
            } else {
                return [];
            }
        } catch (error) {
            console.error('❌ Error cargando productos:', error);
            throw error;
        }
    },

    getProduct: async (id) => {
        try {
            const endpoint = API_CONFIG.PRODUCT.FIND_BY_ID.replace(':id', id);
            const response = await api.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`❌ Error cargando producto ${id}:`, error);
            throw error;
        }
    },

    getCategories: async () => {
        try {
            const response = await api.get(API_CONFIG.CATEGORY.GET_ALL);
            if (response.data && Array.isArray(response.data.data)) {
                return response.data.data;
            } else if (Array.isArray(response.data)) {
                return response.data;
            } else {
                return [];
            }
        } catch (error) {
            console.error('❌ Error cargando categorías:', error);
            throw error;
        }
    },

    searchProducts: async (query) => {
        try {
            const endpoint = API_CONFIG.PRODUCT.FIND_BY_NAME.replace(':query', query);
            const response = await api.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('❌ Error buscando productos:', error);
            throw error;
        }
    },

    createProduct: async (productData) => {
        try {
            console.log('📦 Creando producto:', productData);
            const response = await api.post(API_CONFIG.PRODUCT.CREATE, productData);
            console.log('✅ Producto creado:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error creando producto:', error);
            console.log('🔍 Error details:', error.response?.data);
            throw error;
        }
    },

    updateProduct: async (id, productData) => {
        try {
            console.log('📦 Actualizando producto:', id, productData);
            const endpoint = API_CONFIG.PRODUCT.UPDATE.replace(':id', id);
            const response = await api.put(endpoint, productData);
            console.log('✅ Producto actualizado:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error actualizando producto:', error);
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            console.log('📦 Eliminando producto:', id);
            const endpoint = API_CONFIG.PRODUCT.DELETE.replace(':id', id);
            const response = await api.delete(endpoint);
            console.log('✅ Producto eliminado:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error eliminando producto:', error);
            throw error;
        }
    }
};