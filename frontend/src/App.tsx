import React from 'react';
import Home from './pages/Home';
import { ScrollToTop } from './components/common';

function App() {
  return (
    <div className="bg-gaming-gradient">
      <Home />
      <ScrollToTop />
    </div>
  );
}

export default App;
