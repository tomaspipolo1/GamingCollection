# 🎮 ESTRUCTURA DE ASSETS - GAMING COLLECTION

Esta es la organización de todos los assets visuales y recursos multimedia del proyecto.

## 📁 Estructura de Carpetas

```
public/
├── images/
│   ├── backgrounds/         # Fondos grandes para SEO y metadatos
│   ├── logos/              # Logos para SEO y metadatos
│   └── platforms/          # Logos de plataformas (terceros)
├── favicon.ico            # Icono del navegador
├── manifest.json          # Configuración PWA
└── robots.txt             # SEO

```

## 🔄 **ASSETS MOVIDOS A SRC/ASSETS**

Los siguientes assets ahora están en `src/assets/` para optimización automática:

```
src/assets/
├── icons/                 # Iconos SVG pequeños (importados)
├── images/               # Imágenes optimizadas por Webpack
├── avatars/              # Avatares dinámicos
├── decorations/          # Elementos decorativos importados
└── sounds/               # Efectos de sonido
```

## 🖼️ Especificaciones por Carpeta

### 📂 **images/backgrounds/**
Fondos para diferentes secciones de la aplicación.

**Archivos sugeridos:**
- `hero-gaming.jpg/png` - Fondo principal de la página de inicio
- `login-bg.jpg/png` - Fondo de la página de login
- `dashboard-bg.jpg/png` - Fondo sutil para el dashboard
- `particles-overlay.png` - Overlay de partículas gaming
- `grid-pattern.svg` - Patrón de rejilla para fondos

**Especificaciones:**
- Resolución: 1920x1080 mínimo
- Formato: JPG para fotos, PNG para transparencias
- Peso: Máximo 500KB por imagen
- Estilo: Futurista, gaming, colores oscuros con acentos neón

### 📂 **images/logos/**
Logos del proyecto y elementos de branding.

**Archivos sugeridos:**
- `gaming-collection-logo.svg` - Logo principal SVG
- `gaming-collection-logo.png` - Logo principal PNG
- `gaming-collection-text.svg` - Solo texto del logo
- `gaming-collection-icon.svg` - Solo icono sin texto
- `logo-white.svg` - Versión blanca para fondos oscuros
- `logo-dark.svg` - Versión oscura para fondos claros

**Especificaciones:**
- Formato: SVG preferible, PNG como respaldo
- Resoluciones PNG: 256x256, 512x512, 1024x1024
- Estilo: Gaming, tecnológico, memorable

### 📂 **images/icons/**
Iconos para la interfaz de usuario.

**Archivos sugeridos:**
- `game-controller.svg` - Icono de mando/joystick
- `trophy.svg` - Icono de logros/completado
- `shopping-cart.svg` - Icono de compras
- `bookmark.svg` - Icono de guardado/wishlist
- `star.svg` - Icono de calificación
- `heart.svg` - Icono de favoritos
- `search.svg` - Icono de búsqueda
- `filter.svg` - Icono de filtros
- `grid.svg` - Icono de vista en grilla
- `list.svg` - Icono de vista en lista
- `plus.svg` - Icono de agregar
- `edit.svg` - Icono de editar
- `trash.svg` - Icono de eliminar
- `settings.svg` - Icono de configuración
- `user.svg` - Icono de usuario
- `stats.svg` - Icono de estadísticas

**Especificaciones:**
- Formato: SVG
- Tamaño: 24x24px base
- Estilo: Line art o filled, consistente
- Colores: Preparados para ser cambiados via CSS

### 📂 **images/platforms/**
Logos de las plataformas gaming.

**Archivos sugeridos:**
- `steam.svg/png` - Logo de Steam
- `epic-games.svg/png` - Logo de Epic Games
- `xbox-game-pass.svg/png` - Logo de Xbox Game Pass
- `ea-play.svg/png` - Logo de EA Play
- `riot-games.svg/png` - Logo de Riot Games
- `ubisoft-connect.svg/png` - Logo de Ubisoft Connect
- `battlenet.svg/png` - Logo de Battle.net
- `playstation-store.svg/png` - Logo de PlayStation Store
- `nintendo-eshop.svg/png` - Logo de Nintendo eShop
- `gog.svg/png` - Logo de GOG
- `origin.svg/png` - Logo de Origin

**Especificaciones:**
- Formato: SVG preferible, PNG como respaldo
- Tamaño: 64x64px, 128x128px
- Calidad: Oficial o alta calidad
- Licencia: Verificar uso permitido

### 📂 **images/genres/**
Iconos representativos de géneros de videojuegos.

