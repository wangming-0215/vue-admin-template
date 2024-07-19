import { useBreakpoints as useInternalBreakpoints } from '@vueuse/core';
import { useTheme } from '~/theme';

export default function useBreakpoints() {
  const theme = useTheme();

  return useInternalBreakpoints(theme.token.value.breakpoints.values);
}
