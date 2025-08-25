// ===== GENRE CONTROLLER =====
// Controlador para el CRUD de géneros de videojuegos

const Genre = require('../models/Genre');

// ===== FUNCIONES HELPER =====
// Manejo de errores consistente
const handleError = (res, error, message = 'Error interno del servidor') => {
    console.error('❌ Error en GenreController:', error);
    
    // Error de validación de Mongoose
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
            success: false,
            message: 'Error de validación',
            errors
        });
    }
    
    // Error de duplicado (índice único)
    if (error.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Ya existe un género con ese nombre',
            error: 'Duplicate key error'
        });
    }
    
    // Error genérico
    res.status(500).json({
        success: false,
        message,
        error: error.message
    });
};

// ===== CRUD OPERATIONS =====

// GET /api/genres - Obtener todos los géneros
const getAllGenres = async (req, res) => {
    try {
        const { active } = req.query;
        
        // Filtrar por activos si se especifica
        const filter = active !== undefined ? { isActive: active === 'true' } : {};
        
        const genres = await Genre.find(filter).sort({ name: 1 });
        
        res.json({
            success: true,
            message: 'Géneros obtenidos exitosamente',
            data: genres,
            count: genres.length
        });
    } catch (error) {
        handleError(res, error, 'Error al obtener géneros');
    }
};

// GET /api/genres/:id - Obtener un género por ID
const getGenreById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const genre = await Genre.findById(id);
        
        if (!genre) {
            return res.status(404).json({
                success: false,
                message: 'Género no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Género obtenido exitosamente',
            data: genre
        });
    } catch (error) {
        handleError(res, error, 'Error al obtener el género');
    }
};

// POST /api/genres - Crear un nuevo género
const createGenre = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        // Validación adicional
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'El nombre del género es obligatorio'
            });
        }
        
        const genreData = {
            name: name.trim(),
            description: description?.trim()
        };
        
        const newGenre = new Genre(genreData);
        const savedGenre = await newGenre.save();
        
        res.status(201).json({
            success: true,
            message: 'Género creado exitosamente',
            data: savedGenre
        });
    } catch (error) {
        handleError(res, error, 'Error al crear el género');
    }
};

// PUT /api/genres/:id - Actualizar un género
const updateGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, isActive } = req.body;
        
        // Verificar que el género existe
        const existingGenre = await Genre.findById(id);
        if (!existingGenre) {
            return res.status(404).json({
                success: false,
                message: 'Género no encontrado'
            });
        }
        
        // Preparar datos para actualizar
        const updateData = {};
        if (name !== undefined) updateData.name = name.trim();
        if (description !== undefined) updateData.description = description?.trim();
        if (isActive !== undefined) updateData.isActive = isActive;
        
        const updatedGenre = await Genre.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true, runValidators: true }
        );
        
        res.json({
            success: true,
            message: 'Género actualizado exitosamente',
            data: updatedGenre
        });
    } catch (error) {
        handleError(res, error, 'Error al actualizar el género');
    }
};

// DELETE /api/genres/:id - Eliminar un género (soft delete)
const deleteGenre = async (req, res) => {
    try {
        const { id } = req.params;
        
        const genre = await Genre.findById(id);
        if (!genre) {
            return res.status(404).json({
                success: false,
                message: 'Género no encontrado'
            });
        }
        
        // Soft delete - cambiar isActive a false
        const deletedGenre = await Genre.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );
        
        res.json({
            success: true,
            message: 'Género eliminado exitosamente',
            data: deletedGenre
        });
    } catch (error) {
        handleError(res, error, 'Error al eliminar el género');
    }
};

// DELETE /api/genres/:id/permanent - Eliminar permanentemente
const permanentDeleteGenre = async (req, res) => {
    try {
        const { id } = req.params;
        
        const genre = await Genre.findByIdAndDelete(id);
        if (!genre) {
            return res.status(404).json({
                success: false,
                message: 'Género no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Género eliminado permanentemente',
            data: genre
        });
    } catch (error) {
        handleError(res, error, 'Error al eliminar permanentemente el género');
    }
};

// ===== FUNCIONES ADICIONALES =====

// GET /api/genres/active - Obtener solo géneros activos
const getActiveGenres = async (req, res) => {
    try {
        const genres = await Genre.getActiveGenres();
        
        res.json({
            success: true,
            message: 'Géneros activos obtenidos exitosamente',
            data: genres,
            count: genres.length
        });
    } catch (error) {
        handleError(res, error, 'Error al obtener géneros activos');
    }
};

// ===== EXPORTAR FUNCIONES =====
module.exports = {
    getAllGenres,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre,
    permanentDeleteGenre,
    getActiveGenres
};
