// ===== GAME CONTROLLER =====
// Controlador para el CRUD de videojuegos

const Game = require('../models/Game');
const Genre = require('../models/Genre');

// ===== FUNCIONES HELPER =====
// Manejo de errores consistente
const handleError = (res, error, message = 'Error interno del servidor') => {
    console.error('❌ Error en GameController:', error);
    
    // Error de validación de Mongoose
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
            success: false,
            message: 'Error de validación',
            errors
        });
    }
    
    // Error de Cast (ID inválido)
    if (error.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'ID inválido',
            error: 'Invalid ObjectId'
        });
    }
    
    // Error genérico
    res.status(500).json({
        success: false,
        message,
        error: error.message
    });
};

// Validar que existe el género
const validateGenre = async (genreId) => {
    if (!genreId) return { valid: false, message: 'El género es obligatorio' };
    
    const genre = await Genre.findById(genreId);
    if (!genre) return { valid: false, message: 'El género especificado no existe' };
    if (!genre.isActive) return { valid: false, message: 'El género especificado no está activo' };
    
    return { valid: true };
};

// ===== CRUD OPERATIONS =====

// GET /api/games - Obtener todos los juegos
const getAllGames = async (req, res) => {
    try {
        const { 
            platform, 
            status, 
            genre,
            search,
            active,
            page = 1,
            limit = 10,
            sort = 'title'
        } = req.query;
        
        // Construir filtros
        const filter = {};
        if (platform) filter.platform = platform;
        if (status) filter.status = status;
        if (genre) filter.genre = genre;
        if (active !== undefined) filter.isActive = active === 'true';
        if (search) filter.title = { $regex: search, $options: 'i' };
        
        // Configurar paginación
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.max(1, Math.min(50, parseInt(limit)));
        const skip = (pageNum - 1) * limitNum;
        
        // Configurar ordenamiento
        const sortOptions = {};
        sortOptions[sort] = 1;
        
        // Ejecutar consulta
        const games = await Game.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNum);
            
        const total = await Game.countDocuments(filter);
        
        res.json({
            success: true,
            message: 'Juegos obtenidos exitosamente',
            data: games,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        handleError(res, error, 'Error al obtener juegos');
    }
};

// GET /api/games/:id - Obtener un juego por ID
const getGameById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const game = await Game.findById(id);
        
        if (!game) {
            return res.status(404).json({
                success: false,
                message: 'Juego no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Juego obtenido exitosamente',
            data: game
        });
    } catch (error) {
        handleError(res, error, 'Error al obtener el juego');
    }
};

// POST /api/games - Crear un nuevo juego
const createGame = async (req, res) => {
    try {
        const { 
            title, 
            platform, 
            genre, 
            status, 
            price, 
            currency,
            description,
            releaseDate,
            imageUrl
        } = req.body;
        
        // Validaciones adicionales
        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'El título del juego es obligatorio'
            });
        }
        
        // Validar género
        const genreValidation = await validateGenre(genre);
        if (!genreValidation.valid) {
            return res.status(400).json({
                success: false,
                message: genreValidation.message
            });
        }
        
        // Preparar datos del juego
        const gameData = {
            title: title.trim(),
            platform,
            genre,
            status,
            price: parseFloat(price),
            currency,
            description: description?.trim(),
            releaseDate: releaseDate ? new Date(releaseDate) : undefined,
            imageUrl: imageUrl?.trim()
        };
        
        const newGame = new Game(gameData);
        const savedGame = await newGame.save();
        
        res.status(201).json({
            success: true,
            message: 'Juego creado exitosamente',
            data: savedGame
        });
    } catch (error) {
        handleError(res, error, 'Error al crear el juego');
    }
};

// PUT /api/games/:id - Actualizar un juego
const updateGame = async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        
        // Verificar que el juego existe
        const existingGame = await Game.findById(id);
        if (!existingGame) {
            return res.status(404).json({
                success: false,
                message: 'Juego no encontrado'
            });
        }
        
        // Validar género si se está actualizando
        if (updateFields.genre) {
            const genreValidation = await validateGenre(updateFields.genre);
            if (!genreValidation.valid) {
                return res.status(400).json({
                    success: false,
                    message: genreValidation.message
                });
            }
        }
        
        // Limpiar campos de texto
        if (updateFields.title) updateFields.title = updateFields.title.trim();
        if (updateFields.description) updateFields.description = updateFields.description.trim();
        if (updateFields.imageUrl) updateFields.imageUrl = updateFields.imageUrl.trim();
        
        // Convertir precio a número si existe
        if (updateFields.price) updateFields.price = parseFloat(updateFields.price);
        
        // Convertir fecha si existe
        if (updateFields.releaseDate) updateFields.releaseDate = new Date(updateFields.releaseDate);
        
        const updatedGame = await Game.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true }
        );
        
        res.json({
            success: true,
            message: 'Juego actualizado exitosamente',
            data: updatedGame
        });
    } catch (error) {
        handleError(res, error, 'Error al actualizar el juego');
    }
};

// DELETE /api/games/:id - Eliminar un juego (soft delete)
const deleteGame = async (req, res) => {
    try {
        const { id } = req.params;
        
        const game = await Game.findById(id);
        if (!game) {
            return res.status(404).json({
                success: false,
                message: 'Juego no encontrado'
            });
        }
        
        // Soft delete - cambiar isActive a false
        const deletedGame = await Game.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );
        
        res.json({
            success: true,
            message: 'Juego eliminado exitosamente',
            data: deletedGame
        });
    } catch (error) {
        handleError(res, error, 'Error al eliminar el juego');
    }
};

// DELETE /api/games/:id/permanent - Eliminar permanentemente
const permanentDeleteGame = async (req, res) => {
    try {
        const { id } = req.params;
        
        const game = await Game.findByIdAndDelete(id);
        if (!game) {
            return res.status(404).json({
                success: false,
                message: 'Juego no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Juego eliminado permanentemente',
            data: game
        });
    } catch (error) {
        handleError(res, error, 'Error al eliminar permanentemente el juego');
    }
};

// ===== FUNCIONES ADICIONALES =====

// GET /api/games/by-status/:status - Obtener juegos por estado
const getGamesByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        
        const games = await Game.getByStatus(status);
        
        res.json({
            success: true,
            message: `Juegos con estado "${status}" obtenidos exitosamente`,
            data: games,
            count: games.length
        });
    } catch (error) {
        handleError(res, error, 'Error al obtener juegos por estado');
    }
};

// GET /api/games/by-platform/:platform - Obtener juegos por plataforma
const getGamesByPlatform = async (req, res) => {
    try {
        const { platform } = req.params;
        
        const games = await Game.getByPlatform(platform);
        
        res.json({
            success: true,
            message: `Juegos de la plataforma "${platform}" obtenidos exitosamente`,
            data: games,
            count: games.length
        });
    } catch (error) {
        handleError(res, error, 'Error al obtener juegos por plataforma');
    }
};

// GET /api/games/search/:term - Buscar juegos por título
const searchGames = async (req, res) => {
    try {
        const { term } = req.params;
        
        if (!term || term.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'El término de búsqueda es obligatorio'
            });
        }
        
        const games = await Game.searchByTitle(term.trim());
        
        res.json({
            success: true,
            message: `Búsqueda de "${term}" completada`,
            data: games,
            count: games.length
        });
    } catch (error) {
        handleError(res, error, 'Error al buscar juegos');
    }
};

// ===== EXPORTAR FUNCIONES =====
module.exports = {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
    permanentDeleteGame,
    getGamesByStatus,
    getGamesByPlatform,
    searchGames
};
