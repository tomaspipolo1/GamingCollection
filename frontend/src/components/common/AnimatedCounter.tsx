// ===== ANIMATED COUNTER COMPONENT =====

import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  target, 
  duration = 2000,
  className = ''
}) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Si el target es 0, no animar
    if (target === 0) {
      setCurrent(0);
      return;
    }

    // Configuración de la animación
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    // Función de easing (ease-out)
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Aplicar easing
      const easedProgress = easeOut(progress);
      
      // Calcular valor actual
      const currentValue = Math.floor(easedProgress * target);
      setCurrent(currentValue);

      // Continuar animación si no hemos terminado
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Asegurar que terminamos en el valor exacto
        setCurrent(target);
      }
    };

    // Pequeño delay para efecto staggered
    const delay = Math.random() * 300;
    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, duration]);

  return (
    <span className={className}>
      {current.toLocaleString()}
    </span>
  );
};

export default AnimatedCounter;
