import { useThemeVars } from 'naive-ui';
import type { Ref } from 'vue';
import { inject, ref } from 'vue';

import { createInjectionKey } from '@/utils';

export const themeModeContextKey =
  createInjectionKey<Ref<'light' | 'dark'>>('ThemeModeContext');

export default function useTheme() {
  const mode = inject(themeModeContextKey, ref('light'));
  const token = useThemeVars();

  return { mode, token };
}
