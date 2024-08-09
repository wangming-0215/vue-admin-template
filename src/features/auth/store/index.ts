import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import authService from '../services';
import type { Profile } from '../models';
import { createStoreId } from '@/store';
import { storage } from '@/utils';
import { StorageKeys } from '@/constants';

const storeId = createStoreId('auth');

function getToken() {
  return storage.get<string>(StorageKeys.AccessToken) ?? '';
}

const useAuthStore = defineStore(storeId, () => {
  const tokenRef = ref<string>(getToken());
  const profileRef = ref<Profile | null>(null);

  /** 是否已登录 */
  const hasLoggedIn = computed(() => Boolean(tokenRef.value));

  /**
   * 登录
   * @param email
   * @param password
   */
  async function signIn(email: string, password: string) {
    const token = await authService.signIn(email, password);
    tokenRef.value = token;
    storage.set(StorageKeys.AccessToken, token);
  }

  /**
   * 登录用户信息
   */
  async function getProfile() {
    const user = await authService.profile();
    profileRef.value = user;
  }

  return {
    token: tokenRef,
    profile: profileRef,
    signIn,
    getProfile,
    hasLoggedIn,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

export default useAuthStore;
