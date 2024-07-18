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
      'flex-col': 'flex flex-col',
      'flex-x-center': 'flex justify-center',
      'flex-y-center': 'flex items-center',
      'flex-center': 'flex items-center justify-center',
    },
    {
      'border-solid': 'border-1px border-solid border-border',
    },
    {
      'styled-card': 'rd-8px shadow',
    },
    /** spell-checker:disable-next-line */
    [/^border-([rltb])-solid$/, ([, direction]) => {
      return [`border-${direction}-1px`, `border-${direction}-solid`, `border-${direction}-border`].join(' ');
    }],
  ],
  theme: {
    colors: {
      ...getThemeColors(),
      text: {
        primary: 'var(--text-color-primary)',
        regular: 'var(--text-color-regular)',
        secondary: 'var(--text-color-secondary)',
        disabled: 'var(--text-color-disabled)',
      },
      border: 'var(--border-color)',
      divider: 'var(--divider-color)',
    },
    fontSize: {
      small: 'var(--font-size-small)',
      base: 'var(--base-font-size)',
      medium: 'var(--font-size-medium)',
      large: 'var(--font-size-large)',
      huge: 'var(--font-size-huge)',
    },
    boxShadow: {
      small: 'var(--box-shadow-small)',
      large: 'var(--box-shadow-large)',
      medium: 'var(--box-shadow-medium)',
    },
    borderRadius: {
      small: 'var(--border-radius-small)',
      medium: 'var(--border-radius-medium)',
    },
    breakpoints: {
      'xs': '0px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
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
