// ===== INPUT GAMING COMPONENT =====

import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

// ===== TIPOS =====
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  fullWidth?: boolean;
  loading?: boolean;
}

// ===== COMPONENTE INPUT =====
const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  size = 'md',
  variant = 'default',
  fullWidth = true,
  loading = false,
  disabled,
  className = '',
  ...props
}, ref) => {
  
  // ===== DETERMINAR VARIANTE AUTOMÁTICAMENTE =====
  const currentVariant = error ? 'error' : variant;

  // ===== CLASES BASE DEL INPUT =====
  const baseInputClasses = [
    'input-gaming',
    'block',
    'bg-gaming-secondary',
    'border-2',
    'rounded-lg',
    'text-gaming-light',
    'placeholder-gray-400',
    'transition-all',
    'duration-300',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-gaming-highlight/20',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ].join(' ');

  // ===== VARIANTES DE BORDE =====
  const variantClasses = {
    default: [
      'border-gaming-accent',
      'focus:border-gaming-highlight',
      'hover:border-gaming-highlight/60',
    ].join(' '),
    
    success: [
      'border-gaming-success',
      'focus:border-gaming-success',
      'focus:ring-gaming-success/20',
    ].join(' '),
    
    warning: [
      'border-gaming-warning',
      'focus:border-gaming-warning',
      'focus:ring-gaming-warning/20',
    ].join(' '),
    
    error: [
      'border-gaming-danger',
      'focus:border-gaming-danger',
      'focus:ring-gaming-danger/20',
    ].join(' '),
  };

  // ===== TAMAÑOS =====
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  // ===== CLASES CONDICIONALES =====
  const conditionalClasses = [
    fullWidth && 'w-full',
    leftIcon && 'pl-10',
    rightIcon && 'pr-10',
    loading && 'pr-10',
  ].filter(Boolean).join(' ');

  // ===== CLASES FINALES DEL INPUT =====
  const finalInputClasses = [
    baseInputClasses,
    variantClasses[currentVariant],
    sizeClasses[size],
    conditionalClasses,
    className,
  ].join(' ');

  // ===== CLASES DEL CONTAINER =====
  const containerClasses = [
    'relative',
    fullWidth && 'w-full',
  ].filter(Boolean).join(' ');

  // ===== CLASES DEL LABEL =====
  const labelClasses = [
    'label-gaming',
    'block',
    'text-sm',
    'font-semibold',
    'text-gaming-light',
    'mb-2',
    error && 'text-gaming-danger',
  ].filter(Boolean).join(' ');

  // ===== CLASES DE LOS ICONOS =====
  const iconClasses = 'absolute top-1/2 transform -translate-y-1/2 text-gray-400';
  const leftIconClasses = `${iconClasses} left-3`;
  const rightIconClasses = `${iconClasses} right-3`;

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <label className={labelClasses}>
          {label}
          {props.required && <span className="text-gaming-danger ml-1">*</span>}
        </label>
      )}

      {/* Container del input con iconos */}
      <div className="relative">
        {/* Icono izquierdo */}
        {leftIcon && (
          <div className={leftIconClasses}>
            {leftIcon}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          className={finalInputClasses}
          disabled={disabled || loading}
          {...props}
        />

        {/* Icono derecho */}
        {rightIcon && !loading && (
          <div className={rightIconClasses}>
            {rightIcon}
          </div>
        )}

        {/* Spinner de carga */}
        {loading && (
          <div className={rightIconClasses}>
            <div className="loading-spinner" />
          </div>
        )}

        {/* Efecto de brillo en focus */}
        <div className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300 opacity-0 focus-within:opacity-100 bg-gradient-to-r from-transparent via-gaming-highlight/5 to-transparent" />
      </div>

      {/* Texto de ayuda */}
      {hint && !error && (
        <p className="mt-2 text-sm text-gray-400">
          {hint}
        </p>
      )}

      {/* Mensaje de error */}
      {error && (
        <p className="mt-2 text-sm text-gaming-danger font-medium flex items-center">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
