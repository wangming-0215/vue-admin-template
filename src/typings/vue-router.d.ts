import 'vue-router';

declare module 'vue-router' {
  export interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
    // layout?: () => Promise<Component | DefineComponent>;
    /** 在菜单中隐藏 */
    hiddenInMenu?: boolean;
    /** 高亮 */
    activeMenu?: string;
    /** 菜单 icon */
    icon?: string;
  }

  export interface TypesConfig {
    RouteNamedMap: import('@/router').RouteNamedMap;
  }
}
