import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleDirectories: ['node_modules'],
  preset: 'ts-jest',
  setupFiles: ['./jest.setup.ts'],
  testEnvironment: 'node',
  verbose: true
};

export default config;
