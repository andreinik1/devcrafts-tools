export interface FluidTypographyParams {
  minPx: number;
  maxPx: number;
  minViewportPx: number;
  maxViewportPx: number;
  baseFontSize: number;
}

export interface LookupTableRow {
  px: number;
  rem: number;
  em: number;
  tailwindClass: string;
}

export function pxToRem(px: number, base: number = 16): number {
  if (base <= 0) return 0;
  return Number((px / base).toFixed(4));
}

export function remToPx(rem: number, base: number = 16): number {
  return Number((rem * base).toFixed(2));
}

export function calculateFluidTypography({
  minPx,
  maxPx,
  minViewportPx,
  maxViewportPx,
  baseFontSize,
}: FluidTypographyParams): {
  clampFormula: string;
  tailwindClass: string;
} {
  const minRem = (minPx / baseFontSize).toFixed(4);
  const maxRem = (maxPx / baseFontSize).toFixed(4);

  const minViewportRem = minViewportPx / baseFontSize;

  const slope = (maxPx - minPx) / (maxViewportPx - minViewportPx);
  const yAxisIntersection = -minViewportRem * slope + minPx / baseFontSize;

  const preferredVw = (slope * 100).toFixed(4);
  const intersectionRem = yAxisIntersection.toFixed(4);

  const clampFormula = `clamp(${minRem}rem, ${intersectionRem}rem + ${preferredVw}vw, ${maxRem}rem)`;
  const tailwindClass = `text-[clamp(${minRem}rem,${intersectionRem}rem+${preferredVw}vw,${maxRem}rem)]`;

  return {
    clampFormula,
    tailwindClass,
  };
}

export const COMMON_PX_LIST = [4, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 80, 96];

const tailwindMap: Record<number, string> = {
  4: 'w-1 / p-1 / text-[4px]',
  8: 'w-2 / p-2 / text-[8px]',
  12: 'w-3 / p-3 / text-xs',
  14: 'w-3.5 / p-3.5 / text-sm',
  16: 'w-4 / p-4 / text-base',
  18: 'w-4.5 / p-4.5 / text-lg',
  20: 'w-5 / p-5 / text-xl',
  24: 'w-6 / p-6 / text-2xl',
  32: 'w-8 / p-8 / text-3xl',
  40: 'w-10 / p-10 / text-4xl',
  48: 'w-12 / p-12 / text-5xl',
  64: 'w-16 / p-16 / text-6xl',
  80: 'w-20 / p-20 / text-7xl',
  96: 'w-24 / p-24 / text-8xl',
};

export function getLookupTable(baseFontSize: number = 16): LookupTableRow[] {
  return COMMON_PX_LIST.map((px) => {
    const rem = pxToRem(px, baseFontSize);
    return {
      px,
      rem,
      em: rem,
      tailwindClass: tailwindMap[px] || `-[${px}px]`,
    };
  });
}
