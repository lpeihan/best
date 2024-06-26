const globals = require('globals');
const pluginJs = require('@eslint/js');
const pluginVue = require('eslint-plugin-vue');
const prettier = require('eslint-config-prettier');

module.exports = [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  prettier,
  {
    languageOptions: { globals: globals.browser },
    files: ['**/*.{js,mjs,cjs,vue}'],
    ignores: ['dist', 'node_modules', 'public'],
    rules: {
      'vue/no-multiple-template-root': 'off',
    },
  },
];
