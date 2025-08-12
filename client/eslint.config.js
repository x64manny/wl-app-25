import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
  files: ['**/*.{js,ts,vue}'],
    ignores: ['dist/**','node_modules/**'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: {
          js: 'espree',
          ts: tsParser
        },
        ecmaVersion: 2023,
        sourceType: 'module'
      },
      globals: {
        window: 'readonly',
        document: 'readonly'
      }
    },
    plugins: { vue: pluginVue, '@typescript-eslint': tsPlugin },
    rules: {
      ...pluginVue.configs['vue3-recommended'].rules,
      ...tsPlugin.configs.recommended.rules,
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    files: ['src/shims-vue.d.ts'],
    rules: { '@typescript-eslint/no-explicit-any': 'off' }
  },
  prettier
];
