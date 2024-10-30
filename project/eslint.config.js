import vue from 'eslint-plugin-vue'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import parser from 'vue-eslint-parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**'], // 忽略 dist 和 node_modules 目录
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),
  {
    plugins: {
      vue,
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },

      parser: parser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        parser: '@typescript-eslint/parser',
        jsxPragma: 'React',

        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      'no-var': 'error',

      'no-multiple-empty-lines': [
        'warn',
        {
          max: 1,
        },
      ],

      'no-console': 'off',
      'no-debugger': 'off',
      'no-unexpected-multiline': 'error',
      'no-useless-escape': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/semi': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/script-setup-uses-vars': 'error',
      'vue/no-mutating-props': 'off',
      'vue/attribute-hyphenation': 'off',
    },
  },
]
