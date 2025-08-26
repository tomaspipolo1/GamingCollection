// ===== MAIN LAYOUT =====

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ScrollToTop } from '../components/common';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      {/* ===== GLOBAL HEADER ===== */}
      <Header />
      
      {/* ===== MAIN CONTENT AREA ===== */}
      <main className="main-content">
        {children}
      </main>
      
      {/* ===== GLOBAL FOOTER ===== */}
      <Footer />
      
      {/* ===== GLOBAL COMPONENTS ===== */}
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
