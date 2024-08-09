import type { AppRoute } from '../typings';

const FORM_ROUTES: AppRoute[] = [{
  path: '/form',
  name: '/form',
  layout: () => import('@/layouts/MainLayout/index.vue'),
  meta: {
    title: '表单',
    requiresAuth: true,
    icon: 'carbon:information',
  },
  children: [
    {
      path: '/form/basic',
      name: '/form/basic',
      component: () => import('@/features/form/basic/index.vue'),
      meta: {
        title: '基础表单',
      },
    },
    {
      path: '/form/advanced',
      name: '/form/advanced',
      component: () => import('@/features/form/advanced/index.vue'),
      meta: {
        title: '高级表单',
      },
    },
    {
      path: '/form/hidden-in-menus',
      name: '/form/hidden-in-menus',
      component: () => import('@/features/dashboard/views/index.vue'),
      meta: {
        title: '菜单隐藏',
        hiddenInMenu: true,
      },
    },
  ],
}];

export default FORM_ROUTES;
