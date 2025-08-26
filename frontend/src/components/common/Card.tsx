// ===== CARD GAMING COMPONENT =====

import React, { HTMLAttributes, ReactNode } from 'react';

// ===== TIPOS =====
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  glow?: boolean;
  interactive?: boolean;
  loading?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

// ===== COMPONENTE CARD =====
const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  rounded = 'lg',
  hover = false,
  glow = false,
  interactive = false,
  loading = false,
  header,
  footer,
  className = '',
  children,
  ...props
}) => {
  
  // ===== CLASES BASE =====
  const baseClasses = [
    'card-gaming',
    'relative',
    'overflow-hidden',
    'transition-all',
    'duration-300',
  ].join(' ');

  // ===== VARIANTES =====
  const variantClasses = {
    default: [
      'bg-gradient-to-br',
      'from-gaming-accent',
      'to-gaming-primary',
      'border',
      'border-gaming-highlight/20',
    ].join(' '),
    
    elevated: [
      'bg-gradient-to-br',
      'from-gaming-accent',
      'to-gaming-primary',
      'border',
      'border-gaming-highlight/20',
      'shadow-gaming',
    ].join(' '),
    
    bordered: [
      'bg-gaming-secondary/50',
      'border-2',
      'border-gaming-highlight',
      'backdrop-blur-sm',
    ].join(' '),
    
    glass: [
      'bg-gaming-secondary/30',
      'border',
      'border-gaming-highlight/30',
      'backdrop-blur-md',
    ].join(' '),
  };

  // ===== PADDING =====
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  // ===== BORDER RADIUS =====
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  // ===== CLASES CONDICIONALES =====
  const conditionalClasses = [
    hover && 'hover:shadow-gaming-lg hover:-translate-y-1',
    glow && 'animate-glow',
    interactive && 'cursor-pointer hover:border-gaming-highlight/40',
    loading && 'pointer-events-none',
  ].filter(Boolean).join(' ');

  // ===== CLASES FINALES =====
  const finalClasses = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    roundedClasses[rounded],
    conditionalClasses,
    className,
  ].join(' ');

  // ===== RENDERIZAR HEADER =====
  const renderHeader = () => {
    if (!header) return null;

    return (
      <div className="card-header pb-4 mb-4 border-b border-gaming-highlight/20">
        {header}
      </div>
    );
  };

  // ===== RENDERIZAR FOOTER =====
  const renderFooter = () => {
    if (!footer) return null;

    return (
      <div className="card-footer pt-4 mt-4 border-t border-gaming-highlight/20">
        {footer}
      </div>
    );
  };

  // ===== RENDERIZAR LOADING =====
  const renderLoadingOverlay = () => {
    if (!loading) return null;

    return (
      <div className="absolute inset-0 bg-gaming-dark/50 backdrop-blur-sm flex items-center justify-center z-20">
        <div className="flex flex-col items-center space-y-3">
          <div className="loading-spinner w-8 h-8" />
          <span className="text-gaming-light text-sm">Cargando...</span>
        </div>
      </div>
    );
  };

  return (
    <div className={finalClasses} {...props}>
      {/* Efecto de partículas de fondo */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-4 left-4 w-2 h-2 bg-gaming-neon rounded-full animate-pulse" />
        <div className="absolute top-8 right-6 w-1 h-1 bg-gaming-highlight rounded-full animate-ping" />
        <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-gaming-purple rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gaming-highlight/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />

      {/* Contenido principal */}
      <div className="relative z-10">
        {renderHeader()}
        
        <div className="card-content">
          {children}
        </div>
        
        {renderFooter()}
      </div>

      {/* Overlay de carga */}
      {renderLoadingOverlay()}
    </div>
  );
};

// ===== COMPONENTES AUXILIARES =====

// Card Header separado
export const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`flex items-center justify-between ${className}`}>
    {children}
  </div>
);

// Card Title
export const CardTitle: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <h3 className={`heading-3 text-gaming-light ${className}`}>
    {children}
  </h3>
);

// Card Description
export const CardDescription: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <p className={`text-gray-400 text-sm ${className}`}>
    {children}
  </p>
);

// Card Actions
export const CardActions: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    {children}
  </div>
);

export default Card;
