// ===== DELETE MODAL COMPONENT =====

import React, { useEffect } from 'react';
import { Game } from '../../types';
import '../../styles/components/DeleteModal.css';

interface DeleteModalProps {
  isOpen: boolean;
  game: Game | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ 
  isOpen, 
  game, 
  onConfirm, 
  onCancel 
}) => {
  
  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onCancel]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  if (!isOpen || !game) {
    return null;
  }

  return (
    <div 
      className="delete-modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div className="delete-modal">
        
        {/* ===== HEADER ===== */}
        <div className="modal-header">
          <div className="modal-icon">🗑️</div>
          <h3 className="modal-title">Eliminar Juego</h3>
          <button 
            className="modal-close-btn"
            onClick={onCancel}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="modal-content">
          <div className="warning-section">
            <div className="warning-icon">⚠️</div>
            <div className="warning-text">
              <p className="warning-title">
                ¿Estás seguro que quieres eliminar este juego?
              </p>
              <p className="warning-subtitle">
                Esta acción no se puede deshacer.
              </p>
            </div>
          </div>

          <div className="game-info-section">
            <div className="game-details">
              <div className="game-field">
                <span className="field-label">Juego:</span>
                <span className="field-value">{game.title}</span>
              </div>
              
              <div className="game-field">
                <span className="field-label">Plataforma:</span>
                <span className="field-value">{game.platform}</span>
              </div>
              
              <div className="game-field">
                <span className="field-label">Género:</span>
                <span className="field-value">
                  {typeof game.genre === 'object' && game.genre?.name 
                    ? game.genre.name 
                    : typeof game.genre === 'string' 
                    ? game.genre 
                    : 'N/A'}
                </span>
              </div>
              
              {game.price > 0 && (
                <div className="game-field">
                  <span className="field-label">Precio:</span>
                  <span className="field-value">
                    {game.currency === 'USD' ? '$' : '€'}{game.price.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== ACTIONS ===== */}
        <div className="modal-actions">
          <button 
            className="btn-cancel"
            onClick={onCancel}
          >
            <span className="btn-icon">❌</span>
            Cancelar
          </button>
          
          <button 
            className="btn-confirm-delete"
            onClick={onConfirm}
          >
            <span className="btn-icon">🗑️</span>
            Eliminar
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteModal;
