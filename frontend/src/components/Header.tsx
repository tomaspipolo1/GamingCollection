// ===== HEADER COMPONENT =====

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/layout/Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Check if current route is active
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="gaming-header">
      <div className="header-container">
        <div className="header-content">
          
          {/* ===== LOGO (IZQUIERDA) ===== */}
          <Link to="/" className="logo-section" onClick={closeMenu}>
            <img 
              src="/images/logos/logo-joystick.png" 
              alt="Gaming Collection Logo" 
              className="logo-icon"
            />
            <h1 className="logo-text">Gaming Collection</h1>
          </Link>

          {/* ===== NAVEGACIÓN DESKTOP ===== */}
          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-list">
              <li>
                <Link 
                  to="/" 
                  className={`nav-link ${isActiveRoute('/') ? 'active' : ''}`} 
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/games" 
                  className={`nav-link ${isActiveRoute('/games') ? 'active' : ''}`} 
                  onClick={closeMenu}
                >
                  Juegos
                </Link>
              </li>
              <li>
                <Link 
                  to="/genres" 
                  className={`nav-link ${isActiveRoute('/genres') ? 'active' : ''}`} 
                  onClick={closeMenu}
                >
                  Géneros
                </Link>
              </li>
              <li>
                <Link 
                  to="/rating" 
                  className={`nav-link ${isActiveRoute('/rating') ? 'active' : ''}`} 
                  onClick={closeMenu}
                >
                  Rating
                </Link>
              </li>
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
