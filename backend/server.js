// ===== GAMING COLLECTION API =====
// Servidor principal para la aplicación de Colección de Videojuegos

// Importamos las dependencias necesarias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Crear la aplicación Express
const app = express();

// ===== CONFIGURACIÓN =====
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gaming-collection';

// ===== MIDDLEWARE =====
// Helmet para seguridad
app.use(helmet());

// CORS para permitir peticiones del frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== CONEXIÓN A MONGODB =====
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('🎮 Conectado a MongoDB exitosamente');
})
.catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
});

// ===== RUTAS =====
// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        message: '🎮 Gaming Collection API',
        version: '1.0.0',
        status: 'Running',
        description: 'API para gestión de colección de videojuegos',
        endpoints: {
            // Endpoints de Géneros
            genres: {
                getAll: 'GET /api/genres',
                getActive: 'GET /api/genres/active',
                getById: 'GET /api/genres/:id',
                create: 'POST /api/genres',
                update: 'PUT /api/genres/:id',
                delete: 'DELETE /api/genres/:id'
            },
            // Endpoints de Juegos
            games: {
                getAll: 'GET /api/games',
                getById: 'GET /api/games/:id',
                search: 'GET /api/games/search/:term',
                byStatus: 'GET /api/games/by-status/:status',
                byPlatform: 'GET /api/games/by-platform/:platform',
                create: 'POST /api/games',
                update: 'PUT /api/games/:id',
                delete: 'DELETE /api/games/:id'
            }
        },
        documentation: {
            swagger: 'GET /api-docs',
            swaggerJson: 'GET /api-docs/swagger.json',
            health: 'GET /health',
            examples: {
                searchGames: '/api/games?search=witcher&platform=Steam&page=1&limit=5',
                filterByStatus: '/api/games/by-status/Jugado',
                activeGenres: '/api/genres/active'
            }
        },
        links: {
            swaggerUI: `http://localhost:${PORT}/api-docs`,
            apiHealth: `http://localhost:${PORT}/health`
        }
    });
});

// Ruta de salud del servidor
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// ===== IMPORTAR RUTAS Y SWAGGER =====
const gameRoutes = require('./src/routes/gameRoutes');
const genreRoutes = require('./src/routes/genreRoutes');
const { swaggerSpec, swaggerUi, swaggerUiOptions } = require('./src/config/swagger');

// ===== CONFIGURAR SWAGGER =====
// Swagger JSON endpoint
app.get('/api-docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, swaggerUiOptions));

// ===== USAR RUTAS =====
app.use('/api/games', gameRoutes);
app.use('/api/genres', genreRoutes);

// ===== MANEJO DE ERRORES =====
// Ruta no encontrada
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Ruta no encontrada',
        error: 'Not Found'
    });
});

// Manejo de errores generales
app.use((error, req, res, next) => {
    console.error('❌ Error:', error);
    res.status(500).json({
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
    });
});

// ===== INICIAR SERVIDOR =====
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
    console.log('🔄 Cerrando servidor...');
    mongoose.connection.close();
    process.exit(0);
});
