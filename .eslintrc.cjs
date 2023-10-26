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
        // project: './tsconfig.json',
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
        'react/react-in-jsx-scope': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'max-classes-per-file': 'off',
        'no-param-reassign': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'no-unused-expressions': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'import/extensions': 'off',
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
      files: ['*.astro'],
      plugins: ["astro"],
      env: {
        node: true,
        "astro/astro": true,
        es2020: true,
      },
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
        sourceType: "module",
      },
      rules: {
        'jsx-quotes': ['error', 'prefer-single'],
      },
    },
  ],
};
