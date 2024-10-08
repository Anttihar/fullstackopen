module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'indent': ['error', 2],
    'semi': ['error', 'never'],
    'eqeqeq': "error",
    'no-trailing-spaces': "error",
    'object-curly-spaces': ['error', 'always'],
    'object-curly-spacing': ['error', { 'before': true, 'after': true }]
  },
}
