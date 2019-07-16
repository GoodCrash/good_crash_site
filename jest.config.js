module.exports = {
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js}', '!**/node_modules/**', '!**/dist/**'],
  coverageReporters: ['text-summary'],
};
