// ===== HOME STATS HOOK =====

import { useState, useEffect } from 'react';
import { gameService } from '../services/gameService';
import { genreService } from '../services/genreService';

interface HomeStats {
  totalGames: number;
  totalGenres: number;
  completedGames: number;
}

export const useHomeStats = () => {
  const [stats, setStats] = useState<HomeStats>({
    totalGames: 0,
    totalGenres: 0,
    completedGames: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch todas las estadísticas en paralelo
        const [gamesResponse, genresResponse, completedGamesResponse] = await Promise.all([
          // Total de juegos (sin filtros para obtener todos)
          gameService.getGames({ limit: 1 }), // Solo necesitamos el total, no los datos
          
          // Total de géneros activos
          genreService.getGenres({ active: true, limit: 1 }),
          
          // Juegos completados (status = "Jugado")
          gameService.getGames({ status: 'Jugado', limit: 1 })
        ]);

        // Extraer los totales de cada respuesta
        const totalGames = gamesResponse.pagination?.total || gamesResponse.totalGames || 0;
        const totalGenres = genresResponse.totalGenres || genresResponse.count || 0;
        const completedGames = completedGamesResponse.pagination?.total || completedGamesResponse.totalGames || 0;

        console.log('📊 Stats obtenidas:', { totalGames, totalGenres, completedGames });

        setStats({
          totalGames,
          totalGenres,
          completedGames
        });

      } catch (err: any) {
        console.error('❌ Error fetching home stats:', err);
        setError('Error al cargar las estadísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error
  };
};
