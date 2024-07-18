<script lang="ts" setup>
import { getAssetUrl } from '~/utils';
</script>

<template>
  <NCard :bordered="false" class="styled-card">
    <div class="size-72px rd-1/2 overflow-hidden">
      <img class="size-full" :src="getAssetUrl('avatar.png')" />
    </div>
  </NCard>
</template>
