const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './e2e',
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3001/health',
    reuseExistingServer: !process.env.CI,
  },
  use: { baseURL: 'http://localhost:3001' },
})