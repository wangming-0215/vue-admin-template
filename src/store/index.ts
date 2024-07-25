import type { App } from 'vue';
import { createPinia } from 'pinia';

export function setupStore(app: App) {
  const store = createPinia();
  app.use(store);
}

export const STORE_ID_PREFIX = '@wm';

/**
 * 生成 pinia store id
 * @param name
 */
export function createStoreId(name: string) {
  return `${STORE_ID_PREFIX}/${name}`;
}
