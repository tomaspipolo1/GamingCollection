// ===== ADD GAME MODAL COMPONENT =====

import React from 'react';
import { GameInput } from '../../types';
import { gameService } from '../../services/gameService';
import GameForm from './GameForm';
import Swal from 'sweetalert2';
import '../../styles/components/AddGameModal.css';

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onRefresh?: () => void;
}

const AddGameModal: React.FC<AddGameModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  onRefresh 
}) => {
  // Manejar envío del formulario
  const handleSubmit = async (gameData: GameInput) => {
    try {
      console.log('🎮 Creando nuevo juego:', gameData);
      
      // Llamar al servicio para crear el juego
      const response = await gameService.createGame(gameData);
      
      console.log('✅ Juego creado exitosamente:', response);
      
      // Mostrar mensaje de éxito
      await Swal.fire({
        icon: 'success',
        title: '¡Juego Creado! 🎮',
        text: `"${gameData.title}" ha sido agregado a tu colección`,
        confirmButtonText: '¡Genial!',
        confirmButtonColor: '#00ff88',
        background: '#1a1a2e',
        color: 'white'
      });
      
      // Cerrar modal
      onClose();
      
      // Llamar callbacks de éxito
      if (onSuccess) onSuccess();
      if (onRefresh) onRefresh();
      
    } catch (error: any) {
      console.error('❌ Error creando juego:', error);
      
      // Extraer mensaje de error del backend o usar mensaje genérico
      let errorMessage = 'No se pudo crear el juego';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Mostrar mensaje de error
      await Swal.fire({
        icon: 'error',
        title: 'Error al Crear Juego',
        text: errorMessage,
        confirmButtonText: 'Intentar de Nuevo',
        confirmButtonColor: '#ff6b6b',
        background: '#1a1a2e',
        color: 'white'
      });
    }
  };

  // Si no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="add-game-modal-overlay">
      <div className="add-game-modal-content">
        {/* Header del modal */}
        <div className="modal-header">
          <h2 className="modal-title">🎮 Agregar Nuevo Juego</h2>
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
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default AddGameModal;
