<script lang="ts" setup>
import { computed } from 'vue';
import { getAssetUrl } from '~/utils';

export interface TheLocalAssetProviderProps {
  /**
   * 资源名称
   */
  name: string;
  /**
   * 资源文件夹，从 assets 下的文件夹
   * @default 'images'
   */
  folder?: string;
}

defineOptions({ name: 'TheLocalAssetProvider', inheritAttrs: false });
const props = withDefaults(defineProps<TheLocalAssetProviderProps>(), {
  folder: 'images',
});

const src = computed(() => getAssetUrl(props.name, props.folder));
</script>

<template>
  <slot :src="src" />
</template>
