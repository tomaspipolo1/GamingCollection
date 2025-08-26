// ===== HEADER GAMING COMPONENT =====

import React from 'react';
import { useLocation } from 'react-router-dom';

// ===== TIPOS =====
interface HeaderProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

// ===== COMPONENTE HEADER =====
const Header: React.FC<HeaderProps> = ({ 
  onMenuToggle,
  isMobileMenuOpen = false 
}) => {
  const location = useLocation();

  // ===== NAVEGACIÓN PRINCIPAL =====
  const mainNavigation = [
    { name: 'Inicio', href: '/', icon: '🏠' },
    { name: 'Listado de Juegos', href: '/games', icon: '🎮' },
    { name: 'Géneros', href: '/genres', icon: '🏷️' },
    { name: 'Rating', href: '/rating', icon: '⭐' },
  ];

  return (
    <header className="bg-gaming-secondary/80 border-b border-gaming-highlight/20 backdrop-blur-md sticky top-0 z-40 shadow-lg">
      <div className="container-gaming">
        <div className="flex items-center justify-between h-16">
          
          {/* ===== LOGO Y TÍTULO ===== */}
          <div className="flex items-center space-x-4">
            {/* Botón de menú móvil */}
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-lg text-gaming-light hover:bg-gaming-accent/50 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gaming-highlight to-gaming-neon rounded-xl flex items-center justify-center shadow-gaming">
                <span className="text-xl">🎮</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gaming-light font-gaming">
                  Gaming Collection
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">Sistema Full Stack ADR</p>
              </div>
            </div>
          </div>

          {/* ===== NAVEGACIÓN DESKTOP ===== */}
          <nav className="hidden md:flex items-center space-x-2">
            {mainNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 group ${
                    isActive
                      ? 'bg-gaming-highlight/20 text-gaming-highlight border border-gaming-highlight/30 shadow-gaming'
                      : 'text-gaming-light hover:bg-gaming-accent/50 hover:text-gaming-highlight hover:scale-105'
                  }`}
                >
                  <span className="group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* ===== ESTADO DEL SISTEMA ===== */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 bg-gaming-accent/30 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-gaming-success rounded-full animate-pulse"></div>
              <span className="text-xs text-gaming-light font-medium">Sistema Online</span>
            </div>
          </div>


        </div>
      </div>

      {/* ===== MENÚ MÓVIL ===== */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gaming-highlight/20 bg-gaming-secondary/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-2">
            {mainNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 flex items-center space-x-3 ${
                    isActive
                      ? 'bg-gaming-highlight/20 text-gaming-highlight border border-gaming-highlight/30 shadow-gaming'
                      : 'text-gaming-light hover:bg-gaming-accent/50 hover:text-gaming-highlight'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              );
            })}
            
            {/* Status móvil */}
            <div className="pt-4 border-t border-gaming-accent/30 mt-4">
              <div className="flex items-center justify-center space-x-2 bg-gaming-accent/30 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-gaming-success rounded-full animate-pulse"></div>
                <span className="text-sm text-gaming-light font-medium">Sistema Online</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Efecto de partículas decorativas */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-2 left-1/4 w-1 h-1 bg-gaming-neon rounded-full animate-ping" />
        <div className="absolute top-4 right-1/3 w-0.5 h-0.5 bg-gaming-purple rounded-full animate-pulse" />
        <div className="absolute bottom-2 left-1/2 w-0.5 h-0.5 bg-gaming-highlight rounded-full animate-bounce" />
      </div>
    </header>
  );
};

export default Header;
