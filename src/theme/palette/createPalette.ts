import chroma from 'chroma-js';
import { darkTheme, lightTheme } from 'naive-ui';

function addLightOrDark(color: string, direction: 'light' | 'dark') {
  const tonalOffset = 0.4;

  if (direction === 'light') {
    return chroma(color).brighten(tonalOffset).hex();
  }

  return chroma(color).darken(tonalOffset * 1.5).hex();
}

interface PaletteOptions {
  primaryColor?: string;
  primaryColorHover?: string;
  primaryColorPressed?: string;
  primaryColorSuppl?: string;
  infoColor?: string;
  infoColorHover?: string;
  infoColorPressed?: string;
  infoColorSuppl?: string;
  successColor?: string;
  successColorHover?: string;
  successColorPressed?: string;
  successColorSuppl?: string;
  warningColor?: string;
  warningColorHover?: string;
  warningColorPressed?: string;
  warningColorSuppl?: string;
  errorColor?: string;
  errorColorHover?: string;
  errorColorPressed?: string;
  errorColorSuppl?: string;
}

export default function createPalette(
  palette: PaletteOptions,
  mode: 'light' | 'dark' = 'light',
) {
  const theme = mode === 'light' ? lightTheme : darkTheme;

  const primaryColor = palette?.primaryColor ?? theme.common.primaryColor;
  const primaryColorHover = palette?.primaryColorHover ?? addLightOrDark(primaryColor, 'light');
  const primaryColorPressed = palette?.primaryColorPressed ?? addLightOrDark(primaryColor, 'dark');
  const primaryColorSuppl = palette?.primaryColorSuppl ?? primaryColorHover;

  const infoColor = palette?.infoColor ?? theme.common.infoColor;
  const infoColorHover = palette?.infoColorHover ?? addLightOrDark(infoColor, 'light');
  const infoColorPressed = palette?.infoColorPressed ?? addLightOrDark(infoColor, 'dark');
  const infoColorSuppl = palette?.infoColorSuppl ?? infoColorHover;

  const successColor = palette?.successColor ?? theme.common.successColor;
  const successColorHover = palette?.successColorHover ?? addLightOrDark(successColor, 'light');
  const successColorPressed = palette?.successColorPressed ?? addLightOrDark(successColor, 'dark');
  const successColorSuppl = palette?.successColorSuppl ?? successColorHover;

  const warningColor = palette?.warningColor ?? theme.common.warningColor;
  const warningColorHover = palette?.warningColorHover ?? addLightOrDark(warningColor, 'light');
  const warningColorPressed = palette?.warningColorPressed ?? addLightOrDark(warningColor, 'dark');
  const warningColorSuppl = palette?.warningColorSuppl ?? warningColorHover;

  const errorColor = palette?.errorColor ?? theme.common.errorColor;
  const errorColorHover = palette?.errorColorHover ?? addLightOrDark(errorColor, 'light');
  const errorColorPressed = palette?.errorColorPressed ?? addLightOrDark(errorColor, 'dark');
  const errorColorSuppl = palette?.errorColorSuppl ?? errorColorHover;

  return {
    primaryColor,
    primaryColorHover,
    primaryColorPressed,
    primaryColorSuppl,
    infoColor,
    infoColorHover,
    infoColorPressed,
    infoColorSuppl,
    successColor,
    successColorHover,
    successColorPressed,
    successColorSuppl,
    warningColor,
    warningColorHover,
    warningColorPressed,
    warningColorSuppl,
    errorColor,
    errorColorHover,
    errorColorPressed,
    errorColorSuppl,
  };
}
