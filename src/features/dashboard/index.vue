<script lang="ts" setup>
import TheStatistics from './modules/TheStatistics.vue';
import TheNewSongList from './modules/TheNewSongList.vue';
import TheHotSongList from './modules/TheHotSongList.vue';
import TheViralSongList from './modules/TheViralSongList.vue';
</script>

<template>
  <div class="flex-col gap-16px">
    <TheStatistics />
    <div class="grid grid-cols-12 gap-16px">
      <div class="col-span-full xl:col-span-4">
        <TheNewSongList />
      </div>
      <div class="col-span-full xl:col-span-4">
        <TheHotSongList />
      </div>
      <div class="col-span-full xl:col-span-4">
        <TheViralSongList />
      </div>
    </div>
    <div class="grid grid-cols-12 gap-16px">
      <div class="col-span-full xl:col-span-7">
        <NCard :bordered="false" size="small" segmented class="styled-card" title="正在热映">
          <div class="h-680px" />
        </NCard>
      </div>
      <div class="col-span-full xl:col-span-5">
        <NCard :bordered="false" size="small" segmented class="styled-card" title="待办事项">
          <div class="h-680px" />
        </NCard>
      </div>
    </div>
  </div>
</template>
