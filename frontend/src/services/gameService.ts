// ===== GAME SERVICE =====

import axios from 'axios';
import { Game, GamesResponse, GameInput, GameFilters } from '../types';

// API Base URL - adjust according to your backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for loading/error handling
api.interceptors.request.use(
  (config) => {
    // Add any global request configuration here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors here
    console.error('API Error:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Recurso no encontrado');
    } else if (error.response?.status === 500) {
      throw new Error('Error del servidor');
    } else if (error.code === 'NETWORK_ERROR') {
      throw new Error('Error de conexión');
    }
    
    throw error;
  }
);

export const gameService = {
  
  // Get all games with filters and pagination
  async getGames(filters: GameFilters = {}): Promise<GamesResponse> {
    try {
      const params = new URLSearchParams();
      
      if (filters.search) params.append('search', filters.search);
      if (filters.genre) params.append('genre', filters.genre);
      if (filters.platform) params.append('platform', filters.platform);
      if (filters.status) params.append('status', filters.status);
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

      const url = `/games?${params.toString()}`;
      console.log('🌐 GameService: Haciendo petición GET a:', url);
      console.log('🔗 URL completa:', `${API_BASE_URL}${url}`);
      
      const response = await api.get(url);
      console.log('📥 GameService: Respuesta recibida:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ GameService: Error fetching games:', error);
      console.error('🔍 GameService: Detalles del error:', error.message, error.response?.data);
      throw new Error(`Error al obtener los juegos: ${error.message}`);
    }
  },

  // Get single game by ID
  async getGameById(id: string): Promise<Game> {
    try {
      const response = await api.get(`/games/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching game:', error);
      throw new Error('Error al obtener el juego');
    }
  },

  // Create new game
  async createGame(gameData: GameInput): Promise<Game> {
    try {
      console.log('🎮 GameService: Creando juego:', gameData);
      const response = await api.post('/games', gameData);
      console.log('✅ GameService: Juego creado exitosamente:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ GameService: Error creando juego:', error);
      console.error('🔍 GameService: Detalles del error:', error.message, error.response?.data);
      throw error;
    }
  },

  // Update game
  async updateGame(id: string, gameData: Partial<GameInput>): Promise<Game> {
    try {
      const response = await api.put(`/games/${id}`, gameData);
      return response.data;
    } catch (error) {
      console.error('Error updating game:', error);
      throw new Error('Error al actualizar el juego');
    }
  },

  // Soft delete game
  async deleteGame(id: string): Promise<void> {
    try {
      console.log('🗑️ GameService: Eliminando juego (soft delete):', id);
      // Usar PATCH para soft delete en lugar de DELETE
      await api.patch(`/games/${id}/soft-delete`);
      console.log('✅ GameService: Juego eliminado exitosamente (soft delete)');
    } catch (error) {
      console.error('❌ GameService: Error eliminando juego:', error);
      throw new Error('Error al eliminar el juego');
    }
  },

  // Search games by title
  async searchGames(searchTerm: string): Promise<Game[]> {
    try {
      const response = await api.get(`/games/search/${encodeURIComponent(searchTerm)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching games:', error);
      throw new Error('Error al buscar juegos');
    }
  },

  // Get games by status
  async getGamesByStatus(status: string): Promise<Game[]> {
    try {
      const response = await api.get(`/games/by-status/${encodeURIComponent(status)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching games by status:', error);
      throw new Error('Error al obtener juegos por estado');
    }
  },

  // Get games by platform
  async getGamesByPlatform(platform: string): Promise<Game[]> {
    try {
      const response = await api.get(`/games/by-platform/${encodeURIComponent(platform)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching games by platform:', error);
      throw new Error('Error al obtener juegos por plataforma');
    }
  }

};