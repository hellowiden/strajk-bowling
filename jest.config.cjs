module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-transformer-svg',
  },
  transformIgnorePatterns: ['/node_modules/(?!(nanoid)/)'],
};
