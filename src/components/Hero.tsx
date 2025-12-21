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

            <div className="cta-container">
                <Link href="mailto:dustinober@me.com" className="cta-primary">
                    Hire Me
                </Link>
                <Link href="/resume" className="contact-item cta-secondary">
                    <i className="fas fa-file-alt"></i> Resume
                </Link>
                <Link href="/cv" className="contact-item cta-secondary">
                    <i className="fas fa-list-ul"></i> Full CV
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
                <a href="https://dustinober1.github.io/" className="contact-item">
                    <i className="fas fa-globe"></i> Portfolio
                </a>
            </div>
        </section>
    );
}
