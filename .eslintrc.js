module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'react/display-name': 'off',
    'no-control-regex': 'off',
    'react/prop-types': 0,
    // indent: ['error', 4],
    'linebreak-style': ['error', 'unix'],
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'no-empty-function': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
