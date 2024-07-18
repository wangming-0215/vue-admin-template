export type Lazy<T> = () => Promise<T>;

declare global {
  export interface Window {
    __NAIVE_UI_THEME_TOKEN__: import('naive-ui').GlobalThemeOverrides['common'];
    __APP_VERSION__: string;
    __LAST_BUILD_TIME__: string;
  }
}
