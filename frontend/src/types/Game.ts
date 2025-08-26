// ===== GAME TYPES =====

export interface Genre {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Game {
  _id: string;
  title: string;
  platform: string;
  genre: string | Genre; // Can be populated or just ID
  status: 'Jugado' | 'Sin Jugar' | 'Comprar';
  price: number;
  currency: 'USD' | 'EUR' | 'ARS';
  description?: string;
  releaseDate?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GameFormData {
  title: string;
  platform: string;
  genre: string;
  status: 'Jugado' | 'Sin Jugar' | 'Comprar';
  price: number;
  currency: 'USD' | 'EUR' | 'ARS';
  description?: string;
  releaseDate?: string;
  imageUrl?: string;
}

export interface GamesResponse {
  games: Game[];
  totalGames: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GameFilters {
  search?: string;
  genre?: string;
  platform?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
