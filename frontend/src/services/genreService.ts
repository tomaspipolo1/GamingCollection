// ===== GENRE SERVICE =====

import axios from 'axios';
import { 
  Genre, 
  GenreInput, 
  GenreUpdate, 
  GenreFilters, 
  GenresResponse
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const genreService = {
  async getGenres(filters: GenreFilters = {}): Promise<GenresResponse> {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.active !== undefined) params.append('active', String(filters.active));
    if (filters.page) params.append('page', String(filters.page));
    if (filters.limit) params.append('limit', String(filters.limit));
    if (filters.sort) params.append('sort', filters.sort);

    console.log('📤 GenreService: Enviando GET a /genres');
    console.log('🔍 Filtros aplicados:', filters);
    console.log('🌐 URL completa:', `${API_BASE_URL}/genres?${params.toString()}`);

    const res = await api.get(`/genres?${params.toString()}`);
    console.log('📥 GenreService: Respuesta recibida:', res.data);
    return res.data;
  },

  async getGenreById(id: string): Promise<Genre> {
    const response = await api.get(`/genres/${id}`);
    return response.data;
  },

  async createGenre(genreData: GenreInput): Promise<Genre> {
    console.log('📤 GenreService: Enviando POST a /genres');
    console.log('📋 Datos enviados:', genreData);
    console.log('🌐 URL completa:', `${API_BASE_URL}/genres`);
    
    const response = await api.post('/genres', genreData);
    console.log('📥 GenreService: Respuesta recibida:', response.data);
    return response.data;
  },

  async updateGenre(id: string, genreData: GenreUpdate): Promise<Genre> {
    const response = await api.put(`/genres/${id}`, genreData);
    return response.data;
  },

  async deleteGenre(id: string): Promise<void> {
    await api.delete(`/genres/${id}`);
  },
};
