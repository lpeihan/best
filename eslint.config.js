const globals = require('globals');
const pluginJs = require('@eslint/js');
const pluginVue = require('eslint-plugin-vue');

module.exports = [
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    ignores: ['dist', 'node_modules', 'public'],
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
];
