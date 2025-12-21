import Link from "next/link";

export default function ContactSection() {
    return (
        <section id="contact" style={{ textAlign: "center" }}>
            <div className="container">
                <h2>Get In Touch</h2>
                <p
                    style={{
                        color: "var(--text-secondary)",
                        maxWidth: "600px",
                        margin: "0 auto 2rem",
                    }}
                >
                    I&apos;m always open to discussing new projects, creative ideas, or opportunities to be
                    part of your visions.
                </p>
                <Link
                    href="mailto:dustinober@me.com"
                    style={{
                        display: "inline-block",
                        padding: "1rem 2rem",
                        background: "var(--accent)",
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "var(--transition)",
                    }}
                >
                    Say Hello
                </Link>
            </div>
        </section>
    );
}
