/**
 * Navigation Component Unit Tests
 * Tests navigation menu functionality, active states, and mobile responsiveness
 */

import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '@/components/Navigation';

// Mock usePathname from next/navigation
const mockPathname = jest.fn();
jest.mock('next/navigation', () => ({
    usePathname: () => mockPathname(),
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
    return ({ children, href, className, onClick }: {
        children: React.ReactNode;
        href: string;
        className?: string;
        onClick?: () => void;
    }) => (
        <a href={href} className={className} onClick={onClick}>
            {children}
        </a>
    );
});

describe('Navigation Component', () => {
    beforeEach(() => {
        mockPathname.mockReturnValue('/');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('renders the logo with correct text', () => {
            render(<Navigation />);

            expect(screen.getByText('Dustin J. Ober')).toBeInTheDocument();
        });

        it('renders all navigation links', () => {
            render(<Navigation />);

            expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /Projects/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /Research/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /Education/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /About Me/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
        });

        it('renders the menu toggle button', () => {
            render(<Navigation />);

            const menuButton = screen.getByRole('button', { name: /Toggle navigation menu/i });
            expect(menuButton).toBeInTheDocument();
        });
    });

    describe('Navigation Links', () => {
        it('has correct href for Home link', () => {
            render(<Navigation />);

            const homeLink = screen.getByRole('link', { name: /Home/i });
            expect(homeLink).toHaveAttribute('href', '/');
        });

        it('has correct href for Projects link', () => {
            render(<Navigation />);

            const projectsLink = screen.getByRole('link', { name: /Projects/i });
            expect(projectsLink).toHaveAttribute('href', '/projects');
        });

                it('has correct href for Contact link', () => {

                    render(<Navigation />);

                    const contactLink = screen.getByRole('link', { name: /Contact/i });

                    expect(contactLink).toHaveAttribute('href', '/contact');

                });
    });

    describe('Active State', () => {
        it('applies active class to current page link', () => {
            mockPathname.mockReturnValue('/');
            render(<Navigation />);

            const homeLink = screen.getByRole('link', { name: /Home/i });
            expect(homeLink).toHaveClass('active');
        });

        it('applies active class to Projects when on projects page', () => {
            mockPathname.mockReturnValue('/projects');
            render(<Navigation />);

            const projectsLink = screen.getByRole('link', { name: /Projects/i });
            expect(projectsLink).toHaveClass('active');
        });

        it('does not apply active class to non-current pages', () => {
            mockPathname.mockReturnValue('/');
            render(<Navigation />);

            const projectsLink = screen.getByRole('link', { name: /Projects/i });
            expect(projectsLink).not.toHaveClass('active');
        });
    });

    describe('Mobile Menu Toggle', () => {
        it('menu starts closed', () => {
            render(<Navigation />);

            const navLinks = screen.getByRole('list');
            expect(navLinks).not.toHaveClass('active');
        });

        it('opens menu when toggle button is clicked', () => {
            render(<Navigation />);

            const menuButton = screen.getByRole('button', { name: /Toggle navigation menu/i });
            fireEvent.click(menuButton);

            const navLinks = screen.getByRole('list');
            expect(navLinks).toHaveClass('active');
        });

        it('closes menu when toggle button is clicked again', () => {
            render(<Navigation />);

            const menuButton = screen.getByRole('button', { name: /Toggle navigation menu/i });

            // Open menu
            fireEvent.click(menuButton);
            expect(screen.getByRole('list')).toHaveClass('active');

            // Close menu
            fireEvent.click(menuButton);
            expect(screen.getByRole('list')).not.toHaveClass('active');
        });

        it('closes menu when a nav link is clicked', () => {
            render(<Navigation />);

            const menuButton = screen.getByRole('button', { name: /Toggle navigation menu/i });

            // Open menu
            fireEvent.click(menuButton);
            expect(screen.getByRole('list')).toHaveClass('active');

            // Click a nav link
            const projectsLink = screen.getByRole('link', { name: /Projects/i });
            fireEvent.click(projectsLink);

            expect(screen.getByRole('list')).not.toHaveClass('active');
        });
    });

    describe('Accessibility', () => {
        it('menu button has aria-label', () => {
            render(<Navigation />);

            const menuButton = screen.getByRole('button', { name: /Toggle navigation menu/i });
            expect(menuButton).toHaveAttribute('aria-label', 'Toggle navigation menu');
        });

        it('menu button has aria-expanded attribute', () => {
            render(<Navigation />);

            const menuButton = screen.getByRole('button', { name: /Toggle navigation menu/i });
            expect(menuButton).toHaveAttribute('aria-expanded', 'false');
        });

        it('aria-expanded updates when menu is opened', () => {
            render(<Navigation />);

            const menuButton = screen.getByRole('button', { name: /Toggle navigation menu/i });
            fireEvent.click(menuButton);

            expect(menuButton).toHaveAttribute('aria-expanded', 'true');
        });

        it('has semantic nav element', () => {
            render(<Navigation />);

            expect(screen.getByRole('navigation')).toBeInTheDocument();
        });
    });
});
