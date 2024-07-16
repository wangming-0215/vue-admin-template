import type { GlobalTheme } from 'naive-ui';
import { darkTheme, lightTheme } from 'naive-ui';

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

/**
 * 浅色主题
 * @returns light theme
 */
function createNaiveThemeLight(): GlobalTheme {
  return {
    ...lightTheme,
    common: {
      ...lightTheme.common,
      bodyColor: '#f7fafc',
      fontFamily,
    },
    name: 'light',
  };
}

function createNaiveThemeDark(): GlobalTheme {
  return {
    ...darkTheme,
    common: {
      ...darkTheme.common,
      fontFamily,
    },
    name: 'dark',
  };
}

/**
 * naive ui 主题
 * @returns theme
 */
export default function createNaiveTheme(mode: 'light' | 'dark' = 'light'): GlobalTheme {
  return mode === 'light'
    ? createNaiveThemeLight()
    : createNaiveThemeDark();
}
