<script setup lang="ts">
import { computed } from 'vue';

import { type Breakpoint, useTheme } from '@/theme';

import generateClasses from './styles';

export interface Props {
  maxWidth?: Breakpoint | false;
}

defineOptions({ name: 'AppContainer', inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  maxWidth: false,
});
const { token } = useTheme();
const classes = computed(() =>
  generateClasses({
    maxWidth: props.maxWidth,
    breakpoints: token.value.breakpoints.values,
  }),
);
</script>

<template>
  <div :class="[classes, $attrs.class]">
    <slot />
  </div>
</template>
