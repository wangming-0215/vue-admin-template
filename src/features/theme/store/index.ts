import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { usePreferredDark } from '@vueuse/core';

import { storage } from '@/utils';
import { StorageKeys } from '@/constants';
import { createStoreId } from '@/store';

type ThemeMode = 'light' | 'dark';

/**
 * 获取初始主题模式
 * @param isPreferredDark
 */
function getInitialThemeMode(isPreferredDark: boolean): ThemeMode {
  const cached = storage.get<ThemeMode>(StorageKeys.ThemeMode);
  return cached || (isPreferredDark ? 'dark' : 'light');
}

const useThemeStore = defineStore(createStoreId('theme'), () => {
  const isPreferredDark = usePreferredDark();
  const themeMode = ref<ThemeMode>(getInitialThemeMode(isPreferredDark.value));

  function toggleThemeMode() {
    const modes: ThemeMode[] = ['light', 'dark'];
    const index = modes.indexOf(themeMode.value);
    themeMode.value = modes[(index + 1) % modes.length];
    storage.set<ThemeMode>(StorageKeys.ThemeMode, themeMode.value);
  }

  return {
    themeMode,
    toggleThemeMode,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot));
}

export default useThemeStore;
