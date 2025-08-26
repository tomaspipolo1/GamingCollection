// ===== MODAL GAMING COMPONENT =====

import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

// ===== TIPOS =====
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'default' | 'danger' | 'success' | 'warning';
  closeable?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

// ===== COMPONENTE MODAL =====
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  variant = 'default',
  closeable = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  header,
  footer,
  children,
  className = '',
}) => {
  
  // ===== EFECTOS =====
  useEffect(() => {
    // Cerrar con ESC
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape && closeable) {
        onClose();
      }
    };

    // Prevenir scroll del body cuando el modal está abierto
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, closeable, onClose]);

  // ===== CLASES BASE =====
  const overlayClasses = [
    'fixed',
    'inset-0',
    'bg-black/80',
    'backdrop-blur-sm',
    'z-50',
    'flex',
    'items-center',
    'justify-center',
    'p-4',
    'animate-fadeIn',
  ].join(' ');

  // ===== TAMAÑOS =====
  const sizeClasses = {
    sm: 'max-w-sm w-full',
    md: 'max-w-md w-full',
    lg: 'max-w-lg w-full',
    xl: 'max-w-2xl w-full',
    full: 'max-w-4xl w-full h-full max-h-[90vh]',
  };

  // ===== VARIANTES =====
  const variantClasses = {
    default: 'border-gaming-highlight',
    danger: 'border-gaming-danger',
    success: 'border-gaming-success',
    warning: 'border-gaming-warning',
  };

  // ===== CLASES DEL MODAL =====
  const modalClasses = [
    'bg-gradient-to-br',
    'from-gaming-accent',
    'to-gaming-primary',
    'border-2',
    variantClasses[variant],
    'rounded-xl',
    'shadow-gaming-lg',
    'backdrop-blur-sm',
    'animate-slideUp',
    'max-h-[90vh]',
    'overflow-hidden',
    'flex',
    'flex-col',
    sizeClasses[size],
    className,
  ].join(' ');

  // ===== HANDLERS =====
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdrop && closeable) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    if (closeable) {
      onClose();
    }
  };

  // ===== RENDERIZAR HEADER =====
  const renderHeader = () => {
    if (!title && !header && !showCloseButton) return null;

    return (
      <div className="flex items-center justify-between p-6 border-b border-gaming-highlight/20">
        <div className="flex items-center space-x-4">
          {/* Icono del variant */}
          <div className="flex-shrink-0">
            {variant === 'danger' && (
              <div className="w-8 h-8 bg-gaming-danger/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gaming-danger" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            {variant === 'success' && (
              <div className="w-8 h-8 bg-gaming-success/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gaming-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            {variant === 'warning' && (
              <div className="w-8 h-8 bg-gaming-warning/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gaming-warning" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            {variant === 'default' && (
              <div className="w-8 h-8 bg-gaming-highlight/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gaming-highlight" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          <div>
            {title && (
              <h2 className="text-xl font-bold text-gaming-light font-gaming">
                {title}
              </h2>
            )}
            {header}
          </div>
        </div>

        {/* Botón de cerrar */}
        {showCloseButton && closeable && (
          <button
            onClick={handleCloseClick}
            className="text-gray-400 hover:text-gaming-light transition-colors duration-200 p-1 rounded-lg hover:bg-gaming-highlight/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  };

  // ===== RENDERIZAR FOOTER =====
  const renderFooter = () => {
    if (!footer) return null;

    return (
      <div className="flex-shrink-0 p-6 border-t border-gaming-highlight/20 bg-gaming-secondary/20">
        {footer}
      </div>
    );
  };

  // ===== NO RENDERIZAR SI NO ESTÁ ABIERTO =====
  if (!isOpen) return null;

  // ===== RENDERIZAR MODAL =====
  return createPortal(
    <div className={overlayClasses} onClick={handleBackdropClick}>
      <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
        {/* Efecto de partículas */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-4 left-4 w-2 h-2 bg-gaming-neon rounded-full animate-pulse" />
          <div className="absolute top-8 right-6 w-1 h-1 bg-gaming-highlight rounded-full animate-ping" />
          <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-gaming-purple rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Header */}
        {renderHeader()}

        {/* Contenido */}
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {renderFooter()}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
