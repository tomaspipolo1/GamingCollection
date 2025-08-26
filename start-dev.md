# 🎮 Gaming Collection - Guía de Desarrollo

## 🚀 Iniciar el Proyecto

### Opción 1: Manual (Recomendado para desarrollo)

**1. Backend:**
```bash
cd backend
npm start
```
El backend estará disponible en: http://localhost:5000

**2. Frontend (en otra terminal):**
```bash
cd frontend
npm start
```
El frontend estará disponible en: http://localhost:3000

### Opción 2: Variables de Entorno (Frontend)

Crear archivo `.env` en `frontend/`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_BACKEND_URL=http://localhost:5000
```

## 🔗 Conexión Frontend-Backend

### Estado de Conexión
- **🟢 Verde**: Backend conectado y funcionando
- **🔴 Rojo**: Backend no disponible (sin datos)
- **🔄 Amarillo**: Verificando conexión

### ⚠️ Importante
El frontend **requiere** que el backend esté funcionando. No hay datos mock hardcodeados.

### URLs Importantes
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Swagger Docs**: http://localhost:5000/api-docs
- **Health Check**: http://localhost:5000/health

## 🛠️ Troubleshooting

### Si aparece scroll horizontal:
- Ya solucionado con `overflow-x: hidden`

### Si no se conecta el frontend:
1. Verificar que el backend esté corriendo en puerto 5000
2. Revisar la consola del navegador para errores de CORS
3. El indicador de conexión mostrará el estado actual

### Si MongoDB no conecta:
1. Verificar que MongoDB esté instalado y corriendo
2. Revisar la conexión en `backend/server.js`

## 📊 Logs de Desarrollo

El frontend muestra logs útiles en la consola:
- `🔄 Conectando con API...`
- `✅ API conectada exitosamente`
- `🗑️ Eliminando juego via API...`
- `❌ Error al cargar juegos` (si backend no disponible)

## 🎯 Funcionalidades Actuales

### ✅ Implementado:
- **Routing**: Home ↔ Games con React Router
- **Layout Global**: Header/Footer centralizados
- **Estado de Conexión**: Indicador visual en tiempo real
- **Conexión Pura Backend**: Sin datos mock hardcodeados
- **Búsqueda**: En tiempo real via API
- **Eliminación**: Con modal de confirmación via API
- **Responsive**: Mobile-first design
- **No Scroll Horizontal**: Solucionado

### 🔄 Próximo:
- Formularios de agregar/editar juegos
- Página de géneros
- Sistema de rating
- Dockerización y despliegue
