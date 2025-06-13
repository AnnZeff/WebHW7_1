const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'qke9y3',
  e2e: {
    baseUrl: "https://qamid.tmweb.ru/client/index.php",
    specPattern: "cypress/e2e/**/*.spec.{js,jsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
