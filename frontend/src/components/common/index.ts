// ===== ÍNDICE DE COMPONENTES COMUNES =====
// Exportación centralizada de todos los componentes comunes

// ===== COMPONENTES PRINCIPALES =====
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Select } from './Select';
export { default as Card, CardHeader, CardTitle, CardDescription, CardActions } from './Card';
export { default as Modal } from './Modal';
export { default as Loading, ButtonLoading, InputLoading, PageLoading } from './Loading';

// ===== TIPOS =====
export type { ButtonProps } from './Button';
export type { InputProps } from './Input';
export type { SelectProps, SelectOption } from './Select';
export type { CardProps } from './Card';
export type { ModalProps } from './Modal';
export type { LoadingProps } from './Loading';

// ===== RE-EXPORTS ÚTILES =====
// Para facilitar importaciones desde otros archivos
export * from './Button';
export * from './Input';
export * from './Select';
export * from './Card';
export * from './Modal';
export * from './Loading';
