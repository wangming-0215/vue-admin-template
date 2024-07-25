<script setup lang="ts">
import { AppIcon } from '@/components';

export interface TheSongListItemProps {
  id: number;
  cover: string;
  name: string;
  remark: string;
  artists: string[];
}

defineOptions({ name: 'TheSongListItem', inheritAttrs: false });
defineProps<TheSongListItemProps>();
</script>

<template>
  <div class="flex-y-center py-8px gap-x-16px">
    <div class="size-48px rd-6px overflow-hidden shrink-0">
      <img class="size-full" :src="cover" />
    </div>
    <div class="flex-col flex-x-center min-w-0 flex-auto">
      <div class="truncate">
        <span>{{ name }}</span>
        <span v-if="remark" class="color-text-secondary">
          ({{ remark }})
        </span>
      </div>
      <div class="font-size-small color-text-secondary truncate">
        {{ artists.join('/') }}
      </div>
    </div>
    <div class="cursor-pointer font-size-0 ml-8px">
      <AppIcon icon="carbon:play-outline" :size="28" color="#607d8b" />
    </div>
  </div>
</template>
