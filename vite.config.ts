import path from 'node:path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
// import VueDevTools from 'vite-plugin-vue-devtools';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import WebFontDownload from 'vite-plugin-webfont-dl';
import Unocss from 'unocss/vite';

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    VueJsx(),
    Components({
      dts: 'src/components.d.ts',
      extensions: ['vue'],
      version: 3,
      resolvers: [NaiveUiResolver()],
    }),
    Unocss(),
    WebFontDownload('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap'),
    // VueDevTools(),
  ],
});
