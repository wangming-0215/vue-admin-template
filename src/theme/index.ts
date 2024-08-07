import type { GlobalThemeOverrides } from 'naive-ui';

export { default as TheThemeProvider } from './TheThemeProvider';

export { default as useTheme } from './useTheme';
export { default as useThemeMode } from './useThemeMode';

export * from './breakpoints';

export * from './palette';

export { default as createTheme } from './createTheme';
export * from './createTheme';

export type Theme = GlobalThemeOverrides;
