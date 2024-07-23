import {
  defineConfig,
  presetAttributify,
  presetUno,
  toEscapedSelector,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import type { Theme } from '@unocss/preset-uno';
import { mapValues } from 'radash';

import { createBreakpoints } from './src/theme/breakpoints';
import { getPaletteVars } from './src/theme/palette';

const breakpoints = createBreakpoints();
const palette = getPaletteVars();

export default defineConfig<Theme>({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  rules: [
    [/^box$/, (_, { theme, rawSelector }) => {
      const selector = toEscapedSelector(rawSelector);

      const mediaQuery = theme.breakpoints
        ? `@media (min-width:${theme.breakpoints.sm}) {
            ${selector} {
                padding-right: 24px;
                padding-left: 24px;
            }
          }`
        : '';

      return `
        ${selector} {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          padding-left: 16px;
          padding-right: 16px;
          transition: padding 0.2s;
        }

        ${mediaQuery}
      `;
    }],
    [/^box-max-w-(xs|sm|md|lg|xl|2xl)$/, ([, breakpoint], { theme, symbols }) => {
      if (!theme.breakpoints) return undefined;

      let maxWidth = theme.breakpoints[breakpoint];
      if (breakpoint === 'xs') {
        maxWidth = `${Math.max(Number(theme.breakpoints.xs.replace('px', '')), 444)}`;
      }

      return {
        [symbols.parent]: `@media (min-width:${theme.breakpoints[breakpoint]})`,
        'max-width': maxWidth,
      };
    }],
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
      ...palette,
      body: 'var(--body-bg-color)',
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
    lineHeight: {
      base: '1.6',
    },
    boxShadow: {
      small: 'var(--shadow-small)',
      large: 'var(--shadow-large)',
      medium: 'var(--shadow-medium)',
    },
    borderRadius: {
      small: 'var(--radius-small)',
      medium: 'var(--radius-medium)',
    },
    breakpoints: mapValues(breakpoints.values, value => `${value}px`),
  },
});
