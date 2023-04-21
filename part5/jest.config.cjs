module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/file-mock.js',
    '\\.(css|less)$': '<rootDir>/tests/__mocks__/style-mock.js',
  },
  setupFilesAfterEnv: [
    '<rootDir>/setupTests.js',
  ],
  testEnvironment: 'jest-environment-jsdom',
  verbose: true,
};
