import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import { useAuth } from '../../hooks/useAuth.js';
import '../../styles/Header.css';
import { FaCartShopping } from "react-icons/fa6";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { getCartItemsCount } = useCart();
    const { user, logout, isAdmin } = useAuth();


    const cartItemsCount = getCartItemsCount ? getCartItemsCount() : 0;

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    const getUserDisplayName = () => {
        if (user?.lastName) {
            return `${user.name} ${user.lastName}`;
        }
        return user?.name;
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <h1>Crea Recuerdos</h1>
                </Link>

                <nav className="nav-desktop">
                    <Link to="/products">Productos</Link>
                   {/*  <Link to="/categories">Categorías</Link> */}
                    <Link to="/about">Nosotros</Link>
                </nav>

                <div className="header-actions">
                    <Link to="/cart" className="cart-icon">
                        <FaCartShopping />
                        {cartItemsCount > 0 && (
                            <span className="cart-count">{cartItemsCount}</span>
                        )}
                    </Link>

                    {user ? (
                        <div className="user-menu">
                            <span className="user-greeting">Hola, {getUserDisplayName()}</span>
                            
                            {isAdmin && (
                                <Link to="/admin" className="admin-panel-btn">
                                    Panel Admin
                                </Link>
                            )}
                            
                            <button onClick={handleLogout} className="logout-btn">
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="user-icon">👤</Link>
                    )}

                    <button
                        className="menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                </div>

                <div className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/products" onClick={() => setIsMenuOpen(false)}>Productos</Link>
                    {/* <Link to="/categories" onClick={() => setIsMenuOpen(false)}>Categorías</Link> */}
                    <Link to="/about" onClick={() => setIsMenuOpen(false)}>Nosotros</Link>
                    
                    {user ? (
                        <>
                            <span className="user-info">Hola, {getUserDisplayName()}</span>
                            
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