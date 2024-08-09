// @ts-check
import defineConfig from '@antfu/eslint-config';

export default defineConfig(
  {
    unocss: false,
    jsonc: false,
    stylistic: {
      semi: true,
    },
  },
).override('antfu/stylistic/rules', {
  rules: {
    // 'curly': ['error', 'multi-line', 'consistent'],
    'style/brace-style': ['error', '1tbs'],
    // 'antfu/if-newline': 'off',
  },
}).override('antfu/vue/rules', {
  rules: {
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'always',
        component: 'always',
      },
      svg: 'always',
      math: 'always',
    }],
  },
});
