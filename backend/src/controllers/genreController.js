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
        const { search, active, page = 1, limit = 10, sort = 'name' } = req.query;
        
        console.log('🔍 Backend recibió query params:', { search, active, page, limit, sort });
        
        // Filtrar por activos si se especifica y excluir eliminados
        let filter = { deletedAt: null }; // Solo géneros no eliminados
        
        // Filtro por estado activo/inactivo
        if (active !== undefined) {
            filter.isActive = active === 'true';
        }
        
        // Filtro de búsqueda por nombre o descripción
        if (search && search.trim() !== '') {
            const searchRegex = new RegExp(search.trim(), 'i'); // Búsqueda case-insensitive
            filter.$or = [
                { name: searchRegex },
                { description: searchRegex }
            ];
            console.log('🔍 Aplicando filtro de búsqueda:', searchRegex);
        }
        
        console.log('🎯 Filtro final aplicado:', filter);
        
        // Calcular paginación
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        
        // Obtener total de géneros
        const totalGenres = await Genre.countDocuments(filter);
        
        // Obtener géneros con paginación
        const genres = await Genre.find(filter)
            .sort({ [sort]: 1 })
            .skip(skip)
            .limit(limitNum);
        
        // Calcular páginas
        const totalPages = Math.ceil(totalGenres / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;
        
        res.json({
            success: true,
            message: 'Géneros obtenidos exitosamente',
            genres: genres,
            totalGenres: totalGenres,
            totalPages: totalPages,
            currentPage: pageNum,
            hasNextPage: hasNextPage,
            hasPrevPage: hasPrevPage
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
        console.log('📥 Backend recibió datos:', req.body);
        console.log('📋 Headers:', req.headers);
        
        const { name, description } = req.body;
        
        console.log('🔍 Datos extraídos:', { name, description });
        console.log('🔍 Tipo de description:', typeof description);
        
        // Validación adicional
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'El nombre del género es obligatorio'
            });
        }
        
        // Manejar la descripción correctamente
        let finalDescription = undefined;
        if (description !== undefined && description !== null && description !== '') {
            finalDescription = description.trim();
        }
        
        const genreData = {
            name: name.trim(),
            description: finalDescription
        };
        
        console.log('📝 Datos finales para crear:', genreData);
        
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
        
        console.log('📥 Backend recibió PUT para actualizar género:', id);
        console.log('📋 Datos recibidos:', { name, description, isActive });
        console.log('🔍 Tipo de isActive:', typeof isActive);
        
        // Verificar que el género existe
        const existingGenre = await Genre.findById(id);
        if (!existingGenre) {
            return res.status(404).json({
                success: false,
                message: 'Género no encontrado'
            });
        }
        
        console.log('🎯 Género existente:', {
            name: existingGenre.name,
            isActive: existingGenre.isActive
        });
        
        // Preparar datos para actualizar
        const updateData = {};
        if (name !== undefined) updateData.name = name.trim();
        if (description !== undefined) updateData.description = description?.trim();
        if (isActive !== undefined) updateData.isActive = isActive;
        
        console.log('📝 Datos para actualizar:', updateData);
        
        const updatedGenre = await Genre.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true, runValidators: true }
        );
        
        console.log('✅ Género actualizado:', {
            name: updatedGenre.name,
            isActive: updatedGenre.isActive
        });
        
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
        
        // Soft delete - marcar como eliminado con timestamp
        const deletedGenre = await Genre.findByIdAndUpdate(
            id,
            { 
                deletedAt: new Date(),
                isActive: false // También desactivar
            },
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

// ===== FUNCIONES ADICIONALES =====

// POST /api/genres/:id/restore - Restaurar un género eliminado
const restoreGenre = async (req, res) => {
    try {
        const { id } = req.params;
        
        const genre = await Genre.findById(id);
        if (!genre) {
            return res.status(404).json({
                success: false,
                message: 'Género no encontrado'
            });
        }
        
        // Restaurar género - limpiar deletedAt y activar
        const restoredGenre = await Genre.findByIdAndUpdate(
            id,
            { 
                deletedAt: null,
                isActive: true
            },
            { new: true }
        );
        
        res.json({
            success: true,
            message: 'Género restaurado exitosamente',
            data: restoredGenre
        });
    } catch (error) {
        handleError(res, error, 'Error al restaurar el género');
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
    getActiveGenres,
    restoreGenre
};
