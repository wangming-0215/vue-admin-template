export interface Theme {
  palette: Palette;
}

export interface Palette {
  primary: string;
  info: string;
  success: string;
  warning: string;
  error: string;
}

export type PaletteKey = keyof Palette;

export type NaiveThemeColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active';
export type NaiveThemeColorKey = `${PaletteKey}Color${NaiveThemeColorScene}`;
export type NaiveThemeColor = Partial<Record<NaiveThemeColorKey, string>>;

export interface NaiveColorAction {
  scene: NaiveThemeColorScene;
  handler: (color: string) => string;
}
