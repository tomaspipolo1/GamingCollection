// ===== GENRE TABLE COMPONENT =====

import React from 'react';
import { Genre } from '../../types';
import '../../styles/components/GenreTable.css';

interface GenreTableProps {
  genres: Genre[];
  onEdit: (genre: Genre) => void;
  onDelete: (genre: Genre) => void;
}

const StatusBadge: React.FC<{ active: boolean }> = ({ active }) => (
  <span className={`genre-status ${active ? 'active' : 'inactive'}`}>
    {active ? 'Activo' : 'Inactivo'}
  </span>
);

const GenreTable: React.FC<GenreTableProps> = ({ genres, onEdit, onDelete }) => {
  if (!genres || genres.length === 0) {
    return (
      <div className="empty-genres-container">
        <div className="empty-genres-content">
          <div className="empty-icon">🏷️</div>
          <h3 className="empty-title">No hay géneros creados</h3>
          <p className="empty-message">Agrega tu primer género para empezar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="genre-table-container">
      <div className="genre-table-wrapper">
        <table className="genre-table">
          <thead>
            <tr>
              <th className="th-name">Género</th>
              <th className="th-description">Descripción</th>
              <th className="th-status">Estado</th>
              <th className="th-actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr key={genre._id} className="genre-row">
                <td className="td-name">
                  <span className="genre-name">{genre.name}</span>
                </td>
                <td className="td-description">
                  <span className="genre-description">{genre.description || '-'}</span>
                </td>
                <td className="td-status">
                  <StatusBadge active={genre.isActive} />
                </td>
                <td className="td-actions">
                  <button className="btn-action edit" onClick={() => onEdit(genre)} title="Editar">✏️</button>
                  <button className="btn-action delete" onClick={() => onDelete(genre)} title="Eliminar">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenreTable;


