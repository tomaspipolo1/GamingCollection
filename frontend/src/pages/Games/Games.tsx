// ===== GAMES PAGE =====

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import GameGrid from '../../components/games/GameGrid';
import AddGameModal from '../../components/games/AddGameModal';
import EditGameModal from '../../components/games/EditGameModal';
import { ConnectionStatus } from '../../components/common';
import { useGames } from '../../hooks/useGames';
import { Game } from '../../types';
import { gameService } from '../../services/gameService';
import '../../styles/pages/Games.css';

const Games: React.FC = () => {
  const { 
    games, 
    loading, 
    error, 
    searchTerm, 
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    deleteGame,
    currentPage,
    totalPages,
    setCurrentPage
  } = useGames();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [gameToEdit, setGameToEdit] = useState<Game | null>(null);

  // Handle delete with SweetAlert confirmation
  const handleDeleteClick = async (game: Game) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro? 🗑️',
        text: `¿Realmente quieres eliminar "${game.title}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff6b6b',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        background: '#1a1a2e',
        color: 'white',
        customClass: { popup: 'swal2-above-modal' }
      });

      if (result.isConfirmed) {
        // Mostrar loading
        Swal.fire({
          title: 'Eliminando...',
          text: 'Por favor espera',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
          background: '#1a1a2e',
          color: 'white',
          customClass: { popup: 'swal2-above-modal' }
        });

        // Llamar al servicio para soft delete
        await gameService.deleteGame(game._id);
        
        // Mostrar éxito
        await Swal.fire({
          icon: 'success',
          title: '¡Juego Eliminado! 🎮',
          text: `"${game.title}" ha sido eliminado de tu colección`,
          confirmButtonText: '¡Entendido!',
          confirmButtonColor: '#00ff88',
          background: '#1a1a2e',
          color: 'white',
          customClass: { popup: 'swal2-above-modal' }
        });

        // Refrescar la lista de juegos
        window.location.reload();
      }
    } catch (error: any) {
      console.error('Error durante la eliminación:', error);
      
      // Mostrar error
      await Swal.fire({
        icon: 'error',
        title: 'Error al Eliminar',
        text: 'No se pudo eliminar el juego. Intenta de nuevo.',
        confirmButtonText: 'Intentar de Nuevo',
        confirmButtonColor: '#ff6b6b',
        background: '#1a1a2e',
        color: 'white',
        customClass: { popup: 'swal2-above-modal' }
      });
    }
  };

  // Handle edit click
  const handleEditClick = (game: Game) => {
    setGameToEdit(game);
    setShowEditModal(true);
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

  // Handle edit modal close
  const handleEditModalClose = () => {
    setShowEditModal(false);
    setGameToEdit(null);
  };

  // Handle edit modal success
  const handleEditModalSuccess = () => {
    setShowEditModal(false);
    setGameToEdit(null);
    // Refresh games list after editing
    window.location.reload();
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

        {/* ===== BÚSQUEDA Y FILTROS ===== */}
        <div className="search-filters-section">
          {/* Búsqueda */}
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
          
          {/* Filtros */}
          <div className="filters-container">
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => {
                const value = e.target.value as 'all' | 'Sin Jugar' | 'Jugado' | 'Comprar';
                setStatusFilter(value);
              }}
            >
              <option value="all">🏷️ Todos los estados</option>
              <option value="Sin Jugar">🟡 Sin Jugar</option>
              <option value="Jugado">🟢 Jugado</option>
              <option value="Comprar">🔴 Comprar</option>
            </select>
            
            {/* Connection Status */}
            <div className="connection-status-container">
              <ConnectionStatus />
            </div>
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
        {!loading && !error && (
          <div className="pagination-section">
            <div className="pagination-info">
              Página {currentPage} de {totalPages}
            </div>
            {totalPages > 1 && (
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
            )}
          </div>
        )}

      </div>

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

      {/* ===== EDIT GAME MODAL ===== */}
      <EditGameModal
        isOpen={showEditModal}
        game={gameToEdit}
        onClose={handleEditModalClose}
        onSuccess={handleEditModalSuccess}
        onRefresh={() => {
          // Refresh games list after editing
          window.location.reload();
        }}
      />
    </div>
  );
};

export default Games;
