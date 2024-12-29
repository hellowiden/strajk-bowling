module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-transformer-svg',
  },
  transformIgnorePatterns: ['/node_modules/(?!(nanoid)/)'],
  collectCoverage: true, // Enable coverage collection
  coverageDirectory: './coverage', // Output coverage files to the "coverage" directory
  coverageReporters: ['json', 'text', 'lcov'], // Generate JSON, text, and LCOV reports
  globalTeardown: './scripts/createCoverageReport.js',
};
