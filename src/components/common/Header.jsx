import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import { useAuth } from '../../hooks/useAuth.js';
import '../../styles/Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { getCartItemsCount } = useCart();
    const { user, logout, isAdmin } = useAuth();

    // Manejo seguro del contador
    const cartItemsCount = getCartItemsCount ? getCartItemsCount() : 0;

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    // Función para mostrar nombre completo o solo nombre si no hay apellido
    const getUserDisplayName = () => {
        if (user?.lastName) {
            return `${user.name} ${user.lastName}`;
        }
        return user?.name;
    };

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo */}
                <Link to="/" className="logo">
                    <h1>Ecommerce</h1>
                </Link>

                {/* Navegación Desktop */}
                <nav className="nav-desktop">
                    <Link to="/products">Productos</Link>
                    <Link to="/categories">Categorías</Link>
                    <Link to="/about">Nosotros</Link>
                </nav>

                {/* Iconos de usuario/carrito */}
                <div className="header-actions">
                    {/* Carrito con contador */}
                    <Link to="/cart" className="cart-icon">
                        🛒
                        {cartItemsCount > 0 && (
                            <span className="cart-count">{cartItemsCount}</span>
                        )}
                    </Link>

                    {/* Usuario */}
                    {user ? (
                        <div className="user-menu">
                            <span className="user-greeting">Hola, {getUserDisplayName()}</span>
                            
                            {/* BOTÓN PANEL ADMIN - Solo visible para admins */}
                            {isAdmin && (
                                <Link to="/admin" className="admin-panel-btn">
                                    🛠️ Panel Admin
                                </Link>
                            )}
                            
                            <button onClick={handleLogout} className="logout-btn">
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="user-icon">👤</Link>
                    )}

                    {/* Menú hamburguesa móvil */}
                    <button
                        className="menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                </div>

                {/* Menú móvil */}
                <div className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/products" onClick={() => setIsMenuOpen(false)}>Productos</Link>
                    <Link to="/categories" onClick={() => setIsMenuOpen(false)}>Categorías</Link>
                    <Link to="/about" onClick={() => setIsMenuOpen(false)}>Nosotros</Link>
                    
                    {user ? (
                        <>
                            <span className="user-info">Hola, {getUserDisplayName()}</span>
                            
                            {/* BOTÓN PANEL ADMIN MÓVIL - Solo visible para admins */}
                            {isAdmin && (
                                <Link 
                                    to="/admin" 
                                    className="admin-panel-btn mobile"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    🛠️ Panel Admin
                                </Link>
                            )}
                            
                            <button onClick={handleLogout} className="logout-btn">
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Ingresar</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;