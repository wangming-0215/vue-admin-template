<script lang="ts" setup>
import { AppContainer } from '@/components';

import TheStatistics from './TheStatistics.vue';
import TheNewSongList from './TheNewSongList.vue';
import TheHotSongList from './TheHotSongList.vue';
import TheViralSongList from './TheViralSongList.vue';
import TheProjectNews from './TheProjectNews.vue';
</script>

<template>
  <AppContainer class="flex-col gap-16px p-16px sm:p-24px">
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
        <TheProjectNews />
      </div>
      <div class="col-span-full xl:col-span-5">
        <div class="flex-col gap-16px">
          <NCard :bordered="false" size="small" segmented class="styled-card" title="待办事项">
            <div class="p-48px">
              <NEmpty />
            </div>
          </NCard>
          <NCard :bordered="false" size="small" segmented class="styled-card" title="项目动态">
            <div class="p-48px">
              <NEmpty />
            </div>
          </NCard>
        </div>
      </div>
    </div>
  </AppContainer>
</template>
