// ===== LOADING GAMING COMPONENT =====

import React from 'react';

// ===== TIPOS =====
export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'gaming';
  text?: string;
  overlay?: boolean;
  fullScreen?: boolean;
  className?: string;
}

// ===== COMPONENTE LOADING =====
const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'gaming',
  text,
  overlay = false,
  fullScreen = false,
  className = '',
}) => {
  
  // ===== TAMAÑOS =====
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  // ===== CLASES DE CONTENEDOR =====
  const containerClasses = [
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'space-y-3',
    fullScreen && 'fixed inset-0 z-50',
    overlay && !fullScreen && 'absolute inset-0 z-10',
    (overlay || fullScreen) && 'bg-gaming-dark/80 backdrop-blur-sm',
    className,
  ].filter(Boolean).join(' ');

  // ===== SPINNER BÁSICO =====
  const renderSpinner = () => (
    <div className={`loading-spinner ${sizeClasses[size]}`} />
  );

  // ===== DOTS ANIMADOS =====
  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`bg-gaming-highlight rounded-full animate-bounce ${
            size === 'sm' ? 'w-2 h-2' : 
            size === 'md' ? 'w-3 h-3' : 
            size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'
          }`}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );

  // ===== PULSE ANIMADO =====
  const renderPulse = () => (
    <div className={`bg-gaming-highlight rounded-full animate-ping ${sizeClasses[size]}`} />
  );

  // ===== BARRAS ANIMADAS =====
  const renderBars = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`bg-gaming-highlight animate-pulse ${
            size === 'sm' ? 'w-1' : 
            size === 'md' ? 'w-2' : 
            size === 'lg' ? 'w-3' : 'w-4'
          }`}
          style={{
            height: `${Math.random() * 20 + 10}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );

  // ===== LOADING GAMING AVANZADO =====
  const renderGaming = () => {
    const circleSize = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-20 h-20',
    };

    return (
      <div className="relative">
        {/* Círculo exterior */}
        <div className={`${circleSize[size]} relative`}>
          {/* Anillo giratorio */}
          <div className="absolute inset-0 border-4 border-gaming-accent border-t-gaming-highlight rounded-full animate-spin" />
          
          {/* Anillo interior */}
          <div className="absolute inset-2 border-2 border-gaming-primary border-b-gaming-neon rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          
          {/* Centro con icono gaming */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-8 h-8'} text-gaming-highlight animate-pulse`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Partículas orbitales */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="absolute -top-1 left-1/2 w-2 h-2 bg-gaming-neon rounded-full transform -translate-x-1/2" />
          <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 bg-gaming-purple rounded-full transform -translate-y-1/2" />
          <div className="absolute -bottom-1 left-1/2 w-1 h-1 bg-gaming-warning rounded-full transform -translate-x-1/2" />
          <div className="absolute top-1/2 -left-1 w-1.5 h-1.5 bg-gaming-success rounded-full transform -translate-y-1/2" />
        </div>
      </div>
    );
  };

  // ===== RENDERIZAR VARIANTE =====
  const renderVariant = () => {
    switch (variant) {
      case 'spinner': return renderSpinner();
      case 'dots': return renderDots();
      case 'pulse': return renderPulse();
      case 'bars': return renderBars();
      case 'gaming': return renderGaming();
      default: return renderGaming();
    }
  };

  return (
    <div className={containerClasses}>
      {/* Indicador de carga */}
      <div className="flex items-center justify-center">
        {renderVariant()}
      </div>

      {/* Texto */}
      {text && (
        <div className="text-center">
          <p className="text-gaming-light font-medium">
            {text}
          </p>
          <div className="flex justify-center mt-1">
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-gaming-highlight rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Efecto de fondo para overlay */}
      {(overlay || fullScreen) && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gaming-neon/30 rounded-full animate-ping" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-gaming-purple/30 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gaming-highlight/30 rounded-full animate-bounce" />
        </div>
      )}
    </div>
  );
};

// ===== COMPONENTES AUXILIARES =====

// Loading para botones
export const ButtonLoading: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'sm' }) => (
  <div className={`loading-spinner ${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`} />
);

// Loading para inputs
export const InputLoading: React.FC = () => (
  <div className="loading-spinner w-5 h-5" />
);

// Loading de página completa
export const PageLoading: React.FC<{ text?: string }> = ({ text = 'Cargando aplicación...' }) => (
  <Loading 
    variant="gaming" 
    size="xl" 
    text={text} 
    fullScreen 
  />
);

export default Loading;
