// ===== GAME CARD COMPONENT =====

import React from 'react';
import { Game } from '../../types';
import '../../styles/components/GameCard.css';

interface GameCardProps {
  game: Game;
  onEdit: (game: Game) => void;
  onDelete: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onEdit, onDelete }) => {
  // Función para obtener el color del status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'jugado':
        return 'status-played';
      case 'sin jugar':
        return 'status-not-played';
      case 'comprar':
        return 'status-to-buy';
      default:
        return 'status-default';
    }
  };

  // Función para obtener el icono de la plataforma
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'pc':
        return '💻';
      case 'ps5':
      case 'playstation':
        return '🎮';
      case 'xbox':
        return '🎯';
      case 'switch':
      case 'nintendo':
        return '🎲';
      case 'mobile':
        return '📱';
      default:
        return '🎮';
    }
  };

  return (
    <div className="game-card">
      {/* Imagen del juego */}
      <div className="game-image-container">
        {game.image ? (
          <img 
            src={game.image} 
            alt={game.title} 
            className="game-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`game-image-placeholder ${game.image ? 'hidden' : ''}`}>
          🎮
        </div>
      </div>

      {/* Información del juego */}
      <div className="game-info">
        {/* Título */}
        <h3 className="game-title">{game.title}</h3>
        
        {/* Plataforma y Género */}
        <div className="game-meta">
          <span className="game-platform">
            {getPlatformIcon(game.platform)} {game.platform}
          </span>
          <span className="game-genre">
            🏷️ {game.genre}
          </span>
        </div>
        
        {/* Status */}
        <div className={`game-status ${getStatusColor(game.status)}`}>
          {game.status}
        </div>
        
        {/* Precio y Moneda */}
        <div className="game-price">
          <span className="price-amount">
            {game.price ? `${game.price}` : 'Gratis'}
          </span>
          {game.price && game.currency && (
            <span className="price-currency">{game.currency}</span>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="game-actions">
        <button 
          className="btn-action edit" 
          onClick={() => onEdit(game)} 
          title="Editar juego"
        >
          ✏️
        </button>
        <button 
          className="btn-action delete" 
          onClick={() => onDelete(game)} 
          title="Eliminar juego"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default GameCard;
