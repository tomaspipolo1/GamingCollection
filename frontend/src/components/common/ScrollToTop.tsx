// ===== SCROLL TO TOP COMPONENT =====

import React, { useState, useEffect } from 'react';
import '../../styles/components/ScrollToTop.css';

// ===== TIPOS =====
interface ScrollToTopProps {
  className?: string;
  showAfter?: number; // Pixels después de los cuales aparece
  smoothBehavior?: boolean;
}

// ===== COMPONENTE SCROLL TO TOP =====
const ScrollToTop: React.FC<ScrollToTopProps> = ({ 
  className = '',
  showAfter = 300,
  smoothBehavior = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // ===== DETECTAR SCROLL =====
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfter);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfter]);

  // ===== FUNCIÓN SCROLL TO TOP =====
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: smoothBehavior ? 'smooth' : 'auto'
    });
  };

  // ===== RENDER CONDICIONAL =====
  if (!isVisible) return null;

  return (
    <button 
      className={`scroll-to-top-btn ${className}`}
      onClick={scrollToTop}
      aria-label="Volver arriba"
      title="Volver arriba"
    >
      <span className="scroll-icon">↑</span>
    </button>
  );
};

export default ScrollToTop;
