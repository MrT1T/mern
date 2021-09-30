module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  extends: [
    'plugin:react/recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier'
  ],
  plugins: ['prettier'],

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
    'no-param-reassign': 'off',

    'node/no-unsupported-features/es-syntax': 'off'
  },
  overrides: [
    {
      files: ['*.jsx', '*.js']
    }
  ]
};
