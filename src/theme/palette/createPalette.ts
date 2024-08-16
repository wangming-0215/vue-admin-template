import { darkTheme, lightTheme } from 'naive-ui';

import {
  type PaletteScene,
  type PaletteType,
  scenes,
} from './constants';

type PaletteColorsKey = `${PaletteType}Color${PaletteScene}`;
type PaletteColors = Record<PaletteColorsKey, string>;

function getDefaultColor(
  mode: 'light' | 'dark' = 'light',
  type: PaletteType = 'primary',
  scene: PaletteScene = '',
) {
  const token = mode === 'light' ? lightTheme.common : darkTheme.common;
  return token[`${type}Color${scene}`];
}

function getPaletteColors(
  type: PaletteType,
  palette: Partial<PaletteColors>,
  mode: 'light' | 'dark' = 'light',
) {
  return scenes.reduce((colors, scene) => {
    const key: PaletteColorsKey = `${type}Color${scene}`;
    return {
      ...colors,
      [key]: palette[key] || getDefaultColor(mode, type, scene),
    };
  }, {} as PaletteColors);
}

export interface PaletteOptions extends Partial<PaletteColors> {
  mode?: 'dark' | 'light';
}

export default function createPalette(palette: PaletteOptions) {
  const { mode = 'light', ...others } = palette;

  // #ff9500
  const primary = getPaletteColors('primary', others, mode);
  const info = getPaletteColors('info', others, mode);
  const success = getPaletteColors('success', others, mode);
  const warning = getPaletteColors('warning', others, mode);
  const error = getPaletteColors('error', others, mode);

  return {
    ...primary,
    ...info,
    ...success,
    ...warning,
    ...error,
    ...others,
  };
}
