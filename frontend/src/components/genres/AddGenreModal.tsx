// ===== ADD GENRE MODAL =====

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import GenreForm from './GenreForm';
import { GenreInput } from '../../types';
import { genreService } from '../../services/genreService';
import '../../styles/components/AddGenreModal.css';

interface AddGenreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onRefresh?: () => void; // Nueva prop para refresh
}

const AddGenreModal: React.FC<AddGenreModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  onRefresh 
}) => {
  const [loading, setLoading] = useState(false);

  // Manejar envío del formulario
  const handleSubmit = async (data: GenreInput) => {
    try {
      setLoading(true);
      console.log('🚀 Enviando datos al backend:', data);
      console.log('🌐 URL de la API:', process.env.REACT_APP_API_URL || 'http://localhost:5000/api');
      
      const result = await genreService.createGenre(data);
      console.log('✅ Género creado exitosamente:', result);
      
      // Mostrar mensaje de éxito con SweetAlert
      await Swal.fire({
        icon: 'success',
        title: '¡Género creado exitosamente!',
        text: `El género "${result.name}" ha sido creado correctamente`,
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
      console.error('❌ Error creating genre:', error);
      console.error('📋 Detalles del error:', {
        message: error?.message || 'Error desconocido',
        response: error?.response?.data,
        status: error?.response?.status,
        statusText: error?.response?.statusText
      });
      
      // Mostrar mensaje de error con SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el género',
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

  // No renderizar si no está abierto
  if (!isOpen) return null;

  return (
    <div className="add-genre-modal-overlay" role="dialog" aria-modal="true">
      <div className="add-genre-modal-content">
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
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AddGenreModal;
