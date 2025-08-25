# Task Manager - Aplicación Full Stack

## Descripción del Proyecto

Esta es una aplicación web completa de gestión de tareas desarrollada como trabajo práctico para la materia de Desarrollo Full Stack. La aplicación permite a los usuarios crear, leer, actualizar y eliminar tareas con funcionalidades adicionales como categorización, prioridades y estados.

## Características Principales

- ✅ **CRUD completo de tareas**
- 🏷️ **Categorización de tareas**
- ⚡ **Sistema de prioridades**
- 📊 **Estados de tareas (Pendiente, En Progreso, Completada)**
- 🔍 **Búsqueda y filtrado**
- 📱 **Diseño responsive**

## Arquitectura

```
├── backend/          # API REST con Node.js + Express
├── frontend/         # Aplicación React + TypeScript
├── docker-compose.yml # Orquestación de servicios
└── docs/            # Documentación del proyecto
```

## Tecnologías Utilizadas

### Backend
- **Node.js** + **Express.js**
- **MongoDB** como base de datos
- **Mongoose** para ODM
- **CORS** para comunicación cross-origin
- **Helmet** para seguridad

### Frontend
- **React 18** con **TypeScript**
- **Tailwind CSS** para estilos
- **Axios** para comunicación con API
- **React Router** para navegación
- **React Hook Form** para formularios

### DevOps & Despliegue
- **Docker** para contenerización
- **Docker Compose** para orquestación
- **Azure** para máquina virtual
- **Nginx** como proxy inverso (opcional)

## Instalación y Uso

### Desarrollo Local

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd task-manager-fullstack
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

### Endpoints

- `GET /api/tasks` - Obtener todas las tareas
- `GET /api/tasks/:id` - Obtener tarea por ID
- `POST /api/tasks` - Crear nueva tarea
- `PUT /api/tasks/:id` - Actualizar tarea
- `DELETE /api/tasks/:id` - Eliminar tarea

### Modelo de Tarea

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "category": "string",
  "priority": "low|medium|high",
  "status": "pending|in-progress|completed",
  "createdAt": "date",
  "updatedAt": "date"
}
```

## Contribución

Este proyecto fue desarrollado como trabajo práctico académico.

## Licencia

Este proyecto es para fines educativos.
