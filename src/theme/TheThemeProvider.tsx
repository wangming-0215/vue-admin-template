import { computed, defineComponent, watch } from 'vue';
import type { GlobalTheme } from 'naive-ui';
import { NConfigProvider } from 'naive-ui';
import createNaiveTheme from './createNaiveTheme';

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
type NaiveThemeColor = Record<NaiveThemeColorKey, string>;

/**
 * 从 naive ui 主题中提取调色盘
 * @param token
 * @returns colors
 */
function getPaletteFromThemeToken(token: GlobalTheme['common']) {
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

export default defineComponent({
  name: 'TheThemeProvider',
  inheritAttrs: false,
  setup() {
    const theme = computed(() => createNaiveTheme());
    watch(theme, () => {
      window.console.log('theme.common: \n', theme.value.common);
      addThemeVarsToHtml({
        ...getPaletteFromThemeToken(theme.value.common),
        fontFamily: theme.value.common?.fontFamily,
        layoutBgColor: theme.value.common?.bodyColor,
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
        theme={this.theme}
      >
        {this.$slots.default?.()}
      </NConfigProvider>
    );
  },
});
