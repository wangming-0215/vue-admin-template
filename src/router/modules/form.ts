import type { RouteRecordRaw } from 'vue-router';

const FORM_ROUTES: RouteRecordRaw[] = [{
  path: '/form',
  name: '/form',
  meta: {
    layout: () => import('~/layouts/TheMainLayout/index.vue'),
    title: '表单',
    requiresAuth: false,
    icon: 'carbon:information',
  },
  children: [
    {
      path: '/form/basic',
      name: '/form/basic',
      component: () => import('~/features/form/basic/index.vue'),
      meta: {
        title: '基础表单',
        requiresAuth: false,
      },
    },
    {
      path: '/form/advanced',
      name: '/form/advanced',
      component: () => import('~/features/form/advanced/index.vue'),
      meta: {
        title: '高级表单',
        requiresAuth: false,
      },
    },
    {
      path: '/form/hidden-in-menus',
      name: '/form/hidden-in-menus',
      component: () => import('~/features/dashboard/views/index.vue'),
      meta: {
        title: '菜单隐藏',
        hiddenInMenu: true,
      },
    },
  ],
}];

export default FORM_ROUTES;
