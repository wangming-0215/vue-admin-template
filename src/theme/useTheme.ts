import { useThemeVars } from 'naive-ui';
import useThemeMode from './useThemeMode';

export default function useTheme() {
  const mode = useThemeMode();
  const token = useThemeVars();

  return { mode, token };
}
