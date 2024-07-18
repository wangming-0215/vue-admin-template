import { type GlobalThemeOverrides, darkTheme, lightTheme } from 'naive-ui';

declare module 'naive-ui' {
  interface CustomThemeCommonVars {
    breakpoints: Breakpoints;
  }
}

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
interface Breakpoints {
  keys: Breakpoint[];
  values: { [key in Breakpoint]: number };
}

export const fontFamily = [
  '"HarmonyOs Medium"',
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
 * 字体/字号
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

function createBreakpoints(): Breakpoints {
  return {
    keys: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    values: {
      'xs': 0,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536,
    },
  };
}

/**
 * 浅色主题
 * @returns light theme
 */
function createNaiveThemeLight(): GlobalThemeOverrides & { name: 'light' } {
  return {
    common: {
      ...lightTheme.common,
      ...createTypography(),
      borderRadius: '4px',
      bodyColor: '#f7fafc',
      breakpoints: createBreakpoints(),
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
      ...darkTheme.common,
      ...createTypography(),
      borderRadius: '4px',
      bodyColor: '#090a0b',
      cardColor: '#121517',
      breakpoints: createBreakpoints(),
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
