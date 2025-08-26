// ===== MODELO GENRE =====
// Modelo para los géneros de videojuegos

const mongoose = require('mongoose');

// Definir el esquema del género
const genreSchema = new mongoose.Schema({
    // Nombre del género (ej: "RPG", "FPS", "Estrategia")
    name: {
        type: String,
        required: [true, 'El nombre del género es obligatorio'],
        unique: true,
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [50, 'El nombre no puede tener más de 50 caracteres']
    },
    
    // Descripción del género (opcional)
    description: {
        type: String,
        trim: true,
        maxlength: [200, 'La descripción no puede tener más de 200 caracteres']
    },
    
    // Estado activo/inactivo
    isActive: {
        type: Boolean,
        default: true
    },
    
    // Soft delete - fecha de eliminación
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    // Opciones del esquema
    timestamps: true,  // Agrega createdAt y updatedAt automáticamente
    collection: 'genres'  // Nombre de la colección en MongoDB
});

// Índices para mejorar performance
genreSchema.index({ name: 1 });

// Método para obtener géneros activos
genreSchema.statics.getActiveGenres = function() {
    return this.find({ isActive: true }).sort({ name: 1 });
};

// Método para formatear la respuesta
genreSchema.methods.toJSON = function() {
    const genre = this.toObject();
    
    // Remover campos internos
    delete genre.__v;
    
    return genre;
};

// Crear y exportar el modelo
const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
