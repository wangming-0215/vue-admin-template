<script lang="ts" setup>
import { TheDataCard } from '../components';

defineOptions({ name: 'TheStatistics', inheritAttrs: false });

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const FAKE_DATA = [
  {
    key: 'visit',
    title: '访问量',
    value: Intl.NumberFormat('zh-cn').format(random(100, 9999)),
    icon: 'carbon:analytics',
    up: Math.random() > 0.5,
  },
  {
    key: 'user',
    title: '新用户',
    value: Intl.NumberFormat('zh-cn').format(random(100, 9999)),
    icon: 'carbon:user-multiple',
    up: Math.random() > 0.5,
  },
  {
    key: 'download',
    title: '下载量',
    value: Intl.NumberFormat('zh-cn').format(random(100, 9999)),
    icon: 'carbon:download',
    up: Math.random() > 0.5,
  },
  {
    key: 'sales',
    title: '成交额',
    value: Intl.NumberFormat('zh-cn', { style: 'currency', currency: 'CNY' }).format(random(1000, 99999)),
    icon: 'carbon:money',
    up: Math.random() > 0.5,
  },
];
</script>

<template>
  <div class="grid grid-cols-12 gap-16px">
    <div v-for="item in FAKE_DATA" :key="item.key" class="col-span-full md:col-span-6 xl:col-span-3">
      <TheDataCard
        :icon="item.icon"
        :title="item.title"
        :value="item.value"
        :up="item.up"
      />
    </div>
  </div>
</template>
