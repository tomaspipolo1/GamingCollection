// ===== HEADER COMPONENT =====

import React, { useState } from 'react';
import '../styles/layout/Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="gaming-header">
      <div className="header-container">
        <div className="header-content">
          
          {/* ===== LOGO (IZQUIERDA) ===== */}
          <div className="logo-section">
            <span className="logo-icon">🎮</span>
            <h1 className="logo-text">Gaming Collection</h1>
          </div>

          {/* ===== NAVEGACIÓN DESKTOP ===== */}
          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-list">
              <li><a href="#" className="nav-link" onClick={closeMenu}>Home</a></li>
              <li><a href="#" className="nav-link" onClick={closeMenu}>Juegos</a></li>
              <li><a href="#" className="nav-link" onClick={closeMenu}>Géneros</a></li>
              <li><a href="#" className="nav-link" onClick={closeMenu}>Rating</a></li>
            </ul>
          </nav>

          {/* ===== ÁREA DERECHA (HAMBURGUESA MÓVIL) ===== */}
          <div className="header-right">
            <button 
              className="hamburger-btn"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
