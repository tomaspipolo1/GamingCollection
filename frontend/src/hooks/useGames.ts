// ===== GAMES HOOK =====

import { useState, useEffect, useCallback } from 'react';
import { Game, GamesResponse, GameFilters } from '../types';
import { gameService } from '../services/gameService';

const GAMES_PER_PAGE = 12;

export const useGames = () => {
  // State
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters and pagination
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Sin Jugar' | 'Jugado' | 'Comprar'>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalGames, setTotalGames] = useState<number>(0);

  // Debounced search
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset to first page when status filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  // Fetch games
  const fetchGames = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const filters: GameFilters = {
        page: currentPage,
        limit: GAMES_PER_PAGE,
        search: debouncedSearchTerm || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        sort: 'createdAt'
      };

      // Fetch from API
      console.log('🔄 Conectando con API...');
      console.log('📍 URL de la API:', process.env.REACT_APP_API_URL || 'http://localhost:5000/api');
      console.log('🔍 Filtros aplicados:', filters);
      
      const response: GamesResponse = await gameService.getGames(filters);
      console.log('✅ API conectada exitosamente:', response);
      
      // Adaptar la respuesta del backend al formato del frontend
      const games = response.data || response.games || [];
      const totalGames = response.pagination?.total || response.totalGames || 0;
      const totalPages = response.pagination?.pages || response.totalPages || 1;
      
      console.log('🎮 Juegos recibidos:', games);
      console.log('📊 Total de juegos:', totalGames);
      console.log('📄 Total de páginas:', totalPages);
      
      setGames(games);
      setTotalPages(totalPages);
      setTotalGames(totalGames);
      
    } catch (err: any) {
      console.error('❌ Error fetching games:', err);
      console.error('🔍 Detalles del error:', err.message, err.response?.data);
      setError(`Error al cargar los juegos: ${err.message}`);
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearchTerm, statusFilter]);

  // Load games on component mount and when dependencies change
  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  // Delete game
  const deleteGame = useCallback(async (gameId: string): Promise<boolean> => {
    try {
      setError(null);
      
      console.log(`🗑️ Eliminando juego ${gameId} via API...`);
      await gameService.deleteGame(gameId);
      console.log('✅ Juego eliminado exitosamente via API');
      
      // Refresh games list after deletion
      await fetchGames();
      
      return true;
    } catch (err) {
      console.error('Error deleting game:', err);
      setError('Error al eliminar el juego. Por favor, intenta nuevamente.');
      return false;
    }
  }, [fetchGames]);

  // Refresh games (manual reload)
  const refreshGames = useCallback(() => {
    fetchGames();
  }, [fetchGames]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setCurrentPage(1);
  }, []);

  return {
    // Data
    games: games || [],
    loading,
    error,
    totalGames,
    
    // Pagination
    currentPage,
    totalPages,
    setCurrentPage,
    
    // Search
    searchTerm,
    setSearchTerm,
    
    // Status Filter
    statusFilter,
    setStatusFilter,
    
    // Actions
    deleteGame,
    refreshGames,
    resetFilters,
    
    // Utils
    isEmpty: (!games || games.length === 0) && !loading,
    hasGames: games && games.length > 0
  };
};
