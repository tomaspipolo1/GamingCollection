// ===== GENRES PAGE =====

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import GenreTable from '../../components/genres/GenreTable';
import DeleteGenreModal from '../../components/genres/DeleteModal';
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

  const [genreToDelete, setGenreToDelete] = useState<Genre | null>(null);
  const [genreToEdit, setGenreToEdit] = useState<Genre | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Handle delete confirmation
  const handleDeleteClick = (genre: Genre) => {
    setGenreToDelete(genre);
    setShowDeleteModal(true);
  };

  // Handle confirmed delete
  const handleConfirmDelete = async () => {
    if (genreToDelete) {
      try {
        await deleteGenre(genreToDelete._id);
        
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Género eliminado!',
          text: `El género "${genreToDelete.name}" ha sido eliminado correctamente`,
          confirmButtonColor: '#00ff88',
          confirmButtonText: 'Entendido'
        });
        
        setShowDeleteModal(false);
        setGenreToDelete(null);
      } catch (error: any) {
        // Mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar',
          text: error?.response?.data?.message || 'Ha ocurrido un error al eliminar el género',
          confirmButtonColor: '#00ff88',
          confirmButtonText: 'Entendido'
        });
      }
    }
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setGenreToDelete(null);
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

       {/* ===== DELETE MODAL ===== */}
       <DeleteGenreModal 
         isOpen={showDeleteModal}
         genre={genreToDelete}
         onConfirm={handleConfirmDelete}
         onCancel={handleCancelDelete}
       />
    </div>
  );
};

export default Genres;
