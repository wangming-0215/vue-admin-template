<script setup lang="ts">
defineOptions({ name: 'TheHotMovieList', inheritAttrs: false });
</script>

<template>
  <NCard :bordered="false" size="small" segmented class="styled-card" title="正在热映">
    <ul>
      <li v-for="item in 2" :key="item">
        <div class="flex-y-center py-8px gap-16px">
          <div class="h-300px aspect-135/203 shrink-0 font-size-0">
            <img src="https://picsum.photos/seed/1/135/203" class="object-contain size-full" />
          </div>
          <div>
            <div class="font-size-medium mb-8px">
              走走停停
            </div>
            <div>导演：龙飞</div>
            <div>主演：胡歌/高圆圆/岳红/周野芒/金靖等</div>
            <div>类型: 剧情 / 喜剧 / 家庭</div>
            <div>制片国家/地区: 中国大陆</div>
            <div>语言: 汉语普通话 / 四川话</div>
            <div>上映日期：2024-06-08(中国大陆)/2024-04-19(北京国际电影节)</div>
            <div>片长: 103分钟 / 99分钟(北京国际电影节)</div>
            <div>又名: Gold or Shit / G for Gap</div>
            <div>简介：脆皮青年吴迪（胡歌 饰），工作感情双双失意，沮丧返乡。吴迪“突袭”返乡的行为打破了一家人原本平静的生活，他不仅需要重新面对与家人的“亲密”相处，还要为自己的未来寻找更多的可能。在现实面前多番碰壁后，一次偶然的机会下他与高中同学冯柳柳（高圆圆 饰）相遇，随后生活也发生了意想不到的转变。</div>
          </div>
        </div>
      </li>
    </ul>
  </NCard>
</template>
