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
  // Función unificada para renderizar la sección de precio
  const renderPriceSection = (price: number, currency?: string) => {
    // Caso 1: Precio es 0 → Solo "Gratis"
    if (price === 0) {
      return (
        <span className="price-amount">Gratis</span>
      );
    }
    
    // Caso 2: Precio > 0 → Precio + Moneda
    return (
      <>
        <span className="price-amount">{price}</span>
        {currency && (
          <span className="price-currency">{currency}</span>
        )}
      </>
    );
  };

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
    const platformLower = platform.toLowerCase();
    
    switch (platformLower) {
      case 'steam':
        return '/icons/steam.ico';
      case 'epic games':
        return '/icons/epic.ico';
      case 'xbox game pass':
        return '/icons/xbox.ico';
      case 'ea play':
        return '/icons/ea.ico';
      case 'riot games':
        return '/icons/riot.ico';
      case 'ubisoft connect':
        return '/icons/ubisoft.ico';
      case 'battle.net':
        return '🎮'; // Emoji para Battle.net (no tenemos icono)
      case 'playstation store':
        return '🎮'; // Emoji para PlayStation (no tenemos icono)
      case 'nintendo eshop':
        return '🎲'; // Emoji para Nintendo (no tenemos icono)
      case 'gog':
        return '🎮'; // Emoji para GOG (no tenemos icono)
      case 'origin':
        return '/icons/origin.ico';
      case 'otros':
        return '🎮'; // Emoji para Otros
      // Casos adicionales para compatibilidad
      case 'xbox':
        return '/icons/xbox.ico';
      case 'ubisoft':
        return '/icons/ubisoft.ico';
      case 'ea':
      case 'electronic arts':
        return '/icons/ea.ico';
      case 'epic':
        return '/icons/epic.ico';
      case 'riot':
        return '/icons/riot.ico';
      case 'pc':
      case 'windows':
        return '/icons/steam.ico'; // Steam como representante de PC
      case 'ps5':
      case 'playstation':
      case 'ps4':
        return '🎮'; // Emoji para PlayStation (no tenemos icono)
      case 'switch':
      case 'nintendo':
        return '🎲'; // Emoji para Nintendo (no tenemos icono)
      case 'mobile':
        return '📱'; // Emoji para mobile
      default:
        return '🎮'; // Emoji por defecto
    }
  };

  // Función para verificar si es un icono (string) o una imagen (import)
  const isIconImage = (icon: string) => {
    return icon.endsWith('.ico') || 
           icon.endsWith('.png') ||
           icon.endsWith('.jpg') ||
           icon.endsWith('.jpeg') ||
           icon.endsWith('.svg');
  };

  const platformIcon = getPlatformIcon(game.platform);

  return (
    <div className="game-card">
      {/* Imagen del juego */}
      <div className="game-image-container">
        <div className="game-image-placeholder">
          {game.defaultIcon || '🎮'}
        </div>
      </div>

      {/* Información del juego */}
      <div className="game-info">
        {/* Título */}
        <h3 className="game-title">{game.title}</h3>
        
        {/* Plataforma y Género */}
        <div className="game-meta">
          <span className="game-platform">
            {isIconImage(platformIcon) ? (
              <img 
                src={platformIcon} 
                alt={`${game.platform} icon`} 
                className="platform-icon"
              />
            ) : (
              <span className="platform-emoji">{platformIcon}</span>
            )}
            {game.platform}
          </span>
          <span className="game-genre">
            🏷️ {game.genre.name}
          </span>
        </div>
        
        {/* Status y Precio en la misma fila */}
        <div className="game-status-price">
          <div className={`game-status ${getStatusColor(game.status)}`}>
            {game.status}
          </div>
          <div className="game-price">
            {renderPriceSection(game.price, game.currency)}
          </div>
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