**Archivos sugeridos:**
- `rpg.svg` - Icono de RPG (espada, escudo)
- `fps.svg` - Icono de FPS (mira telescópica)
- `strategy.svg` - Icono de estrategia (tablero, piezas)
- `adventure.svg` - Icono de aventura (mapa, brújula)
- `racing.svg` - Icono de carreras (auto, pista)
- `sports.svg` - Icono de deportes (pelota)
- `puzzle.svg` - Icono de puzzle (pieza de rompecabezas)
- `horror.svg` - Icono de terror (fantasma, calavera)
- `simulation.svg` - Icono de simulación (engranajes)
- `platformer.svg` - Icono de plataformas (saltando)

**Especificaciones:**
- Formato: SVG
- Tamaño: 48x48px base
- Estilo: Gaming, reconocible, simple
- Colores: Monocromático para facilitar theming

### 📂 **images/avatars/**
Avatares por defecto para usuarios o placeholders.

**Archivos sugeridos:**
- `default-gamer.svg` - Avatar por defecto
- `avatar-placeholder.svg` - Placeholder de avatar
- `robot-avatar.svg` - Avatar robot gaming
- `pixel-character.svg` - Personaje pixel art

**Especificaciones:**
- Formato: SVG
- Tamaño: 128x128px, 256x256px
- Estilo: Gaming, amigable, neutro

### 📂 **images/decorations/**
Elementos decorativos para enriquecer la UI.

**Archivos sugeridos:**
- `circuit-pattern.svg` - Patrón de circuitos
- `hex-pattern.svg` - Patrón hexagonal gaming
- `neon-lines.svg` - Líneas neón decorativas
- `gaming-border.svg` - Bordes con temática gaming
- `particle-effect.png` - Efectos de partículas
- `glow-effect.png` - Efectos de brillo
- `gradient-orb.svg` - Orbes de gradiente

**Especificaciones:**
- Formato: SVG para vectores, PNG para efectos
- Transparencia: Sí
- Peso: Ligero para múltiples usos

### 📂 **sounds/** (Opcional)
Efectos de sonido para interacciones.

**Archivos sugeridos:**
- `button-click.mp3` - Sonido de click
- `success.mp3` - Sonido de éxito
- `error.mp3` - Sonido de error
- `notification.mp3` - Sonido de notificación

**Especificaciones:**
- Formato: MP3 o WAV
- Duración: Máximo 2 segundos
- Peso: Máximo 50KB por archivo

### 📂 **fonts/** (Opcional)
Fuentes personalizadas si no se usan Google Fonts.

**Archivos sugeridos:**
- `Orbitron-Regular.woff2` - Fuente principal
- `Rajdhani-Regular.woff2` - Fuente secundaria

## 🎨 Guía de Estilo Visual

### **Paleta de Colores Sugerida:**
- **Primario**: #0f3460 (Azul oscuro)
- **Secundario**: #1a1a2e (Negro azulado)
- **Acento**: #16a085 (Verde cyan)
- **Neón**: #00ff88 (Verde neón)
- **Púrpura**: #533483 (Púrpura gaming)

### **Estilo de Imágenes:**
- **Futurista y tecnológico**
- **Colores oscuros con acentos brillantes**
- **Líneas limpias y geométricas**
- **Efectos de brillo y neón**
- **Temática gaming/ciberpunk**

### **Consideraciones Técnicas:**
- **Optimización**: Todas las imágenes deben estar optimizadas
- **Accesibilidad**: Incluir alt text descriptivo
- **Responsive**: Considerar diferentes tamaños de pantalla
- **Formato**: Usar formatos modernos (WebP, AVIF) con fallbacks

## 📝 Checklist de Assets

### **Obligatorios:**
- [ ] Logo principal del proyecto
- [ ] Favicon actualizado
- [ ] Fondo principal (hero)
- [ ] Iconos básicos de UI (add, edit, delete, search)
- [ ] Logos de las principales plataformas

### **Recomendados:**
- [ ] Fondos para diferentes secciones
- [ ] Iconos de géneros principales
- [ ] Elementos decorativos
- [ ] Avatar por defecto

### **Opcionales:**
- [ ] Efectos de sonido
- [ ] Múltiples variantes de logo
- [ ] Animaciones en formato GIF/WebP
- [ ] Ilustraciones personalizadas

## 🔗 Recursos Sugeridos

### **Sitios para encontrar assets gaming:**
- **Itch.io**: Assets gratuitos y de pago
- **OpenGameArt.org**: Assets libres
- **Freepik**: Vectores gaming (con atribución)
- **Unsplash**: Fotos gaming gratuitas
- **Flaticon**: Iconos gaming

### **Herramientas de optimización:**
- **TinyPNG**: Optimizar PNG/JPG
- **SVGO**: Optimizar SVG
- **Squoosh**: Convertir a formatos modernos

---

💡 **Tip**: Mantén un naming consistente y usa prefijos descriptivos para facilitar la organización y búsqueda de assets.
