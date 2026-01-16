import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <p className={styles.title}>
                    Dustin J. Ober
                </p>
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>General</h3>
                        <Link href="/" className={styles.link}>Home</Link>
                        <Link href="/about" className={styles.link}>About</Link>
                        <Link href="/contact" className={styles.link}>Contact</Link>
                    </div>
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Work</h3>
                        <Link href="/projects" className={styles.link}>Projects</Link>
                        <Link href="/research" className={styles.link}>Research</Link>
                        <Link href="/competitions" className={styles.link}>Competitions</Link>
                    </div>
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Credentials</h3>
                        <Link href="/resume" className={styles.link}>Resume</Link>
                        <Link href="/education" className={styles.link}>Education</Link>
                    </div>
                </div>
                <p className={styles.copyright}>
                    &copy; {currentYear} Dustin J. Ober. Built with Next.js.
                </p>
            </div>
        </footer>
    );
}
