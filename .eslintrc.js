module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true
  },
  overrides: [
    {
      files: ['*.jsx', '*.js'],
      parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2021,
        sourceType: 'module'
      },
      plugins: ['prettier'],
      extends: [
        'plugin:react/recommended',
        'plugin:node/recommended',
        'plugin:prettier/recommended',
        'airbnb',
        'airbnb/hooks',
        'prettier'
      ],
      rules: {
        'react/prop-types': 1,
        'react/jsx-filename-extension': 0,
        'comma-dangle': 0,
        quotes: [2, 'single', { avoidEscape: true }],
        'react/jsx-props-no-spreading': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'no-unused-vars': 'warn',
        'react/require-default-props': 'off',
        'react/forbid-prop-types': 0,
        'import/prefer-default-export': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'no-return-assign': 'off',
        'no-param-reassign': 'off',

        'node/no-unsupported-features/es-syntax': 'off',
        'no-restricted-syntax': 'off',
        'no-underscore-dangle': 'off',

        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never'
          }
        ]
      },
      settings: {
        react: {
          version: 'detect'
        },
        node: {
          tryExtensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
          }
        }
      }
    },
    {
      files: ['*.test.js', '*.spec.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'node/no-extraneous-import': 'off'
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint', 'prettier'],
      extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:node/recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
      ],
      globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: { jsx: true, modules: true },
        ecmaVersion: 2021,
        sourceType: 'module',
        project: 'tsconfig.json'
      },
      rules: {
        'react/prop-types': 1,
        'react/jsx-filename-extension': 0,
        'comma-dangle': 0,
        quotes: [2, 'single', { avoidEscape: true }],
        'react/jsx-props-no-spreading': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'react/require-default-props': 'off',
        'react/forbid-prop-types': 0,
        'import/prefer-default-export': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'no-return-assign': 'off',
        'no-param-reassign': 'off',

        'node/no-unsupported-features/es-syntax': 'off',
        'no-restricted-syntax': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/no-empty-function': [
          'error',
          { allow: ['arrowFunctions'] }
        ],

        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never'
          }
        ]
      },
      settings: {
        react: {
          version: 'detect'
        },
        node: {
          tryExtensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
          }
        }
      }
    }
  ]
};
