"use client";

import Link from "next/link";

export default function Hero() {
    return (
        <section id="about" className="hero">
            <h1>
                Bridging Educational Strategy <br />& AI Implementation
            </h1>
            <p>
                Technical Instructional Systems Designer and Full Stack Developer specialized in
                leveraging Data Science and LLMs to optimize training outcomes for defense and
                intelligence missions.
            </p>

            {/* E-A-T Credibility Indicators */}
            <div className="credibility-indicators">
                <div className="credential-item">
                    <i className="fas fa-certificate"></i>
                    <span>PMP Certified</span>
                </div>
                <div className="credential-item">
                    <i className="fas fa-graduation-cap"></i>
                    <span>M.Ed. Instructional Design</span>
                </div>
                <div className="credential-item">
                    <i className="fas fa-robot"></i>
                    <span>AI Systems Management</span>
                </div>
                <div className="credential-item">
                    <i className="fas fa-shield-alt"></i>
                    <span>Security Clearance</span>
                </div>
            </div>

            <div className="cta-container">
                <Link href="/resume" className="contact-item cta-secondary">
                    <i className="fas fa-file-alt"></i> Resume
                </Link>
                <Link href="/cv" className="contact-item cta-secondary">
                    <i className="fas fa-list-ul"></i> Full CV
                </Link>
                <Link href="/about" className="contact-item cta-primary">
                    <i className="fas fa-user-check"></i> View Credentials
                </Link>
            </div>

            <div className="contact-info">
                <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i> Chantilly, VA
                </div>
                <a href="mailto:dustinober@me.com" className="contact-item">
                    <i className="fas fa-envelope"></i> dustinober@me.com
                </a>
                <div className="contact-item">
                    <i className="fas fa-phone"></i> 540-793-0177
                </div>
                <a
                    href="https://www.linkedin.com/in/dober1"
                    className="contact-item"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="fab fa-linkedin"></i> LinkedIn
                </a>
                <a href="https://aiober.com" className="contact-item">
                    <i className="fas fa-globe"></i> aiober.com
                </a>
            </div>

            <style jsx>{`
                .credibility-indicators {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin: 2rem 0;
                    justify-content: center;
                }

                .credential-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: rgba(47, 129, 247, 0.1);
                    border: 1px solid rgba(47, 129, 247, 0.2);
                    border-radius: 20px;
                    color: var(--accent);
                    font-size: 0.85rem;
                    font-weight: 500;
                }

                .credential-item i {
                    font-size: 0.9rem;
                }

                .cta-primary {
                    background: var(--accent) !important;
                    color: white !important;
                    border: 1px solid var(--accent) !important;
                }

                .cta-primary:hover {
                    background: #1e40af !important;
                    transform: translateY(-1px);
                }

                @media (max-width: 768px) {
                    .credibility-indicators {
                        justify-content: center;
                    }

                    .credential-item {
                        font-size: 0.8rem;
                        padding: 0.4rem 0.8rem;
                    }
                }
            `}</style>
        </section>
    );
}
