export interface ShadowConfig {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string; // hex format e.g. #000000
  opacity: number; // 0..1
  inset: boolean;
}

export interface GlassConfig {
  bgOpacity: number; // 0..1
  blur: number; // px
  borderOpacity: number; // 0..1
  borderWidth: number; // px
  bgColor: string; // hex
  borderColor: string; // hex
}

export interface ShadowResult {
  css: string;
  tailwind: string;
}

export interface GlassResult {
  css: string;
  tailwind: string;
}

function hexToRgba(hex: string, alpha: number): string {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  const r = parseInt(c.substring(0, 2), 16) || 0;
  const g = parseInt(c.substring(2, 4), 16) || 0;
  const b = parseInt(c.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
}

export function generateBoxShadow(config: ShadowConfig): ShadowResult {
  const rgba = hexToRgba(config.color, config.opacity);
  const insetStr = config.inset ? 'inset ' : '';
  const shadowValue = `${insetStr}${config.offsetX}px ${config.offsetY}px ${config.blur}px ${config.spread}px ${rgba}`;

  const css = `box-shadow: ${shadowValue};`;
  const tailwind = `shadow-[${insetStr}${config.offsetX}px_${config.offsetY}px_${config.blur}px_${config.spread}px_${rgba.replace(/\s+/g, '')}]`;

  return { css, tailwind };
}

export function generateGlassmorphism(config: GlassConfig): GlassResult {
  const bgRgba = hexToRgba(config.bgColor, config.bgOpacity);
  const borderRgba = hexToRgba(config.borderColor, config.borderOpacity);

  const css = `background: ${bgRgba};
backdrop-filter: blur(${config.blur}px);
-webkit-backdrop-filter: blur(${config.blur}px);
border: ${config.borderWidth}px solid ${borderRgba};`;

  const tailwind = `bg-[${bgRgba.replace(/\s+/g, '')}] backdrop-blur-[${config.blur}px] border-[${config.borderWidth}px] border-[${borderRgba.replace(/\s+/g, '')}]`;

  return { css, tailwind };
}

export const SHADOW_PRESETS: { name: string; config: ShadowConfig }[] = [
  {
    name: 'Soft Subtle',
    config: { offsetX: 0, offsetY: 4, blur: 20, spread: 0, color: '#000000', opacity: 0.15, inset: false },
  },
  {
    name: 'Elevated Dark',
    config: { offsetX: 0, offsetY: 10, blur: 30, spread: -5, color: '#000000', opacity: 0.4, inset: false },
  },
  {
    name: 'Cyan Glow',
    config: { offsetX: 0, offsetY: 0, blur: 25, spread: 2, color: '#06b6d4', opacity: 0.5, inset: false },
  },
  {
    name: 'Violet Glow',
    config: { offsetX: 0, offsetY: 0, blur: 30, spread: 4, color: '#8b5cf6', opacity: 0.45, inset: false },
  },
  {
    name: 'Inset Groove',
    config: { offsetX: 0, offsetY: 2, blur: 8, spread: 0, color: '#000000', opacity: 0.35, inset: true },
  },
];

export const GLASS_PRESETS: { name: string; config: GlassConfig }[] = [
  {
    name: 'Vercel Dark Frost',
    config: { bgOpacity: 0.1, blur: 16, borderOpacity: 0.15, borderWidth: 1, bgColor: '#ffffff', borderColor: '#ffffff' },
  },
  {
    name: 'Subdued Slate',
    config: { bgOpacity: 0.25, blur: 12, borderOpacity: 0.2, borderWidth: 1, bgColor: '#0f172a', borderColor: '#334155' },
  },
  {
    name: 'Neon Glass',
    config: { bgOpacity: 0.15, blur: 20, borderOpacity: 0.3, borderWidth: 1, bgColor: '#3b82f6', borderColor: '#60a5fa' },
  },
];
