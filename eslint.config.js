// @ts-check
import defineConfig from '@antfu/eslint-config';

export default defineConfig(
  {
    unocss: true,
    jsonc: false,
    toml: false,
    yaml: false,
    markdown: false,
    stylistic: {
      semi: true,
    },
    typescript: true,
  },
)
  .override(
    'antfu/stylistic/rules',
    {
      rules: {
        // 'curly': ['error', 'multi-line', 'consistent'],
        'style/brace-style': ['error', '1tbs'],
        'style/operator-linebreak': ['error', 'after'],
        'style/max-len': [
          'error',
          {
            code: 120,
            tabWidth: 2,
            comments: 120,
            ignorePattern: '',
            ignoreComments: false,
            ignoreTrailingComments: false,
            ignoreUrls: true,
            ignoreStrings: false,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
          },
        ],
        // 'antfu/if-newline': 'off',
      },
    },
  )
  .override(
    'antfu/vue/rules',
    {
      files: ['**/*.vue'],
      rules: {
        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'always',
              normal: 'always',
              component: 'always',
            },
            svg: 'always',
            math: 'always',
          },
        ],
        'style/max-len': 'off',
        'vue/max-len': [
          'error',
          {
            code: 120,
            template: 120,
            tabWidth: 2,
            comments: 120,
            ignorePattern: '',
            ignoreComments: false,
            ignoreTrailingComments: false,
            ignoreUrls: true,
            ignoreStrings: false,
            ignoreTemplateLiterals: false,
            ignoreRegExpLiterals: false,
            ignoreHTMLAttributeValues: false,
            ignoreHTMLTextContents: false,
          },
        ],
        'vue/first-attribute-linebreak': [
          'error',
          {
            singleline: 'ignore',
            multiline: 'below',
          },
        ],
        'vue/max-attributes-per-line': [
          'error',
          {
            singleline: {
              max: 6,
            },
            multiline: {
              max: 1,
            },
          },
        ],
        'vue/operator-linebreak': [
          'error',
          'after',
        ],
      },
    },
  )
  .override(
    'antfu/imports/rules',
    {
      rules: {
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
            'pathGroups': [
              {
                pattern: '@/**',
                group: 'parent',
                position: 'before',
              },
              {
                pattern: '../**',
                group: 'parent',
                position: 'after',
              },
              {
                pattern: './**',
                group: 'sibling',
                position: 'after',
              },
            ],
          },
        ],
      },
    },
  );
