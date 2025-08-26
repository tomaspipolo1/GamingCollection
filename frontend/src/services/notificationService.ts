// ===== SERVICIO DE NOTIFICACIONES GAMING =====

import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

// ===== CONFIGURACIÓN TEMÁTICA GAMING =====
const gamingTheme = {
  // Colores principales
  background: '#1a1a2e',
  color: '#eee2dc',
  confirmButtonColor: '#16a085',
  cancelButtonColor: '#e74c3c',
  denyButtonColor: '#f39c12',
  
  // Estilos personalizados
  customClass: {
    container: 'swal-gaming-container',
    popup: 'swal-gaming-popup',
    header: 'swal-gaming-header',
    title: 'swal-gaming-title',
    closeButton: 'swal-gaming-close',
    icon: 'swal-gaming-icon',
    image: 'swal-gaming-image',
    content: 'swal-gaming-content',
    htmlContainer: 'swal-gaming-html',
    input: 'swal-gaming-input',
    inputLabel: 'swal-gaming-input-label',
    validationMessage: 'swal-gaming-validation',
    actions: 'swal-gaming-actions',
    confirmButton: 'swal-gaming-confirm',
    denyButton: 'swal-gaming-deny',
    cancelButton: 'swal-gaming-cancel',
    loader: 'swal-gaming-loader',
    footer: 'swal-gaming-footer',
  },
  
  // Efectos y animaciones
  showClass: {
    popup: 'animate__animated animate__fadeInDown animate__faster',
    backdrop: 'animate__animated animate__fadeIn animate__faster'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp animate__faster',
    backdrop: 'animate__animated animate__fadeOut animate__faster'
  }
};

// ===== CLASE DE NOTIFICACIONES =====
export class NotificationService {
  
