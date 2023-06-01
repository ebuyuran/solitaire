module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'jsx-quotes': [2, 'prefer-single'],
    'import/prefer-default-export': [0],
    'import/no-default-export': [2],
    '@typescript-eslint/no-unused-vars': [1],
    'func-names': [0],
    'no-else-return': [0],
    'operator-linebreak': [0],
    'react/destructuring-assignment': [0],
    'react/require-default-props': [0],
    'react/no-unused-prop-types': [1],
    'react/jsx-curly-brace-presence': [2, { props: 'always', children: 'never' }],
  },
};
