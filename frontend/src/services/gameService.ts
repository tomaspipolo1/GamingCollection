// ===== SERVICIO PARA VIDEOJUEGOS =====

import { 
  Game, 
  GameInput, 
  GameUpdate, 
  GameFilters,
  Platform,
  GameStatus,
  Currency,
  ApiResponse, 
  ApiListResponse 
} from '../types';
import { apiGet, apiPost, apiPut, apiDelete, buildQueryString } from './api';

// ===== ENDPOINTS =====
const ENDPOINTS = {
  GAMES: '/api/games',
  GAME_BY_ID: (id: string) => `/api/games/${id}`,
  SEARCH: (term: string) => `/api/games/search/${encodeURIComponent(term)}`,
  BY_STATUS: (status: GameStatus) => `/api/games/by-status/${encodeURIComponent(status)}`,
  BY_PLATFORM: (platform: Platform) => `/api/games/by-platform/${encodeURIComponent(platform)}`,
  PERMANENT_DELETE: (id: string) => `/api/games/${id}/permanent`,
} as const;

// ===== SERVICIO DE VIDEOJUEGOS =====
export class GameService {
  
  /**
   * Obtener todos los videojuegos
   */
  static async getAll(filters?: GameFilters): Promise<ApiListResponse<Game>> {
    const queryString = filters ? buildQueryString(filters) : '';
    return apiGet<ApiListResponse<Game>>(`${ENDPOINTS.GAMES}${queryString}`);
  }

  /**
   * Obtener videojuego por ID
   */
  static async getById(id: string): Promise<ApiResponse<Game>> {
    if (!id) throw new Error('ID del videojuego es requerido');
    return apiGet<ApiResponse<Game>>(ENDPOINTS.GAME_BY_ID(id));
  }

  /**
   * Crear nuevo videojuego
   */
  static async create(gameData: GameInput): Promise<ApiResponse<Game>> {
    // Validaciones básicas
    const errors = this.validateGameData(gameData);
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    const cleanData = this.cleanGameData(gameData);
    return apiPost<ApiResponse<Game>, GameInput>(ENDPOINTS.GAMES, cleanData);
  }

  /**
   * Actualizar videojuego
   */
  static async update(id: string, gameData: GameUpdate): Promise<ApiResponse<Game>> {
    if (!id) throw new Error('ID del videojuego es requerido');

    const cleanData = this.cleanGameUpdateData(gameData);
    return apiPut<ApiResponse<Game>, GameUpdate>(ENDPOINTS.GAME_BY_ID(id), cleanData);
  }

  /**
   * Eliminar videojuego (soft delete)
   */
  static async delete(id: string): Promise<ApiResponse<Game>> {
    if (!id) throw new Error('ID del videojuego es requerido');
    return apiDelete<ApiResponse<Game>>(ENDPOINTS.GAME_BY_ID(id));
  }

  /**
   * Eliminar videojuego permanentemente
   */
  static async permanentDelete(id: string): Promise<ApiResponse<Game>> {
    if (!id) throw new Error('ID del videojuego es requerido');
    return apiDelete<ApiResponse<Game>>(ENDPOINTS.PERMANENT_DELETE(id));
  }

  /**
   * Buscar videojuegos por título
   */
  static async search(searchTerm: string): Promise<ApiListResponse<Game>> {
    if (!searchTerm.trim()) {
      return this.getAll();
    }

    if (searchTerm.trim().length < 2) {
      throw new Error('El término de búsqueda debe tener al menos 2 caracteres');
    }

    return apiGet<ApiListResponse<Game>>(ENDPOINTS.SEARCH(searchTerm.trim()));
  }

  /**
   * Obtener videojuegos por estado
   */
  static async getByStatus(status: GameStatus): Promise<ApiListResponse<Game>> {
    return apiGet<ApiListResponse<Game>>(ENDPOINTS.BY_STATUS(status));
  }

  /**
   * Obtener videojuegos por plataforma
   */
  static async getByPlatform(platform: Platform): Promise<ApiListResponse<Game>> {
    return apiGet<ApiListResponse<Game>>(ENDPOINTS.BY_PLATFORM(platform));
  }

