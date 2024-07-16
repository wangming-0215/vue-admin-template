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
  <div class="flex-col items-center justify-center" style="height: calc(100vh - 56px - 1px)">
    <div class="flex-center">
      <div
        v-for="item in palette"
        :key="item"
        class="w-100px h-100px flex-center"
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
        确定
      </NButton>
    </div>
    <div class="w-200px">
      <NCard>Card</NCard>
    </div>
  </div>
</template>
