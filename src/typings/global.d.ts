declare global {
  export interface Window {
    __NAIVE_UI_THEME_TOKEN__: import('naive-ui').GlobalThemeOverrides['common'];
    __APP_VERSION__: string;
    __LAST_BUILD_TIME__: string;
    $message?: import('naive-ui').MessageProviderInst;
    $dialog?: import('naive-ui').DialogProviderInst;
    $notification?: import('naive-ui').NotificationProviderInst;
  }
}

export {};
