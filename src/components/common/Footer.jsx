// components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-sections">
                    {/* Logo y descripción */}
                    <div className="footer-section">
                        <h3>Ecommerce</h3>
                        <p>Tu tienda online de confianza con los mejores productos y precios competitivos.</p>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook">📘</a>
                            <a href="#" aria-label="Instagram">📷</a>
                            <a href="#" aria-label="Twitter">🐦</a>
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div className="footer-section">
                        <h4>Enlaces Rápidos</h4>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/products">Productos</Link></li>
                            <li><Link to="/about">Nosotros</Link></li>
                            <li><Link to="/contact">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Categorías */}
                    <div className="footer-section">
                        <h4>Categorías</h4>
                        <ul>
                            <li><Link to="/products?category=electronics">Electrónicos</Link></li>
                            <li><Link to="/products?category=clothing">Ropa</Link></li>
                            <li><Link to="/products?category=home">Hogar</Link></li>
                            <li><Link to="/products?category=sports">Deportes</Link></li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div className="footer-section">
                        <h4>Contacto</h4>
                        <ul>
                            <li>📧 info@ecommerce.com</li>
                            <li>📞 +1 (555) 123-4567</li>
                            <li>📍 123 Calle Principal, Ciudad</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 Ecommerce. Todos los derechos reservados.</p>
                    <div className="footer-links">
                        <Link to="/privacy">Privacidad</Link>
                        <Link to="/terms">Términos</Link>
                        <Link to="/returns">Devoluciones</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;