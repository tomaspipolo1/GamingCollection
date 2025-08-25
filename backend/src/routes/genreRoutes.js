// ===== GENRE ROUTES =====
// Rutas para el CRUD de géneros de videojuegos

const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del género
 *         name:
 *           type: string
 *           description: Nombre del género
 *           minLength: 2
 *           maxLength: 50
 *         description:
 *           type: string
 *           description: Descripción del género
 *           maxLength: 200
 *         isActive:
 *           type: boolean
 *           description: Estado activo del género
 *           default: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *       example:
 *         _id: "65f1234567890abcdef12345"
 *         name: "RPG"
 *         description: "Juegos de rol donde el jugador controla un personaje"
 *         isActive: true
 *         createdAt: "2024-01-01T00:00:00.000Z"
 *         updatedAt: "2024-01-01T00:00:00.000Z"
 *     
 *     GenreInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del género
 *           minLength: 2
 *           maxLength: 50
 *         description:
 *           type: string
 *           description: Descripción del género
 *           maxLength: 200
 *       example:
 *         name: "RPG"
 *         description: "Juegos de rol donde el jugador controla un personaje"
 */

// Importar el controller
const {
    getAllGenres,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre,
    permanentDeleteGenre,
    getActiveGenres
} = require('../controllers/genreController');

// ===== RUTAS PÚBLICAS =====

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Obtener todos los géneros
 *     tags: [Genres]
 *     parameters:
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filtrar por géneros activos
 *     responses:
 *       200:
 *         description: Lista de géneros obtenida exitosamente
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
 *                     $ref: '#/components/schemas/Genre'
 *                 count:
 *                   type: number
 */
router.get('/', getAllGenres);

// GET /api/genres/active - Obtener solo géneros activos
router.get('/active', getActiveGenres);

// GET /api/genres/:id - Obtener un género específico por ID
router.get('/:id', getGenreById);

/**
 * @swagger
 * /api/genres:
 *   post:
 *     summary: Crear un nuevo género
 *     tags: [Genres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenreInput'
 *     responses:
 *       201:
 *         description: Género creado exitosamente
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
 *                   $ref: '#/components/schemas/Genre'
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
router.post('/', createGenre);

// PUT /api/genres/:id - Actualizar un género existente
// Body: { name?, description?, isActive? }
router.put('/:id', updateGenre);

// DELETE /api/genres/:id - Eliminar un género (soft delete)
router.delete('/:id', deleteGenre);

// DELETE /api/genres/:id/permanent - Eliminar permanentemente
router.delete('/:id/permanent', permanentDeleteGenre);

// ===== MIDDLEWARE DE VALIDACIÓN =====
// Middleware para validar ObjectId de MongoDB
router.param('id', (req, res, next, id) => {
    // Validar formato de ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            success: false,
            message: 'ID de género inválido',
            error: 'Invalid ObjectId format'
        });
    }
    next();
});

// ===== DOCUMENTACIÓN DE ENDPOINTS =====
/*
ENDPOINTS DISPONIBLES:

1. GET /api/genres
   - Descripción: Obtener todos los géneros
   - Query params: 
     * active=true/false (filtrar por estado activo)
   - Respuesta: Lista de géneros

2. GET /api/genres/active  
   - Descripción: Obtener solo géneros activos
   - Respuesta: Lista de géneros activos

3. GET /api/genres/:id
   - Descripción: Obtener un género específico
   - Parámetros: id (ObjectId del género)
   - Respuesta: Datos del género

4. POST /api/genres
   - Descripción: Crear un nuevo género
   - Body: {
       name: String (obligatorio),
       description: String (opcional)
     }
   - Respuesta: Género creado

5. PUT /api/genres/:id
   - Descripción: Actualizar un género
   - Parámetros: id (ObjectId del género)
   - Body: {
       name: String (opcional),
       description: String (opcional),
       isActive: Boolean (opcional)
     }
   - Respuesta: Género actualizado

6. DELETE /api/genres/:id
   - Descripción: Eliminar género (soft delete)
   - Parámetros: id (ObjectId del género)
   - Respuesta: Género marcado como inactivo

7. DELETE /api/genres/:id/permanent
   - Descripción: Eliminar género permanentemente
   - Parámetros: id (ObjectId del género)
   - Respuesta: Confirmación de eliminación

EJEMPLOS DE USO:

// Crear género
POST /api/genres
{
  "name": "RPG",
  "description": "Juegos de rol donde el jugador controla un personaje"
}

// Actualizar género
PUT /api/genres/65f1234567890abcdef12345
{
  "name": "RPG - Rol",
  "description": "Descripción actualizada"
}

// Obtener géneros activos
GET /api/genres/active
*/

module.exports = router;
