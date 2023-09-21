// More info at https://redwoodjs.com/docs/project-configuration-dev-test-build

const config = {
  rootDir: '../',
  preset: '@redwoodjs/testing/config/jest/web',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [],
  },
}

module.exports = config
