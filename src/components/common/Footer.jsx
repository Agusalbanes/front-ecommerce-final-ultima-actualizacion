import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-sections">
                    <div className="footer-section">
                        <h3>Crea Recuerdos</h3>
                        <p>Tu tienda online de confianza con los mejores productos y precios competitivos.</p>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook"><CiFacebook /></a>
                            <a href="#" aria-label="Instagram"><CiInstagram /></a>
                            <a href="#" aria-label="Twitter"><CiTwitter /></a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>Enlaces Rápidos</h4>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/products">Productos</Link></li>
                            <li><Link to="/about">Nosotros</Link></li>
                            <li><Link to="/contact">Contacto</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Categorías</h4>
                        <ul>
                            <li><Link to="/products?category=electronics">Electrónicos</Link></li>
                            <li><Link to="/products?category=clothing">Ropa</Link></li>
                            <li><Link to="/products?category=home">Hogar</Link></li>
                            <li><Link to="/products?category=sports">Deportes</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Contacto</h4>
                        <ul>
                            <li><MdOutlineEmail /> info@ecommerce.com</li>
                            <li> <CiPhone />+1 (555) 123-4567</li>
                            <li> <CiLocationOn />123 Calle Principal, Ciudad</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p> <FaRegCopyright />2025 Crea Recuerdos.Todos los derechos reservados.</p>
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