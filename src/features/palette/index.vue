<script lang="ts" setup>
import chroma from 'chroma-js';
import { computed } from 'vue';

import { createPalette } from '@/utils';
import { AppContainer } from '@/components';

const colors = computed(() => {
  return [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#9e9e9e',
    '#607d8b',
  ].map(color => createPalette(color));
});
</script>

<template>
  <AppContainer max-width="xl" class="py-16px sm:py-24px">
    <!-- <div class="p-16px box box-max-w-2xl sm:p-24px"> -->
    <div class="grid grid-cols-12 gap-16px">
      <ul
        v-for="(palette, index) in colors"
        :key="index"
        class="col-span-12 m-0 flex-auto list-none p-0 md:col-span-4"
      >
        <li
          v-for="(item, key) in palette"
          :key="key"
          :style="{ backgroundColor: item, color: chroma.contrast(item, '#fff') >= 3 ? '#fff' : '#000' }"
          class="flex justify-between p-16px"
        >
          <div>{{ key }}</div>
          <div>{{ item }}</div>
        </li>
      </ul>
    </div>
    <!-- </div> -->
  </AppContainer>
</template>
