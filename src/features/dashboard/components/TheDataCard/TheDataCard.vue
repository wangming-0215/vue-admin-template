<script setup lang="ts">
import { TheIcon } from '~/components';

export interface TheDataCardProps {
  icon: string;
  title: string;
  value: string;
  up: boolean;
}

defineOptions({ name: 'TheDataCard', inheritAttrs: false });
defineProps<TheDataCardProps>();
</script>

<template>
  <NCard :bordered="false" size="small" segmented class="styled-card">
    <div class="flex-y-center justify-between">
      <TheIcon
        :icon="icon"
        :size="32"
        color="#90a7b3"
      />
      <div>
        <div class="color-text-secondary mb-8px text-right">
          {{ title }}
        </div>
        <div class="font-size-huge flex-y-center text-right">
          <span>{{ value }}</span>
          <TheIcon
            class="ml-4px"
            :icon="up ? 'carbon:arrow-up' : 'carbon:arrow-down'"
            :color="up ? '#4caf50' : '#f44336'"
            :size="14"
          />
        </div>
      </div>
    </div>
  </NCard>
</template>
