import { computed, effectScope, onScopeDispose, ref, toRefs, watch } from 'vue';
import type { GlobalThemeOverrides } from 'naive-ui';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { addCssVarsToHtml, createNaiveThemeOverrides, createThemeColorVars, defaultTheme } from '~/theme';
import type { PaletteKey, Theme } from '~/theme';

export const useThemeStore = defineStore('theme', () => {
  const scope = effectScope();

  /** 主题 */
  const theme = ref<Theme>(defaultTheme);

  /** naive ui 主题覆盖 */
  const naiveThemeOverride = computed<GlobalThemeOverrides>(() => createNaiveThemeOverrides(theme.value.palette));

  /**
   * 更新主题色
   * @param key
   * @param color
   */
  function updateThemeColors(key: PaletteKey, color: string) {
    theme.value.palette[key] = color;
  }

  scope.run(() => {
    watch(() => theme.value.palette, () => {
      const cssVars = createThemeColorVars(theme.value.palette);
      addCssVarsToHtml(cssVars);
    }, { immediate: true, deep: true });
  });

  onScopeDispose(() => {
    scope.stop();
  });

  return {
    ...toRefs(theme.value),
    naiveThemeOverride,
    updateThemeColors,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot));
}
