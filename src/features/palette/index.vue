<script lang="ts" setup>
import chroma from 'chroma-js';
import { computed } from 'vue';
import { createPalette } from '~/colors';

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
  <div class="grid grid-cols-3 gap-16px">
    <ul
      v-for="(palette, index) in colors"
      :key="index"
      class="list-none m-0 p-0 flex-auto"
    >
      <li
        v-for="(item, key) in palette"
        :key="key"
        :style="{ backgroundColor: item, color: chroma.contrast(item, '#fff') >= 3 ? '#fff' : '#000' }"
        class="p-16px flex justify-between"
      >
        <div>{{ key }}</div>
        <div>{{ item }}</div>
      </li>
    </ul>
  </div>
</template>
