// ===== EDIT GAME MODAL COMPONENT =====

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Game, GameInput } from '../../types';
import { gameService } from '../../services/gameService';
import GameForm from './GameForm';
import Swal from 'sweetalert2';
import '../../styles/components/AddGameModal.css';

interface EditGameModalProps {
  isOpen: boolean;
  game: Game | null;
  onClose: () => void;
  onSuccess?: () => void;
  onRefresh?: () => void;
}

const EditGameModal: React.FC<EditGameModalProps> = ({ 
  isOpen, 
  game, 
  onClose, 
  onSuccess,
  onRefresh 
}) => {
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
  const handleSubmit = async (gameData: GameInput) => {
    if (!game) return;
    
    try {
      console.log('🎮 Editando juego:', gameData);
      console.log('🆔 ID del juego a editar:', game._id);
      
      // Llamar al servicio para actualizar el juego
      const response = await gameService.updateGame(game._id, gameData);
      
      console.log('✅ Juego actualizado exitosamente:', response);
      
      // Mostrar mensaje de éxito con z-index alto y cierre automático
      await Swal.fire({
        icon: 'success',
        title: '¡Juego Actualizado! 🎮',
        text: `"${gameData.title}" ha sido actualizado correctamente`,
        confirmButtonText: '¡Genial!',
        confirmButtonColor: '#00ff88',
        background: '#1a1a2e',
        color: 'white',
        customClass: {
          popup: 'swal2-above-modal'
        },
        timer: 3000, // Cerrar automáticamente en 3 segundos
        timerProgressBar: true,
        showConfirmButton: false // No mostrar botón de confirmación
      });
      
      // Cerrar modal automáticamente
      onClose();
      
      // Llamar callbacks de éxito
      if (onSuccess) onSuccess();
      if (onRefresh) onRefresh();
      
    } catch (error: any) {
      console.error('❌ Error actualizando juego:', error);
      
      // Extraer mensaje de error del backend o usar mensaje genérico
      let errorMessage = 'No se pudo actualizar el juego';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Mostrar mensaje de error con z-index alto
      await Swal.fire({
        icon: 'error',
        title: 'Error al Actualizar Juego',
        text: errorMessage,
        confirmButtonText: 'Intentar de Nuevo',
        confirmButtonColor: '#ff6b6b',
        background: '#1a1a2e',
        color: 'white',
        customClass: {
          popup: 'swal2-above-modal'
        }
      });
    }
  };

  // Si no está abierto o no hay juego, no renderizar nada
  if (!isOpen || !game) return null;

  const modal = (
    <div className="add-game-modal-overlay" role="dialog" aria-modal="true">
      <div className="add-game-modal-content">
        {/* Header del modal (solo botón cerrar) */}
        <div className="modal-header">
          <button 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>
        
        {/* Cuerpo del modal */}
        <div className="modal-body">
          <GameForm 
            initialData={game}
            onSubmit={handleSubmit}
            onCancel={onClose}
            isEditMode={true}
          />
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
};

export default EditGameModal;
