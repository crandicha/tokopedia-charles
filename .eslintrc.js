module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  extends: ['next/core-web-vitals', 'prettier', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-console': [
      2,
      {
        allow: ['warn', 'error'],
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          ['internal', 'parent', 'sibling', 'index'],
          'type',
          'unknown',
        ],
        pathGroups: [
          { pattern: '@wartek-id/*', group: 'external', position: 'after' },
          { pattern: 'assets/**', group: 'unknown', position: 'after' },
          { pattern: 'styles/**', group: 'unknown', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: [],
        'newlines-between': 'always',
      },
    ],
  },
}
