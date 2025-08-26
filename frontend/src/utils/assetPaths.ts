// ===== RUTAS DE ASSETS GAMING COLLECTION =====
// ENFOQUE HÍBRIDO: PUBLIC (estáticos) + SRC/ASSETS (dinámicos)

// ===== ASSETS ESTÁTICOS (PUBLIC) =====
// Para SEO, metadatos y assets grandes

const PUBLIC_BASE = '/images';

export const PUBLIC_ASSETS = {
  // Fondos grandes (SEO y metadatos)
  BACKGROUNDS: {
    HERO: `${PUBLIC_BASE}/backgrounds/hero-gaming.jpg`,
    DASHBOARD: `${PUBLIC_BASE}/backgrounds/dashboard-bg.jpg`,
    PARTICLES: `${PUBLIC_BASE}/backgrounds/particles-overlay.png`,
  },
  
  // Logos para metadatos y SEO
  LOGOS: {
    MAIN: `${PUBLIC_BASE}/logos/gaming-collection-logo.svg`,
    MAIN_PNG: `${PUBLIC_BASE}/logos/gaming-collection-logo.png`,
    ICON: `${PUBLIC_BASE}/logos/gaming-collection-icon.svg`,
    WHITE: `${PUBLIC_BASE}/logos/logo-white.svg`,
  },
  
  // Logos de plataformas (terceros)
  PLATFORMS: {
    STEAM: `${PUBLIC_BASE}/platforms/steam.svg`,
    EPIC_GAMES: `${PUBLIC_BASE}/platforms/epic-games.svg`,
    XBOX_GAME_PASS: `${PUBLIC_BASE}/platforms/xbox-game-pass.svg`,
    EA_PLAY: `${PUBLIC_BASE}/platforms/ea-play.svg`,
    RIOT_GAMES: `${PUBLIC_BASE}/platforms/riot-games.svg`,
    UBISOFT_CONNECT: `${PUBLIC_BASE}/platforms/ubisoft-connect.svg`,
    BATTLENET: `${PUBLIC_BASE}/platforms/battlenet.svg`,
    PLAYSTATION_STORE: `${PUBLIC_BASE}/platforms/playstation-store.svg`,
    NINTENDO_ESHOP: `${PUBLIC_BASE}/platforms/nintendo-eshop.svg`,
    GOG: `${PUBLIC_BASE}/platforms/gog.svg`,
    ORIGIN: `${PUBLIC_BASE}/platforms/origin.svg`,
  },
} as const;

// ===== ASSETS DINÁMICOS (SRC/ASSETS) =====
// Para importación y optimización automática

// Estos serán importados directamente en los componentes
// Ejemplo: import controllerIcon from '../assets/icons/controller.svg';

export const ASSET_PATHS = {
  // Iconos de UI (importados)
  ICONS: {
    CONTROLLER: 'controller.svg',
    PLUS: 'plus.svg',
    EDIT: 'edit.svg',
    TRASH: 'trash.svg',
    SEARCH: 'search.svg',
    FILTER: 'filter.svg',
    GRID: 'grid.svg',
    LIST: 'list.svg',
    STAR: 'star.svg',
    HEART: 'heart.svg',
    SETTINGS: 'settings.svg',
    USER: 'user.svg',
    STATS: 'stats.svg',
    TROPHY: 'trophy.svg',
    BOOKMARK: 'bookmark.svg',
  },
  
  // Imágenes optimizadas
  IMAGES: {
    DEFAULT_GAME_COVER: 'default-game-cover.jpg',
    NO_IMAGE_PLACEHOLDER: 'no-image-placeholder.svg',
    LOADING_SPINNER: 'loading-spinner.svg',
  },
  
  // Avatares dinámicos
  AVATARS: {
    DEFAULT_GAMER: 'default-gamer.svg',
    ROBOT_AVATAR: 'robot-avatar.svg',
    PIXEL_CHARACTER: 'pixel-character.svg',
  },
  
  // Decoraciones
  DECORATIONS: {
    CIRCUIT_LINES: 'circuit-lines.svg',
    GLOW_EFFECT: 'glow-effect.svg',
    PARTICLES: 'particles.svg',
    HEX_PATTERN: 'hex-pattern.svg',
  },
  
  // Sonidos
  SOUNDS: {
    CLICK: 'click.mp3',
    SUCCESS: 'success.mp3',
    ERROR: 'error.mp3',
    NOTIFICATION: 'notification.mp3',
  },
} as const;

