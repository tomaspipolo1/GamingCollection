// ===== GENRES PAGE =====

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import GenreTable from '../../components/genres/GenreTable';
import AddGenreModal from '../../components/genres/AddGenreModal';
import EditGenreModal from '../../components/genres/EditGenreModal';
import { ConnectionStatus } from '../../components/common';
import { useGenres } from '../../hooks/useGenres';
import { Genre } from '../../types';
import '../../styles/pages/Genres.css';

const Genres: React.FC = () => {
                     const { 
            genres, 
            loading, 
            error, 
            refreshing,
            searchTerm, 
            setSearchTerm,
            statusFilter,
            setStatusFilter,
            deleteGenre,
            currentPage,
            totalPages,
            setCurrentPage,
            fetchGenres
          } = useGenres();

  const [genreToEdit, setGenreToEdit] = useState<Genre | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Handle delete with SweetAlert confirmation
  const handleDeleteClick = async (genre: Genre) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro? 🗑️',
        text: `¿Realmente quieres eliminar "${genre.name}"?`,
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
        Swal.fire({
          title: 'Eliminando...',
          text: 'Por favor espera',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
          background: '#1a1a2e',
          color: 'white'
        });

        await deleteGenre(genre._id);
        
        await Swal.fire({
          icon: 'success',
          title: '¡Género Eliminado! 🏷️',
          text: `"${genre.name}" ha sido eliminado de tu colección`,
          confirmButtonText: '¡Entendido!',
          confirmButtonColor: '#00ff88',
          background: '#1a1a2e',
          color: 'white',
          customClass: { popup: 'swal2-above-modal' }
        });

        // Refresh genres list
        fetchGenres();
      }
    } catch (error: any) {
      console.error('Error durante la eliminación:', error);
      
      await Swal.fire({
        icon: 'error',
        title: 'Error al Eliminar',
        text: 'No se pudo eliminar el género. Intenta de nuevo.',
        confirmButtonText: 'Intentar de Nuevo',
        confirmButtonColor: '#ff6b6b',
        background: '#1a1a2e',
        color: 'white'
      });
    }
  };

  // Handle add modal close
  const handleAddModalClose = () => {
    setShowAddModal(false);
  };

  // Handle add modal success
  const handleAddModalSuccess = () => {
    setShowAddModal(false);
    // Refresh genres list
    fetchGenres();
  };

  // Handle edit modal close
  const handleEditModalClose = () => {
    setShowEditModal(false);
    setGenreToEdit(null);
  };

  // Handle edit modal success
  const handleEditModalSuccess = () => {
    setShowEditModal(false);
    setGenreToEdit(null);
    // Refresh genres list
    fetchGenres();
  };

  // Refresh automático al montar el componente
  useEffect(() => {
    console.log('🔄 Página de géneros montada, refrescando lista...');
    fetchGenres();
  }, []); // Solo se ejecuta al montar

  // Handle edit click
  const handleEditClick = (genre: Genre) => {
    setGenreToEdit(genre);
    setShowEditModal(true);
  };

  // Handle add new genre
  const handleAddGenre = () => {
    setShowAddModal(true);
  };

  return (
    <div className="genres-container">
      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <div className="genres-content">
        
        {/* ===== TÍTULO Y BOTÓN AGREGAR ===== */}
        <div className="genres-header">
          <div className="genres-title-section">
            <h1 className="genres-title">
              🏷️ Géneros de Videojuegos
            </h1>
            <p className="genres-subtitle">
              Gestiona las categorías gaming
            </p>
          </div>
          <button 
            className="btn-add-genre"
            onClick={handleAddGenre}
          >
            <span className="btn-icon">➕</span>
            Agregar Género
          </button>
        </div>

        {/* ===== BÚSQUEDA Y FILTROS ===== */}
        <div className="search-filters-section">
          {/* Búsqueda */}
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar géneros..."
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
                const value = e.target.value as 'all' | 'true' | 'false';
                setStatusFilter(value);
                setCurrentPage(1); // Resetear a la primera página
              }}
            >
              <option value="all">🏷️ Todos los estados</option>
              <option value="true">🟢 Solo Activos</option>
              <option value="false">🔴 Solo Inactivos</option>
            </select>
            
            {/* Connection Status */}
            <div className="connection-status-container">
              <ConnectionStatus />
            </div>
          </div>
        </div>

        {/* ===== TABLA DE GÉNEROS ===== */}
        <div className="genres-table-section">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Cargando géneros...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">❌ {error}</p>
            </div>
          ) : (
            <>
              <GenreTable 
                genres={genres}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
              {refreshing && (
                <div className="refreshing-indicator">
                  <div className="loading-spinner small"></div>
                  <span>Actualizando lista...</span>
                </div>
              )}
            </>
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



                      {/* ===== ADD GENRE MODAL ===== */}
       <AddGenreModal
         isOpen={showAddModal}
         onClose={handleAddModalClose}
         onSuccess={handleAddModalSuccess}
         onRefresh={fetchGenres}
       />

       {/* ===== EDIT GENRE MODAL ===== */}
       <EditGenreModal
         isOpen={showEditModal}
         genre={genreToEdit}
         onClose={handleEditModalClose}
         onSuccess={handleEditModalSuccess}
         onRefresh={fetchGenres}
       />


    </div>
  );
};

export default Genres;
