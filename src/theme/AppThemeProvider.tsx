import type { PropType } from 'vue';
import { computed, defineComponent, provide, toRef, watch } from 'vue';
import { NConfigProvider, darkTheme } from 'naive-ui';

import { themeModeContextKey } from './useTheme';
import type { Theme } from './types';
import createTheme from './createTheme';

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
    if (value === undefined)
      return;

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

export default defineComponent({
  name: 'AppThemeProvider',
  inheritAttrs: false,
  props: {
    mode: {
      type: String as PropType<'light' | 'dark'>,
      default: 'light',
    },
    themeOverrides: {
      type: Object as PropType<Theme>,
      default: undefined,
    },
  },
  setup(props) {
    const theme = computed(() => props.mode === 'dark' ? darkTheme : null);
    const themeOverrides = computed(() =>
      createTheme(props.mode, props.themeOverrides),
    );

    provide(themeModeContextKey, toRef(() => props.mode));

    watch(() => props.mode, (mode) => {
      toggleDarkMode(mode === 'dark');
    }, { immediate: true });

    watch(
      themeOverrides,
      (overrides) => {
        if (import.meta.env.MODE === 'development') {
          window.__NAIVE_UI_THEME_TOKEN__ = overrides.common;
        }

        const { name, breakpoints, ...rest } = overrides.common ?? {};

        addThemeVarsToHtml({
          ...(breakpoints && {
            'screenXs': `${breakpoints.values.xs}px`,
            'screenSm': `${breakpoints.values.sm}px`,
            'screenMd': `${breakpoints.values.md}px`,
            'screenLg': `${breakpoints.values.lg}px`,
            'screenXl': `${breakpoints.values.xl}px`,
            'screen-2xl': `${breakpoints.values['2xl']}px`,
          }),
          ...rest,
          // ...(token && {
          //   'primary-color': token.primaryColor,
          //   'primary-color-hover': token.primaryColorHover,
          //   'primary-color-pressed': token.primaryColorPressed,
          //   'primary-color-suppl': token.primaryColorSuppl,
          //   'info-color': token.infoColor,
          //   'info-color-hover': token.infoColorHover,
          //   'info-color-pressed': token.infoColorPressed,
          //   'info-color-suppl': token.infoColorSuppl,
          //   'success-color': token.successColor,
          //   'success-color-hover': token.successColorHover,
          //   'success-color-pressed': token.successColorPressed,
          //   'success-color-suppl': token.successColorSuppl,
          //   'warning-color': token.warningColor,
          //   'warning-color-hover': token.warningColorHover,
          //   'warning-color-pressed': token.warningColorPressed,
          //   'warning-color-suppl': token.warningColorSuppl,
          //   'error-color': token.errorColor,
          //   'error-color-hover': token.errorColorHover,
          //   'error-color-pressed': token.errorColorPressed,
          //   'error-color-suppl': token.errorColorSuppl,
          //   'body-bg-color': token.bodyColor,
          //   'font-family': token.fontFamily,
          //   'font-size-small': token.fontSizeSmall,
          //   'base-font-size': token.fontSize,
          //   'font-size-medium': token.fontSizeMedium,
          //   'font-size-large': token.fontSizeLarge,
          //   'font-size-huge': token.fontSizeHuge,
          //   'text-color-primary': token.textColor1,
          //   'text-color-regular': token.textColor2,
          //   'text-color-secondary': token.textColor3,
          //   'text-color-disabled': token.textColorDisabled,
          //   'shadow-small': token.boxShadow1,
          //   'shadow-medium': token.boxShadow2,
          //   'shadow-large': token.boxShadow3,
          //   'border-color': token.borderColor,
          //   'divider-color': token.dividerColor,
          //   'radius-small': token.borderRadiusSmall,
          //   'radius-medium': token.borderRadius,
          // }),
        });
      },
      { immediate: true },
    );

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
        breakpoints={this.themeOverrides?.common?.breakpoints?.values}
      >
        {this.$slots.default?.()}
      </NConfigProvider>
    );
  },
});
