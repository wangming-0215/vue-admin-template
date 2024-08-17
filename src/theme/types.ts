import type { GlobalThemeOverrides } from 'naive-ui';

export type NaiveColorType =
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type NaiveColorScene = '' | 'Suppl' | 'Hover' | 'Pressed';

export type PaletteMode = 'light' | 'dark';

export interface Palette {
  primary?: string;
  info?: string;
  success?: string;
  warning?: string;
  error?: string;
  mode?: PaletteMode;
}

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export interface Breakpoints {
  keys: Breakpoint[];
  values: { [key in Breakpoint]: number };
  up: (key: Breakpoint) => string;
  down: (key: Breakpoint) => string;
  between: (start: Breakpoint, end: Breakpoint) => string;
  only: (key: Breakpoint) => string;
}

export type Theme = GlobalThemeOverrides;

declare module 'naive-ui' {
  interface CustomThemeCommonVars {
    breakpoints: Breakpoints;
  }
}
