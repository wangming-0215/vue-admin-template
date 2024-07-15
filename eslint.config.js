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
  {
    rules: {
      curly: ['error', 'multi-line'],
    },
  },
);
