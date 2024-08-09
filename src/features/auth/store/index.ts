import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { jwtDecode } from 'jwt-decode';
import authService from '../services';
import type { Profile } from '../models';
import { createStoreId } from '@/store';
import { storage } from '@/utils';
import { StorageKeys } from '@/constants';

const storeId = createStoreId('auth');

function getToken() {
  const token = storage.get<string>(StorageKeys.AccessToken);
  if (token) {
    try {
      const payload = jwtDecode(token);
      const { exp } = payload;
      if (exp && Math.floor(Date.now() / 1000) <= exp)
        return token;

      storage.remove(StorageKeys.AccessToken);
      return '';
    } catch {
      storage.remove(StorageKeys.AccessToken);
      return '';
    }
  }

  return '';
}

interface SignUpOptions {
  email: string;
  nickname: string;
  password: string;
  confirm_password: string;
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

  /**
   * 注册
   * @param options
   */
  async function signUp(options: SignUpOptions) {
    return authService.signUp(options);
  }

  return {
    token: tokenRef,
    profile: profileRef,
    hasLoggedIn,
    signIn,
    signUp,
    getProfile,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

export default useAuthStore;
