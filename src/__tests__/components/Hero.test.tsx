/**
 * Hero Component Unit Tests
 * Demonstrates comprehensive component testing with React Testing Library
 */

import { render, screen } from '@testing-library/react';
import Hero from '@/components/Hero';

// Mock Next.js Link component
jest.mock('next/link', () => {
    return ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
        <a href={href} {...props}>
            {children}
        </a>
    );
});

describe('Hero Component', () => {
    describe('Rendering', () => {
        it('renders the main heading correctly', () => {
            render(<Hero />);

            expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
            expect(screen.getByText(/Bridging Educational Strategy/i)).toBeInTheDocument();
            expect(screen.getByText(/AI Implementation/i)).toBeInTheDocument();
        });

        it('renders the professional description', () => {
            render(<Hero />);

            expect(
                screen.getByText(/Technical Instructional Systems Designer/i)
            ).toBeInTheDocument();
        });

        it('renders the hero section with correct id', () => {
            const { container } = render(<Hero />);

            const heroSection = container.querySelector('#about');
            expect(heroSection).toBeInTheDocument();
            expect(heroSection).toHaveClass('hero');
        });
    });

    describe('Call to Action Buttons', () => {
        it('renders the Hire Me button with correct href', () => {
            render(<Hero />);

            const hireButton = screen.getByRole('link', { name: /Hire Me/i });
            expect(hireButton).toBeInTheDocument();
            expect(hireButton).toHaveAttribute('href', 'mailto:dustinober@me.com');
        });

        it('renders the Resume link with correct href', () => {
            render(<Hero />);

            const resumeLink = screen.getByRole('link', { name: /Resume/i });
            expect(resumeLink).toBeInTheDocument();
            expect(resumeLink).toHaveAttribute('href', '/resume');
        });

        it('renders the CV link with correct href', () => {
            render(<Hero />);

            const cvLink = screen.getByRole('link', { name: /Full CV/i });
            expect(cvLink).toBeInTheDocument();
            expect(cvLink).toHaveAttribute('href', '/cv');
        });
    });

    describe('Contact Information', () => {
        it('displays the location', () => {
            render(<Hero />);

            expect(screen.getByText(/Chantilly, VA/i)).toBeInTheDocument();
        });

        it('displays the email with correct href', () => {
            render(<Hero />);

            const emailLink = screen.getByRole('link', { name: /dustinober@me.com/i });
            expect(emailLink).toBeInTheDocument();
            expect(emailLink).toHaveAttribute('href', 'mailto:dustinober@me.com');
        });

        it('displays the phone number', () => {
            render(<Hero />);

            expect(screen.getByText(/540-793-0177/i)).toBeInTheDocument();
        });

        it('displays LinkedIn link with correct attributes', () => {
            render(<Hero />);

            const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
            expect(linkedinLink).toBeInTheDocument();
            expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/dober1');
            expect(linkedinLink).toHaveAttribute('target', '_blank');
            expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
        });

        it('displays Portfolio link', () => {
            render(<Hero />);

            const portfolioLink = screen.getByRole('link', { name: /Portfolio/i });
            expect(portfolioLink).toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        it('has proper heading hierarchy', () => {
            render(<Hero />);

            const heading = screen.getByRole('heading', { level: 1 });
            expect(heading).toBeInTheDocument();
        });

        it('external links have security attributes', () => {
            render(<Hero />);

            const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
            expect(linkedinLink).toHaveAttribute('rel', expect.stringContaining('noopener'));
            expect(linkedinLink).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
        });
    });

    describe('Snapshot Testing', () => {
        it('matches snapshot', () => {
            const { container } = render(<Hero />);
            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
