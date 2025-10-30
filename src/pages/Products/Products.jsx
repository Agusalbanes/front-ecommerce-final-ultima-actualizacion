// pages/Products/Products.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/products/ProductCard';
import { productService } from '../../services/productService';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        priceRange: '',
        sortBy: 'name'
    });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await productService.getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(product => {
        if (filters.category && product.category !== filters.category) return false;
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number);
            if (max && product.price > max) return false;
            if (min && product.price < min) return false;
        }
        return true;
    }).sort((a, b) => {
        switch (filters.sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'name':
            default:
                return a.name.localeCompare(b.name);
        }
    });

    if (loading) {
        return <div className="loading">Cargando productos...</div>;
    }

    return (
        <div className="products-page">
            <div className="products-header">
                <h1>Nuestros Productos</h1>
                <p>Encuentra lo que necesitas</p>
            </div>

            <div className="products-container">
                {/* Filtros */}
                <aside className="filters-sidebar">
                    <div className="filter-group">
                        <h3>Categorías</h3>
                        <select
                            value={filters.category}
                            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                        >
                            <option value="">Todas</option>
                            <option value="electronics">Electrónicos</option>
                            <option value="clothing">Ropa</option>
                            <option value="home">Hogar</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <h3>Precio</h3>
                        <select
                            value={filters.priceRange}
                            onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                        >
                            <option value="">Todos</option>
                            <option value="0-50">$0 - $50</option>
                            <option value="50-100">$50 - $100</option>
                            <option value="100-500">$100 - $500</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <h3>Ordenar por</h3>
                        <select
                            value={filters.sortBy}
                            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                        >
                            <option value="name">Nombre</option>
                            <option value="price-low">Precio: Menor a Mayor</option>
                            <option value="price-high">Precio: Mayor a Menor</option>
                        </select>
                    </div>
                </aside>

                {/* Grid de productos */}
                <main className="products-main">
                    <div className="products-grid">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="no-products">
                            No se encontraron productos con los filtros seleccionados.
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Products;