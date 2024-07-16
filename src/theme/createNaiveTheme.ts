import type { GlobalThemeOverrides } from 'naive-ui';

export const fontFamily = [
  '"Noto Sans SC"',
  'ui-sans-serif',
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  '"Noto Sans"',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
].join(', ');

export const fontSize = {
  small: '12px',
  base: '14px',
  medium: '16px',
  large: '20px',
  huge: '24px',
} as const;

/**
 * 字体相关
 */
function createTypography() {
  return {
    fontFamily,
    fontSizeHuge: fontSize.huge,
    fontSizeLarge: fontSize.large,
    fontSizeMedium: fontSize.medium,
    fontSizeSmall: fontSize.small,
    fontSizeTiny: fontSize.small,
    fontSizeMini: fontSize.small,
    fontSize: fontSize.base,
  };
}

/**
 * 浅色主题
 * @returns light theme
 */
function createNaiveThemeLight(): GlobalThemeOverrides & { name: 'light' } {
  return {
    common: {
      ...createTypography(),
      bodyColor: '#f7fafc',
    },
    name: 'light',
  };
}

/**
 * 深色主题
 * @returns dark theme
 */
function createNaiveThemeDark(): GlobalThemeOverrides & { name: 'dark' } {
  return {
    common: {
      ...createTypography(),
    },
    name: 'dark',
  };
}

/**
 * naive ui 主题
 * @returns theme
 */
export default function createNaiveTheme(mode: 'light' | 'dark' = 'light'): GlobalThemeOverrides {
  switch (mode) {
    case 'dark':
      return createNaiveThemeDark();
    case 'light':
    default:
      return createNaiveThemeLight();
  }
}
