module.exports = {
  root: true,
  env: { browser: true, es2023: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: { 'vue/multi-word-component-names': 'off' }
};
