// ===== APP ROUTES =====

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Games from '../pages/Games';
// Import future pages here
import Genres from '../pages/Genres';
// import Rating from '../pages/Rating';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* ===== HOME ROUTE ===== */}
      <Route path="/" element={<Home />} />
      
      {/* ===== GAMES ROUTES ===== */}
      <Route path="/games" element={<Games />} />
      
      {/* ===== FUTURE ROUTES ===== */}
      <Route path="/genres" element={<Genres />} />
      {/* <Route path="/rating" element={<Rating />} /> */}
      
      {/* ===== GAMES CRUD ROUTES (for future implementation) ===== */}
      {/* <Route path="/games/add" element={<AddGame />} /> */}
      {/* <Route path="/games/edit/:id" element={<EditGame />} /> */}
      {/* <Route path="/games/:id" element={<GameDetail />} /> */}
      
      {/* ===== GENRES CRUD ROUTES (for future implementation) ===== */}
      {/* <Route path="/genres/add" element={<AddGenre />} /> */}
      {/* <Route path="/genres/edit/:id" element={<EditGenre />} /> */}
      
      {/* ===== FALLBACK ROUTES ===== */}
      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
