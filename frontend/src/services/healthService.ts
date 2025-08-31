// ===== HEALTH SERVICE =====

import axios from 'axios';

// API Base URL for health checks (usa el proxy /api de Nginx)
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '/api';

// Create axios instance for health checks
const healthApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 seconds timeout for health checks
});

export interface HealthStatus {
  status: 'OK' | 'ERROR';
  timestamp: string;
  uptime?: number;
  message?: string;
}

export interface ApiStatus {
  isConnected: boolean;
  version?: string;
  message?: string;
  endpoints?: any;
  description?: string;
}

export const healthService = {
  
  // Check if backend is running (usa un endpoint existente bajo /api)
  async checkHealth(): Promise<HealthStatus> {
    try {
      // Un GET ligero a /games confirma conectividad con el backend
      await healthApi.get('/games', { params: { limit: 1, page: 1 } });
      return {
        status: 'OK',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Health check failed:', error);
      return {
        status: 'ERROR',
        timestamp: new Date().toISOString(),
        message: 'Backend no disponible'
      };
    }
  },

  // Check API status (también usando un endpoint válido bajo /api)
  async checkApiStatus(): Promise<ApiStatus> {
    try {
      await healthApi.get('/games', { params: { limit: 1, page: 1 } });
      return {
        isConnected: true,
        message: 'OK'
      };
    } catch (error) {
      console.error('API status check failed:', error);
      return {
        isConnected: false,
        message: 'No se pudo conectar con el backend'
      };
    }
  },

  // Simple ping test
  async ping(): Promise<boolean> {
    try {
      await healthApi.get('/games', { params: { limit: 1, page: 1 }, timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }

};
