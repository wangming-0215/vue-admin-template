<script lang="ts" setup>
import chroma from 'chroma-js';
import { computed } from 'vue';
import { createPalette } from '~/colors';

const color = '#18a058';

const palette = computed(() => {
  return createPalette(color);
});
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center">
    <div class="flex items-center justify-center">
      <div
        v-for="item in palette"
        :key="item"
        class="w-100px h-100px flex items-center justify-center"
        :style="{
          backgroundColor: item,
          color: chroma.contrast(item, '#fff') >= 3 ? '#fff' : '#000',
        }"
      >
        {{ item }}
      </div>
    </div>
    <div class="m-16px">
      <NButton type="primary">
        Primary
      </NButton>
    </div>
  </div>
</template>
