// ===== GENRE DELETE MODAL =====

import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { Genre } from '../../types';

interface DeleteGenreModalProps {
  isOpen: boolean;
  genre: Genre | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteGenreModal: React.FC<DeleteGenreModalProps> = ({ isOpen, genre, onConfirm, onCancel }) => {
  useEffect(() => {
    if (isOpen && genre) {
      Swal.fire({
        title: '¿Eliminar género?',
        text: `¿Seguro que deseas eliminar el género "${genre.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          onConfirm();
        } else {
          onCancel();
        }
      });
    }
  }, [isOpen, genre, onConfirm, onCancel]);

  return null; // No renderizamos nada, SweetAlert maneja la UI
};

export default DeleteGenreModal;


