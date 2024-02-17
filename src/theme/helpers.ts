import chroma from 'chroma-js';
import type { GlobalThemeOverrides } from 'naive-ui';
import type { NaiveColorAction, NaiveThemeColor, NaiveThemeColorKey, Palette, PaletteKey } from './types';

/**
 * 从主题设置创建适配 naive ui 主题色
 * @param palette
 */
export function createNaiveThemeColors(palette: Palette): NaiveThemeColor {
  const colorActions: NaiveColorAction[] = [
    { scene: '', handler: color => color },
    { scene: 'Suppl', handler: color => color },
    { scene: 'Hover', handler: color => chroma.mix(color, '#fff', 0.12).hex() },
    { scene: 'Pressed', handler: color => chroma.mix(color, '#000', 0.12).hex() },
    { scene: 'Active', handler: color => chroma(color).alpha(0.1).hex() },
  ];

  const themeColors: NaiveThemeColor = {};

  const paletteEntries = Object.entries(palette) as [PaletteKey, string][];

  paletteEntries.forEach((palette) => {
    colorActions.forEach((action) => {
      const [type, color] = palette;
      const naiveThemeColorKey: NaiveThemeColorKey = `${type}Color${action.scene}`;
      themeColors[naiveThemeColorKey] = action.handler(color);
    });
  });

  return themeColors;
}

/**
 * 创建 naive ui 主题覆写
 * @param palette
 */
export function createNaiveThemeOverrides(palette: Palette): GlobalThemeOverrides {
  return {
    common: {
      ...createNaiveThemeColors(palette),
    },
  };
}

/**
 * 创建 CSS 变量
 * @param palette
 */
export function createThemeColorVars(palette: Palette): string {
  const themeColors = createNaiveThemeColors(palette);

  const cssVars: string[] = [];

  const entries = Object.entries(themeColors) as [NaiveThemeColorKey, string][];

  entries.forEach((color) => {
    const [key, value] = color;
    const cssVarKey = `--${key.split(/(?=[A-Z])/).join('-').toLocaleLowerCase()}`;
    cssVars.push(`${cssVarKey}: ${value}`);
  });

  return cssVars.join(';');
}

/**
 * 添加 CSS 变量到 HTML
 * @param cssVars
 */
export function addCssVarsToHtml(cssVars: string) {
  const id = 'app-theme-vars';
  let styleTag = document.getElementById(id);
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = id;
  }
  styleTag.textContent = `html{${cssVars}}`;
  document.head.append(styleTag);
}

type ColorShadeKey = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type ColorShade = Record<ColorShadeKey, string>;

interface ShadeOptions {
  shade: ColorShadeKey;
  foreground: string;
  ratio: number;
}

export function createColorPalette(color: string) {
  // const [r, g, b] = chroma(color).rgb();
  // const dark = colord({ r: r * r / 255, g: g * g / 255, b: b * b / 255 }).toHex();
  const colorShades: ShadeOptions[] = [
    { shade: 50, foreground: '#fff', ratio: 0.88 },
    { shade: 100, foreground: '#fff', ratio: 0.70 },
    { shade: 200, foreground: '#fff', ratio: 0.50 },
    { shade: 300, foreground: '#fff', ratio: 0.30 },
    { shade: 400, foreground: '#fff', ratio: 0.15 },
    { shade: 500, foreground: '#fff', ratio: 0 },
    { shade: 600, foreground: '#000', ratio: 0.13 },
    { shade: 700, foreground: '#000', ratio: 0.30 },
    { shade: 800, foreground: '#000', ratio: 0.46 },
    { shade: 900, foreground: '#000', ratio: 0.60 },
  ];

  const shades = {} as ColorShade;

  colorShades.forEach((option) => {
    shades[option.shade] = chroma.mix(color, option.foreground, option.ratio).hex();
  });

  return shades;
}
