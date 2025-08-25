// ===== SERVICIO PARA GÉNEROS =====

import { 
  Genre, 
  GenreInput, 
  GenreUpdate, 
  GenreFilters,
  ApiResponse, 
  ApiListResponse 
} from '../types';
import { apiGet, apiPost, apiPut, apiDelete, buildQueryString } from './api';

// ===== ENDPOINTS =====
const ENDPOINTS = {
  GENRES: '/api/genres',
  GENRE_BY_ID: (id: string) => `/api/genres/${id}`,
  ACTIVE_GENRES: '/api/genres/active',
  PERMANENT_DELETE: (id: string) => `/api/genres/${id}/permanent`,
} as const;

// ===== SERVICIO DE GÉNEROS =====
export class GenreService {
  
  /**
   * Obtener todos los géneros
   */
  static async getAll(filters?: GenreFilters): Promise<ApiListResponse<Genre>> {
    const queryString = filters ? buildQueryString(filters) : '';
    return apiGet<ApiListResponse<Genre>>(`${ENDPOINTS.GENRES}${queryString}`);
  }

  /**
   * Obtener géneros activos
   */
  static async getActive(): Promise<ApiListResponse<Genre>> {
    return apiGet<ApiListResponse<Genre>>(ENDPOINTS.ACTIVE_GENRES);
  }

  /**
   * Obtener género por ID
   */
  static async getById(id: string): Promise<ApiResponse<Genre>> {
    if (!id) throw new Error('ID del género es requerido');
    return apiGet<ApiResponse<Genre>>(ENDPOINTS.GENRE_BY_ID(id));
  }

  /**
   * Crear nuevo género
   */
  static async create(genreData: GenreInput): Promise<ApiResponse<Genre>> {
    // Validaciones básicas
    if (!genreData.name?.trim()) {
      throw new Error('El nombre del género es obligatorio');
    }

    const cleanData = {
      name: genreData.name.trim(),
      description: genreData.description?.trim() || undefined,
    };

    return apiPost<ApiResponse<Genre>, GenreInput>(ENDPOINTS.GENRES, cleanData);
  }

  /**
   * Actualizar género
   */
  static async update(id: string, genreData: GenreUpdate): Promise<ApiResponse<Genre>> {
    if (!id) throw new Error('ID del género es requerido');

    // Limpiar datos
    const cleanData: GenreUpdate = {};
    
    if (genreData.name !== undefined) {
      if (!genreData.name.trim()) {
        throw new Error('El nombre del género no puede estar vacío');
      }
      cleanData.name = genreData.name.trim();
    }
    
    if (genreData.description !== undefined) {
      cleanData.description = genreData.description?.trim() || undefined;
    }
    
    if (genreData.isActive !== undefined) {
      cleanData.isActive = genreData.isActive;
    }

    return apiPut<ApiResponse<Genre>, GenreUpdate>(ENDPOINTS.GENRE_BY_ID(id), cleanData);
  }

  /**
   * Eliminar género (soft delete)
   */
  static async delete(id: string): Promise<ApiResponse<Genre>> {
    if (!id) throw new Error('ID del género es requerido');
    return apiDelete<ApiResponse<Genre>>(ENDPOINTS.GENRE_BY_ID(id));
  }

  /**
   * Eliminar género permanentemente
   */
  static async permanentDelete(id: string): Promise<ApiResponse<Genre>> {
    if (!id) throw new Error('ID del género es requerido');
    return apiDelete<ApiResponse<Genre>>(ENDPOINTS.PERMANENT_DELETE(id));
  }

  /**
   * Buscar géneros por nombre
   */
  static async search(searchTerm: string): Promise<ApiListResponse<Genre>> {
    if (!searchTerm.trim()) {
      return this.getAll();
    }
    
    // Usamos filtros para buscar (si la API lo soporta en el futuro)
    return this.getAll({ active: true });
  }

  /**
   * Verificar si un género existe por nombre
   */
  static async existsByName(name: string): Promise<boolean> {
    try {
      const response = await this.getAll();
      return response.data.some(genre => 
        genre.name.toLowerCase() === name.toLowerCase()
      );
    } catch (error) {
      console.error('Error verificando existencia del género:', error);
      return false;
    }
  }

  /**
   * Obtener estadísticas de géneros
   */
  static async getStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
  }> {
    try {
      const response = await this.getAll();
      const total = response.count;
      const active = response.data.filter(genre => genre.isActive).length;
      const inactive = total - active;

      return { total, active, inactive };
    } catch (error) {
      console.error('Error obteniendo estadísticas de géneros:', error);
      return { total: 0, active: 0, inactive: 0 };
    }
  }
}

// ===== FUNCIONES HELPER =====

/**
 * Validar datos de género
 */
export const validateGenreData = (data: GenreInput): string[] => {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push('El nombre del género es obligatorio');
  } else if (data.name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  } else if (data.name.trim().length > 50) {
    errors.push('El nombre no puede tener más de 50 caracteres');
  }

  if (data.description && data.description.length > 200) {
    errors.push('La descripción no puede tener más de 200 caracteres');
  }

  return errors;
};

/**
 * Formatear género para mostrar
 */
export const formatGenreForDisplay = (genre: Genre): string => {
  return genre.description 
    ? `${genre.name} - ${genre.description}`
    : genre.name;
};

/**
 * Obtener color del estado del género
 */
export const getGenreStatusColor = (isActive: boolean): string => {
  return isActive ? 'text-green-400' : 'text-gray-400';
};

/**
 * Obtener texto del estado del género
 */
export const getGenreStatusText = (isActive: boolean): string => {
  return isActive ? 'Activo' : 'Inactivo';
};

// Export por defecto
export default GenreService;
