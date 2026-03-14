import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

/* + Prettier */
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  // 1. glob.ignored.folders
  { ignores: ['dist', 'node_modules', 'build'] },
  // 2. base.conf.-s (JS + TS) (ко всем по дэфолту:)
  js.configs.recommended,
  ...tseslint.configs.recommended, // got [] - дост.список
  {
    // 3. main.configuration + spec. for React + TS
    // [х] extends: [ js.configs.recommended,
    // ...tseslint.configs.recommended,
    // (...)
    // prettierConfig, (откл. конфликт.-ие rules)],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      // [ ! ] TS: парсер, если tseslint не подхватил сам
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
      }
    },
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prettier': prettierPlugin // + сам плагин Prettier
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      // + Pr.-r
      'prettier/prettier': 'error',
      // актив.: пометка ошибки форматирования
      // как ошибки линтинга
      'no-console': 'warn' // prod-n*
    },
  },
  // 4. switch-off.conflict.rules
  prettierConfig
]);