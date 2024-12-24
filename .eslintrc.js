module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'arrow-body-style': 'error',
    curly: 'error',
    'no-return-await': 'error',
    'no-else-return': 'error',
    'no-useless-return': 'error',
    'no-useless-catch': 'error',
    'no-useless-escape': 'error',
    'no-unreachable': 'error',
  },
};
