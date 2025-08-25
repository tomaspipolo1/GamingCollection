// ===== GAME ROUTES =====
// Rutas para el CRUD de videojuegos

const express = require('express');
const router = express.Router();

// Importar el controller
const {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
    permanentDeleteGame,
    getGamesByStatus,
    getGamesByPlatform,
    searchGames
} = require('../controllers/gameController');

// ===== RUTAS PÚBLICAS =====

// GET /api/games - Obtener todos los juegos con filtros y paginación
// Query params: ?platform=Steam&status=Jugado&genre=id&search=term&page=1&limit=10&sort=title
router.get('/', getAllGames);

// GET /api/games/search/:term - Buscar juegos por título
router.get('/search/:term', searchGames);

// GET /api/games/by-status/:status - Obtener juegos por estado
router.get('/by-status/:status', getGamesByStatus);

// GET /api/games/by-platform/:platform - Obtener juegos por plataforma
router.get('/by-platform/:platform', getGamesByPlatform);

// GET /api/games/:id - Obtener un juego específico por ID
router.get('/:id', getGameById);

// POST /api/games - Crear un nuevo juego
// Body: { title, platform, genre, status, price, currency?, description?, releaseDate?, imageUrl? }
router.post('/', createGame);

// PUT /api/games/:id - Actualizar un juego existente
// Body: { title?, platform?, genre?, status?, price?, currency?, description?, releaseDate?, imageUrl?, isActive? }
router.put('/:id', updateGame);

// DELETE /api/games/:id - Eliminar un juego (soft delete)
router.delete('/:id', deleteGame);

// DELETE /api/games/:id/permanent - Eliminar permanentemente
router.delete('/:id/permanent', permanentDeleteGame);

// ===== MIDDLEWARE DE VALIDACIÓN =====

// Middleware para validar ObjectId de MongoDB
router.param('id', (req, res, next, id) => {
    // Validar formato de ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            success: false,
            message: 'ID de juego inválido',
            error: 'Invalid ObjectId format'
        });
    }
    next();
});

// Middleware para validar estados válidos
router.param('status', (req, res, next, status) => {
    const validStatuses = ['Jugado', 'Sin Jugar', 'Comprar'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Estado inválido',
            validStatuses,
            error: 'Invalid status'
        });
    }
    next();
});

// Middleware para validar plataformas válidas
router.param('platform', (req, res, next, platform) => {
    const validPlatforms = [
        'Steam', 'Epic Games', 'Xbox Game Pass', 'EA Play', 
        'Riot Games', 'Ubisoft Connect', 'Battle.net', 
        'PlayStation Store', 'Nintendo eShop', 'GOG', 'Origin', 'Otros'
    ];
    
    if (!validPlatforms.includes(platform)) {
        return res.status(400).json({
            success: false,
            message: 'Plataforma inválida',
            validPlatforms,
            error: 'Invalid platform'
        });
    }
    next();
});

// Middleware para validar término de búsqueda
router.param('term', (req, res, next, term) => {
    if (!term || term.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: 'El término de búsqueda debe tener al menos 2 caracteres',
            error: 'Invalid search term'
        });
    }
    next();
});

// ===== DOCUMENTACIÓN DE ENDPOINTS =====
/*
ENDPOINTS DISPONIBLES:

1. GET /api/games
   - Descripción: Obtener todos los juegos con filtros y paginación
   - Query params:
     * platform: String (filtrar por plataforma)
     * status: String (filtrar por estado)
     * genre: ObjectId (filtrar por género)
     * search: String (buscar en título)
     * active: Boolean (filtrar activos/inactivos)
     * page: Number (página, default: 1)
     * limit: Number (elementos por página, default: 10, max: 50)
     * sort: String (campo para ordenar, default: title)
   - Respuesta: Lista paginada de juegos

2. GET /api/games/search/:term
   - Descripción: Buscar juegos por título
   - Parámetros: term (término de búsqueda, min 2 caracteres)
   - Respuesta: Lista de juegos que coinciden

3. GET /api/games/by-status/:status
   - Descripción: Obtener juegos por estado
   - Parámetros: status (Jugado|Sin Jugar|Comprar)
   - Respuesta: Lista de juegos con ese estado

4. GET /api/games/by-platform/:platform  
   - Descripción: Obtener juegos por plataforma
   - Parámetros: platform (Steam, Epic Games, etc.)
   - Respuesta: Lista de juegos de esa plataforma

5. GET /api/games/:id
   - Descripción: Obtener un juego específico
   - Parámetros: id (ObjectId del juego)
   - Respuesta: Datos del juego con género poblado

6. POST /api/games
   - Descripción: Crear un nuevo juego
   - Body: {
       title: String (obligatorio),
       platform: String (obligatorio),
       genre: ObjectId (obligatorio),
       status: String (obligatorio),
       price: Number (obligatorio),
       currency: String (opcional, default: USD),
       description: String (opcional),
       releaseDate: Date (opcional),
       imageUrl: String (opcional)
     }
   - Respuesta: Juego creado

7. PUT /api/games/:id
   - Descripción: Actualizar un juego
   - Parámetros: id (ObjectId del juego)
   - Body: Cualquier campo del juego (todos opcionales)
   - Respuesta: Juego actualizado

8. DELETE /api/games/:id
   - Descripción: Eliminar juego (soft delete)
   - Parámetros: id (ObjectId del juego)
   - Respuesta: Juego marcado como inactivo

9. DELETE /api/games/:id/permanent
   - Descripción: Eliminar juego permanentemente
   - Parámetros: id (ObjectId del juego)
   - Respuesta: Confirmación de eliminación

EJEMPLOS DE USO:

// Crear juego
POST /api/games
{
  "title": "The Witcher 3: Wild Hunt",
  "platform": "Steam",
  "genre": "65f1234567890abcdef12345",
  "status": "Sin Jugar",
  "price": 39.99,
  "currency": "USD",
  "description": "RPG épico de mundo abierto",
  "releaseDate": "2015-05-19",
  "imageUrl": "https://example.com/witcher3.jpg"
}

// Buscar juegos
GET /api/games?search=witcher&platform=Steam&page=1&limit=5

// Obtener juegos por estado
GET /api/games/by-status/Jugado

// Buscar por término
GET /api/games/search/witcher
*/

module.exports = router;
