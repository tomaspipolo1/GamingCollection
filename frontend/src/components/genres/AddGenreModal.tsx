// ===== ADD GENRE MODAL =====

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Manejar envío del formulario
  const handleSubmit = async (data: GenreInput) => {
    try {
      setLoading(true);
      console.log('🚀 Enviando datos al backend:', data);
      console.log('🌐 URL de la API:', process.env.REACT_APP_API_URL || 'http://localhost:5000/api');
      
      const result = await genreService.createGenre(data);
      console.log('✅ Género creado exitosamente:', result);
      const displayName = (result as any)?.name 
        || (result as any)?.data?.name 
        || (result as any)?.genre?.name 
        || data.name;
      
      // Mostrar éxito con estilo gaming y cierre automático
      await Swal.fire({
        icon: 'success',
        title: '¡Género Creado! 🎭',
        text: `"${displayName}" ha sido agregado a tu colección`,
        background: '#1a1a2e',
        color: 'white',
        confirmButtonColor: '#00ff88',
        customClass: { popup: 'swal2-above-modal' },
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
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
      
      // Error con estilo gaming (mantener botón)
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el género',
        text: error?.response?.data?.message || error?.message || 'Ha ocurrido un error inesperado',
        background: '#1a1a2e',
        color: 'white',
        confirmButtonColor: '#ff6b6b',
        confirmButtonText: 'Entendido',
        customClass: { popup: 'swal2-above-modal' }
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

  // Usar Portal para renderizar fuera del árbol DOM
  return ReactDOM.createPortal(
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
    </div>,
    document.body
  );
};

export default AddGenreModal;
