// ===== GAME GRID COMPONENT =====

import React from 'react';
import { Game } from '../../types';
import GameCard from './GameCard';
import '../../styles/components/GameGrid.css';

interface GameGridProps {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (game: Game) => void;
}

const GameGrid: React.FC<GameGridProps> = ({ games, onEdit, onDelete }) => {
  if (!games || games.length === 0) {
    return (
      <div className="empty-games-container">
        <div className="empty-games-content">
          <div className="empty-icon">🎮</div>
          <h3 className="empty-title">No hay juegos creados</h3>
          <p className="empty-message">Agrega tu primer juego para empezar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="game-grid-container">
      <div className="game-grid">
        {games.map((game) => (
          <GameCard
            key={game._id}
            game={game}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default GameGrid;
