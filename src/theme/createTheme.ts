import { darkTheme, lightTheme } from 'naive-ui';

import { createBreakpoints } from './breakpoints';
import type { Theme } from './types';
import { createPalette } from './palette';

export default function createThemeOverrides(
  mode: 'light' | 'dark',
  overrides: Theme = {},
): Theme {
  const { common = {}, ...components } = overrides;
  const breakpoints = createBreakpoints();
  const palette = createPalette(common, mode);
  const fontFamily =
    common?.fontFamily ?? (mode === 'light' ? lightTheme.common.fontFamily : darkTheme.common.fontFamily);


  if (mode === 'light') {
    return {
      common: {
        ...lightTheme.common,
        ...palette,
        breakpoints,
        fontFamily,
      },
      ...components,
    };
  }

  return {
    common: {
      ...darkTheme.common,
      ...palette,
      breakpoints,
      fontFamily,
    },
    ...components,
  };
}
