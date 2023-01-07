import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(_on: any, _config: any) {
      // implement node event listeners here
    },
    video: false,
    projectId: '4jwwnq',
  },
});
