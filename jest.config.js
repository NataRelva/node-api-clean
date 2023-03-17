module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!**/protocols/**',
    '!**/*.protocols.ts',
    '!**/*-protocols.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: "@shelf/jest-mongodb",
  transform: { 
    '.+\\.ts$': 'ts-jest'
  },
}