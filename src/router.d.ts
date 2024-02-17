import 'vue-router';

declare module 'vue-router' {
  export interface RouteMeta {
    title: string;
    requiresAuth: boolean;
  }
}
