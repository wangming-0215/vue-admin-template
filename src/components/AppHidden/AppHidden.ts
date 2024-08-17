import {
  type ExtractPublicPropTypes,
  type PropType,
  defineComponent,
} from 'vue';
import { useMediaQuery } from '@vueuse/core';

import { type Breakpoint, useTheme } from '@/theme';

const appHiddenProps = {
  breakpoint: {
    required: true,
    type: [String, Array] as PropType<Breakpoint | [Breakpoint, Breakpoint]>,
    default: 'xs',
  },
  dir: {
    required: true,
    type: String as PropType<'up' | 'down' | 'between' | 'only'>,
    default: 'only',
  },
} as const;

export type AppHiddenProps = ExtractPublicPropTypes<typeof appHiddenProps>;

export default defineComponent({
  name: 'BaseHidden',
  inheritAttrs: false,
  props: appHiddenProps,
  setup(props, { slots }) {
    const { token } = useTheme();

    const isHidden = useMediaQuery(() => getMediaQuery().replace('@media ', ''));

    function getMediaQuery() {
      const breakpoints = Array.isArray(props.breakpoint) ? props.breakpoint : [props.breakpoint];
      switch (props.dir) {
        case 'up':
          return token.value.breakpoints.up(breakpoints[0]);
        case 'down':
          return token.value.breakpoints.down(breakpoints[0]);
        case 'between':
          return token.value.breakpoints.between(breakpoints[0], breakpoints[1]);
        case 'only':
        default:
          return token.value.breakpoints.only(breakpoints[0]);
      }
    }

    return () => {
      if (isHidden.value) {
        return null;
      }

      return slots.default?.();
    };
  },
});
