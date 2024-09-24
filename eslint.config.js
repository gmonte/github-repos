import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import importHelpers from 'eslint-plugin-import-helpers'
import vitest from 'eslint-plugin-vitest'

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules'
    ],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': react,
      'import-helpers': importHelpers,
      'vitest': vitest
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/function-component-definition': [
        'error',
        { namedComponents: 'function-declaration' }
      ],
      'no-trailing-spaces': ['error'],
      'eol-last': ['error', 'always'],
      'semi': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'import-helpers/order-imports': [
        'error',
        {
          newlinesBetween: 'always',
          groups: [
            '/^react/',
            'module',
            "/^@//",
            ["parent", "sibling", "index"]
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'],
          ],
          extensions: ['.ts', '.tsx', '.json'],
        },
      },
    },
  },
)
