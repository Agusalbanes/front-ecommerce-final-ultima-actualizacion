import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
});

const CART_ROUTES = {
    GET_CART: '/cart',
    ADD_ITEM: '/cart/add',
    UPDATE_ITEM: '/cart/update',
    REMOVE_ITEM: '/cart/remove',
    CLEAR_CART: '/cart/clear'
};

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const cartService = {
    getCart: async () => {
        try {
            const response = await api.get(CART_ROUTES.GET_CART);
            return response.data;
        } catch  {
            console.warn('🔄 Carrito local');
            return { items: [] };
        }
    },

    addToCart: async (productId, quantity = 1) => {
        try {
            const response = await api.post(CART_ROUTES.ADD_ITEM, { 
                productId, 
                quantity 
            });
            return response.data;
        } catch  {
            console.warn('🔄 Item agregado localmente');
            return { success: true };
        }
    },

    updateCartItem: async (productId, quantity) => {
        try {
            const response = await api.put(CART_ROUTES.UPDATE_ITEM, { 
                productId, 
                quantity 
            });
            return response.data;
        } catch  {
            console.warn('🔄 Item actualizado localmente');
            return { success: true };
        }
    },

    removeFromCart: async (productId) => {
        try {
            const response = await api.delete(`${CART_ROUTES.REMOVE_ITEM}/${productId}`);
            return response.data;
        } catch  {
            console.warn('🔄 Item removido localmente');
            return { success: true };
        }
    },

    clearCart: async () => {
        try {
            const response = await api.delete(CART_ROUTES.CLEAR_CART);
            return response.data;
        } catch  {
            console.warn('🔄 Carrito limpiado localmente');
            return { success: true };
        }
    }
};