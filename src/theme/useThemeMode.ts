import type { Ref } from 'vue';
import { inject, ref } from 'vue';
import { createInjectionKey } from '@/utils';

export const themeModeContextKey = createInjectionKey<Ref<'light' | 'dark'>>('ThemeModeContext');

export default function useThemeMode() {
  return inject(themeModeContextKey, ref('light'));
}
