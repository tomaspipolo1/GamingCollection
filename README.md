# 🎮 Gaming Collection - Aplicación Full Stack

## Descripción del Proyecto

Esta es una aplicación web completa para la gestión de colecciones de videojuegos, desarrollada como trabajo práctico para la materia de Desarrollo Full Stack. La aplicación permite a los usuarios crear, leer, actualizar y eliminar videojuegos y géneros, con funcionalidades avanzadas de búsqueda, filtrado y categorización.

## Características Principales

- 🎮 **CRUD completo de videojuegos** con imágenes y detalles
- 🎭 **Gestión de géneros de videojuegos** con soft delete
- 🖥️ **Múltiples plataformas** (Steam, Epic Games, Xbox Game Pass, Ubisoft Connect, etc.) con iconos
- 📊 **Estados de juegos** (Jugado, Sin Jugar, Comprar) con filtros
- 💰 **Gestión de precios** con múltiples monedas (USD, EUR, ARS)
- 🔍 **Búsqueda y filtrado avanzado** por título, plataforma y estado
- 📄 **Paginación inteligente** para grandes colecciones
- 📱 **Diseño responsive** con temática gaming y animaciones
- 🎨 **Interfaz moderna** con SweetAlert2 personalizado y modales
- 📈 **Estadísticas en tiempo real** con contadores animados

## Arquitectura

```
├── backend/          # API REST con Node.js + Express + MongoDB
├── frontend/         # Aplicación React + TypeScript + Tailwind CSS
├── docker-compose.yml # Orquestación de servicios
└── docs/            # Documentación del proyecto
```

## Tecnologías Utilizadas

### Backend
- **Node.js** + **Express.js** - Framework web para la API REST
- **MongoDB** - Base de datos NoSQL para almacenar videojuegos y géneros
- **Mongoose** - ODM para modelado de datos y validaciones
- **CORS** - Comunicación cross-origin entre frontend y backend
- **Helmet** - Middleware de seguridad

### Frontend
- **React 19** con **TypeScript** - Framework para interfaz de usuario moderna
- **CSS3** con **Flexbox y Grid** - Diseño responsive y animaciones
- **Axios** - Cliente HTTP para comunicación con API
- **React Router DOM** - Navegación entre páginas
- **SweetAlert2** - Alertas personalizadas con temática gaming
- **ReactDOM.createPortal** - Renderizado de modales optimizado
- **Custom Hooks** - useGames, useHomeStats para gestión de estado
- **AnimatedCounter** - Componente para estadísticas animadas

### DevOps & Despliegue
- **Docker** para contenerización completa
- **Docker Compose** para orquestación de servicios
- **Azure VM** para despliegue en la nube
- **Nginx** como proxy inverso configurado
- **Docker Hub** para distribución de imágenes

## Instalación y Uso

### Desarrollo Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/tomaspipolo1/GamingCollection.git
```

2. **Ejecutar con Docker Compose**
```bash
docker-compose up -d
```

3. **Acceder a la aplicación**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### Despliegue en Azure

1. **Crear máquina virtual en Azure** (Ubuntu 20.04 LTS)
2. **Instalar Docker y Docker Compose**
3. **Configurar Network Security Groups** (puertos 80, 3000, 5000)
4. **Descargar imágenes desde Docker Hub**
5. **Ejecutar docker-compose up -d**
6. **Acceder mediante IP pública de Azure**

**URLs de acceso:**
- Frontend: `http://[IP_AZURE]:3000`
- Backend API: `http://[IP_AZURE]:5000`
- Swagger UI: `http://[IP_AZURE]:5000/api-docs`

## Estructura de la API

### Endpoints de Géneros

- `GET /api/genres` - Obtener todos los géneros
- `GET /api/genres/active` - Obtener géneros activos
- `GET /api/genres/:id` - Obtener género por ID
- `POST /api/genres` - Crear nuevo género
- `PUT /api/genres/:id` - Actualizar género
- `DELETE /api/genres/:id` - Eliminar género (soft delete)

### Endpoints de Videojuegos

- `GET /api/games` - Obtener todos los juegos (con filtros y paginación)
- `GET /api/games/:id` - Obtener juego por ID
- `GET /api/games/search/:term` - Buscar juegos por título
- `GET /api/games/by-status/:status` - Filtrar por estado
- `GET /api/games/by-platform/:platform` - Filtrar por plataforma
- `POST /api/games` - Crear nuevo juego
- `PUT /api/games/:id` - Actualizar juego
- `DELETE /api/games/:id` - Eliminar juego (soft delete)


## Estado del Proyecto

### ✅ Completado
- ✅ **Backend API REST** - Completamente funcional con 16 endpoints
- ✅ **Modelos de datos** - Genre y Game con validaciones y soft delete
- ✅ **Frontend React** - Interfaz completa con TypeScript
- ✅ **Diseño responsive** - CSS Grid con breakpoints (6/4/2 columnas)
- ✅ **Gestión de imágenes** - Upload con Multer y Sharp
- ✅ **SweetAlert2 personalizado** - Alertas con temática gaming
- ✅ **Modales optimizados** - ReactDOM.createPortal y scroll lock
- ✅ **Filtros y búsquedas** - Por título, plataforma y estado
- ✅ **Paginación inteligente** - Solo muestra cuando hay >12 elementos
- ✅ **Iconos de plataformas** - Steam, Epic, Xbox, Ubisoft, etc.
- ✅ **Estadísticas animadas** - Contadores en tiempo real
- ✅ **Dockerfiles** - Backend y Frontend contenerizados
- ✅ **Docker Compose** - Orquestación con MongoDB
- ✅ **Nginx Proxy** - Configuración de proxy inverso
- ✅ **Despliegue Azure** - VM funcionando en producción
- ✅ **Docker Hub** - Imágenes públicas disponibles

### 🎯 Funcionalidades Destacadas
- **Soft Delete** implementado en backend y frontend
- **Responsive Design** con CSS Grid y Flexbox
- **Animaciones CSS** con backdrop-filter y transiciones
- **Gestión de estado** con custom hooks
- **Validaciones robustas** en frontend y backend
- **Manejo de errores** con SweetAlert2 personalizado
- **Optimización de imágenes** con Sharp
- **Scroll lock** en todos los modales
- **Precios dinámicos** con soporte para "Gratis"

## Docker Hub

Las imágenes están disponibles públicamente:
- **Backend**: `tomaspipolo1/gaming-backend:latest`
- **Frontend**: `tomaspipolo1/gaming-frontend:latest`
