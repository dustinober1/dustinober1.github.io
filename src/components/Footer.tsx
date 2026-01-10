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
                <nav style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap'
                }}>
                    <Link href="/resume" style={{ 
                        fontSize: '0.8125rem',
                        color: 'var(--muted-foreground)',
                        textDecoration: 'none'
                    }}>
                        Resume
                    </Link>
                    <Link href="/research" style={{ 
                        fontSize: '0.8125rem',
                        color: 'var(--muted-foreground)',
                        textDecoration: 'none'
                    }}>
                        Research
                    </Link>
                    <Link href="/contact" style={{ 
                        fontSize: '0.8125rem',
                        color: 'var(--muted-foreground)',
                        textDecoration: 'none'
                    }}>
                        Contact
                    </Link>
                </nav>
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
