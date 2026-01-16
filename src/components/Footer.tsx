import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="container">
                {/* Decorative rule with gold accent is handled in globals.css ::before */}
                <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    marginBottom: '1rem',
                    color: 'var(--foreground)'
                }}>
                    Dustin J. Ober
                </p>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    marginBottom: '2rem',
                    textAlign: 'left',
                    width: '100%',
                    maxWidth: '800px',
                    margin: '0 auto 2rem auto'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground)', marginBottom: '0.5rem' }}>General</h3>
                        <Link href="/" style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)', textDecoration: 'none' }}>Home</Link>
                        <Link href="/about" style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)', textDecoration: 'none' }}>About</Link>
                        <Link href="/contact" style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)', textDecoration: 'none' }}>Contact</Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground)', marginBottom: '0.5rem' }}>Work</h3>
                        <Link href="/projects" style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)', textDecoration: 'none' }}>Projects</Link>
                        <Link href="/research" style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)', textDecoration: 'none' }}>Research</Link>
                        <Link href="/competitions" style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)', textDecoration: 'none' }}>Competitions</Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground)', marginBottom: '0.5rem' }}>Credentials</h3>
                        <Link href="/resume" style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)', textDecoration: 'none' }}>Resume</Link>
                        <Link href="/education" style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)', textDecoration: 'none' }}>Education</Link>
                    </div>
                </div>
                <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    color: 'var(--muted-foreground)'
                }}>
                    &copy; {currentYear} Dustin J. Ober. Built with Next.js.
                </p>
            </div>
        </footer>
    );
}
