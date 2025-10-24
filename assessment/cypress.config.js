// Use `import` instead of `require`
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Node event listeners go here
    },
    baseUrl: "https://mern-x-exit-ed5brid7o-milan-patels-projects-a7fb399e.vercel.app",
    specPattern: "cypress/integration/**/*.spec.js",
    video: false, // disable video recording if not needed
  },
  reporter: "mochawesome",
  reporterOptions: {
    // To display small circular charts regarding test results
    charts: true,
    // Generate JSON file to create custom reports
    json: true,
    // Customize the directory in which reports are saved
    reportsDir: "reports/your-reports-folder",
    // Customize the report file name
    reportFilename: "my-report",
    // Generate new report file or overwrite the a single file
    overwrite: false,
  },
});
