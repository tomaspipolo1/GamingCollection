// ===== EDIT GENRE MODAL =====

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import GenreForm from './GenreForm';
import { Genre, GenreInput } from '../../types';
import { genreService } from '../../services/genreService';
import '../../styles/components/EditGenreModal.css';

interface EditGenreModalProps {
  isOpen: boolean;
  genre: Genre | null;
  onClose: () => void;
  onSuccess: () => void;
  onRefresh?: () => void;
}

const EditGenreModal: React.FC<EditGenreModalProps> = ({ 
  isOpen, 
  genre, 
  onClose, 
  onSuccess,
  onRefresh 
}) => {
  const [loading, setLoading] = useState(false);

  // Manejar envío del formulario
  const handleSubmit = async (data: GenreInput) => {
    if (!genre) return;
    
    try {
      setLoading(true);
      console.log('🚀 EditGenreModal: Enviando PUT a /genres/' + genre._id);
      console.log('📋 Datos enviados:', data);
      console.log('🔍 Campo isActive enviado:', data.isActive);
      console.log('🔍 Tipo de isActive:', typeof data.isActive);
      console.log('🌐 URL de la API:', process.env.REACT_APP_API_URL || 'http://localhost:5000/api');
      
      const result = await genreService.updateGenre(genre._id, data);
      console.log('✅ Género actualizado exitosamente:', result);
      console.log('🎯 Estado final del género:', result.isActive);
      
      // Mostrar mensaje de éxito con SweetAlert
      await Swal.fire({
        icon: 'success',
        title: '¡Género actualizado exitosamente!',
        text: `El género "${result.name}" ha sido actualizado correctamente`,
        confirmButtonColor: '#00ff88',
        confirmButtonText: '¡Perfecto!'
      });
      
      // Cerrar modal y refrescar lista
      onClose();
      onSuccess();
      
      // Refrescar la tabla si se proporciona la función
      if (onRefresh) {
        console.log('🔄 Refrescando lista de géneros...');
        onRefresh();
      }
    } catch (error: any) {
      console.error('❌ Error updating genre:', error);
      console.error('📋 Detalles del error:', {
        message: error?.message || 'Error desconocido',
        response: error?.response?.data,
        status: error?.response?.status,
        statusText: error?.response?.statusText
      });
      
      // Mostrar mensaje de error con SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el género',
        text: error?.response?.data?.message || error?.message || 'Ha ocurrido un error inesperado',
        confirmButtonColor: '#00ff88',
        confirmButtonText: 'Entendido'
      });
    } finally {
      setLoading(false);
    }
  };

  // Manejar cancelación
  const handleCancel = () => {
    if (!loading) {
      onClose();
    }
  };

  // No renderizar si no está abierto o no hay género
  if (!isOpen || !genre) return null;

  return (
    <div className="edit-genre-modal-overlay" role="dialog" aria-modal="true">
      <div className="edit-genre-modal-content">
        {/* ===== HEADER DEL MODAL ===== */}
        <div className="modal-header">
          <button
            type="button"
            className="btn-close"
            onClick={handleCancel}
            disabled={loading}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* ===== CONTENIDO DEL MODAL ===== */}
        <div className="modal-body">
          <GenreForm
            genre={genre}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
            isEditMode={true}
          />
        </div>
      </div>
    </div>
  );
};

export default EditGenreModal;
