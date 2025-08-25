// ===== GENRE ROUTES =====
// Rutas para el CRUD de géneros de videojuegos

const express = require('express');
const router = express.Router();

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

// GET /api/genres - Obtener todos los géneros
// Query params: ?active=true (para filtrar activos)
router.get('/', getAllGenres);

// GET /api/genres/active - Obtener solo géneros activos
router.get('/active', getActiveGenres);

// GET /api/genres/:id - Obtener un género específico por ID
router.get('/:id', getGenreById);

// POST /api/genres - Crear un nuevo género
// Body: { name, description }
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
