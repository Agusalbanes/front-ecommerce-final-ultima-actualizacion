// pages/Home/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Bienvenido a Nuestra Tienda</h1>
                    <p>Descubre los mejores productos con la mejor calidad</p>
                    <Link to="/products" className="cta-button">
                        Ver Productos
                    </Link>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured">
                <h2>Productos Destacados</h2>
                <div className="products-grid">
                    {/* Los productos se cargarán aquí */}
                </div>
            </section>
        </div>
    );
};

export default Home;