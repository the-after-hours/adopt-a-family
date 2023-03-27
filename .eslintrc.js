module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jsx-a11y/recommended',
  ],
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'react',
    'react-refresh',
    'react-hooks',
  ],
  root: true,
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn', // TODO: remove after ts migration
     '@typescript-eslint/no-unsafe-member-access': 'warn', // TODO: remove after ts migration
    '@typescript-eslint/restrict-template-expressions': 'warn', // TODO: remove after ts migration
    '@typescript-eslint/prefer-ts-expect-error': 'warn',
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-expect-error': 'allow-with-description',
      },
    ],
    '@typescript-eslint/no-unsafe-assignment': 'warn',
  },
};
