import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    /* eslint-disable-next-line no-unused-vars */
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
  },
  env: {
    BACKEND: 'http://localhost:3001',
  },
});