  /**
   * Obtener estadísticas de videojuegos
   */
  static async getStats(): Promise<{
    total: number;
    byStatus: Record<GameStatus, number>;
    byPlatform: Record<string, number>;
    averagePrice: number;
  }> {
    try {
      const response = await this.getAll();
      const games = response.data;

      const byStatus: Record<GameStatus, number> = {
        'Jugado': 0,
        'Sin Jugar': 0,
        'Comprar': 0,
      };

      const byPlatform: Record<string, number> = {};
      let totalPrice = 0;

      games.forEach(game => {
        byStatus[game.status]++;
        byPlatform[game.platform] = (byPlatform[game.platform] || 0) + 1;
        totalPrice += game.price;
      });

      return {
        total: response.count,
        byStatus,
        byPlatform,
        averagePrice: games.length > 0 ? totalPrice / games.length : 0,
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas de videojuegos:', error);
      return {
        total: 0,
        byStatus: { 'Jugado': 0, 'Sin Jugar': 0, 'Comprar': 0 },
        byPlatform: {},
        averagePrice: 0,
      };
    }
  }

  // ===== MÉTODOS PRIVADOS =====

  /**
   * Validar datos de videojuego
   */
  private static validateGameData(data: GameInput): string[] {
    const errors: string[] = [];

    if (!data.title?.trim()) {
      errors.push('El título del videojuego es obligatorio');
    } else if (data.title.trim().length < 1) {
      errors.push('El título debe tener al menos 1 caracter');
    } else if (data.title.trim().length > 100) {
      errors.push('El título no puede tener más de 100 caracteres');
    }

    if (!data.platform) {
      errors.push('La plataforma es obligatoria');
    }

    if (!data.genre) {
      errors.push('El género es obligatorio');
    }

    if (!data.status) {
      errors.push('El estado es obligatorio');
    }

    if (data.price === undefined || data.price === null) {
      errors.push('El precio es obligatorio');
    } else if (data.price < 0) {
      errors.push('El precio no puede ser negativo');
    } else if (data.price > 9999) {
      errors.push('El precio no puede ser mayor a 9999');
    }

    if (data.description && data.description.length > 500) {
      errors.push('La descripción no puede tener más de 500 caracteres');
    }

    return errors;
  }

  /**
   * Limpiar datos de videojuego para crear
   */
  private static cleanGameData(data: GameInput): GameInput {
    return {
      title: data.title.trim(),
      platform: data.platform,
      genre: data.genre,
      status: data.status,
      price: Number(data.price),
      currency: data.currency || 'USD',
      description: data.description?.trim() || undefined,
      releaseDate: data.releaseDate || undefined,
      imageUrl: data.imageUrl?.trim() || undefined,
    };
  }

  /**
   * Limpiar datos de videojuego para actualizar
   */
  private static cleanGameUpdateData(data: GameUpdate): GameUpdate {
    const cleanData: GameUpdate = {};

    if (data.title !== undefined) {
      cleanData.title = data.title.trim();
    }
    if (data.platform !== undefined) {
      cleanData.platform = data.platform;
    }
    if (data.genre !== undefined) {
      cleanData.genre = data.genre;
    }
    if (data.status !== undefined) {
      cleanData.status = data.status;
    }
    if (data.price !== undefined) {
      cleanData.price = Number(data.price);
    }
    if (data.currency !== undefined) {
      cleanData.currency = data.currency;
    }
    if (data.description !== undefined) {
      cleanData.description = data.description?.trim() || undefined;
    }
    if (data.releaseDate !== undefined) {
      cleanData.releaseDate = data.releaseDate || undefined;
    }
    if (data.imageUrl !== undefined) {
      cleanData.imageUrl = data.imageUrl?.trim() || undefined;
    }
    if (data.isActive !== undefined) {
      cleanData.isActive = data.isActive;
    }

    return cleanData;
  }
}

// ===== FUNCIONES HELPER =====

/**
 * Formatear precio para mostrar
 */
export const formatPrice = (price: number, currency: Currency): string => {
  const symbols: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
    ARS: '$',
    CLP: '$',
    MXN: '$',
  };

  return `${symbols[currency] || '$'}${price.toFixed(2)}`;
};

/**
 * Obtener color del estado del juego
 */
export const getStatusColor = (status: GameStatus): string => {
  const colors: Record<GameStatus, string> = {
    'Jugado': 'text-green-400',
    'Sin Jugar': 'text-yellow-400',
    'Comprar': 'text-red-400',
  };
  return colors[status];
};

/**
 * Obtener color de fondo del estado del juego
 */
export const getStatusBgColor = (status: GameStatus): string => {
  const colors: Record<GameStatus, string> = {
    'Jugado': 'bg-green-400/20',
    'Sin Jugar': 'bg-yellow-400/20',
    'Comprar': 'bg-red-400/20',
  };
  return colors[status];
};

/**
 * Obtener color de la plataforma
 */
export const getPlatformColor = (platform: Platform): string => {
  const colors: Record<Platform, string> = {
    'Steam': 'text-blue-400',
    'Epic Games': 'text-gray-400',
    'Xbox Game Pass': 'text-green-400',
    'EA Play': 'text-orange-400',
    'Riot Games': 'text-red-400',
    'Ubisoft Connect': 'text-blue-500',
    'Battle.net': 'text-blue-600',
    'PlayStation Store': 'text-blue-700',
    'Nintendo eShop': 'text-red-500',
    'GOG': 'text-purple-400',
    'Origin': 'text-orange-500',
    'Otros': 'text-gray-500',
  };
  return colors[platform];
};

/**
 * Formatear fecha para mostrar
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'Fecha inválida';
  }
};

// Export por defecto
export default GameService;
