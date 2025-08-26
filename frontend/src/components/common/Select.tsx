// ===== SELECT GAMING COMPONENT =====

import React, { SelectHTMLAttributes, ReactNode, forwardRef } from 'react';

// ===== TIPOS =====
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  fullWidth?: boolean;
  loading?: boolean;
  emptyMessage?: string;
}

// ===== COMPONENTE SELECT =====
const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  hint,
  options,
  placeholder = 'Selecciona una opción',
  size = 'md',
  variant = 'default',
  fullWidth = true,
  loading = false,
  emptyMessage = 'No hay opciones disponibles',
  disabled,
  className = '',
  ...props
}, ref) => {
  
  // ===== DETERMINAR VARIANTE AUTOMÁTICAMENTE =====
  const currentVariant = error ? 'error' : variant;

  // ===== CLASES BASE DEL SELECT =====
  const baseSelectClasses = [
    'select-gaming',
    'block',
    'bg-gaming-secondary',
    'border-2',
    'rounded-lg',
    'text-gaming-light',
    'transition-all',
    'duration-300',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-gaming-highlight/20',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'appearance-none',
    'cursor-pointer',
    'pr-10', // Espacio para el icono de dropdown
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
    loading && 'cursor-wait',
  ].filter(Boolean).join(' ');

  // ===== CLASES FINALES DEL SELECT =====
  const finalSelectClasses = [
    baseSelectClasses,
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

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <label className={labelClasses}>
          {label}
          {props.required && <span className="text-gaming-danger ml-1">*</span>}
        </label>
      )}

      {/* Container del select */}
      <div className="relative">
        {/* Select */}
        <select
          ref={ref}
          className={finalSelectClasses}
          disabled={disabled || loading}
          {...props}
        >
          {/* Placeholder option */}
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}

          {/* Opciones */}
          {options.length > 0 ? (
            options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="bg-gaming-secondary text-gaming-light"
              >
                {option.label}
              </option>
            ))
          ) : (
            <option disabled className="bg-gaming-secondary text-gray-400">
              {emptyMessage}
            </option>
          )}
        </select>

        {/* Icono de dropdown */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {loading ? (
            <div className="loading-spinner w-5 h-5" />
          ) : (
            <svg
              className="w-5 h-5 text-gray-400 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>

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

Select.displayName = 'Select';

export default Select;
