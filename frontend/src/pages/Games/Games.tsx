// ===== GAMES PAGE =====

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import GameGrid from '../../components/games/GameGrid';
import DeleteModal from '../../components/games/DeleteModal';
import AddGameModal from '../../components/games/AddGameModal';
import { ConnectionStatus } from '../../components/common';
import { useGames } from '../../hooks/useGames';
import { Game } from '../../types';
import '../../styles/pages/Games.css';

const Games: React.FC = () => {
  const { 
    games, 
    loading, 
    error, 
    searchTerm, 
    setSearchTerm,
    deleteGame,
    currentPage,
    totalPages,
    setCurrentPage
  } = useGames();

  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Handle delete confirmation
  const handleDeleteClick = (game: Game) => {
    setGameToDelete(game);
    setShowDeleteModal(true);
  };

  // Handle confirmed delete
  const handleConfirmDelete = async () => {
    if (gameToDelete) {
      try {
        await deleteGame(gameToDelete._id);
        
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Juego eliminado!',
          text: `El juego "${gameToDelete.title}" ha sido eliminado correctamente`,
          confirmButtonColor: '#00ff88',
          confirmButtonText: 'Entendido'
        });
        
        setShowDeleteModal(false);
        setGameToDelete(null);
      } catch (error: any) {
        // Mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar',
          text: error?.response?.data?.message || 'Ha ocurrido un error al eliminar el juego',
          confirmButtonColor: '#00ff88',
          confirmButtonText: 'Entendido'
        });
      }
    }
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setGameToDelete(null);
  };

  // Handle edit (navigate to edit form - to implement later)
  const handleEditClick = (game: Game) => {
    console.log('Edit game:', game);
    // TODO: Navigate to edit form
  };

  // Handle add new game
  const handleAddGame = () => {
    setShowAddModal(true);
  };

  // Handle add modal success
  const handleAddModalSuccess = () => {
    // Refresh games list after adding
    // The modal will handle the refresh automatically
  };

  return (
    <div className="games-container">
      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <div className="games-content">
        
        {/* ===== TÍTULO Y BOTÓN AGREGAR ===== */}
        <div className="games-header">
          <div className="games-title-section">
            <h1 className="games-title">
              🎮 Colección de Videojuegos
            </h1>
            <p className="games-subtitle">
              Gestiona la biblioteca gaming
            </p>
          </div>
          <button 
            className="btn-add-game"
            onClick={handleAddGame}
          >
            <span className="btn-icon">➕</span>
            Agregar Juego
          </button>
        </div>

        {/* ===== BÚSQUEDA ===== */}
        <div className="search-section">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar juegos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* ===== GRID DE JUEGOS ===== */}
        <div className="games-grid-section">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Cargando juegos...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">❌ {error}</p>
            </div>
          ) : (
            <GameGrid 
              games={games}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          )}
        </div>

        {/* ===== PAGINACIÓN ===== */}
        {!loading && !error && totalPages > 1 && (
          <div className="pagination-section">
            <div className="pagination-info">
              Página {currentPage} de {totalPages}
            </div>
            <div className="pagination-controls">
              <button 
                className="pagination-btn"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ◀
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              
              <button 
                className="pagination-btn"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                ▶
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ===== CONNECTION STATUS ===== */}
      <div className="games-connection-status">
        <ConnectionStatus />
      </div>

      {/* ===== DELETE MODAL ===== */}
      <DeleteModal 
        isOpen={showDeleteModal}
        game={gameToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* ===== ADD GAME MODAL ===== */}
      <AddGameModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddModalSuccess}
        onRefresh={() => {
          // Refresh games list using the hook
          // This will trigger a new fetch of games
          window.location.reload();
        }}
      />
    </div>
  );
};

export default Games;
