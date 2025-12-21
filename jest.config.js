/**
 * Jest Configuration for Next.js Portfolio
 * Demonstrates comprehensive testing setup for professional development
 */

const nextJest = require('next/jest');

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files
    dir: './',
});

// Custom Jest configuration
const customJestConfig = {
    // Setup files to run before each test
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

    // Test environment for React components
    testEnvironment: 'jsdom',

    // Module name mapping for absolute imports and aliases
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/src/components/$1',
        '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
        '^@/data/(.*)$': '<rootDir>/src/data/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    // Test file patterns
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
        '<rootDir>/__tests__/**/*.{js,jsx,ts,tsx}',
    ],

    // Coverage configuration
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/index.{js,ts}',
        '!src/**/*.stories.{js,jsx,ts,tsx}',
    ],

    // Coverage thresholds for quality assurance
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },

    // Ignore patterns
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],

    // Transform ignore patterns
    transformIgnorePatterns: [
        '/node_modules/',
        '^.+\\.module\\.(css|sass|scss)$',
    ],

    // Verbose output for detailed test results
    verbose: true,

    // Maximum workers for parallel test execution
    maxWorkers: '50%',
};

// Export the config wrapped by next/jest
module.exports = createJestConfig(customJestConfig);
