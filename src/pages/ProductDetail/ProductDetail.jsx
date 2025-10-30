// pages/ProductDetail/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { productService } from '../../services/productService';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            setLoading(true);
            const productData = await productService.getProduct(id);
            setProduct(productData);
        } catch (err) {
            setError('Producto no encontrado');
            console.error('Error loading product:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            for (let i = 0; i < quantity; i++) {
                addToCart(product);
            }
            // Opcional: mostrar notificación de éxito
            alert(`${quantity} ${product.name} agregado(s) al carrito`);
        }
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => prev > 1 ? prev - 1 : 1);
    };

    if (loading) {
        return (
            <div className="product-detail-loading">
                <div className="loading-spinner"></div>
                <p>Cargando producto...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-detail-error">
                <h2>Producto no encontrado</h2>
                <p>{error || 'El producto que buscas no existe.'}</p>
                <button onClick={() => navigate('/products')} className="back-button">
                    Volver a Productos
                </button>
            </div>
        );
    }

    // Imágenes de ejemplo (en un caso real vendrían del producto)
    const productImages = [
        product.image,
        product.image, // Segunda imagen igual por simplicidad
        product.image  // Tercera imagen igual por simplicidad
    ];

    return (
        <div className="product-detail">
            <div className="product-detail-container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <button onClick={() => navigate('/')} className="breadcrumb-link">Inicio</button>
                    <span className="breadcrumb-separator">/</span>
                    <button onClick={() => navigate('/products')} className="breadcrumb-link">Productos</button>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">{product.name}</span>
                </nav>

                <div className="product-detail-content">
                    {/* Galería de imágenes */}
                    <div className="product-gallery">
                        <div className="gallery-main">
                            <img
                                src={productImages[selectedImage]}
                                alt={product.name}
                                className="main-image"
                            />
                        </div>

                        <div className="gallery-thumbnails">
                            {productImages.map((image, index) => (
                                <button
                                    key={index}
                                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img src={image} alt={`${product.name} ${index + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Información del producto */}
                    <div className="product-info">
                        <div className="product-header">
                            <h1 className="product-title">{product.name}</h1>
                            <div className="product-rating">
                                <div className="stars">
                                    {'★'.repeat(Math.floor(product.rating || 4))}
                                    {'☆'.repeat(5 - Math.floor(product.rating || 4))}
                                </div>
                                <span className="rating-count">({product.reviewCount || 0} reseñas)</span>
                            </div>
                        </div>

                        <div className="product-price">
                            <span className="current-price">${product.price}</span>
                            {product.originalPrice && (
                                <span className="original-price">${product.originalPrice}</span>
                            )}
                            {product.discount && (
                                <span className="discount-badge">-{product.discount}%</span>
                            )}
                        </div>

                        <div className="product-description">
                            <p>{product.description}</p>
                        </div>

                        <div className="product-features">
                            <h3>Características</h3>
                            <ul>
                                <li>✅ Envío gratis</li>
                                <li>✅ Devolución en 30 días</li>
                                <li>✅ Garantía del fabricante</li>
                                <li>✅ Stock disponible</li>
                            </ul>
                        </div>

                        {/* Selector de cantidad */}
                        <div className="quantity-selector">
                            <label htmlFor="quantity">Cantidad:</label>
                            <div className="quantity-controls">
                                <button
                                    onClick={decreaseQuantity}
                                    disabled={quantity <= 1}
                                    className="quantity-btn"
                                >
                                    -
                                </button>
                                <span className="quantity-display">{quantity}</span>
                                <button
                                    onClick={increaseQuantity}
                                    className="quantity-btn"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="product-actions">
                            <button
                                onClick={handleAddToCart}
                                className="add-to-cart-btn"
                            >
                                Agregar al Carrito
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="buy-now-btn"
                            >
                                Comprar Ahora
                            </button>
                        </div>

                        {/* Información adicional */}
                        <div className="product-meta">
                            <div className="meta-item">
                                <strong>Categoría:</strong>
                                <span>{product.category || 'General'}</span>
                            </div>
                            <div className="meta-item">
                                <strong>SKU:</strong>
                                <span>{product.id || 'N/A'}</span>
                            </div>
                            <div className="meta-item">
                                <strong>Disponibilidad:</strong>
                                <span className="in-stock">En stock</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de productos relacionados */}
                <section className="related-products">
                    <h2>Productos Relacionados</h2>
                    <div className="related-grid">
                        {/* Aquí irían productos relacionados */}
                        <div className="related-placeholder">
                            <p>Productos similares aparecerían aquí</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductDetail;