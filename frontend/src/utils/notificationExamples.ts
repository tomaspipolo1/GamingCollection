// ===== EJEMPLOS DE USO DE NOTIFICACIONES GAMING =====

import NotificationService, { 
  showSuccessNotification, 
  showErrorNotification, 
  confirmDeleteItem 
} from '../services/notificationService';

// ===== EJEMPLOS PARA VIDEOJUEGOS =====

/**
 * Ejemplo: Crear videojuego exitosamente
 */
export const exampleGameCreated = () => {
  showSuccessNotification('create', 'Videojuego');
};

/**
 * Ejemplo: Error al crear videojuego
 */
export const exampleGameCreateError = () => {
  showErrorNotification('create', 'videojuego', 'El título ya existe en la base de datos');
};

/**
 * Ejemplo: Confirmar eliminación de videojuego
 */
export const exampleConfirmDeleteGame = async () => {
  const result = await confirmDeleteItem('videojuego', 'The Witcher 3: Wild Hunt');
  if (result.isConfirmed) {
    NotificationService.success('Videojuego eliminado', 'The Witcher 3 ha sido eliminado de tu colección');
  }
};

/**
 * Ejemplo: Eliminar permanentemente
 */
export const examplePermanentDelete = async () => {
  const result = await NotificationService.confirmPermanentDelete('The Witcher 3: Wild Hunt');
  if (result.isConfirmed) {
    NotificationService.success('Eliminado permanentemente', 'El videojuego ha sido eliminado para siempre');
  }
};

// ===== EJEMPLOS PARA GÉNEROS =====

/**
 * Ejemplo: Crear género exitosamente
 */
export const exampleGenreCreated = () => {
  showSuccessNotification('create', 'Género');
};

/**
 * Ejemplo: Error al actualizar género
 */
export const exampleGenreUpdateError = () => {
  showErrorNotification('update', 'género', 'Ya existe un género con ese nombre');
};

// ===== EJEMPLOS DE FORMULARIOS =====

/**
 * Ejemplo: Input para nombre de género
 */
export const exampleInputGenreName = async () => {
  const result = await NotificationService.input(
    'Nuevo Género',
    'text',
    'Ej: RPG, FPS, Estrategia...',
    'RPG'
  );
  
  if (result.isConfirmed && result.value) {
    NotificationService.success('Género creado', `El género "${result.value}" ha sido creado`);
  }
};

/**
 * Ejemplo: Seleccionar plataforma
 */
export const exampleSelectPlatform = async () => {
  const platforms = {
    'steam': 'Steam',
    'epic': 'Epic Games',
    'xbox': 'Xbox Game Pass',
    'playstation': 'PlayStation Store',
  };
  
  const result = await NotificationService.select(
    'Seleccionar Plataforma',
    platforms,
    'steam'
  );
  
  if (result.isConfirmed && result.value) {
    NotificationService.success('Plataforma seleccionada', `Has seleccionado ${platforms[result.value as keyof typeof platforms]}`);
  }
};

// ===== EJEMPLOS DE PROGRESO =====

/**
 * Ejemplo: Progreso de importación
 */
export const exampleProgress = () => {
  const steps = [
    'Validando archivo',
    'Procesando datos',
    'Creando videojuegos',
    'Finalizando importación'
  ];
  
  let currentStep = 0;
  
  const updateProgress = () => {
    NotificationService.progress('Importando videojuegos', steps, currentStep);
    currentStep++;
    
    if (currentStep <= steps.length) {
      setTimeout(updateProgress, 1500);
    } else {
      NotificationService.close();
      NotificationService.success('Importación completada', '25 videojuegos han sido importados exitosamente');
    }
  };
  
  updateProgress();
};

// ===== EJEMPLOS DE ESTADÍSTICAS =====

/**
 * Ejemplo: Mostrar estadísticas de la colección
 */
export const exampleStats = () => {
  const stats = [
    { label: 'Total de juegos', value: 127, icon: '🎮' },
    { label: 'Juegos completados', value: 45, icon: '✅' },
    { label: 'Pendientes de jugar', value: 67, icon: '⏳' },
    { label: 'Por comprar', value: 15, icon: '🛒' },
    { label: 'Valor total', value: '$2,450.99', icon: '💰' },
    { label: 'Género favorito', value: 'RPG', icon: '⚔️' }
  ];
  
  NotificationService.stats('Estadísticas de tu colección', stats);
};

// ===== EJEMPLOS DE TOAST =====

/**
 * Ejemplo: Toasts de diferentes tipos
 */
export const exampleToasts = () => {
  setTimeout(() => NotificationService.toast('success', '🎉 Juego agregado'), 500);
  setTimeout(() => NotificationService.toast('info', 'ℹ️ Actualización disponible'), 1500);
  setTimeout(() => NotificationService.toast('warning', '⚠️ Pocos juegos pendientes'), 2500);
};

// ===== EJEMPLOS DE CARGA =====

/**
 * Ejemplo: Pantalla de carga
 */
export const exampleLoading = () => {
  NotificationService.loading('Sincronizando datos', 'Esto puede tomar unos segundos...');
  
  // Simular proceso
  setTimeout(() => {
    NotificationService.close();
    NotificationService.success('Sincronización completada', 'Todos los datos están actualizados');
  }, 3000);
};

// ===== FUNCIÓN PARA DEMOSTRAR TODAS LAS NOTIFICACIONES =====

/**
 * Demostración de todas las notificaciones gaming
 */
export const demonstrateAllNotifications = async () => {
  // Notificación de bienvenida
  await NotificationService.info(
    'Demo de Notificaciones Gaming',
    'Verás ejemplos de todas las notificaciones disponibles'
  );
  
  // Éxito
  await NotificationService.success('¡Operación exitosa!', 'Todo funcionó perfectamente');
  
  // Error
  await NotificationService.error('Error encontrado', 'Algo salió mal, pero ya lo arreglaremos');
  
  // Advertencia
  await NotificationService.warning('Advertencia importante', 'Presta atención a este mensaje');
  
  // Confirmación
  const confirmResult = await NotificationService.confirm(
    '¿Continuar con la demo?',
    'Esto mostrará más ejemplos',
    '🚀 Continuar',
    '❌ Cancelar'
  );
  
  if (confirmResult.isConfirmed) {
    // Input
    const inputResult = await NotificationService.input(
      'Nombre de tu juego favorito',
      'text',
      'Ej: The Witcher 3'
    );
    
    if (inputResult.isConfirmed && inputResult.value) {
      // Estadísticas
      exampleStats();
    }
  }
};

// Export de funciones principales
export {
  NotificationService,
  showSuccessNotification,
  showErrorNotification,
  confirmDeleteItem
};
