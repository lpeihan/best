module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  plugins: ['import'],
  rules: {
    'vue/multi-word-component-names': 'off',
    eqeqeq: 2,
    'no-underscore-dangle': ['error', { allow: ['__name'] }],
    'no-else-return': 2,
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        ...require('./.prettierrc.js'),
      },
    ],
  },
};
