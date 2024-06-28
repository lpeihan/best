module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-less',
    'stylelint-config-standard-vue',
  ],
  plugins: ['stylelint-order'],
  ignoreFiles: ['dist/**/*', 'node_modules/**/*'],
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'no-descending-specificity': null, // 不允许较低特异性的选择器出现在覆盖较高特异性的选择器之后
    'selector-class-pattern': null,
    'custom-property-empty-line-before': null,
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'width',
      'height',
    ],
  },
};
