import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';

export default [
  {
    files: ['**/*.{js,vue}'],
    ignores: ['dist/**','node_modules/**'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: { js: 'espree' },
        ecmaVersion: 2023,
        sourceType: 'module'
      },
      globals: {
        window: 'readonly',
        document: 'readonly'
      }
    },
    plugins: { vue: pluginVue },
    rules: {
      ...pluginVue.configs['vue3-recommended'].rules,
      'vue/multi-word-component-names': 'off'
    }
  },
  prettier
];
