<script lang="ts" setup>
import { TheSongListItem } from '../components';

defineOptions({ name: 'TheNewSongList', inheritAttrs: false });

const FAKE_DATA = [
  {
    id: 6,
    cover: 'https://picsum.photos/seed/6/200/200',
    title: '童话镇',
    remark: '',
    artists: ['小野来了'],
  },
  {
    id: 20,
    cover: 'https://picsum.photos/seed/20/200/200',
    title: '暮色回响',
    remark: '《默杀》电影推广曲',
    artists: ['张韶涵'],
  },
  {
    id: 21,
    cover: 'https://picsum.photos/seed/21/200/200',
    title: 'FOREVER',
    remark: '',
    artists: ['BABYMONSTER'],
  },
  {
    id: 22,
    cover: 'https://picsum.photos/seed/22/200/200',
    title: '卡尔永远的神',
    remark: '',
    artists: ['胖猫'],
  },
  {
    id: 8,
    cover: 'https://picsum.photos/seed/8/200/200',
    title: '守村人',
    remark: '',
    artists: ['薛之谦'],
  },
  {
    id: 23,
    cover: 'https://picsum.photos/seed/23/200/200',
    title: 'GRAD SONG',
    remark: '',
    artists: ['艾志恒Asen', 'Young7rouble', '火人'],
  },
  {
    id: 24,
    cover: 'https://picsum.photos/seed/24/200/200',
    title: 'Blending Love',
    remark: '七元版',
    artists: ['七元'],
  },
  {
    id: 25,
    cover: 'https://picsum.photos/seed/25/200/200',
    title: '阿嬷',
    remark: '国语版',
    artists: ['周林枫'],
  },
  {
    id: 26,
    cover: 'https://picsum.photos/seed/26/200/200',
    title: '等你的回答',
    remark: '',
    artists: ['TF家族', 'TF家族-朱志鑫', 'TF家族-张泽禹', 'TF家族-张极', 'TF家族-左航', 'TF家族-苏新皓', 'TF家族-张峻豪', 'TF家族-余宇涵', 'TF家族-穆祉丞', 'TF家族-陈天润', 'TF家族-童禹坤', 'TF家族-邓佳鑫', 'TF家族-黄朔', '时代峰峻-张子墨'],
  },
  {
    id: 11,
    cover: 'https://picsum.photos/seed/11/200/200',
    title: '大雨不停下',
    remark: '',
    artists: ['黄子弘凡'],
  },
];
</script>

<template>
  <NCard :bordered="false" size="small" class="styled-card" segmented title="新歌榜">
    <ul>
      <li v-for="item in FAKE_DATA" :key="item.id">
        <TheSongListItem
          :id="item.id"
          :artists="item.artists"
          :cover="item.cover"
          :name="item.title"
          :remark="item.remark"
        />
      </li>
    </ul>
  </NCard>
</template>
