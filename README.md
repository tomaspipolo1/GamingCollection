# 🎮 Gaming Collection - Aplicación Full Stack

## Descripción del Proyecto

Esta es una aplicación web completa para la gestión de colecciones de videojuegos, desarrollada como trabajo práctico para la materia de Desarrollo Full Stack. La aplicación permite a los usuarios crear, leer, actualizar y eliminar videojuegos y géneros, con funcionalidades avanzadas de búsqueda, filtrado y categorización.

## Características Principales

- 🎮 **CRUD completo de videojuegos**
- 🎭 **Gestión de géneros de videojuegos** 
- 🖥️ **Múltiples plataformas** (Steam, Epic Games, Xbox Game Pass, etc.)
- 📊 **Estados de juegos** (Jugado, Sin Jugar, Comprar)
- 💰 **Gestión de precios** con múltiples monedas
- 🔍 **Búsqueda y filtrado avanzado**
- 📄 **Paginación** para grandes colecciones
- 📱 **Diseño responsive** con temática gaming

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

### Frontend (Pendiente de desarrollo)
- **React 18** con **TypeScript** - Framework para interfaz de usuario
- **Tailwind CSS** - Framework de estilos con temática gaming
- **Axios** - Cliente HTTP para comunicación con API
- **React Router** - Navegación entre páginas
- **React Hook Form** - Manejo de formularios

### DevOps & Despliegue
- **Docker** para contenerización
- **Docker Compose** para orquestación
- **Azure** para máquina virtual
- **Nginx** como proxy inverso (opcional)

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

1. **Crear máquina virtual en Azure**
2. **Instalar Docker y Docker Compose**
3. **Descargar imágenes desde Docker Hub**
4. **Ejecutar docker-compose up -d**

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
- ✅ **Backend API REST** - Completamente funcional
- ✅ **Modelos de datos** - Genre y Game con validaciones
- ✅ **16 endpoints** - CRUD completo para ambas entidades
- ✅ **Validaciones robustas** - Manejo de errores y datos
- ✅ **Filtros y búsquedas** - Funcionalidades avanzadas
- ✅ **Paginación** - Para manejo de grandes volúmenes
- ✅ **Documentación** - API documentada

### 🚧 En Desarrollo
- 🚧 **Frontend React** - Interfaz de usuario con temática gaming
- 🚧 **Dockerfiles** - Contenerización de servicios
- 🚧 **Docker Compose** - Orquestación completa
- 🚧 **Despliegue Azure** - Configuración en la nube

### 📋 Próximos Pasos
1. Desarrollar interfaz React con TypeScript
2. Implementar diseño gaming con Tailwind CSS
3. Crear Dockerfiles para backend y frontend
4. Configurar Docker Compose
5. Desplegar en Azure

