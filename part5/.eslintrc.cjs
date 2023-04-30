module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      files: ['cypress/e2e/*.cy.js', 'cypress/support/commands.js'],
      env: { 'cypress/globals': true },
      extends: ['plugin:cypress/recommended'],
      plugins: ['cypress'],
    },
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      env: { 'jest/globals': true },
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
      ],
      plugins: [
        'jest',
        'jest-dom',
        'testing-library',
      ],
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'import/no-extraneous-dependencies': [2, {
      devDependencies: true,
    }],
    'no-console': 0,
  },
};
