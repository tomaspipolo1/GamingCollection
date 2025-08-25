// ===== CONFIGURACIÓN BASE DE LA API =====

import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiResponse, ApiListResponse, ApiError } from '../types';

// Configuración base de Axios
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Crear instancia de Axios
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests
apiClient.interceptors.request.use(
  (config) => {
    // Agregar token de autenticación si existe (para futuras implementaciones)
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log de requests en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
apiClient.interceptors.response.use(
  (response) => {
    // Log de responses exitosas en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }
    
    return response;
  },
  (error: AxiosError<ApiError>) => {
    // Log de errores
    console.error('❌ API Error:', error.response?.data || error.message);
    
    // Manejo de errores específicos
    if (error.response?.status === 401) {
      // Token expirado o no autorizado
      localStorage.removeItem('authToken');
      // Redireccionar a login si existe
      // window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// ===== FUNCIONES HELPER =====

/**
 * Maneja errores de la API y extrae el mensaje
 */
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiError;
    
    if (apiError?.message) {
      return apiError.message;
    }
    
    if (apiError?.errors && apiError.errors.length > 0) {
      return apiError.errors.join(', ');
    }
    
    // Errores de red
    if (error.code === 'NETWORK_ERROR') {
      return 'Error de conexión. Verifica tu conexión a internet.';
    }
    
    if (error.code === 'ECONNABORTED') {
      return 'La solicitud tardó demasiado. Inténtalo de nuevo.';
    }
    
    // Errores HTTP estándar
    switch (error.response?.status) {
      case 400:
        return 'Datos inválidos. Verifica la información ingresada.';
      case 401:
        return 'No autorizado. Inicia sesión nuevamente.';
      case 403:
        return 'No tienes permisos para realizar esta acción.';
      case 404:
        return 'Recurso no encontrado.';
      case 409:
        return 'Conflicto. El recurso ya existe.';
      case 422:
        return 'Datos no válidos. Verifica los campos requeridos.';
      case 500:
        return 'Error interno del servidor. Inténtalo más tarde.';
      case 503:
        return 'Servicio no disponible. Inténtalo más tarde.';
      default:
        return error.response?.statusText || 'Error desconocido';
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'Error desconocido';
};

/**
 * Wrapper para hacer requests GET
 */
export const apiGet = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Wrapper para hacer requests POST
 */
export const apiPost = async <T, D = any>(url: string, data: D): Promise<T> => {
  try {
    const response = await apiClient.post<T>(url, data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Wrapper para hacer requests PUT
 */
export const apiPut = async <T, D = any>(url: string, data: D): Promise<T> => {
  try {
    const response = await apiClient.put<T>(url, data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Wrapper para hacer requests DELETE
 */
export const apiDelete = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.delete<T>(url);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// ===== UTILIDADES =====

/**
 * Construye query string desde un objeto
 */
export const buildQueryString = (params: Record<string, any>): string => {
  const filteredParams = Object.entries(params).filter(([_, value]) => 
    value !== undefined && value !== null && value !== ''
  );
  
  if (filteredParams.length === 0) return '';
  
  const searchParams = new URLSearchParams();
  filteredParams.forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });
  
  return `?${searchParams.toString()}`;
};

/**
 * Valida si la respuesta de la API es exitosa
 */
export const isApiSuccess = <T>(response: ApiResponse<T> | ApiError): response is ApiResponse<T> => {
  return response.success === true;
};

/**
 * Extrae datos de una respuesta de lista de la API
 */
export const extractListData = <T>(response: ApiListResponse<T>) => {
  return {
    data: response.data,
    count: response.count,
    pagination: response.pagination,
  };
};
