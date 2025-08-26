// ===== GAMES HOOK =====

import { useState, useEffect, useCallback } from 'react';
import { Game, GamesResponse, GameFilters } from '../types';
import { gameService } from '../services/gameService';

const GAMES_PER_PAGE = 10;

export const useGames = () => {
  // State
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters and pagination
  const [searchTerm, setSearchTerm] = useState<string>('');
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

  // Fetch games
  const fetchGames = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const filters: GameFilters = {
        page: currentPage,
        limit: GAMES_PER_PAGE,
        search: debouncedSearchTerm || undefined,
        sort: 'createdAt'
      };

      // Fetch from API
      console.log('🔄 Conectando con API...');
      const response: GamesResponse = await gameService.getGames(filters);
      console.log('✅ API conectada exitosamente:', response);
      
      setGames(response.games || []);
      setTotalPages(response.totalPages || 1);
      setTotalGames(response.totalGames || 0);
      
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Error al cargar los juegos. Por favor, intenta nuevamente.');
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearchTerm]);

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
    
    // Actions
    deleteGame,
    refreshGames,
    resetFilters,
    
    // Utils
    isEmpty: (!games || games.length === 0) && !loading,
    hasGames: games && games.length > 0
  };
};
