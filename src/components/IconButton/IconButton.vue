<script setup lang="ts">
import { omit } from 'radash';
import type { ButtonProps } from 'naive-ui';
import AppIcon from '../AppIcon';

export interface IconButtonProps {
  icon: string;
  iconSize?: string | number;
  iconColor?: string;
  type?: ButtonProps['type'];
  size?: ButtonProps['size'];
  disabled?: boolean;
  rounded?: boolean;
}

defineOptions({ name: 'IconButton', inheritAttrs: false });
defineProps<IconButtonProps>();
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
      <AppIcon :icon="icon" :size="iconSize" :color="iconColor" />
    </template>
  </NButton>
</template>
