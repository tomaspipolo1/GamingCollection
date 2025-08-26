// ===== GENRES HOOK =====

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Genre } from '../types';
import { genreService } from '../services/genreService';

const GENRES_PER_PAGE = 10;

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'true' | 'false'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGenres, setTotalGenres] = useState(0);

  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const fetchGenres = useCallback(async (isRefresh = false) => {
    try {
      console.log('🔄 useGenres: Iniciando fetchGenres...');
      console.log('📋 Parámetros:', { currentPage, debouncedSearch, isRefresh });
      
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const res = await genreService.getGenres({
        search: debouncedSearch || undefined,
        active: statusFilter === 'all' ? undefined : statusFilter === 'true',
        page: currentPage,
        limit: GENRES_PER_PAGE,
        sort: 'createdAt',
      });

      console.log('📥 useGenres: Respuesta del servicio:', res);
      
      // Compatibilidad con ambas estructuras (backend viejo y nuevo)
      const genres = res.genres || res.data || [];
      const totalGenres = res.totalGenres || res.count || 0;
      const totalPages = res.totalPages || 1;
      
      console.log('🎯 Géneros recibidos:', genres);
      console.log('📊 Total de géneros:', totalGenres);
      console.log('📄 Total de páginas:', totalPages);

      setGenres(genres);
      setTotalGenres(totalGenres);
      setTotalPages(totalPages);
    } catch (e) {
      console.error('❌ useGenres: Error fetching genres', e);
      setError('Error al cargar los géneros.');
      setGenres([]);
      setTotalGenres(0);
      setTotalPages(1);
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, [currentPage, debouncedSearch, statusFilter]);

  useEffect(() => { fetchGenres(); }, [fetchGenres]);

  const deleteGenre = useCallback(async (id: string) => {
    await genreService.deleteGenre(id);
    await fetchGenres();
  }, [fetchGenres]);

  const paginatedGenres = useMemo(() => genres, [genres]);

  return {
    genres: paginatedGenres,
    loading,
    error,
    refreshing,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    totalGenres,
    deleteGenre,
    fetchGenres, // Exportar la función de refresh
  };
};


