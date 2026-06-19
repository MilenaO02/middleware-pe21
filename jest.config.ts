import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  restoreMocks: true,
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    '^(\\.\\.?/.*)\\.js$': '$1',
  },
};

export default config;