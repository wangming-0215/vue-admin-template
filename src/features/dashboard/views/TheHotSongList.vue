<script lang="ts" setup>
import { TheSongListItem } from '../components';

defineOptions({ name: 'TheHotSongList', inheritAttrs: false });

const FAKE_DATA = [
  {
    id: 1,
    cover: 'https://picsum.photos/seed/1/200/200',
    name: '暮色回响',
    remark: '',
    artists: ['吉星出租'],
  },
  {
    id: 2,
    cover: 'https://picsum.photos/seed/2/200/200',
    name: '若月亮没来',
    remark: '若是月亮还没来',
    artists: ['王宇宙Leto', '乔浚丞'],
  },
  {
    id: 3,
    cover: 'https://picsum.photos/seed/3/200/200',
    name: '如果可以',
    remark: '《月老》电影主题曲',
    artists: ['韦礼安'],
  },
  {
    id: 4,
    cover: 'https://picsum.photos/seed/4/200/200',
    name: '我好像在哪里见过你',
    remark: '《精灵王座》动画电影主题曲',
    artists: ['薛之谦'],
  },
  {
    id: 5,
    cover: 'https://picsum.photos/seed/5/200/200',
    name: '无名的人',
    remark: '《雄狮少年》电影主题曲',
    artists: ['毛不易'],
  },
  {
    id: 6,
    cover: 'https://picsum.photos/seed/6/200/200',
    name: '童话镇',
    remark: '',
    artists: ['小野来了'],
  },
  {
    id: 7,
    cover: 'https://picsum.photos/seed/7/200/200',
    name: '偏爱',
    remark: '《仙剑奇侠传3》电视剧插曲',
    artists: ['张芸京'],
  },
  {
    id: 8,
    cover: 'https://picsum.photos/seed/8/200/200',
    name: '守村人',
    remark: '',
    artists: ['薛之谦'],
  },
  {
    id: 9,
    cover: 'https://picsum.photos/seed/9/200/200',
    name: '奢香夫人',
    remark: '',
    artists: ['凤凰传奇'],
  },
  {
    id: 10,
    cover: 'https://picsum.photos/seed/10/200/200',
    name: '你在，不在',
    remark: '《幸福一定强》电视剧插曲',
    artists: ['郭采洁'],
  },
];
</script>

<template>
  <NCard :bordered="false" size="small" class="styled-card" segmented title="热歌榜">
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
