import { h as createElement } from 'vue';
import type { Component } from 'vue';
import { NIcon } from 'naive-ui';

/**
 * 渲染图标
 * @param icon
 * @return icon 组件
 */
export default function renderIcon(icon: Component) {
  return () => createElement(
    NIcon,
    null,
    { default: () => createElement(icon) },
  );
}
