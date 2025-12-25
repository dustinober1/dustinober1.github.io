import type { Metadata } from "next";
import Link from "next/link";
import styles from "./research.module.css";

export const metadata: Metadata = {
    title: "Research Series | Dustin J. Ober",
    description:
        "The Sovereign AI Handbook: Architecting Intelligent Systems for Disconnected Environments. Technical whitepapers on AI infrastructure, secure pipelines, and data sovereignty.",
};

const seriesInfo = {
    title: "The Sovereign AI Handbook",
    subtitle: "Architecting Intelligent Systems for Disconnected Environments",
};

const whitepapers = [
    {
        id: "wp-01",
        slug: "sovereign-ai-infrastructure",
        type: "Whitepaper #01",
        title: "Sovereign AI Infrastructure",
        subtitle: "Hardware & Architecture for Disconnected Environments",
        abstract:
            "A guide to sizing hardware and architecting networks when cloud APIs are not an option. Focuses on GPU optimization and VRAM constraints for local inference.",
        status: "available" as const,
        pdfUrl: "/whitepapers/pdf/01-sovereign-ai-infrastructure.pdf",
    },
    {
        id: "wp-02",
        slug: "disconnected-pipeline",
        type: "Whitepaper #02",
        title: "The Disconnected Pipeline",
        subtitle: "Solving Dependency Management in Secure Facilities",
        abstract:
            'A blueprint for modern software engineering without internet access. Covers "Sneakernet" strategies, local PyPI mirrors, and containerization (Docker/Apptainer) for Zero Trust.',
        status: "available" as const,
        pdfUrl: "/whitepapers/pdf/02-the-disconnected-pipeline.pdf",
    },
    {
        id: "wp-03",
        slug: "private-knowledge-retrieval",
        type: "Whitepaper #03",
        title: "Private Knowledge Retrieval",
        subtitle: "Architecting Local RAG Systems",
        abstract:
            'How to build "Chat with your Data" pipelines using local Vector DBs and embedding models, ensuring 100% data sovereignty with no external egress.',
        status: "available" as const,
        pdfUrl: "/whitepapers/pdf/03-private-knowledge-retrieval.pdf",
    },
    {
        id: "wp-04",
        slug: "verifiable-intelligence",
        type: "Whitepaper #04",
        title: "Verifiable Intelligence",
        subtitle: "DSPy, Governance, and Hallucination Control",
        abstract:
            'Moving from "vibe-based" AI to deterministic, auditable systems. Techniques for citation forcing and verifiable output in compliance-heavy sectors.',
        status: "available" as const,
        pdfUrl: "/whitepapers/pdf/04-verifiable-intelligence.pdf",
    },
];

export default function ResearchPage() {
    return (
        <main className={styles.researchMain}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className="container">
                    <div className={styles.seriesBadge}>
                        <span className={styles.badgeIcon}>◆</span>
                        Research Series
                    </div>
                    <h1 className={styles.seriesTitle}>{seriesInfo.title}</h1>
                    <p className={styles.seriesSubtitle}>{seriesInfo.subtitle}</p>
                    <div className={styles.divider}></div>
                </div>
            </section>

            {/* Whitepapers Grid */}
            <section className={styles.whitepaperSection}>
                <div className="container">
                    <div className={styles.whitepaperGrid}>
                        {whitepapers.map((paper) => (
                            <article key={paper.id} className={styles.whitepaperCard}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.paperType}>{paper.type}</span>
                                    {paper.status === "available" ? (
                                        <span className={styles.statusAvailable}>
                                            <span className={styles.statusDot}></span>
                                            Available
                                        </span>
                                    ) : (
                                        <span className={styles.statusComingSoon}>Coming Soon</span>
                                    )}
                                </div>

                                <div className={styles.cardBody}>
                                    {paper.status === "available" ? (
                                        <Link href={`/research/${paper.slug}`} className={styles.titleLink}>
                                            <h2 className={styles.paperTitle}>{paper.title}</h2>
                                        </Link>
                                    ) : (
                                        <h2 className={styles.paperTitle}>{paper.title}</h2>
                                    )}
                                    <h3 className={styles.paperSubtitle}>{paper.subtitle}</h3>
                                    <p className={styles.paperAbstract}>{paper.abstract}</p>
                                </div>

                                <div className={styles.cardFooter}>
                                    {paper.status === "available" ? (
                                        <div className={styles.actionButtons}>
                                            <Link
                                                href={`/research/${paper.slug}`}
                                                className={styles.readBtn}
                                            >
                                                <svg
                                                    className={styles.readIcon}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                                </svg>
                                                Read Online
                                            </Link>
                                            {paper.pdfUrl && (
                                                <a
                                                    href={paper.pdfUrl}
                                                    className={styles.downloadBtn}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    download
                                                >
                                                    <svg
                                                        className={styles.downloadIcon}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                        <polyline points="7,10 12,15 17,10" />
                                                        <line x1="12" y1="15" x2="12" y2="3" />
                                                    </svg>
                                                    PDF
                                                </a>
                                            )}
                                        </div>
                                    ) : (
                                        <div className={styles.notifyWrapper}>
                                            <span className={styles.notifyText}>
                                                Subscribe for updates
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Decorative elements */}
                                <div className={styles.cardAccent}></div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className={styles.aboutSection}>
                <div className="container">
                    <div className={styles.aboutContent}>
                        <div className={styles.aboutIcon}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h2 className={styles.aboutTitle}>About This Series</h2>
                        <p className={styles.aboutText}>
                            This research series addresses the unique challenges of deploying AI systems
                            in air-gapped, classified, and compliance-heavy environments. Drawing from
                            real-world experience architecting solutions for defense, intelligence, and
                            regulated industries, these whitepapers provide actionable frameworks for
                            organizations that cannot rely on cloud-based AI services.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
