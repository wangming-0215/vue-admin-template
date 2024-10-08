import { createApp } from 'vue';

import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './store';
import { enableMocking } from './__mocks__/utils';

import 'virtual:uno.css';
import './styles/main.css';

async function setupApp() {
  // 解决 tailwind reset 样式和 naive ui 样式冲突问题
  // const meta = document.createElement('meta');
  // meta.name = 'naive-ui-style';
  // document.head.appendChild(meta);

  const app = createApp(App);

  setupStore(app);

  await setupRouter(app);

  app.mount('#app');
}

// setupApp();

enableMocking().then(() => {
  setupApp();
});
