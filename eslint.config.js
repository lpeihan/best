const globals = require('globals');
const pluginJs = require('@eslint/js');
const pluginVue = require('eslint-plugin-vue');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    languageOptions: { globals: globals.browser },
    files: ['**/*.{js,mjs,cjs,vue}'],
    ignores: ['dist', 'node_modules', 'public'],
    rules: {
      'vue/no-multiple-template-root': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
];
