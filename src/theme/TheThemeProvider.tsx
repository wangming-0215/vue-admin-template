import type { PropType } from 'vue';
import { computed, defineComponent, provide, toRef, watch } from 'vue';
import type { GlobalThemeOverrides } from 'naive-ui';
import { NConfigProvider, darkTheme } from 'naive-ui';
import createTheme from './createTheme';
import { themeModeContextKey } from './useThemeMode';

import { type PaletteType, scenes } from './palette';

/**
 * 创建 style 标签
 * @returns style element
 */
function createStyleTag() {
  const styleId = 'theme-vars';
  const style = document.querySelector(`#${styleId}`) || document.createElement('style');
  style.id = styleId;
  return style;
}

/**
 * 生成 css 变量 key
 * @param key
 * @returns the key of css variable
 */
function generateCssVarKey(key: string) {
  return `--${
    key
    .replace(/[A-Z]/g, match => ` ${match.toLowerCase()}`)
    .split(' ')
    .filter(t => !!t)
    .join('-')
  }`;
}

/**
 * css 变量添加到 html 中
 * @param vars
 */
function addThemeVarsToHtml(vars: Record<string, string | number | undefined>) {
  const styles: string[] = [];
  Object.keys(vars).forEach((key) => {
    const value = vars[key];
    if (value === undefined) return;

    const cssVarKey = generateCssVarKey(key);
    styles.push(`${cssVarKey}: ${vars[key]}`);
  });

  const css = `
    :root {
      ${styles.join(';')}
    }
  `;

  const tag = createStyleTag();
  tag.textContent = css;
  document.head.appendChild(tag);
}

function toggleDarkMode(darkMode = false) {
  const DARK_CLASS = 'dark';
  if (darkMode) {
    document.documentElement.classList.add(DARK_CLASS);
  } else {
    document.documentElement.classList.remove(DARK_CLASS);
  }
}

function getPaletteFromToken(token: GlobalThemeOverrides, type: PaletteType = 'primary') {
  return scenes.reduce((acc, scene) => {
    const color = token.common?.[`${type}Color${scene}`];
    if (color) {
      const key = [type, 'color', scene.toLowerCase()].filter(t => !!t).join('-');
      acc[key] = color;
    }
    return acc;
  }, {} as Record<string, string | undefined>);
}

export default defineComponent({
  name: 'TheThemeProvider',
  inheritAttrs: false,
  props: {
    mode: {
      type: String as PropType<'light' | 'dark'>,
      default: 'light',
    },
  },
  setup(props) {
    const theme = computed(() => props.mode === 'dark' ? darkTheme : null);
    const themeOverrides = computed(() => createTheme({ mode: props.mode }));

    provide(themeModeContextKey, toRef(() => props.mode));

    watch(() => props.mode, (mode) => {
      toggleDarkMode(mode === 'dark');
    }, { immediate: true });

    watch(themeOverrides, (overrides) => {
      if (import.meta.env.MODE === 'development') {
        window.__NAIVE_UI_THEME_TOKEN__ = themeOverrides.value.common;
      }

      const token = overrides.common;
      const breakpoints = token?.breakpoints?.values;

      addThemeVarsToHtml({
        // ...getPaletteFromThemeToken(overrides.common),
        ...(breakpoints && {
          'screen-xs': `${breakpoints.xs}px`,
          'screen-sm': `${breakpoints.sm}px`,
          'screen-md': `${breakpoints.md}px`,
          'screen-lg': `${breakpoints.lg}px`,
          'screen-xl': `${breakpoints.xl}px`,
          'screen-2xl': `${breakpoints['2xl']}px`,
        }),
        ...(token && {
          ...getPaletteFromToken(overrides, 'primary'),
          ...getPaletteFromToken(overrides, 'info'),
          ...getPaletteFromToken(overrides, 'success'),
          ...getPaletteFromToken(overrides, 'warning'),
          ...getPaletteFromToken(overrides, 'error'),
          'body-bg-color': token.bodyColor,
        }),
        fontFamily: overrides.common?.fontFamily,
        fontSizeSmall: overrides.common?.fontSizeSmall,
        baseFontSize: overrides.common?.fontSize,
        fontSizeMedium: overrides.common?.fontSizeMedium,
        fontSizeLarge: overrides.common?.fontSizeLarge,
        fontSizeHuge: overrides.common?.fontSizeHuge,
        textColorPrimary: overrides.common?.textColor1,
        textColorRegular: overrides.common?.textColor2,
        textColorSecondary: overrides.common?.textColor3,
        textColorDisabled: overrides.common?.textColorDisabled,
        boxShadowSmall: overrides.common?.boxShadow1,
        boxShadowMedium: overrides.common?.boxShadow2,
        boxShadowLarge: overrides.common?.boxShadow3,
        borderColor: overrides.common?.borderColor,
        dividerColor: overrides.common?.dividerColor,
        borderRadiusSmall: overrides.common?.borderRadiusSmall,
        borderRadiusMedium: overrides.common?.borderRadius,
      });
    }, { immediate: true });

    return {
      theme,
      themeOverrides,
    };
  },
  render() {
    return (
      <NConfigProvider
        abstract
        preflightStyleDisabled
        theme={this.theme}
        themeOverrides={this.themeOverrides}
        breakpoints={this.themeOverrides.common?.breakpoints?.values}
      >
        {this.$slots.default?.()}
      </NConfigProvider>
    );
  },
});
