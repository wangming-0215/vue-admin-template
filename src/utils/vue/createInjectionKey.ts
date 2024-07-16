import type { InjectionKey } from 'vue';

export default function createInjectionKey<T>(key: string): InjectionKey<T> {
  return Symbol(key);
}
