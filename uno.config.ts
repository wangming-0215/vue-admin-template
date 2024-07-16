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
    },
    boxShadow: {
      sider: '2px 0 8px 0 rgb(29, 35, 41, 0.05)',
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
