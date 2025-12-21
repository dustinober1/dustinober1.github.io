/**
 * Jest Setup File
 * Configures global test utilities and mocks
 */

import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js Image component for faster tests
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt || ''} />;
    },
}));

// Mock window.matchMedia for responsive component tests
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Mock IntersectionObserver for lazy loading tests
global.IntersectionObserver = class IntersectionObserver {
    constructor(callback) {
        this.callback = callback;
    }
    observe() { return null; }
    disconnect() { return null; }
    unobserve() { return null; }
};

// Mock ResizeObserver for responsive component tests
global.ResizeObserver = class ResizeObserver {
    observe() { return null; }
    disconnect() { return null; }
    unobserve() { return null; }
};

// Suppress console errors during tests (optional - uncomment if needed)
// global.console = {
//   ...console,
//   error: jest.fn(),
//   warn: jest.fn(),
// };
