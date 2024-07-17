export const STORE_ID_PREFIX = '@wm';

/**
 * 生成 pinia store id
 * @param name
 */
export function createStoreId(name: string) {
  return `${STORE_ID_PREFIX}/${name}`;
}
