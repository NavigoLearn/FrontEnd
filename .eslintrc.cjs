module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: [
    '*.spec.ts',
    '*.test.ts',
    'vite.config.ts',
    'vitest.config.ts',
    'tailwind.config.cjs',
    'astro.config.mjs',
    'playwright.config.ts',

    '/__tests__/*',
    '/cypress/*',
  ],

  overrides: [
    {
      // react files config
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:import/typescript',
      ],
      settings: {
        'import/resolver': {
          typescript: {},
        },
      },
      plugins: ['@typescript-eslint'],

      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },

      rules: {
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            endOfLine: 'auto',
          },
        ],
        'react/jsx-filename-extension': [
          1,
          { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'max-classes-per-file': 'off',
        'no-param-reassign': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'react/function-component-definition': [
          2,
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
      },
    },
    {
      extends: [
        'plugin:astro/all',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        'jsx-quotes': ['error', 'prefer-single'],
      },
    },
  ],
};
