<script lang="ts" setup>
import { TheSongListItem } from './components';

defineOptions({ name: 'TheViralSongList', inheritAttrs: false });

const FAKE_DATA = [
  {
    id: 8,
    cover: 'https://picsum.photos/seed/8/200/200',
    name: '守村人',
    remark: '',
    artists: ['薛之谦'],
  },
  {
    id: 11,
    cover: 'https://picsum.photos/seed/11/200/200',
    name: '大雨不停下',
    remark: '',
    artists: ['黄子弘凡'],
  },
  {
    id: 12,
    cover: 'https://picsum.photos/seed/12/200/200',
    name: '拨云见日',
    remark: '',
    artists: ['黄子弘凡'],
  },
  {
    id: 13,
    cover: 'https://picsum.photos/seed/13/200/200',
    name: '夏夜最后的烟火',
    remark: '',
    artists: ['颜人中'],
  },
  {
    id: 14,
    cover: 'https://picsum.photos/seed/14/200/200',
    name: '失眠症',
    remark: '',
    artists: ['黄子弘凡'],
  },
  {
    id: 15,
    cover: 'https://picsum.photos/seed/15/200/200',
    name: '称为',
    remark: '',
    artists: ['黄子弘凡'],
  },
  {
    id: 16,
    cover: 'https://picsum.photos/seed/16/200/200',
    name: '玻璃弹珠',
    remark: '',
    artists: ['黄子弘凡'],
  },
  {
    id: 17,
    cover: 'https://picsum.photos/seed/17/200/200',
    name: '你写下了我的名字',
    remark: '',
    artists: ['刘宇'],
  },
  {
    id: 18,
    cover: 'https://picsum.photos/seed/18/200/200',
    name: '童话镇',
    remark: '',
    artists: ['阎其儿Jill'],
  },
  {
    id: 19,
    cover: 'https://picsum.photos/seed/19/200/200',
    name: '楼外楼',
    remark: '',
    artists: ['时代少年团'],
  },
];
</script>

<template>
  <NCard :bordered="false" size="small" class="styled-card" segmented title="新歌榜">
    <ul>
      <li v-for="item in FAKE_DATA" :key="item.id">
        <TheSongListItem
          :id="item.id"
          :cover="item.cover"
          :name="item.name"
          :remark="item.remark"
          :artists="item.artists"
        />
      </li>
    </ul>
  </NCard>
</template>
