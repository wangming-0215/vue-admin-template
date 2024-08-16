import chroma from 'chroma-js';

type Shade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

/**
 * 调色板
 * @param color
 * @returns palette
 */
export function createPalette(color: string) {
  const colors = [
    chroma.scale(['#fff', color]).mode('hsl').correctLightness(true).colors(7),
    chroma.scale([color, '#000']).mode('hsl').correctLightness(true).colors(7).slice(1),
  ]
    .flat()
    .slice(1, -1);

  const shades: Shade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  return shades.reduce<Record<Shade, string>>(
    (palette, shade, index) => ({ ...palette, [shade]: colors[index] }),
    {} as Record<Shade, string>,
  );
}

/**
 * 对比度
 * chroma.contrast(item, '#fff') >= 3 ? '#fff' : '#000'
 * @param foreground
 * @param background
 * @returns contrast ratio
 */
export function getContrastRatio(
  foreground: string,
  background: string,
): number {
  return chroma.contrast(foreground, background);
}
