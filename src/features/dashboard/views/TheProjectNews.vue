<script setup lang="ts">
defineOptions({ name: 'TheProjectNews', inheritAttrs: false });
</script>

<template>
  <NCard :bordered="false" size="small" segmented class="styled-card h-full" title="项目动态">
    <div class="h-full flex-center">
      <NEmpty />
    </div>
  </NCard>
</template>
