/**
 * Footer Component Unit Tests
 * Tests footer rendering and dynamic year display
 */

import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer Component', () => {
    describe('Rendering', () => {
        it('renders the footer element', () => {
            render(<Footer />);

            expect(screen.getByRole('contentinfo')).toBeInTheDocument();
        });

        it('displays the current year', () => {
            const currentYear = new Date().getFullYear();
            render(<Footer />);

            expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
        });

        it('displays the copyright text', () => {
            render(<Footer />);

            expect(screen.getByText(/Dustin J. Ober/i)).toBeInTheDocument();
        });

        it('displays built with Next.js text', () => {
            render(<Footer />);

            expect(screen.getByText(/Built with Next.js/i)).toBeInTheDocument();
        });

        it('contains the container div', () => {
            const { container } = render(<Footer />);

            expect(container.querySelector('.container')).toBeInTheDocument();
        });
    });

    describe('Dynamic Content', () => {
        it('correctly calculates current year', () => {
            // Mock Date to ensure consistent testing
            const mockDate = new Date('2025-06-15');
            jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

            render(<Footer />);

            expect(screen.getByText(/2025/)).toBeInTheDocument();

            jest.restoreAllMocks();
        });
    });

    describe('Snapshot Testing', () => {
        it('matches snapshot', () => {
            const mockDate = new Date('2025-01-01');
            jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

            const { container } = render(<Footer />);
            expect(container.firstChild).toMatchSnapshot();

            jest.restoreAllMocks();
        });
    });
});
