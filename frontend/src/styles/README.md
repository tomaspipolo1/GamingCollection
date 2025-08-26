# 📁 Estructura de Estilos

Esta carpeta contiene todos los archivos CSS del proyecto organizados por categorías para mantener un código limpio y mantenible.

## 🗂️ Organización

```
styles/
├── components/          # Estilos de componentes reutilizables
│   └── ScrollToTop.css  # Botón de scroll to top
├── layout/              # Estilos de estructura principal
│   ├── Header.css       # Barra de navegación
│   └── Footer.css       # Pie de página
├── pages/               # Estilos específicos de páginas
│   └── Home.css         # Página de inicio
├── globals.css          # Estilos globales y variables CSS
├── responsive.css       # Media queries y responsive design
└── sweetalert-gaming.css # Temas personalizados para SweetAlert2

```

## 📋 Guías de uso

### ✅ **Para componentes nuevos:**
- Crear archivo en `components/`
- Nombrar igual que el componente: `ComponentName.css`
- Importar en el componente: `import '../../styles/components/ComponentName.css';`

### ✅ **Para layouts:**
- Crear archivo en `layout/`
- Para header, footer, sidebar, etc.
- Importar en el componente: `import '../styles/layout/ComponentName.css';`

### ✅ **Para páginas:**
- Crear archivo en `pages/`
- Nombrar igual que la página: `PageName.css`
- Importar en la página: `import '../styles/pages/PageName.css';`

### ✅ **Para estilos globales:**
- Usar `globals.css` para variables, reset, fuentes
- Usar `responsive.css` para breakpoints generales
- Importar en `index.css` del proyecto

## 🎯 **Convenciones**

1. **Nombres de archivos:** PascalCase igual que el componente
2. **Clases CSS:** kebab-case con prefijos descriptivos
3. **Comentarios:** Usar formato `/* ===== SECCIÓN ===== */`
4. **Mobile First:** Siempre diseñar desde móvil hacia desktop
5. **Variables CSS:** Definir en `globals.css` para reutilización

## 🚫 **No hacer**

- ❌ NO poner CSS dentro de `components/` 
- ❌ NO mezclar estilos de diferentes categorías
- ❌ NO usar estilos inline cuando sea posible
- ❌ NO duplicar archivos CSS

Esta estructura mejora la mantenibilidad y facilita encontrar estilos específicos. 🎮✨
