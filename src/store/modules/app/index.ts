import { ref } from 'vue';
import { defineStore } from 'pinia';
import { createStoreId } from '~/store/utils';

export const useAppStore = defineStore(createStoreId('app'), () => {
  const themeMode = ref<'light' | 'dark'>('light');

  function toggleThemeMode() {
    const modes: ('light' | 'dark')[] = ['light', 'dark'];
    const index = modes.indexOf(themeMode.value);
    themeMode.value = modes[(index + 1) % modes.length];
  }

  return {
    themeMode,
    toggleThemeMode,
  };
});
