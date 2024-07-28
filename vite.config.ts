import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import VueDevTools from 'vite-plugin-vue-devtools';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import WebFontDownload from 'vite-plugin-webfont-dl';
import Unocss from 'unocss/vite';

import packageJson from './package.json';

function now() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const seconds = now.getSeconds();
  return `${year}年${month}月${date}日 ${hour}:${minute}:${seconds}`;
}

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __LAST_BUILD_TIME__: JSON.stringify(now()),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    Vue(),
    VueJsx(),
    Components({
      dirs: [],
      dts: true,
      extensions: ['vue'],
      version: 3,
      resolvers: [NaiveUiResolver()],
    }),
    Unocss(),
    WebFontDownload('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap'),
    VueDevTools(),
  ],
});
