// ===== HEALTH SERVICE =====

import axios from 'axios';

// API Base URL for health checks
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

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
  
  // Check if backend is running
  async checkHealth(): Promise<HealthStatus> {
    try {
      const response = await healthApi.get('/health');
      return {
        status: 'OK',
        timestamp: response.data.timestamp,
        uptime: response.data.uptime
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

  // Check API status and get info
  async checkApiStatus(): Promise<ApiStatus> {
    try {
      const response = await healthApi.get('/');
      return {
        isConnected: true,
        version: response.data.version,
        message: response.data.message,
        description: response.data.description,
        endpoints: response.data.endpoints
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
      await healthApi.get('/health', { timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }

};
