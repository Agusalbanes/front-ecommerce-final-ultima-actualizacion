import React from 'react';
import { useCart } from '../../hooks/useCart.js';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="cart-empty">
                <div className="empty-content">
                    <h2>Tu carrito está vacío</h2>
                    <p>Agrega algunos productos para continuar</p>
                    <Link to="/products" className="continue-shopping">
                        Continuar Comprando
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-header">
                <h1>Carrito de Compras</h1>
                <button onClick={clearCart} className="clear-cart">
                    Limpiar Carrito
                </button>
            </div>

            <div className="cart-container">
                <div className="cart-items">
                    {items.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="item-image">
                                <img src={item.image} alt={item.name} />
                            </div>

                            <div className="item-details">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-description">{item.description}</p>
                                <div className="item-price">${item.price}</div>
                            </div>

                            <div className="item-controls">
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                        +
                                    </button>
                                </div>

                                <div className="item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="remove-item"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <div className="summary-card">
                        <h3>Resumen del Pedido</h3>

                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${getCartTotal().toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Envío:</span>
                            <span>Gratis</span>
                        </div>

                        <div className="summary-row">
                            <span>Impuestos:</span>
                            <span>${(getCartTotal() * 0.21).toFixed(2)}</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${(getCartTotal() * 1.21).toFixed(2)}</span>
                        </div>

                        <button className="checkout-btn">
                            Proceder al Pago
                        </button>

                        <Link to="/products" className="continue-shopping">
                            Continuar Comprando
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;