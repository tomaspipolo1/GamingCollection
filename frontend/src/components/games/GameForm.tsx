// ===== GAME FORM COMPONENT =====

import React, { useState, useEffect } from 'react';
import { Game, GameInput, Platform, GameStatus, Currency, Genre } from '../../types';
import { genreService } from '../../services/genreService';
import '../../styles/components/GameForm.css';

interface GameFormProps {
  onSubmit: (gameData: GameInput) => Promise<void>;
  initialData?: Partial<Game>;
  isEditMode?: boolean;
  onCancel?: () => void;
}

const GameForm: React.FC<GameFormProps> = ({ 
  onSubmit, 
  initialData, 
  isEditMode = false, 
  onCancel 
}) => {
  // State del formulario
  const [formData, setFormData] = useState<GameInput>({
    title: '',
    platform: 'Steam',
    genre: '',
    status: 'Sin Jugar',
    price: 0,
    currency: 'USD',
    description: '',
    releaseDate: '',
    image: ''
  });

  // State para géneros disponibles
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loadingGenres, setLoadingGenres] = useState(true);

  // State para validación
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar géneros disponibles al montar el componente
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoadingGenres(true);
        const response = await genreService.getGenres({ active: true });
        const activeGenres = response.genres || response.data || [];
        setGenres(activeGenres);
      } catch (error) {
        console.error('Error cargando géneros:', error);
      } finally {
        setLoadingGenres(false);
      }
    };

    fetchGenres();
  }, []);

  // Inicializar formulario con datos existentes si es modo edición
  useEffect(() => {
    if (initialData && isEditMode) {
      setFormData({
        title: initialData.title || '',
        platform: initialData.platform || 'Steam',
        genre: initialData.genre?._id || '',
        status: initialData.status || 'Sin Jugar',
        price: initialData.price || 0,
        currency: initialData.currency || 'USD',
        description: initialData.description || '',
        releaseDate: initialData.releaseDate || '',
        image: initialData.image || ''
      });
    }
  }, [initialData, isEditMode]);

  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }

    if (!formData.genre) {
      newErrors.genre = 'Debes seleccionar un género';
    }

    if (formData.price < 0) {
      newErrors.price = 'El precio no puede ser negativo';
    }

    if (formData.price > 9999) {
      newErrors.price = 'El precio no puede ser mayor a 9999';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los campos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } catch (error) {
      console.error('Error enviando formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="game-form">
      {/* Título del formulario */}
      <div className="form-title">
        <span className="form-title-icon">{isEditMode ? '✏️' : '➕'}</span>
        <h2 className="form-title-text">{isEditMode ? 'Editar Juego' : 'Nuevo Juego'}</h2>
      </div>
      <div className="form-subtitle">
        {isEditMode ? 'Modifica los datos del juego seleccionado' : 'Completa los datos para crear un nuevo juego'}
      </div>
      {/* Título */}
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Título del Juego *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={`form-input ${errors.title ? 'error' : ''}`}
          placeholder="Ej: The Witcher 3: Wild Hunt"
          maxLength={100}
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      {/* Plataforma y Género en 2 columnas */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="platform" className="form-label">
            Plataforma *
          </label>
          <select
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="Steam">Steam</option>
            <option value="Epic Games">Epic Games</option>
            <option value="Xbox Game Pass">Xbox Game Pass</option>
            <option value="EA Play">EA Play</option>
            <option value="Riot Games">Riot Games</option>
            <option value="Ubisoft Connect">Ubisoft Connect</option>
            <option value="Battle.net">Battle.net</option>
            <option value="PlayStation Store">PlayStation Store</option>
            <option value="Nintendo eShop">Nintendo eShop</option>
            <option value="GOG">GOG</option>
            <option value="Origin">Origin</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="genre" className="form-label">
            Género *
          </label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className={`form-select ${errors.genre ? 'error' : ''}`}
            disabled={loadingGenres}
          >
            <option value="">Selecciona un género</option>
            {genres.map(genre => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
          {loadingGenres && <span className="form-help">Cargando géneros...</span>}
          {errors.genre && <span className="form-error">{errors.genre}</span>}
        </div>
      </div>

      {/* Estado y URL de Imagen en 2 columnas */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status" className="form-label">
            Estado *
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="Sin Jugar">Sin Jugar</option>
            <option value="Jugado">Jugado</option>
            <option value="Comprar">Comprar</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">
            URL de Imagen
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="form-input"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>
      </div>

      {/* Precio y Moneda */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Precio *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className={`form-input ${errors.price ? 'error' : ''}`}
            placeholder="0.00"
            min="0"
            max="9999"
            step="0.01"
          />
          {errors.price && <span className="form-error">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="currency" className="form-label">
            Moneda
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="ARS">ARS</option>
            <option value="CLP">CLP</option>
            <option value="MXN">MXN</option>
          </select>
        </div>
      </div>

      {/* Descripción */}
      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="form-textarea"
          placeholder="Describe el juego, características, etc."
          rows={3}
          maxLength={500}
        />
        <span className="form-help">
          {(formData.description || '').length}/500 caracteres
        </span>
      </div>





      {/* Botones */}
      <div className="form-actions">
        <button
          type="submit"
          className="btn-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : (isEditMode ? 'Actualizar Juego' : 'Crear Juego')}
        </button>
        
        {onCancel && (
          <button
            type="button"
            className="btn-cancel"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default GameForm;
