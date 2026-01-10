"use client";

import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section id="about" className="hero">
            <div className="container">
                <div className={styles.heroContent}>
                    {/* Section label with rule lines */}
                    <div className={styles.sectionLabel}>
                        <span className={styles.ruleLine}></span>
                        <span className={styles.labelText}>Portfolio</span>
                        <span className={styles.ruleLine}></span>
                    </div>

                    <h1 className={styles.heroName}>Dustin J. Ober</h1>
                    
                    <p className={styles.heroTitle}>
                        AI Developer & Technical Instructional Designer
                    </p>
                    
                    <p className={styles.heroSubtitle}>
                        Technical Instructional Systems Designer and Full Stack Developer specialized in
                        leveraging Data Science and LLMs to optimize training outcomes for defense and
                        intelligence missions.
                    </p>

                    {/* E-A-T Credibility Indicators */}
                    <div className={styles.credibilityIndicators}>
                        <div className={styles.credentialItem}>
                            <i className="fas fa-certificate"></i>
                            <span>PMP Certified</span>
                        </div>
                        <div className={styles.credentialItem}>
                            <i className="fas fa-graduation-cap"></i>
                            <span>M.Ed. Instructional Design</span>
                        </div>
                        <div className={styles.credentialItem}>
                            <i className="fas fa-robot"></i>
                            <span>AI Systems Management</span>
                        </div>
                        <div className={styles.credentialItem}>
                            <i className="fas fa-shield-alt"></i>
                            <span>Top Secret / SCI</span>
                        </div>
                    </div>

                    <div className={styles.ctaContainer}>
                        <Link href="/resume" className={styles.ctaSecondary}>
                            <i className="fas fa-file-alt"></i> Resume
                        </Link>
                        <Link href="/about" className={styles.ctaPrimary}>
                            <i className="fas fa-user-check"></i> View Credentials
                        </Link>
                    </div>

                    <div className={styles.contactInfo}>
                        <div className={styles.contactItem}>
                            <i className="fas fa-map-marker-alt"></i> Chantilly, VA
                        </div>
                        <a href="mailto:dustinober@me.com" className={styles.contactItem}>
                            <i className="fas fa-envelope"></i> dustinober@me.com
                        </a>
                        <div className={styles.contactItem}>
                            <i className="fas fa-phone"></i> 540-793-0177
                        </div>
                        <a
                            href="https://www.linkedin.com/in/dober1"
                            className={styles.contactItem}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-linkedin"></i> LinkedIn
                        </a>
                        <a href="https://aiober.com" className={styles.contactItem}>
                            <i className="fas fa-globe"></i> aiober.com
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
