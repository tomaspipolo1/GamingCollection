// ===== LAYOUT PRINCIPAL GAMING =====

import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

// ===== TIPOS =====
interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  className?: string;
}

// ===== COMPONENTE LAYOUT PRINCIPAL =====
const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showFooter = true,
  className = '' 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ===== TOGGLE MENÚ MÓVIL =====
  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // ===== CERRAR MENÚ MÓVIL AL HACER CLICK FUERA =====
  const handleContentClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gaming-gradient">
      {/* ===== EFECTOS DE FONDO GAMING ===== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradiente de partículas */}
        <div className="absolute inset-0 bg-gradient-to-br from-gaming-primary/20 via-transparent to-gaming-secondary/20" />
        
        {/* Partículas flotantes */}
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-gaming-neon/20 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-gaming-purple/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-gaming-highlight/20 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
        <div className="absolute top-2/3 right-1/6 w-1 h-1 bg-gaming-warning/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-0.5 h-0.5 bg-gaming-success/30 rounded-full animate-bounce" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-gaming-blue/20 rounded-full animate-ping" style={{ animationDelay: '5s' }} />
        
        {/* Líneas de circuito sutiles */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gaming-highlight/10 to-transparent opacity-50" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-gaming-purple/10 to-transparent opacity-30" />
        <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-gaming-neon/10 to-transparent opacity-40" />
        <div className="absolute left-0 bottom-1/4 w-full h-px bg-gradient-to-r from-transparent via-gaming-accent/15 to-transparent opacity-30" />
      </div>

      {/* ===== HEADER ===== */}
      <Header 
        onMenuToggle={handleMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <main 
        className={`flex-1 relative z-10 ${className}`}
        onClick={handleContentClick}
      >
        {/* Overlay para cerrar menú móvil */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        {/* Contenido de la página */}
        <div className="relative z-40">
          {children}
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      {showFooter && <Footer />}

      {/* ===== SCROLL TO TOP BUTTON ===== */}
      <ScrollToTopButton />
    </div>
  );
};

// ===== COMPONENTE SCROLL TO TOP =====
const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // ===== MOSTRAR/OCULTAR BOTÓN SEGÚN SCROLL =====
  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // ===== SCROLL TO TOP =====
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-br from-gaming-highlight to-gaming-success text-white rounded-full shadow-gaming-lg hover:shadow-gaming hover:-translate-y-1 transition-all duration-300 group"
      aria-label="Scroll to top"
    >
      <svg 
        className="w-6 h-6 mx-auto group-hover:scale-110 transition-transform duration-200" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
      
      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-full" />
    </button>
  );
};

export default Layout;
