import type { PropType } from 'vue';
import { computed, defineComponent, provide, toRef, watch } from 'vue';
import type { GlobalThemeOverrides } from 'naive-ui';
import { NConfigProvider } from 'naive-ui';
import createNaiveTheme from './createNaiveTheme';
import { themeModeContextKey } from './useThemeMode';

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
function addThemeVarsToHtml(vars: Record<string, string | undefined>) {
  const styles: string[] = [];
  Object.keys(vars).forEach((key) => {
    const value = vars[key];
    if (!value) return;

    const cssVarKey = generateCssVarKey(key);
    styles.push(`${cssVarKey}: ${vars[key]};`);
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

type NaivePaletteType = 'primary' | 'info' | 'success' | 'warning' | 'error';
type NaivePaletteScene = '' | 'Suppl' | 'Hover' | 'Pressed';
type NaiveThemeColorKey = `${NaivePaletteType}${NaivePaletteScene}`;
type NaiveThemeColor = Partial<Record<NaiveThemeColorKey, string>>;

/**
 * 从 naive ui 主题中提取调色盘
 * @param token
 * @returns colors
 */
function getPaletteFromThemeToken(token: GlobalThemeOverrides['common']) {
  if (!token) return undefined;

  const paletteTypes: NaivePaletteType[] = ['primary', 'info', 'success', 'warning', 'error'];
  const paletteScenes: NaivePaletteScene[] = ['', 'Suppl', 'Hover', 'Pressed'];
  return paletteTypes.reduce((acc, type) => {
    paletteScenes.forEach((scene) => {
      const key: NaiveThemeColorKey = `${type}${scene}`;
      const value = token[`${type}Color${scene}`];
      acc[key] = value;
    });
    return acc;
  }, {} as NaiveThemeColor);
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
  name: 'TheThemeProvider',
  inheritAttrs: false,
  props: {
    mode: {
      type: String as PropType<'light' | 'dark'>,
      default: 'light',
    },
  },
  setup(props) {
    const theme = computed(() => createNaiveTheme(props.mode));

    provide(themeModeContextKey, toRef(() => props.mode));

    watch(() => props.mode, (mode) => {
      toggleDarkMode(mode === 'dark');
    }, { immediate: true });

    watch(theme, (theme) => {
      window.console.log('theme.common: \n', theme.common);
      addThemeVarsToHtml({
        ...getPaletteFromThemeToken(theme.common),
        fontFamily: theme.common?.fontFamily,
        fontSizeSmall: theme.common?.fontSizeSmall,
        baseFontSize: theme.common?.fontSize,
        fontSizeMedium: theme.common?.fontSizeMedium,
        fontSizeLarge: theme.common?.fontSizeLarge,
        fontSizeHuge: theme.common?.fontSizeHuge,
        textColorPrimary: theme.common?.textColor1,
        textColorRegular: theme.common?.textColor2,
        textColorSecondary: theme.common?.textColor3,
        textColorDisabled: theme.common?.textColorDisabled,
        boxShadowSmall: theme.common?.boxShadow1,
        boxShadowMedium: theme.common?.boxShadow2,
        boxShadowLarge: theme.common?.boxShadow3,
        borderColor: theme.common?.borderColor,
        dividerColor: theme.common?.dividerColor,
        borderRadiusSmall: theme.common?.borderRadiusSmall,
        borderRadiusMedium: theme.common?.borderRadius,
      });
    }, { immediate: true });

    return {
      theme,
    };
  },
  render() {
    return (
      <NConfigProvider
        abstract
        preflightStyleDisabled
        themeOverrides={this.theme}
      >
        {this.$slots.default?.()}
      </NConfigProvider>
    );
  },
});