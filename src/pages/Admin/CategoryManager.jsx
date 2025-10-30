import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setDebugInfo('Cargando categorías...');
      const data = await categoryService.getCategories();
      setCategories(data);
      setDebugInfo(`✅ ${data.length} categorías cargadas`);
      setMessage('');
    } catch (error) {
      const errorMsg = `Error: ${error.message}`;
      setDebugInfo(errorMsg);
      setMessage('Error cargando categorías');
      console.error('Error en loadCategories:', error);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setLoading(true);
    setDebugInfo('Creando categoría...');
    try {
      await categoryService.createCategory({ name: newCategory });
      setNewCategory('');
      setMessage('✅ Categoría creada exitosamente');
      setDebugInfo('Categoría creada, recargando...');
      loadCategories();
    } catch (error) {
      setMessage('❌ Error creando categoría');
      setDebugInfo(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      return;
    }

    try {
      setDebugInfo('Eliminando categoría...');
      await categoryService.deleteCategory(id);
      setMessage('✅ Categoría eliminada exitosamente');
      setDebugInfo('Categoría eliminada, recargando...');
      loadCategories();
    } catch (error) {
      setMessage('❌ Error eliminando categoría');
      setDebugInfo(`Error: ${error.message}`);
      console.error('Error en handleDeleteCategory:', error);
    }
  };

  return (
    <div className="category-manager">
      <h2>Gestión de Categorías</h2>

      {/* Información de debug */}
      <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
        <strong>Debug:</strong> {debugInfo}
      </div>

      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleCreateCategory} className="category-form">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nombre de la nueva categoría"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !newCategory.trim()}>
          {loading ? 'Creando...' : '➕ Crear Categoría'}
        </button>
      </form>

      <div className="categories-list">
        <h3>Categorías Existentes ({categories.length})</h3>
        {categories.length === 0 ? (
          <p>No hay categorías</p>
        ) : (
          <ul>
            {categories.map((category) => (
              <li key={category._id || category.id}>
                <span>{category.name} (ID: {category._id || category.id})</span>
                <button 
                  onClick={() => handleDeleteCategory(category._id || category.id)}
                  className="delete-btn"
                >
                  🗑️ Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;