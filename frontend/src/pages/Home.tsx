// ===== HOME PAGE =====

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/Home.css';

const Home: React.FC = () => {

  return (
    <div className="home-container">
      {/* ===== HEADER ===== */}
      <Header />
      
      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <div className="home-content">
        
        {/* ===== HERO SECTION ===== */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-icon">🎮</div>
            <h1 className="hero-title">
              Bienvenido a <span className="highlight">Gaming Collection</span>
            </h1>
            <p className="hero-subtitle">
              Tu plataforma definitiva para gestionar tu colección de videojuegos
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">
                <span className="btn-icon">🎯</span>
                Explorar Juegos
              </button>
              <button className="btn-secondary">
                <span className="btn-icon">➕</span>
                Agregar Juego
              </button>
            </div>
          </div>
        </div>

        {/* ===== STATS SECTION (ENTRE HERO Y FEATURES) ===== */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Juegos Registrados</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Géneros</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Completados</div>
            </div>
          </div>
        </div>

        {/* ===== FEATURES SECTION ===== */}
        <div className="features-section">
          <h2 className="features-title">¿Qué puedes hacer?</h2>
          <div className="features-grid">
            
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3 className="feature-title">Gestionar Colección</h3>
              <p className="feature-description">
                Organiza todos tus videojuegos en un solo lugar
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏷️</div>
              <h3 className="feature-title">Categorizar por Géneros</h3>
              <p className="feature-description">
                Clasifica tus juegos por género para encontrarlos fácilmente
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3 className="feature-title">Sistema de Rating</h3>
              <p className="feature-description">
                Califica y revisa tus juegos favoritos
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Seguimiento de Progreso</h3>
              <p className="feature-description">
                Mantén un registro de tu progreso en cada juego
              </p>
            </div>

          </div>
        </div>

      </div>

                {/* ===== FOOTER ===== */}
          <Footer />
    </div>
  );
};

export default Home;
