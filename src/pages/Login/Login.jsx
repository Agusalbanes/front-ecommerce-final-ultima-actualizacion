// pages/Login/Login.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Nuevo estado
  
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  // Limpiar mensajes cuando cambia el modo
  useEffect(() => {
    setMessage({ text: '', type: '' });
    setFormErrors({});
    setRegistrationSuccess(false); // Resetear cuando cambia de modo
  }, [isLogin]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    
    // Limpiar error del campo cuando el usuario escribe
    if (formErrors[e.target.name]) {
      setFormErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El email no es válido';
    }

    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}/.test(formData.password)) {
      errors.password = 'La contraseña debe tener entre 6-12 caracteres, una mayúscula, una minúscula y un número';
    }

    if (!isLogin) {
      if (!formData.name) {
        errors.name = 'El nombre es requerido';
      } else if (formData.name.length < 2) {
        errors.name = 'El nombre debe tener al menos 2 caracteres';
      }

      if (!formData.lastName) {
        errors.lastName = 'El apellido es requerido';
      } else if (formData.lastName.length < 2) {
        errors.lastName = 'El apellido debe tener al menos 2 caracteres';
      }

      if (!formData.age) {
        errors.age = 'La edad es requerida';
      } else if (formData.age < 16 || formData.age > 110) {
        errors.age = 'La edad debe ser entre 16 y 110 años';
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Confirma tu contraseña';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    let result;
    
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register({
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        age: parseInt(formData.age),
        password: formData.password
      });
    }

    // Mostrar mensaje directamente en el componente
    if (result.success) {
      setMessage({ 
        text: result.message || (isLogin ? '¡Login exitoso!' : '¡Registro exitoso!'), 
        type: 'success' 
      });
      
      // Si es registro exitoso, deshabilitar el formulario
      if (!isLogin) {
        setRegistrationSuccess(true);
      }
      
      // Navegar después de 2 segundos para que se vea el mensaje
      setTimeout(() => {
        if (!result.needsLogin && isLogin) {
          navigate('/');
        }
        // Si es registro y necesita login, quedarse en la página pero cambiar a modo login
        else if (result.needsLogin) {
          setIsLogin(true);
          setRegistrationSuccess(false);
        }
      }, 2000);
    } else {
      setMessage({ 
        text: result.message || 'Error desconocido', 
        type: 'error' 
      });
    }
  };

  // Determinar si el botón debe estar deshabilitado
  const isSubmitDisabled = () => {
    if (loading) return true;
    if (!isLogin && registrationSuccess) return true; // Deshabilitar después de registro exitoso
    return false;
  };

  // Obtener texto del botón
  const getButtonText = () => {
    if (loading) return 'Cargando...';
    if (!isLogin && registrationSuccess) return '✅ Registro Exitoso';
    return isLogin ? 'Iniciar Sesión' : 'Crear Cuenta';
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h1>
          
          {/* Mostrar mensaje de éxito o error */}
          {message.text && (
            <div className={`message ${message.type}-message`}>
              {message.type === 'success' ? '✅' : '❌'} {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className={formErrors.name ? 'error' : ''}
                    disabled={registrationSuccess} // Deshabilitar campos después de registro
                  />
                  {formErrors.name && (
                    <span className="field-error">{formErrors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={formErrors.lastName ? 'error' : ''}
                    disabled={registrationSuccess}
                  />
                  {formErrors.lastName && (
                    <span className="field-error">{formErrors.lastName}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    name="age"
                    placeholder="Edad"
                    min="16"
                    max="110"
                    value={formData.age}
                    onChange={handleChange}
                    className={formErrors.age ? 'error' : ''}
                    disabled={registrationSuccess}
                  />
                  {formErrors.age && (
                    <span className="field-error">{formErrors.age}</span>
                  )}
                </div>
              </>
            )}

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? 'error' : ''}
                disabled={registrationSuccess && !isLogin}
              />
              {formErrors.email && (
                <span className="field-error">{formErrors.email}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className={formErrors.password ? 'error' : ''}
                disabled={registrationSuccess && !isLogin}
              />
              {formErrors.password && (
                <span className="field-error">{formErrors.password}</span>
              )}
            </div>

            {!isLogin && (
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={formErrors.confirmPassword ? 'error' : ''}
                  disabled={registrationSuccess}
                />
                {formErrors.confirmPassword && (
                  <span className="field-error">{formErrors.confirmPassword}</span>
                )}
              </div>
            )}

            <button 
              type="submit" 
              className={`auth-button ${isSubmitDisabled() ? 'disabled' : ''}`}
              disabled={isSubmitDisabled()}
            >
              {getButtonText()}
            </button>
          </form>

          <div className="auth-switch">
            <p>
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="switch-button"
                disabled={registrationSuccess} // Deshabilitar cambio de modo después de registro
              >
                {isLogin ? 'Regístrate' : 'Inicia Sesión'}
              </button>
            </p>
          </div>

          {/* Mensaje adicional después del registro exitoso */}
          {registrationSuccess && (
            <div className="success-message">
              <p>🎉 ¡Registro completado! Redirigiendo al login...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;