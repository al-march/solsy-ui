module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 80,
  quoteProps: 'consistent',
  jsxSingleQuote: true,
  bracketSpacing: false,
  bracketSameLine: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  plugins: [
    require('@trivago/prettier-plugin-sort-imports'),
    require('prettier-plugin-sort-json'),
    require('prettier-plugin-packagejson'),
  ],
};
