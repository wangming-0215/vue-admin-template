import { RiInformation2Line } from '@remixicon/vue';
import type { RouteRecordRaw } from 'vue-router';

const formRoute: RouteRecordRaw = {
  path: '/form',
  name: '/form',
  meta: {
    layout: () => import('~/layouts/MainLayout/index.vue'),
    title: '表单',
    requiresAuth: false,
    icon: RiInformation2Line,
  },
  children: [
    {
      path: '/form/basic',
      name: '/form/basic',
      component: () => import('~/features/dashboard/index.vue'),
      meta: {
        title: '基础表单',
        requiresAuth: false,
      },
    },
    {
      path: '/form/advanced',
      name: '/form/advanced',
      component: () => import('~/features/dashboard/index.vue'),
      meta: {
        title: '高级表单',
        requiresAuth: false,
      },
    },
    {
      path: '/form/hidden-in-menus',
      name: '/form/hidden-in-menus',
      component: () => import('~/features/dashboard/index.vue'),
      meta: {
        title: '菜单隐藏',
        hiddenInMenu: true,
      },
    },
  ],
};

export default formRoute;
