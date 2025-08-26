// ===== BUTTON GAMING COMPONENT =====

import React, { ButtonHTMLAttributes, ReactNode } from 'react';

// ===== TIPOS =====
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  glow?: boolean;
  children: ReactNode;
}

// ===== COMPONENTE BUTTON =====
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText = 'Cargando...',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  glow = false,
  disabled,
  className = '',
  children,
  ...props
}) => {
  // ===== CLASES BASE =====
  const baseClasses = [
    'btn-gaming',
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'font-semibold',
    'rounded-lg',
    'transition-all',
    'duration-300',
    'transform',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-gaming-highlight',
    'focus:ring-offset-2',
    'focus:ring-offset-gaming-dark',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:transform-none',
    'overflow-hidden',
  ].join(' ');

  // ===== VARIANTES =====
  const variantClasses = {
    primary: [
      'bg-gradient-to-r',
      'from-gaming-highlight',
      'to-gaming-success',
      'hover:from-gaming-success',
      'hover:to-gaming-highlight',
      'text-white',
      'shadow-gaming',
      'hover:shadow-gaming-lg',
      'hover:-translate-y-1',
    ].join(' '),
    
    secondary: [
      'bg-gaming-accent',
      'hover:bg-gaming-primary',
      'text-gaming-light',
      'border',
      'border-gaming-highlight',
      'hover:border-gaming-neon',
      'hover:-translate-y-1',
    ].join(' '),
    
    danger: [
      'bg-gradient-to-r',
      'from-gaming-danger',
      'to-red-600',
      'hover:from-red-600',
      'hover:to-gaming-danger',
      'text-white',
      'hover:-translate-y-1',
    ].join(' '),
    
    warning: [
      'bg-gradient-to-r',
      'from-gaming-warning',
      'to-yellow-600',
      'hover:from-yellow-600',
      'hover:to-gaming-warning',
      'text-white',
      'hover:-translate-y-1',
    ].join(' '),
    
    success: [
      'bg-gradient-to-r',
      'from-gaming-success',
      'to-green-600',
      'hover:from-green-600',
      'hover:to-gaming-success',
      'text-white',
      'hover:-translate-y-1',
    ].join(' '),
    
    ghost: [
      'bg-transparent',
      'text-gaming-highlight',
      'border',
      'border-gaming-highlight',
      'hover:bg-gaming-highlight',
      'hover:text-gaming-dark',
      'hover:-translate-y-1',
    ].join(' '),
  };

  // ===== TAMAÑOS =====
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  // ===== CLASES CONDICIONALES =====
  const conditionalClasses = [
    fullWidth && 'w-full',
    glow && 'animate-glow',
    loading && 'cursor-wait',
  ].filter(Boolean).join(' ');

  // ===== CLASES FINALES =====
  const finalClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    conditionalClasses,
    className,
  ].join(' ');

  // ===== CONTENIDO DEL BOTÓN =====
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <div className="loading-spinner mr-2" />
          {loadingText}
        </>
      );
    }

    return (
      <>
        {icon && iconPosition === 'left' && (
          <span className="mr-2 flex-shrink-0">{icon}</span>
        )}
        <span className="flex-1">{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="ml-2 flex-shrink-0">{icon}</span>
        )}
      </>
    );
  };

  return (
    <button
      className={finalClasses}
      disabled={disabled || loading}
      {...props}
    >
      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />
      
      {/* Contenido */}
      <div className="relative z-10 flex items-center justify-center">
        {renderContent()}
      </div>
    </button>
  );
};

export default Button;
