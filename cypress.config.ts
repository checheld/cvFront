import { defineConfig } from "cypress";

export default defineConfig({

  e2e: {
    env: {
      // for heroku
      // LOGIN: 'leviossaCVAdmin',
      // PASSWORD: 'Pass123$'
      LOGIN: 'ISAdmin',
      PASSWORD: 'PE30.zAq123'
    },
    "video": true,
    "experimentalSessionAndOrigin": true,
    "baseUrl": "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
