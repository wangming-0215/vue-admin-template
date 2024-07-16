import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

import type { Theme } from '@unocss/preset-uno';

export default defineConfig<Theme>({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  shortcuts: [
    {
      'wh-full': 'w-full h-full',
    },
  ],
  theme: {
    colors: {
      ...getThemeColors(),
      'layout-bg': 'var(--layout-bg-color)',
      'text': {
        primary: 'var(--text-color-primary)',
        regular: 'var(--text-color-regular)',
        secondary: 'var(--text-color-secondary)',
        disabled: 'var(--text-color-disabled)',
      },
    },
    fontSize: {
      base: 'var(--base-font-size)',
    },
  },
});

function getThemeColors() {
  const palette = ['primary', 'success', 'info', 'warning', 'error'];
  const scenes = ['', 'suppl', 'hover', 'pressed'];

  const colors: Record<string, string> = {};

  palette.forEach((p) => {
    scenes.forEach((s) => {
      const key = [p, s].filter(t => !!t).join('-');
      const value = `var(--${[p, s].filter(t => !!t).join('-')})`;
      colors[key] = value;
    });
  });

  return colors;
}
