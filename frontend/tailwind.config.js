/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores gaming
        gaming: {
          primary: '#0f3460',    // Azul oscuro principal
          secondary: '#1a1a2e',  // Negro azulado
          accent: '#16213e',     // Azul medio
          highlight: '#16a085',  // Verde cyan
          warning: '#f39c12',    // Naranja
          danger: '#e74c3c',     // Rojo
          success: '#27ae60',    // Verde
          dark: '#0f0f23',       // Negro profundo
          light: '#eee2dc',      // Blanco cremoso
          purple: '#533483',     // Púrpura gaming
          neon: '#00ff88',       // Verde neón
          blue: '#3498db',       // Azul brillante
        }
      },
      fontFamily: {
        gaming: ['Orbitron', 'monospace'],
        body: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        glow: {
          'from': { 
            boxShadow: '0 0 5px #16a085, 0 0 10px #16a085, 0 0 15px #16a085',
          },
          'to': { 
            boxShadow: '0 0 10px #16a085, 0 0 20px #16a085, 0 0 30px #16a085',
          },
        },
        slideUp: {
          'from': { 
            opacity: '0', 
            transform: 'translateY(30px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        slideDown: {
          'from': { 
            opacity: '0', 
            transform: 'translateY(-30px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
      },
      backgroundImage: {
        'gaming-gradient': 'linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)',
        'card-gradient': 'linear-gradient(145deg, #16213e 0%, #0f3460 100%)',
        'button-gradient': 'linear-gradient(45deg, #16a085 0%, #27ae60 100%)',
      },
      boxShadow: {
        'gaming': '0 4px 15px rgba(22, 160, 133, 0.4)',
        'gaming-lg': '0 10px 30px rgba(22, 160, 133, 0.3)',
        'dark': '0 4px 15px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
