// ===== TIPOS TYPESCRIPT PARA GAMING COLLECTION =====

// ===== TIPOS DE GÉNERO =====
export interface Genre {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GenreInput {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface GenreUpdate {
  name?: string;
  description?: string;
  isActive?: boolean;
}

// ===== TIPOS DE VIDEOJUEGO =====
export interface Game {
  _id: string;
  title: string;
  platform: Platform;
  genre: Genre;
  status: GameStatus;
  price: number;
  currency: Currency;
  description?: string;
  releaseDate?: string;
  image?: string;
  imageUrl?: string; // URL completa para mostrar la imagen
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  formattedPrice: string;
  hasImage?: boolean;
  defaultIcon?: string; // Icono por defecto (🎮)
}

export interface GameInput {
  title: string;
  platform: Platform;
  genre: string; // ID del género
  status: GameStatus;
  price: number;
  currency?: Currency;
  description?: string;
  releaseDate?: string;
  image?: string;
}

export interface GameUpdate {
  title?: string;
  platform?: Platform;
  genre?: string;
  status?: GameStatus;
  price?: number;
  currency?: Currency;
  description?: string;
  releaseDate?: string;
  image?: string;
  isActive?: boolean;
}

// ===== ENUMS =====
export type Platform = 
  | 'Steam'
  | 'Epic Games'
  | 'Xbox Game Pass'
  | 'EA Play'
  | 'Riot Games'
  | 'Ubisoft Connect'
  | 'Battle.net'
  | 'PlayStation Store'
  | 'Nintendo eShop'
  | 'GOG'
  | 'Origin'
  | 'Otros';

export type GameStatus = 
  | 'Jugado'
  | 'Sin Jugar'
  | 'Comprar';

export type Currency = 
  | 'USD'
  | 'EUR'
  | 'ARS'
  | 'CLP'
  | 'MXN';

// ===== TIPOS DE RESPUESTA DE LA API =====
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiListResponse<T> extends ApiResponse<T[]> {
  count: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
  errors?: string[];
}

// ===== TIPOS DE FILTROS =====
export interface GameFilters {
  platform?: Platform;
  status?: GameStatus;
  genre?: string;
  search?: string;
  active?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GenreFilters {
  search?: string;
  active?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
}

// ===== TIPOS DE FORMULARIOS =====
export interface GameFormData {
  title: string;
  platform: Platform;
  genre: string;
  status: GameStatus;
  price: number;
  currency: Currency;
  description?: string;
  releaseDate?: string;
  image?: File; // Archivo de imagen para upload
}

// ===== TIPOS DE RESPUESTA API =====
export interface GamesResponse {
  // Estructura nueva del backend
  games?: Game[];
  totalGames?: number;
  totalPages?: number;
  currentPage?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  
  // Estructura actual del backend (para compatibilidad)
  data?: Game[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  
  // Campos comunes
  success: boolean;
  message: string;
}

export interface GenresResponse {
  // Estructura nueva del backend
  genres?: Genre[];
  totalGenres?: number;
  totalPages?: number;
  currentPage?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  
  // Estructura antigua del backend (para compatibilidad)
  data?: Genre[];
  count?: number;
  
  // Campos comunes
  success: boolean;
  message: string;
}

// ===== TIPOS PARA VALIDACIÓN =====
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface LoadingState {
  [key: string]: boolean;
}

// ===== TIPOS PARA HOOKS =====
export interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseApiListResult<T> extends UseApiResult<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ===== TIPOS PARA NAVEGACIÓN =====
export interface RouteParams {
  id?: string;
}

// ===== TIPOS PARA NOTIFICACIONES =====
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

// ===== CONSTANTES =====
export const PLATFORMS: Platform[] = [
  'Steam',
  'Epic Games',
  'Xbox Game Pass',
  'EA Play',
  'Riot Games',
  'Ubisoft Connect',
  'Battle.net',
  'PlayStation Store',
  'Nintendo eShop',
  'GOG',
  'Origin',
  'Otros'
];

export const GAME_STATUSES: GameStatus[] = [
  'Sin Jugar',
  'Jugado',
  'Comprar'
];

export const CURRENCIES: Currency[] = [
  'USD',
  'EUR',
  'ARS',
  'CLP',
  'MXN'
];

// ===== MAPAS DE ICONOS Y COLORES =====
export const PLATFORM_COLORS: Record<Platform, string> = {
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
  'Otros': 'text-gray-500'
};

export const STATUS_COLORS: Record<GameStatus, string> = {
  'Jugado': 'text-green-400',
  'Sin Jugar': 'text-yellow-400',
  'Comprar': 'text-red-400'
};

export const STATUS_BG_COLORS: Record<GameStatus, string> = {
  'Jugado': 'bg-green-400/20',
  'Sin Jugar': 'bg-yellow-400/20',
  'Comprar': 'bg-red-400/20'
};