// ===== MAPAS DE PLATAFORMAS =====
export const PLATFORM_ICONS: Record<string, string> = {
  'Steam': PUBLIC_ASSETS.PLATFORMS.STEAM,
  'Epic Games': PUBLIC_ASSETS.PLATFORMS.EPIC_GAMES,
  'Xbox Game Pass': PUBLIC_ASSETS.PLATFORMS.XBOX_GAME_PASS,
  'EA Play': PUBLIC_ASSETS.PLATFORMS.EA_PLAY,
  'Riot Games': PUBLIC_ASSETS.PLATFORMS.RIOT_GAMES,
  'Ubisoft Connect': PUBLIC_ASSETS.PLATFORMS.UBISOFT_CONNECT,
  'Battle.net': PUBLIC_ASSETS.PLATFORMS.BATTLENET,
  'PlayStation Store': PUBLIC_ASSETS.PLATFORMS.PLAYSTATION_STORE,
  'Nintendo eShop': PUBLIC_ASSETS.PLATFORMS.NINTENDO_ESHOP,
  'GOG': PUBLIC_ASSETS.PLATFORMS.GOG,
  'Origin': PUBLIC_ASSETS.PLATFORMS.ORIGIN,
};

// ===== FUNCIONES HELPER =====

/**
 * Obtener icono de plataforma por nombre (desde PUBLIC)
 */
export const getPlatformIcon = (platformName: string): string => {
  return PLATFORM_ICONS[platformName] || PUBLIC_ASSETS.LOGOS.ICON;
};

/**
 * Función para importar dinámicamente iconos de assets
 * Uso: const icon = await importIcon('controller');
 */
export const importIcon = async (iconName: keyof typeof ASSET_PATHS.ICONS) => {
  try {
    const iconPath = ASSET_PATHS.ICONS[iconName];
    const module = await import(`../assets/icons/${iconPath}`);
    return module.default;
  } catch (error) {
    console.warn(`Icono no encontrado: ${iconName}`);
    return null;
  }
};

/**
 * Función para importar dinámicamente imágenes de assets
 */
export const importImage = async (imageName: keyof typeof ASSET_PATHS.IMAGES) => {
  try {
    const imagePath = ASSET_PATHS.IMAGES[imageName];
    const module = await import(`../assets/images/${imagePath}`);
    return module.default;
  } catch (error) {
    console.warn(`Imagen no encontrada: ${imageName}`);
    return null;
  }
};

/**
 * Precargar assets críticos desde PUBLIC
 */
export const preloadCriticalAssets = (): void => {
  const criticalAssets = [
    PUBLIC_ASSETS.LOGOS.MAIN,
    PUBLIC_ASSETS.BACKGROUNDS.HERO,
    PUBLIC_ASSETS.PLATFORMS.STEAM,
    PUBLIC_ASSETS.PLATFORMS.EPIC_GAMES,
  ];

  criticalAssets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = asset;
    document.head.appendChild(link);
  });
};

/**
 * Verificar si un asset público existe
 */
export const assetExists = async (path: string): Promise<boolean> => {
  try {
    const response = await fetch(path, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// ===== FALLBACKS =====
export const FALLBACKS = {
  PLATFORM_ICON: PUBLIC_ASSETS.LOGOS.ICON,
  GAME_COVER: '/images/default-game-cover.jpg', // Se creará en public si es necesario
  AVATAR: PUBLIC_ASSETS.LOGOS.ICON,
  BACKGROUND: PUBLIC_ASSETS.BACKGROUNDS.DASHBOARD,
} as const;

// ===== EXPORT PRINCIPAL =====
export default {
  PUBLIC_ASSETS,
  ASSET_PATHS,
  getPlatformIcon,
  importIcon,
  importImage,
  preloadCriticalAssets,
  FALLBACKS,
};

// ===== TIPOS TYPESCRIPT =====
export type IconName = keyof typeof ASSET_PATHS.ICONS;
export type ImageName = keyof typeof ASSET_PATHS.IMAGES;
export type PlatformName = keyof typeof PLATFORM_ICONS;