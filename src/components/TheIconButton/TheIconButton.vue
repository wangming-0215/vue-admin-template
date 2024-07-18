<script setup lang="ts">
import { omit } from 'radash';
import type { ButtonProps } from 'naive-ui';
import TheIcon from '../TheIcon';

export interface TheIconButtonProps {
  icon: string;
  iconSize?: string | number;
  iconColor?: string;
  type?: ButtonProps['type'];
  size?: ButtonProps['size'];
  disabled?: boolean;
  rounded?: boolean;
}

defineOptions({ name: 'TheIconButton', inheritAttrs: false });
defineProps<TheIconButtonProps>();
defineEmits<{ click: [event: MouseEvent] }>();
</script>

<template>
  <NButton
    quaternary
    v-bind="omit($props, ['icon', 'iconSize', 'iconColor'])"
    :class="$attrs.class"
    :style="$attrs.style"
    @click="$emit('click', $event)"
  >
    <template #icon>
      <TheIcon :icon="icon" :size="iconSize" :color="iconColor" />
    </template>
  </NButton>
</template>
