// ===== GAME TABLE COMPONENT =====

import React from 'react';
import { Game } from '../../types';
import '../../styles/components/GameTable.css';

interface GameTableProps {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (game: Game) => void;
}

// Platform icons mapping
const getPlatformIcon = (platform: string): string => {
  const icons: Record<string, string> = {
    steam: '🎮',
    epic: '📦',
    ea: '🎯',
    ubisoft: '🎪',
    battlenet: '⚔️',
    origin: '🌟',
    gog: '🏛️',
    microsoft: '📘',
    playstation: '🎮',
    xbox: '🎮',
    nintendo: '🎌',
    other: '🕹️'
  };
  
  const key = platform.toLowerCase().replace(/\s+/g, '');
  return icons[key] || icons.other;
};

// Status badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'jugado':
        return { emoji: '🟢', className: 'status-played', text: 'Jugado' };
      case 'sin jugar':
        return { emoji: '🔴', className: 'status-unplayed', text: 'Sin Jugar' };
      case 'comprar':
        return { emoji: '🟡', className: 'status-buy', text: 'Comprar' };
      default:
        return { emoji: '⚪', className: 'status-unknown', text: status };
    }
  };

  const config = getStatusConfig(status);
  
  return (
    <span className={`status-badge ${config.className}`}>
      <span className="status-emoji">{config.emoji}</span>
      <span className="status-text">{config.text}</span>
    </span>
  );
};

// Price formatter
const formatPrice = (price: number, currency: string = 'USD'): string => {
  if (price === 0) return 'Gratis';
  
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '$';
  return `${symbol}${price.toFixed(2)}`;
};

const GameTable: React.FC<GameTableProps> = ({ games, onEdit, onDelete }) => {
  
  if (games.length === 0) {
    return (
      <div className="empty-games-container">
        <div className="empty-games-content">
          <div className="empty-icon">🎮</div>
          <h3 className="empty-title">No hay juegos en la colección</h3>
          <p className="empty-message">
            Comienza agregando el primer videojuego a la biblioteca
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="game-table-container">
      <div className="game-table-wrapper">
        <table className="game-table">
          <thead>
            <tr>
              <th className="th-game">Juego</th>
              <th className="th-platform">Plataforma</th>
              <th className="th-genre">Género</th>
              <th className="th-status">Estado</th>
              <th className="th-price">Precio</th>
              <th className="th-actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game._id} className="game-row">
                
                {/* JUEGO */}
                <td className="td-game">
                  <div className="game-info">
                    <div className="game-title">{game.title}</div>
                    {game.description && (
                      <div className="game-description">{game.description}</div>
                    )}
                  </div>
                </td>

                {/* PLATAFORMA */}
                <td className="td-platform">
                  <div className="platform-info">
                    <span className="platform-icon">
                      {getPlatformIcon(game.platform)}
                    </span>
                    <span className="platform-name">{game.platform}</span>
                  </div>
                </td>

                {/* GÉNERO */}
                <td className="td-genre">
                  <span className="genre-badge">
                    {typeof game.genre === 'object' && game.genre?.name 
                      ? game.genre.name 
                      : typeof game.genre === 'string' 
                      ? game.genre 
                      : 'N/A'}
                  </span>
                </td>

                {/* ESTADO */}
                <td className="td-status">
                  <StatusBadge status={game.status} />
                </td>

                {/* PRECIO */}
                <td className="td-price">
                  <div className="price-info">
                    <span className="price-amount">
                      {formatPrice(game.price, game.currency)}
                    </span>
                  </div>
                </td>

                {/* ACCIONES */}
                <td className="td-actions">
                  <div className="action-buttons">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => onEdit(game)}
                      title="Editar juego"
                    >
                      ✏️
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => onDelete(game)}
                      title="Eliminar juego"
                    >
                      🗑️
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameTable;
