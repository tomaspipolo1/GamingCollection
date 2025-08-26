// ===== MODELO GAME =====
// Modelo para los videojuegos

const mongoose = require('mongoose');

// Definir el esquema del juego
const gameSchema = new mongoose.Schema({
    // Título del juego
    title: {
        type: String,
        required: [true, 'El título del juego es obligatorio'],
        trim: true,
        minlength: [1, 'El título debe tener al menos 1 caracter'],
        maxlength: [100, 'El título no puede tener más de 100 caracteres']
    },
    
    // Plataforma donde se puede conseguir
    platform: {
        type: String,
        required: [true, 'La plataforma es obligatoria'],
        enum: {
            values: ['Steam', 'Epic Games', 'Xbox Game Pass', 'EA Play', 'Riot Games', 'Ubisoft Connect', 'Battle.net', 'PlayStation Store', 'Nintendo eShop', 'GOG', 'Origin', 'Otros'],
            message: 'La plataforma debe ser una de las opciones válidas'
        }
    },
    
    // Género del juego (referencia al modelo Genre)
    // Se debe seleccionar de los géneros activos existentes
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: [true, 'El género es obligatorio'],
        validate: {
            validator: async function(v) {
                // Verificar que el género existe y está activo
                const Genre = mongoose.model('Genre');
                const genreExists = await Genre.findOne({ _id: v, isActive: true });
                return genreExists !== null;
            },
            message: 'El género seleccionado no existe o no está activo'
        }
    },
    
    // Estado del juego
    status: {
        type: String,
        required: [true, 'El estado es obligatorio'],
        enum: {
            values: ['Jugado', 'Sin Jugar', 'Comprar'],
            message: 'El estado debe ser: Jugado, Sin Jugar o Comprar'
        },
        default: 'Sin Jugar'
    },
    
    // Precio del juego
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo'],
        max: [9999, 'El precio no puede ser mayor a 9999']
    },
    
    // Moneda del precio
    currency: {
        type: String,
        default: 'USD',
        enum: ['USD', 'EUR', 'ARS', 'CLP', 'MXN']
    },
    
    // Descripción opcional
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'La descripción no puede tener más de 500 caracteres']
    },
    
    // Fecha de lanzamiento (opcional)
    releaseDate: {
        type: Date
    },
    
    // Imagen del juego (opcional)
    image: {
        type: String,
        trim: true
        // El campo almacenará la ruta del archivo subido
        // La validación se hará en el controlador al procesar el upload
    },
    
    // Estado activo/inactivo
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    // Opciones del esquema
    timestamps: true,  // Agrega createdAt y updatedAt automáticamente
    collection: 'games'  // Nombre de la colección en MongoDB
});

// Índices para mejorar performance
gameSchema.index({ title: 1 });
gameSchema.index({ platform: 1 });
gameSchema.index({ genre: 1 });
gameSchema.index({ status: 1 });
gameSchema.index({ isActive: 1 });
gameSchema.index({ image: 1 });

// Middleware para popular el género automáticamente
gameSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'genre',
        select: 'name description'
    });
    next();
});

// Métodos estáticos
gameSchema.statics.getByStatus = function(status) {
    return this.find({ status, isActive: true }).sort({ title: 1 });
};

gameSchema.statics.getByPlatform = function(platform) {
    return this.find({ platform, isActive: true }).sort({ title: 1 });
};

gameSchema.statics.searchByTitle = function(searchTerm) {
    return this.find({
        title: { $regex: searchTerm, $options: 'i' },
        isActive: true
    }).sort({ title: 1 });
};

// Método para formatear la respuesta
gameSchema.methods.toJSON = function() {
    const game = this.toObject();
    
    // Remover campos internos
    delete game.__v;
    
    // Formatear el precio
    if (game.price) {
        game.formattedPrice = `${game.currency} ${game.price.toFixed(2)}`;
    }
    
    // Agregar información de imagen si existe
    if (game.image) {
        game.hasImage = true;
        // Construir URL completa de la imagen
        game.imageUrl = `/uploads/games/${game.image}`;
    } else {
        game.hasImage = false;
        game.image = null;
        game.imageUrl = null;
    }
    
    return game;
};

// Crear y exportar el modelo
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
