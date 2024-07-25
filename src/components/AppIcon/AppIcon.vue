<script setup lang="ts">
import { Icon } from '@iconify/vue';

export interface AppIconProps {
  /** 图标名字 */
  icon: string;
  /** 图标大小（当不指定单位时，默认单位: px） */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 图标深度 */
  depth?: 1 | 2 | 3 | 4 | 5;
}

defineOptions({ name: 'AppIcon', inheritAttrs: false });
defineProps<AppIconProps>();
</script>

<template>
  <NIcon
    :size="size"
    :color="color"
    :depth="depth"
    v-bind="$attrs"
  >
    <Icon :icon="icon" />
  </NIcon>
</template>
