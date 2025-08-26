# 🎮 ASSETS DINÁMICOS - SRC/ASSETS

Esta carpeta contiene assets que son **importados y optimizados** por Webpack.

## 📁 Estructura

```
src/assets/
├── icons/              # Iconos SVG para UI
├── images/             # Imágenes optimizadas
├── avatars/            # Avatares dinámicos
├── decorations/        # Elementos decorativos
└── sounds/             # Efectos de sonido
```

## 🚀 **Ventajas de SRC/ASSETS**

✅ **Optimización automática** por Webpack
✅ **Tree shaking** - Solo se incluyen assets usados
✅ **Compresión** automática en build
✅ **Hashing** para cache busting
✅ **Imports dinámicos** en componentes

## 📝 **Cómo usar**

### **Importación estática:**
```typescript
import logoIcon from '../assets/icons/controller.svg';
import heroImage from '../assets/images/hero-gaming.jpg';

// En el componente
<img src={logoIcon} alt="Controller" />
```

### **Importación dinámica:**
```typescript
import { useState, useEffect } from 'react';

const [icon, setIcon] = useState('');

useEffect(() => {
  import('../assets/icons/controller.svg')
    .then(module => setIcon(module.default));
}, []);
```

## 📂 **Especificaciones por Carpeta**

### **🎯 icons/**
- **Uso**: Iconos de UI importados en componentes
- **Formato**: SVG preferible
- **Tamaño**: 16x16, 24x24, 32x32px
- **Estilo**: Monocromático para theming

**Archivos sugeridos:**
- `controller.svg` - Icono principal gaming
- `plus.svg` - Agregar
- `edit.svg` - Editar
- `trash.svg` - Eliminar
- `search.svg` - Buscar
- `filter.svg` - Filtros
- `grid.svg` - Vista grilla
- `list.svg` - Vista lista

### **🖼️ images/**
- **Uso**: Imágenes optimizadas para componentes
- **Formato**: JPG, PNG, WebP
- **Optimización**: Automática por Webpack

**Archivos sugeridos:**
- `default-game-cover.jpg` - Portada por defecto
- `no-image-placeholder.svg` - Placeholder sin imagen

### **👤 avatars/**
- **Uso**: Avatares dinámicos para usuarios
- **Formato**: SVG, PNG
- **Tamaño**: 64x64, 128x128px

**Archivos sugeridos:**
- `default-gamer.svg` - Avatar por defecto
- `robot-avatar.svg` - Avatar robot

### **✨ decorations/**
- **Uso**: Elementos decorativos importados
- **Formato**: SVG, PNG
- **Transparencia**: Sí

**Archivos sugeridos:**
- `circuit-lines.svg` - Líneas de circuito
- `glow-effect.svg` - Efectos de brillo
- `particles.svg` - Partículas decorativas

### **🔊 sounds/**
- **Uso**: Efectos de sonido para interacciones
- **Formato**: MP3, WAV
- **Peso**: Máximo 50KB

**Archivos sugeridos:**
- `click.mp3` - Sonido de click
- `success.mp3` - Sonido de éxito
- `error.mp3` - Sonido de error

## 🎯 **Mejores Prácticas**

### **Naming Convention:**
- Usar **kebab-case**: `game-controller.svg`
- Ser **descriptivo**: `add-game-icon.svg`
- **Consistente**: Mismo formato para similar función

### **Optimización:**
- **SVG**: Optimizar con SVGO
- **Imágenes**: Usar formatos modernos (WebP)
- **Tamaño**: Mantener archivos pequeños

### **Organización:**
- **Una función por archivo**
- **Agrupar** por tipo de uso
- **Documentar** assets complejos

---

💡 **Tip**: Estos assets se optimizan automáticamente en el build. Los de `public/` permanecen tal como están.
