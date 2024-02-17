import path from 'node:path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';
import Unocss from 'unocss/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import WebFontDownload from 'vite-plugin-webfont-dl';

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    Components({
      dts: 'src/components.d.ts',
      extensions: ['vue'],
      version: 3,
      resolvers: [NaiveUiResolver()],
    }),
    Unocss(),
    WebFontDownload(),
    VueDevTools(),
  ],
});
