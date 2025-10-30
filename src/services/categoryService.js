import { api } from '../config/api';
import { API_CONFIG } from '../config/api';

export const categoryService = {
    getCategories: async () => {
        try {
            const response = await api.get(API_CONFIG.CATEGORY.GET_ALL);
            // Acceder correctamente a las categorías según la estructura del backend
            return response.data.data || [];
        } catch (error) {
            console.error('❌ Error cargando categorías:', error);
            throw error;
        }
    },

    createCategory: async (categoryData) => {
        try {
            const response = await api.post(API_CONFIG.CATEGORY.CREATE, categoryData);
            return response.data;
        } catch (error) {
            console.error('❌ Error creando categoría:', error);
            throw error;
        }
    },

    deleteCategory: async (id) => {
        try {
            const response = await api.delete(`${API_CONFIG.CATEGORY.DELETE}/${id}`);
            return response.data;
        } catch (error) {
            console.error('❌ Error eliminando categoría:', error);
            throw error;
        }
    }
};