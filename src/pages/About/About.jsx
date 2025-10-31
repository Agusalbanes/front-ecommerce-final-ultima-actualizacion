import React from 'react';
import "./About.css"
import { FaHeart } from "react-icons/fa6";
import { FcIdea } from "react-icons/fc";
import { FaHandshake } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { TiMessages } from "react-icons/ti";
import { MdOutlineSecurity } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";

const About = () => {
    return (
        <div className="nosotros-container">
            <div className="nosotros-header">
                <h1>Sobre Nosotros</h1>
                <p>Conoce la historia detrás de <strong>Crea Recuerdos</strong></p>
            </div>

            <div className="nosotros-content">
                <section className="nosotros-section">
                    <div className="section-text">
                        <h2>Nuestra Historia</h2>
                        <p>
                            En <strong>Crea Recuerdos</strong> comenzamos con una simple pero poderosa idea:
                            ayudar a las personas a encontrar productos que realmente amen y que
                            formen parte de sus momentos especiales. Desde nuestro inicio en 2020,
                            hemos crecido gracias a la confianza de miles de clientes que han elegido
                            nuestros productos para crear recuerdos inolvidables.
                        </p>
                    </div>
                    <div className="section-image">
                        <div className="image-placeholder">
                            <img src="logo-img.jfif" alt="logo de la marca Crea Recuerdos" />
                        </div>
                    </div>
                </section>

                <section className="nosotros-section reverse">
                    <div className="section-image">
                        <div className="image-placeholder">
                            <img src="product-img.jfif" alt="producto para bebé" />
                        </div>
                    </div>
                    <div className="section-text">
                        <h2>Nuestra Misión</h2>
                        <p>
                            Ofrecer productos de calidad excepcional que inspiren y ayuden a crear momentos
                            inolvidables, con un servicio al cliente que supere expectativas y precios
                            accesibles para todos.
                        </p>
                    </div>
                </section>

                <section className="valores-section">
                    <h2>Nuestros Valores</h2>
                    <div className="valores-grid">
                        <div className="valor-card">
                            <div className="valor-icon"><FaRegStar /></div>
                            <h3>Calidad Premium</h3>
                            <p>Solo ofrecemos productos que aprobaríamos nosotros mismos</p>
                        </div>
                        <div className="valor-card">
                            <div className="valor-icon"><FaHandshake /></div>
                            <h3>Confianza</h3>
                            <p>Transparencia y honestidad en cada transacción</p>
                        </div>
                        <div className="valor-card">
                            <div className="valor-icon"><FcIdea /></div>
                            <h3>Innovación</h3>
                            <p>Siempre buscando mejorar tu experiencia de compra</p>
                        </div>
                        <div className="valor-card">
                            <div className="valor-icon"><FaHeart /></div>
                            <h3>Compromiso</h3>
                            <p>Contigo, con la calidad y con la comunidad</p>
                        </div>
                    </div>
                </section>

                <section className="features-section">
                    <h2>¿Por Qué Elegir Crea Recuerdos?</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon"><FaShippingFast /></div>
                            <h3>Envíos Rápidos</h3>
                            <p>Recibe tus productos en tiempo récord en todo el país</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon"><MdOutlineSecurity /></div>
                            <h3>Garantía Total</h3>
                            <p>Todos nuestros productos tienen garantía extendida</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon"><TiMessages /></div>
                            <h3>Soporte 24/7</h3>
                            <p>Estamos aquí para ayudarte cuando lo necesites</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon"><BsCashCoin /></div>
                            <h3>Precios Justos</h3>
                            <p>La mejor relación calidad-precio del mercado</p>
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <h2>Únete a Nuestra Comunidad</h2>
                    <p>Más de 50,000 clientes satisfechos confían en nosotros</p>
                    <button className="cta-button">Descubrir Productos</button>
                </section>
            </div>
        </div>
    );
};

export default About