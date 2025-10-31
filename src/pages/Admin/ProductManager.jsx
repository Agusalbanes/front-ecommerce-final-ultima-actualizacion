import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import './ProductManager.css';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    profitRate: '1.30',
    status: 'AVAILABLE',
    category: '',
    stock: '0',
    highlighted: false
  });

  const statusOptions = ['AVAILABLE', 'NOT AVAILABLE', 'DISCONTINUED'];

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      setMessage('Error cargando productos');
      console.error('Error en loadProducts:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error cargando categorías:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productForm.name || !productForm.price || !productForm.category) {
      setMessage('❌ Nombre, precio y categoría son requeridos');
      return;
    }

    setLoading(true);
    try {
      const productData = {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        profitRate: parseFloat(productForm.profitRate),
        status: productForm.status,
        category: productForm.category,
        stock: parseInt(productForm.stock),
        highlighted: productForm.highlighted
      };

      if (editingProduct) {
        console.log('🔄 Ejecutando updateProduct...');
        await productService.updateProduct(editingProduct._id, productData);
        setMessage('✅ Producto actualizado exitosamente');
      } else {
        await productService.createProduct(productData);
        setMessage('✅ Producto creado exitosamente');
      }

      resetForm();
      loadProducts();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setMessage(`❌ Error: ${errorMessage}`);
      console.error('Error en handleSubmit:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      profitRate: '1.30',
      status: 'AVAILABLE',
      category: '',
      stock: '0',
      highlighted: false
    });
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
  
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      profitRate: product.profitRate?.toString() || '1.30',
      status: product.status || 'AVAILABLE',
      category: product.category?._id || product.category || '',
      stock: product.stock?.toString() || '0',
      highlighted: product.highlighted || false
    });
    
    console.log('📝 Formulario actualizado:', {
      name: product.name,
      category: product.category?._id || product.category
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await productService.deleteProduct(id);
      setMessage('✅ Producto eliminado exitosamente');
      loadProducts();
    } catch (error) {
      setMessage('❌ Error eliminando producto');
      console.error('Error en handleDelete:', error);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Sin categoría';
  };

  return (
    <div className="product-manager">
      <h2>Gestión de Productos</h2>

      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form">
        <h3>{editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>Nombre *</label>
            <input
              type="text"
              name="name"
              value={productForm.name}
              onChange={handleInputChange}
              placeholder="Nombre del producto"
              required
              minLength="3"
              maxLength="50"
            />
          </div>

          <div className="form-group">
            <label>Precio *</label>
            <input
              type="number"
              name="price"
              value={productForm.price}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              min="1"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tasa de Ganancia</label>
            <input
              type="number"
              name="profitRate"
              value={productForm.profitRate}
              onChange={handleInputChange}
              placeholder="1.30"
              step="0.01"
              min="1"
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={productForm.stock}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={productForm.description}
            onChange={handleInputChange}
            placeholder="Descripción del producto"
            rows="3"
            minLength="5"
            maxLength="200"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Estado</label>
            <select
              name="status"
              value={productForm.status}
              onChange={handleInputChange}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Categoría *</label>
            <select
              name="category"
              value={productForm.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar categoría</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="highlighted"
              checked={productForm.highlighted}
              onChange={handleInputChange}
            />
            Producto destacado
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : (editingProduct ? 'Actualizar Producto' : 'Crear Producto')}
          </button>
          {editingProduct && (
            <button type="button" onClick={resetForm} className="cancel-btn">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="products-list">
        <h3>Productos Existentes ({products.length})</h3>
        
        {products.length === 0 ? (
          <p>No hay productos</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p className="price">${product.price}</p>
                  {product.priceWithProfitRate && (
                    <p className="price-profit">Precio final: ${product.priceWithProfitRate.toFixed(2)}</p>
                  )}
                  <p className="description">{product.description}</p>
                  <p className="category">Categoría: {getCategoryName(product.category)}</p>
                  <p className="stock">Stock: {product.stock}</p>
                  <p className="status">Estado: {product.status}</p>
                  <p className="highlighted">
                    {product.highlighted ? '⭐ Destacado' : 'Normal'}
                  </p>
                </div>

                <div className="product-actions">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="edit-btn"
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="delete-btn"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManager;