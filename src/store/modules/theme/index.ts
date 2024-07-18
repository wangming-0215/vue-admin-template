import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { createStoreId } from '~/store/utils';

type ThemeMode = 'light' | 'dark';

export const useThemeStore = defineStore(createStoreId('theme'), () => {
  const themeMode = ref<ThemeMode>('light');

  function toggleThemeMode() {
    const modes: ThemeMode[] = ['light', 'dark'];
    const index = modes.indexOf(themeMode.value);
    themeMode.value = modes[(index + 1) % modes.length];
  }

  return {
    themeMode,
    toggleThemeMode,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot));
}
