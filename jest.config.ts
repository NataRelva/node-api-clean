/* eslint-disable @typescript-eslint/quotes */
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

export default {
  clearMocks: true,
  collectCoverage: true,
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  // coverageProvider: "v8"

  preset: "ts-jest",
  testEnvironment: "node",
  // the following line is needed in order to grab modules from the
  // src folder without the need to write them relatively
  moduleDirectories: ["node_modules", "src"]
}
