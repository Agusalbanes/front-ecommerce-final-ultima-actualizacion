# 🛍️ Crea Recuerdos - Ecommerce Frontend

Frontend moderno y responsive para el ecommerce "Crea Recuerdos", desarrollado con React.js y Vite. Una plataforma de comercio electrónico con panel de administración, carrito de compras y autenticación de usuarios.

## 🚀 Características Principales

### 🛒 Funcionalidades de Ecommerce
- **Catálogo de productos** con filtros y búsqueda
- **Carrito de compras** persistente
- **Gestión de categorías**


### 👤 Sistema de Usuarios
- **Autenticación JWT**
- **Registro y login** de usuarios
- **Roles de administrador**

### 🛠️ Panel de Administración
- **Gestión completa de productos** (CRUD)
- **Administración de categorías**
- **Dashboard administrativo**


### 📱 Experiencia Mobile-First
- **Diseño responsive**
- **Menú hamburguesa optimizado**


## 🛠️ Tecnologías Utilizadas

### Frontend Principal
- **React 18.2.0** - Biblioteca de interfaz de usuario
- **Vite 4.4.5** - Build tool y dev server
- **React Router DOM 6.15.0** - Navegación
- **React Icons** - Biblioteca de íconos


### Estado y Gestión de Datos
- **React Context API** - Estado global
- **Custom Hooks** - Lógica reutilizable
- **Local Storage** - Persistencia de datos

## 📦 Estructura del Proyecto
front-ecommerce
├── public/ 
├── src/
│ ├── components/ 
│ │ ├── admin/ 
│ │ ├── common/ 
│ │ └── products/
| ├── config/ 
│ ├── context/ 
│ │ ├── AuthProvider.jsx
│ │ └── CartProvider.jsx
│ │ ├── AuthContext.jsx
│ │ └── CartContext.jsx
│ ├── hooks/ 
│ │ ├── useAuth.js
│ │ └── useCart.js
│ ├── pages/ 
│ │ ├── Admin/ 
│ │ ├── Home/ 
│ │ ├── Products/ 
│ │ └── About/
│ │ ├── Cart/ 
│ │ ├── Login/ 
│ │ ├── ProductDetail/ 
│ ├── services/ 
│ │ ├── authService.js 
│ │ ├── cartService.js
│ │ ├── categoryService.js
│ │ └── productService.js
│ │ ├── userService.js
│ ├── styles/
│ │ ├── global.css
│ │ ├── Header.css
│ │ └── Layout.css
│ │ ├── reset.css
│ │ ├── variables.css
│ └── App.jsx
│ └── main.jsx
├── .env
└── .env.example
├── .gitignore
└── index.html
├── package-lock.json
└── README.md
├── package.json
└── vite.config.js


## 🚀 Instalación y Configuración


### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Agusalbanes/front-ecommerce-final-ultima-actualizacion.git

2. **Instalar dependencias**
    npm install

3. **Configurar variables de entorno**

# Crear archivo .env en la raíz del proyecto
    VITE_API_URL=http://localhost:PORT/api

4. **Ejecutar en desarrollo**

    npm run dev

## Posibles mejoras / ToDo
Integración con pasarelas de pago
Sistema de reviews y ratings
Wishlist de productos
Modo oscuro
Mejora responsive
Product Detail
Image de products

## 👨‍💻 Autor
Agustina Albanés
GitHub: @Agusalbanes
Proyecto: Crea Recuerdos Ecommerce


