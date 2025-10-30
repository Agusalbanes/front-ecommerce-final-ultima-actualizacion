// components/products/ProductCard.jsx
import React from 'react';
import { useCart } from '../../hooks/useCart.js';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <img
                    src={product.image || '/placeholder-product.jpg'}
                    alt={product.name}
                    loading="lazy"
                />
                <div className="product-overlay">
                    <button className="quick-view">Vista rápida</button>
                </div>
            </div>

            <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-price">
                    ${product.price}
                    {product.originalPrice && (
                        <span className="original-price">${product.originalPrice}</span>
                    )}
                </div>

                <div className="product-rating">
                    {'★'.repeat(Math.floor(product.rating || 4))}
                    {'☆'.repeat(5 - Math.floor(product.rating || 4))}
                    <span>({product.reviewCount || 0})</span>
                </div>

                <button
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                >
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;