  /**
   * Mostrar notificación de éxito
   */
  static success(title: string, text?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'success',
      title: `🎉 ${title}`,
      text: text,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      ...gamingTheme,
    });
  }

  /**
   * Mostrar notificación de error
   */
  static error(title: string, text?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'error',
      title: `❌ ${title}`,
      text: text,
      confirmButtonText: 'Entendido',
      ...gamingTheme,
    });
  }

  /**
   * Mostrar notificación de advertencia
   */
  static warning(title: string, text?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'warning',
      title: `⚠️ ${title}`,
      text: text,
      confirmButtonText: 'Entendido',
      ...gamingTheme,
    });
  }

  /**
   * Mostrar notificación de información
   */
  static info(title: string, text?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'info',
      title: `ℹ️ ${title}`,
      text: text,
      confirmButtonText: 'Entendido',
      ...gamingTheme,
    });
  }

  /**
   * Mostrar confirmación de eliminación
   */
  static confirmDelete(itemName: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title: '🗑️ ¿Eliminar elemento?',
      html: `¿Estás seguro de que quieres eliminar <strong>${itemName}</strong>?<br><small class="text-gray-400">Esta acción se puede deshacer.</small>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '🗑️ Sí, eliminar',
      cancelButtonText: '❌ Cancelar',
      reverseButtons: true,
      focusCancel: true,
      ...gamingTheme,
    });
  }

  /**
   * Mostrar confirmación de eliminación permanente
   */
  static confirmPermanentDelete(itemName: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title: '💀 ¿Eliminar permanentemente?',
      html: `¿Estás seguro de que quieres eliminar <strong>${itemName}</strong> permanentemente?<br><small class="text-red-400">⚠️ Esta acción NO se puede deshacer.</small>`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: '💀 Sí, eliminar permanentemente',
      cancelButtonText: '❌ Cancelar',
      reverseButtons: true,
      focusCancel: true,
      ...gamingTheme,
    });
  }

  /**
   * Mostrar confirmación genérica
   */
  static confirm(
    title: string, 
    text?: string, 
    confirmText: string = 'Confirmar',
    cancelText: string = 'Cancelar'
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title: `❓ ${title}`,
      text: text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true,
      ...gamingTheme,
    });
  }

  /**
   * Mostrar cargando
   */
  static loading(title: string = 'Cargando...', text?: string): void {
    Swal.fire({
      title: `⏳ ${title}`,
      text: text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      ...gamingTheme,
    });
  }

  /**
   * Cerrar cualquier notificación activa
   */
  static close(): void {
    Swal.close();
  }

  /**
   * Mostrar formulario de input
   */
  static input(
    title: string,
    inputType: 'text' | 'email' | 'password' | 'number' | 'textarea' = 'text',
    placeholder?: string,
    defaultValue?: string
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title: `✏️ ${title}`,
      input: inputType,
      inputPlaceholder: placeholder,
      inputValue: defaultValue,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Este campo es obligatorio';
        }
        return null;
      },
      ...gamingTheme,
    });
  }

  /**
   * Mostrar selección de opciones
   */
  static select(
    title: string,
    options: Record<string, string>,
    defaultValue?: string
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title: `📋 ${title}`,
      input: 'select',
      inputOptions: options,
      inputValue: defaultValue,
      showCancelButton: true,
      confirmButtonText: 'Seleccionar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes seleccionar una opción';
        }
        return null;
      },
      ...gamingTheme,
    });
  }

  /**
   * Mostrar progreso
   */
  static progress(title: string, steps: string[], currentStep: number): void {
    const progressBar = Math.round((currentStep / steps.length) * 100);
    const stepsList = steps.map((step, index) => {
      const icon = index < currentStep ? '✅' : index === currentStep ? '⏳' : '⭕';
      return `${icon} ${step}`;
    }).join('<br>');

    Swal.fire({
      title: `🎮 ${title}`,
      html: `
        <div class="progress-container">
          <div class="progress-bar bg-gaming-accent rounded-full h-2 mb-4">
            <div class="progress-fill bg-gaming-highlight h-2 rounded-full transition-all duration-300" style="width: ${progressBar}%"></div>
          </div>
          <div class="steps-list text-left">${stepsList}</div>
        </div>
      `,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      ...gamingTheme,
    });
  }

  /**
   * Mostrar toast simple
   */
  static toast(
    icon: SweetAlertIcon,
    title: string,
    position: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' = 'top-end'
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      icon,
      title,
      toast: true,
      position,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
      ...gamingTheme,
    });
  }

  /**
   * Mostrar estadísticas gaming
   */
  static stats(title: string, stats: Array<{label: string, value: string | number, icon?: string}>): Promise<SweetAlertResult> {
    const statsHtml = stats.map(stat => `
      <div class="stat-item flex justify-between items-center py-2 px-4 bg-gaming-accent/30 rounded-lg mb-2">
        <span class="stat-label">${stat.icon || '📊'} ${stat.label}</span>
        <span class="stat-value font-bold text-gaming-highlight">${stat.value}</span>
      </div>
    `).join('');

    return Swal.fire({
      title: `📈 ${title}`,
      html: `<div class="stats-container">${statsHtml}</div>`,
      confirmButtonText: 'Cerrar',
      width: '500px',
      ...gamingTheme,
    });
  }
}

// ===== FUNCIONES DE CONVENIENCIA =====

/**
 * Mostrar notificación de éxito para operaciones CRUD
 */
export const showSuccessNotification = (operation: string, item: string): Promise<SweetAlertResult> => {
  const messages = {
    create: `${item} creado exitosamente`,
    update: `${item} actualizado exitosamente`,
    delete: `${item} eliminado exitosamente`,
    restore: `${item} restaurado exitosamente`,
  };
  
  return NotificationService.success(
    messages[operation as keyof typeof messages] || `Operación exitosa`,
    `La operación se completó correctamente.`
  );
};

/**
 * Mostrar notificación de error para operaciones CRUD
 */
export const showErrorNotification = (operation: string, item: string, error?: string): Promise<SweetAlertResult> => {
  const messages = {
    create: `Error al crear ${item}`,
    update: `Error al actualizar ${item}`,
    delete: `Error al eliminar ${item}`,
    fetch: `Error al cargar ${item}`,
  };
  
  return NotificationService.error(
    messages[operation as keyof typeof messages] || `Error en operación`,
    error || 'Ha ocurrido un error inesperado. Inténtalo de nuevo.'
  );
};

/**
 * Confirmar eliminación con nombre específico
 */
export const confirmDeleteItem = (itemType: string, itemName: string): Promise<SweetAlertResult> => {
  return NotificationService.confirmDelete(`${itemType}: ${itemName}`);
};

// Export por defecto
export default NotificationService;
