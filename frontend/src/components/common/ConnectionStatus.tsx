// ===== CONNECTION STATUS COMPONENT =====

import React, { useState, useEffect } from 'react';
import { healthService } from '../../services/healthService';
import '../../styles/components/ConnectionStatus.css';

const ConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [backendInfo, setBackendInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkConnection();
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkConnection = async () => {
    try {
      setLoading(true);
      const [pingResult, apiStatus] = await Promise.all([
        healthService.ping(),
        healthService.checkApiStatus()
      ]);
      
      setIsConnected(pingResult && apiStatus.isConnected);
      setBackendInfo(apiStatus);
      
      if (pingResult && apiStatus.isConnected) {
        console.log('🟢 Backend conectado exitosamente');
      } else {
        console.log('🔴 Backend no disponible');
      }
    } catch (error) {
      console.error('Error checking connection:', error);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = () => {
    if (loading) return '🔄';
    return isConnected ? '🟢' : '🔴';
  };

  const getStatusText = () => {
    if (loading) return 'Verificando...';
    return isConnected ? 'API Conectada' : 'API Desconectada';
  };

  const getStatusClass = () => {
    if (loading) return 'loading';
    return isConnected ? 'connected' : 'disconnected';
  };

  return (
    <div className={`connection-status ${getStatusClass()}`}>
      <div className="status-indicator">
        <span className="status-icon">{getStatusIcon()}</span>
        <span className="status-text">{getStatusText()}</span>
      </div>
      

    </div>
  );
};

export default ConnectionStatus;
