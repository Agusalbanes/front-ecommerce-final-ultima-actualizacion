// context/CartProvider.jsx
import React, { useReducer, useEffect } from 'react';
import CartContext from './CartContext';

const initialState = {
    items: []
};

// Cargar carrito desde localStorage al inicializar
const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const parsed = JSON.parse(savedCart);
            // Asegurarnos de que siempre tenga la estructura correcta
            return {
                items: parsed.items || parsed || [] // Compatibilidad con versiones anteriores
            };
        }
        return initialState;
    } catch (error) {
        console.error('Error loading cart from storage:', error);
        return initialState;
    }
};

const cartReducer = (state, action) => {
    let newState;

    switch (action.type) {
        case 'ADD_TO_CART': {
            const product = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === product.id);

            if (existingItemIndex >= 0) {
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1
                };
                newState = { ...state, items: updatedItems };
            } else {
                newState = {
                    ...state,
                    items: [...state.items, { ...product, quantity: 1 }]
                };
            }
            break;
        }

        case 'REMOVE_FROM_CART': {
            newState = {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
            break;
        }

        case 'UPDATE_QUANTITY': {
            const { id: productId, quantity } = action.payload;
            if (quantity <= 0) {
                newState = {
                    ...state,
                    items: state.items.filter(item => item.id !== productId)
                };
            } else {
                newState = {
                    ...state,
                    items: state.items.map(item =>
                        item.id === productId ? { ...item, quantity } : item
                    )
                };
            }
            break;
        }

        case 'CLEAR_CART': {
            newState = {
                ...state,
                items: []
            };
            break;
        }

        case 'LOAD_CART': {
            newState = {
                ...state,
                items: action.payload || [] // Asegurar que sea array
            };
            break;
        }

        default:
            return state;
    }

    // Guardar en localStorage después de cada cambio
    try {
        localStorage.setItem('cart', JSON.stringify(newState));
    } catch (error) {
        console.error('Error saving cart to storage:', error);
    }

    return newState;
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, loadCartFromStorage());

    // Cargar carrito al montar el componente
    useEffect(() => {
        const savedCart = loadCartFromStorage();
        if (savedCart.items && savedCart.items.length > 0) {
            dispatch({ type: 'LOAD_CART', payload: savedCart.items });
        }
    }, []);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const getCartTotal = () => {
        // Asegurarnos de que items siempre sea un array
        const items = state.items || [];
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartItemsCount = () => {
        // Asegurarnos de que items siempre sea un array
        const items = state.items || [];
        return items.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        items: state.items || [], // Siempre devolver array
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};