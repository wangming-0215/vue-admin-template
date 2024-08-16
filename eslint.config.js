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
    typescript: {
      tsconfigPath: './tsconfig.json',
    },

  },
)
  .override(
    'antfu/stylistic/rules',
    {
      files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.jsx'],
      rules: {
        // 'curly': ['error', 'multi-line', 'consistent'],
        // 'style/brace-style': ['error', '1tbs'],
        'style/max-len': [
          'error',
          {
            code: 80,
            tabWidth: 2,
            comments: 80,
            ignorePattern: '',
            ignoreComments: false,
            ignoreTrailingComments: false,
            ignoreUrls: true,
            ignoreStrings: false,
            ignoreTemplateLiterals: false,
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
        'vue/max-len': [
          'error',
          {
            code: 80,
            template: 80,
            tabWidth: 2,
            comments: 80,
            ignorePattern: '^\\s*class="',
            ignoreComments: false,
            ignoreTrailingComments: false,
            ignoreUrls: true,
            ignoreStrings: false,
            ignoreTemplateLiterals: false,
            ignoreRegExpLiterals: true,
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
      },
    },
  )
  .override(
    'antfu/typescript/rules-type-aware',
    {
      rules: {
        'ts/strict-boolean-expressions': 'off',
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
