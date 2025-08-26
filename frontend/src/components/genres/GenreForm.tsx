// ===== GENRE FORM COMPONENT =====

import React, { useState, useEffect } from 'react';
import { Genre, GenreInput } from '../../types';
import '../../styles/components/GenreForm.css';

interface GenreFormProps {
  genre?: Genre | null;
  onSubmit: (data: GenreInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  isEditMode?: boolean;
}

const GenreForm: React.FC<GenreFormProps> = ({ 
  genre, 
  onSubmit, 
  onCancel, 
  loading = false,
  isEditMode = false
}) => {
  const [formData, setFormData] = useState<GenreInput>({
    name: '',
    description: undefined,
    isActive: true
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Inicializar formulario con datos del género si es edición
  useEffect(() => {
    if (genre) {
      setFormData({
        name: genre.name,
        description: genre.description || undefined,
        isActive: genre.isActive
      });
    }
  }, [genre]);

  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del género es obligatorio';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'El nombre no puede tener más de 50 caracteres';
    }

    if (formData.description && formData.description.length > 200) {
      newErrors.description = 'La descripción no puede tener más de 200 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los campos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const submitData: GenreInput = {
        name: formData.name.trim(),
        description: formData.description && formData.description.trim() !== '' ? formData.description.trim() : undefined
      };

      // Solo incluir isActive si estamos en modo edición
      if (isEditMode) {
        submitData.isActive = formData.isActive;
      }

      console.log('📤 GenreForm: Enviando datos:', submitData);
      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const submitText = isEditMode ? 'Actualizar Género' : 'Crear Género';

  return (
    <form className="genre-form" onSubmit={handleSubmit}>
      {/* ===== TÍTULO DEL FORMULARIO ===== */}
      <div className="form-header">
        <h3 className="form-title">
          {isEditMode ? '✏️ Editar Género' : '➕ Nuevo Género'}
        </h3>
        <p className="form-subtitle">
          {isEditMode 
            ? 'Modifica la información del género seleccionado'
            : 'Completa los datos para crear un nuevo género'
          }
        </p>
      </div>

      {/* ===== CAMPO NOMBRE ===== */}
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nombre del Género <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`form-input ${errors.name ? 'error' : ''}`}
          placeholder="Ej: RPG, FPS, Estrategia..."
          disabled={loading}
          maxLength={50}
        />
        {errors.name && (
          <span className="error-message">{errors.name}</span>
        )}
        <span className="char-count">
          {formData.name.length}/50
        </span>
      </div>

             {/* ===== CAMPO DESCRIPCIÓN ===== */}
       <div className="form-group">
         <label htmlFor="description" className="form-label">
           Descripción
         </label>
         <textarea
           id="description"
           name="description"
           value={formData.description || ''}
           onChange={handleInputChange}
           className={`form-textarea ${errors.description ? 'error' : ''}`}
           placeholder="Describe brevemente el género (opcional)"
           disabled={loading}
           rows={3}
           maxLength={200}
         />
         {errors.description && (
           <span className="error-message">{errors.description}</span>
         )}
         <span className="char-count">
           {(formData.description || '').length}/200
         </span>
       </div>

       {/* ===== CAMPO ESTADO (solo en edición) ===== */}
       {isEditMode && (
         <div className="form-group">
           <label htmlFor="isActive" className="form-label">
             Estado del Género
           </label>
           <select
             id="isActive"
             name="isActive"
             value={formData.isActive ? 'true' : 'false'}
             onChange={(e) => setFormData(prev => ({
               ...prev,
               isActive: e.target.value === 'true'
             }))}
             className="form-select"
             disabled={loading}
           >
             <option value="true">🟢 Activo</option>
             <option value="false">🔴 Inactivo</option>
           </select>
           <p className="form-help">
             Los géneros inactivos no aparecerán en las listas de selección
           </p>
         </div>
       )}

      {/* ===== BOTONES DE ACCIÓN ===== */}
      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="btn-cancel"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Procesando...
            </>
          ) : (
            submitText
          )}
        </button>
      </div>
    </form>
  );
};

export default GenreForm;
