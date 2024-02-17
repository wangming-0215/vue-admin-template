import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

import type { Theme } from '@unocss/preset-uno';

export default defineConfig<Theme>({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      fonts: {
        sans: 'Noto Sans SC',
      },
    }),
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
      'primary': 'var(--primary-color)',
      'primary-suppl': 'var(--primary-color-suppl)',
      'primary-hover': 'var(--primary-color-hover)',
      'primary-pressed': 'var(--primary-color-pressed)',
      'primary-active': 'var(--primary-color-active)',

      'info': 'var(--info-color)',
      'info-suppl': 'var(--info-color-suppl)',
      'info-hover': 'var(--info-color-hover)',
      'info-pressed': 'var(--info-color-pressed)',
      'info-active': 'var(--info-color-active)',

      'success': 'var(--success-color)',
      'success-suppl': 'var(--success-color-suppl)',
      'success-hover': 'var(--success-color-hover)',
      'success-pressed': 'var(--success-color-pressed)',
      'success-active': 'var(--success-color-active)',

      'warning': 'var(--warning-color)',
      'warning-suppl': 'var(--warning-color-suppl)',
      'warning-hover': 'var(--warning-color-hover)',
      'warning-pressed': 'var(--warning-color-pressed)',
      'warning-active': 'var(--warning-color-active)',

      'error': 'var(--error-color)',
      'error-suppl': 'var(--error-color-suppl)',
      'error-hover': 'var(--error-color-hover)',
      'error-pressed': 'var(--error-color-pressed)',
      'error-active': 'var(--error-color-active)',
    },
    boxShadow: {
      sider: '2px 0 8px 0 rgb(29, 35, 41, 0.05)',
    },
  },
});
