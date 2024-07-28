import type { App } from 'vue';
import { createPinia } from 'pinia';
import { logger } from './plugins';

export function setupStore(app: App) {
  const pinia = createPinia();
  pinia.use(logger);
  app.use(pinia);
}

export const STORE_ID_PREFIX = '@@wm';

type Namespace = string | `${string}.${string}`;

/**
 * 生成 pinia store id
 * @param name
 */
export function createStoreId<T extends Namespace>(name: T): `${typeof STORE_ID_PREFIX}.${T}` {
  return `${STORE_ID_PREFIX}.${name}`;
}
