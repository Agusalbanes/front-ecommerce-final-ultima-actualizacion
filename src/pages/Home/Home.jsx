import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1>Bienvenido a Nuestra Tienda</h1>
                    <p>Descubre los mejores productos con la mejor calidad</p>
                    <Link to="/products" className="cta-button">
                        Ver Productos
                    </Link>
                </div>
            </section>

            <section className="featured">
                <h2>Productos Destacados</h2>
                <div className="products-grid">
                </div>
            </section>
        </div>
    );
};

export default Home;