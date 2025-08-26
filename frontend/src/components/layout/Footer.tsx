// ===== FOOTER GAMING COMPONENT =====

import React from 'react';

// ===== TIPOS =====
interface FooterProps {
  className?: string;
}

// ===== COMPONENTE FOOTER =====
const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  // ===== ENLACES RÁPIDOS =====
  const quickLinks = [
    { name: 'Dashboard', href: '/' },
    { name: 'Mi Colección', href: '/games' },
    { name: 'Géneros', href: '/genres' },
    { name: 'Estadísticas', href: '/stats' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: '#', icon: '🐙' },
    { name: 'Discord', href: '#', icon: '💬' },
    { name: 'Steam', href: '#', icon: '🎮' },
    { name: 'Twitch', href: '#', icon: '📺' },
  ];

  const gameStats = {
    totalGames: 247,
    totalHours: 1420,
    achievements: 89,
    platforms: 6
  };

  return (
    <footer className={`bg-gaming-secondary/50 border-t border-gaming-highlight/20 backdrop-blur-sm ${className}`}>
      <div className="container-gaming py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* ===== INFO DEL PROYECTO ===== */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-gaming-highlight to-gaming-neon rounded-lg flex items-center justify-center">
              <span className="text-sm">🎮</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gaming-light">Gaming Collection</p>
              <p className="text-xs text-gray-400">Proyecto Académico ADR {currentYear}</p>
            </div>
          </div>

          {/* ===== TECNOLOGÍAS EN LÍNEA ===== */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <span className="text-blue-400">⚛️</span>
              <span>React</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <span className="text-blue-400">🟦</span>
              <span>TypeScript</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <span className="text-green-400">🟢</span>
              <span>Node.js</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <span className="text-green-400">🍃</span>
              <span>MongoDB</span>
            </div>
          </div>

          {/* ===== STATUS Y COPYRIGHT ===== */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gaming-success rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Online</span>
            </div>
            <span className="text-xs text-gray-500">v1.0.0</span>
          </div>
        </div>
      </div>

      {/* ===== EFECTOS DECORATIVOS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Partículas flotantes */}
        <div className="absolute bottom-10 left-10 w-1 h-1 bg-gaming-neon/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-16 left-1/4 w-0.5 h-0.5 bg-gaming-purple/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-12 right-1/3 w-1.5 h-1.5 bg-gaming-highlight/40 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-8 right-10 w-1 h-1 bg-gaming-warning/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
        
        {/* Gradiente sutil en el borde */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gaming-highlight/50 to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;
