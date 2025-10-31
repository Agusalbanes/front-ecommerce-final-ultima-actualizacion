# Configuración de Variables de Entorno

## Configuración Inicial

1. **Copia el archivo de plantilla:**
   ```bash
   cp env.txt .env
   ```

2. **Edita el archivo `.env` con tus valores:**
   ```env
   VITE_API_BASE_URL=http://localhost:PORT/api
   ```

## Variables Disponibles

### `VITE_API_BASE_URL`
- **Descripción**: URL base de la API del backend

## Estructura de la API

La configuración de la API está centralizada en `src/config/api.js`:

- **Usuarios**: `/user/*`
- **Productos**: `/product/*`
- **Categorías**: `/category/*`

