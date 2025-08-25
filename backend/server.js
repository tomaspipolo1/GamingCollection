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
// Comentamos temporalmente para probar sin MongoDB
/*
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
*/

console.log('⚠️  MongoDB desconectado temporalmente para pruebas');

// ===== RUTAS =====
// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        message: '🎮 Gaming Collection API',
        version: '1.0.0',
        status: 'Running',
        endpoints: {
            games: '/api/games',
            genres: '/api/genres'
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

// Aquí importaremos las rutas cuando las creemos
// const gameRoutes = require('./src/routes/gameRoutes');
// const genreRoutes = require('./src/routes/genreRoutes');
// app.use('/api/games', gameRoutes);
// app.use('/api/genres', genreRoutes);

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
