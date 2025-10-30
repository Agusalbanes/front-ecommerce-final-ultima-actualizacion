// context/CartContext.js
import { createContext } from 'react';

const CartContext = createContext({
    items: [],
    addToCart: () => { },
    removeFromCart: () => { },
    updateQuantity: () => { },
    clearCart: () => { },
    getCartTotal: () => 0,
    getCartItemsCount: () => 0
});

export default CartContext;