// ===== GAME ROUTES =====
// Rutas para el CRUD de videojuegos

const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - title
 *         - platform
 *         - genre
 *         - status
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del videojuego
 *         title:
 *           type: string
 *           description: Título del videojuego
 *           minLength: 1
 *           maxLength: 100
 *         platform:
 *           type: string
 *           description: Plataforma del videojuego
 *           enum: [Steam, Epic Games, Xbox Game Pass, EA Play, Riot Games, Ubisoft Connect, Battle.net, PlayStation Store, Nintendo eShop, GOG, Origin, Otros]
 *         genre:
 *           type: object
 *           description: Género del videojuego (populado)
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             description:
 *               type: string
 *         status:
 *           type: string
 *           description: Estado del videojuego
 *           enum: [Jugado, Sin Jugar, Comprar]
 *           default: Sin Jugar
 *         price:
 *           type: number
 *           description: Precio del videojuego
 *           minimum: 0
 *           maximum: 9999
 *         currency:
 *           type: string
 *           description: Moneda del precio
 *           enum: [USD, EUR, ARS, CLP, MXN]
 *           default: USD
 *         description:
 *           type: string
 *           description: Descripción del videojuego
 *           maxLength: 500
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: Fecha de lanzamiento
 *         imageUrl:
 *           type: string
 *           description: URL de la imagen del juego
 *         isActive:
 *           type: boolean
 *           description: Estado activo del videojuego
 *           default: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *         formattedPrice:
 *           type: string
 *           description: Precio formateado (ejemplo USD 39.99)
 *       example:
 *         _id: "65f1234567890abcdef12345"
 *         title: "The Witcher 3: Wild Hunt"
 *         platform: "Steam"
 *         genre:
 *           _id: "65f1234567890abcdef12346"
 *           name: "RPG"
 *           description: "Juegos de rol"
 *         status: "Sin Jugar"
 *         price: 39.99
 *         currency: "USD"
 *         description: "RPG épico de mundo abierto"
 *         releaseDate: "2015-05-19"
 *         imageUrl: "https://example.com/witcher3.jpg"
 *         isActive: true
 *         createdAt: "2024-01-01T00:00:00.000Z"
 *         updatedAt: "2024-01-01T00:00:00.000Z"
 *         formattedPrice: USD 39.99
 *     
 *     GameInput:
 *       type: object
 *       required:
 *         - title
 *         - platform
 *         - genre
 *         - status
 *         - price
 *       properties:
 *         title:
 *           type: string
 *           description: Título del videojuego
 *           minLength: 1
 *           maxLength: 100
 *         platform:
 *           type: string
 *           description: Plataforma del videojuego
 *           enum: [Steam, Epic Games, Xbox Game Pass, EA Play, Riot Games, Ubisoft Connect, Battle.net, PlayStation Store, Nintendo eShop, GOG, Origin, Otros]
 *         genre:
 *           type: string
 *           description: ID del género del videojuego
 *         status:
 *           type: string
 *           description: Estado del videojuego
 *           enum: [Jugado, Sin Jugar, Comprar]
 *           default: Sin Jugar
 *         price:
 *           type: number
 *           description: Precio del videojuego
 *           minimum: 0
 *           maximum: 9999
 *         currency:
 *           type: string
 *           description: Moneda del precio
 *           enum: [USD, EUR, ARS, CLP, MXN]
 *           default: USD
 *         description:
 *           type: string
 *           description: Descripción del videojuego
 *           maxLength: 500
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: Fecha de lanzamiento
 *         imageUrl:
 *           type: string
 *           description: URL de la imagen del juego
 *       example:
 *         title: "The Witcher 3: Wild Hunt"
 *         platform: "Steam"
 *         genre: "65f1234567890abcdef12346"
 *         status: "Sin Jugar"
 *         price: 39.99
 *         currency: "USD"
 *         description: "RPG épico de mundo abierto"
 *         releaseDate: "2015-05-19"
 *         imageUrl: "https://example.com/witcher3.jpg"
 */

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

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Obtener todos los videojuegos
 *     tags: [Games]
 *     parameters:
 *       - in: query
 *         name: platform
 *         schema:
 *           type: string
 *           enum: [Steam, Epic Games, Xbox Game Pass, EA Play, Riot Games, Ubisoft Connect, Battle.net, PlayStation Store, Nintendo eShop, GOG, Origin, Otros]
 *         description: Filtrar por plataforma
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Jugado, Sin Jugar, Comprar]
 *         description: Filtrar por estado
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filtrar por ID de género
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar en el título
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filtrar por juegos activos
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Elementos por página
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: title
 *         description: Campo para ordenar
 *     responses:
 *       200:
 *         description: Lista de videojuegos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Game'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 */
router.get('/', getAllGames);

// GET /api/games/search/:term - Buscar juegos por título
router.get('/search/:term', searchGames);

// GET /api/games/by-status/:status - Obtener juegos por estado
router.get('/by-status/:status', getGamesByStatus);

// GET /api/games/by-platform/:platform - Obtener juegos por plataforma
router.get('/by-platform/:platform', getGamesByPlatform);

/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     summary: Obtener un videojuego específico
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del videojuego
 *     responses:
 *       200:
 *         description: Videojuego obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Game'
 *       404:
 *         description: Videojuego no encontrado
 *       400:
 *         description: ID inválido
 */
router.get('/:id', getGameById);

/**
 * @swagger
 * /api/games:
 *   post:
 *     summary: Crear un nuevo videojuego
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameInput'
 *     responses:
 *       201:
 *         description: Videojuego creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Game'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.post('/', createGame);

/**
 * @swagger
 * /api/games/{id}:
 *   put:
 *     summary: Actualizar un videojuego
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del videojuego
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               platform:
 *                 type: string
 *                 enum: [Steam, Epic Games, Xbox Game Pass, EA Play, Riot Games, Ubisoft Connect, Battle.net, PlayStation Store, Nintendo eShop, GOG, Origin, Otros]
 *               genre:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Jugado, Sin Jugar, Comprar]
 *               price:
 *                 type: number
 *               currency:
 *                 type: string
 *                 enum: [USD, EUR, ARS, CLP, MXN]
 *               description:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *                 format: date
 *               imageUrl:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Videojuego actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Game'
 *       404:
 *         description: Videojuego no encontrado
 *       400:
 *         description: Error de validación
 *   delete:
 *     summary: Eliminar un videojuego (soft delete)
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del videojuego
 *     responses:
 *       200:
 *         description: Videojuego eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Game'
 *       404:
 *         description: Videojuego no encontrado
 */
router.put('/:id', updateGame);
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
