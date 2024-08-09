import type { Router } from 'vue-router';

import { useAuthStore } from '@/features/auth';

export default function setupAuthGuard(router: Router) {
  router.beforeEach(async (to) => {
    const authStore = useAuthStore();
    const hasLoggedIn = authStore.hasLoggedIn;
    const needLogin = to.meta.requiresAuth;

    if (hasLoggedIn && !authStore.profile) {
      authStore.getProfile();
    }

    // 在已登录的状态下访问登录页，自动跳转首页
    if (hasLoggedIn && to.name === '/auth/sign-in') {
      return { name: '/' };
    }

    // 在未登录状态下访问需要登录的页面，自动跳转登录页
    if (needLogin && !hasLoggedIn) {
      return { name: '/auth/sign-in' };
    }

    return true;
  });
}
