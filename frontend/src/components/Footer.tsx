// ===== FOOTER COMPONENT =====

import React from 'react';
import '../styles/layout/Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '🟦' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Azure', icon: '☁️' }
  ];

  return (
    <footer className="gaming-footer">
      <div className="footer-container">
        <div className="footer-content">
          
          {/* ===== LOGO Y INFO ===== */}
          <div className="footer-logo">
            <img 
              src="/images/logos/logo-joystick.png" 
              alt="Gaming Collection Logo" 
              className="footer-logo-icon"
            />
            <div>
              <h3 className="footer-logo-text">Gaming Collection</h3>
              <p className="footer-subtitle">Proyecto Académico ADR {currentYear}</p>
            </div>
          </div>

          {/* ===== TECH STACK ===== */}
          <div className="tech-stack">
            <p className="tech-title">Desarrollado con</p>
            <div className="tech-list">
              {techStack.map((tech, index) => (
                <div key={index} className="tech-item">
                  <span className="tech-icon">{tech.icon}</span>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ===== COPYRIGHT ===== */}
          <div>
            <p className="footer-copyright">
              © {currentYear} Gaming Collection - Full Stack Development
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
