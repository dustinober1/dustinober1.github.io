import type { Metadata } from "next";
import Link from "next/link";
import styles from "../research/research.module.css";
import { structuredDataEngine } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Kaggle Competitions | Dustin J. Ober",
    description:
        "Process-First Experiments in Data Science. Detailed case studies on hypothesis-driven competition strategies, feature engineering, and model validation.",
    openGraph: {
        title: "Kaggle Competitions | Dustin J. Ober",
        description:
            "Process-First Experiments in Data Science. Detailed case studies on hypothesis-driven competition strategies.",
        url: "https://aiober.com/competitions",
        type: "website",
    },
    alternates: {
        canonical: "https://aiober.com/competitions",
    },
};

const kaggleSeriesInfo = {
    title: "Kaggle Competitions",
    subtitle: "Process-First Experiments in Data Science",
};

const kaggleWhitepapers = [
    {
        id: "kc-01",
        slug: "kaggle-hedge-fund",
        type: "Case Study #01",
        title: "Hypothesis-Driven Time Series Forecasting",
        subtitle: "Process Over Results in Low-SNR Competitions",
        abstract:
            "A case study on the Hedge Fund Time Series Forecasting competition. How robust objectives, shrinkage calibration, and one-change-at-a-time experimentation beat kitchen-sink feature engineering.",
        pdfUrl: null, // Will be generated later
    },
];

// SVG Icons
const BookIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

const DownloadIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7,10 12,15 17,10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const AboutIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
);

export default function CompetitionsPage() {
    // Generate TechArticle schema
    const articleSchemas = kaggleWhitepapers.map(paper =>
        structuredDataEngine.generateTechArticle({
            headline: `${paper.title}: ${paper.subtitle}`,
            description: paper.abstract,
            author: "Dustin J. Ober",
            url: `https://aiober.com/research/${paper.slug}`,
        })
    );

    return (
        <main className={styles.researchMain}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleSchemas),
                }}
            />

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.seriesTitle}>{kaggleSeriesInfo.title}</h1>
                    <p className={styles.seriesSubtitle}>
                        {kaggleSeriesInfo.subtitle}
                    </p>
                    <div className={styles.divider}></div>
                </div>
            </section>

            {/* Competitions Grid */}
            <section className={styles.whitepaperSection}>
                <div className="container">
                    <div className={styles.whitepaperGrid}>
                        {kaggleWhitepapers.map((paper) => (
                            <article key={paper.id} className={styles.whitepaperCard}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.paperType}>{paper.type}</span>
                                </div>

                                <div className={styles.cardBody}>
                                    <Link href={`/research/${paper.slug}`} className={styles.titleLink}>
                                        <h2 className={styles.paperTitle}>{paper.title}</h2>
                                    </Link>
                                    <h3 className={styles.paperSubtitle}>{paper.subtitle}</h3>
                                    <p className={styles.paperAbstract}>{paper.abstract}</p>
                                </div>

                                <div className={styles.cardFooter}>
                                    <div className={styles.actionButtons}>
                                        <Link
                                            href={`/research/${paper.slug}`}
                                            className={styles.readBtn}
                                        >
                                            <span className={styles.readIcon}>
                                                <BookIcon />
                                            </span>
                                            Read
                                        </Link>
                                        {paper.pdfUrl ? (
                                            <a
                                                href={paper.pdfUrl}
                                                className={styles.downloadBtn}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download
                                            >
                                                <span className={styles.downloadIcon}>
                                                    <DownloadIcon />
                                                </span>
                                                PDF
                                            </a>
                                        ) : (
                                            <div className={styles.downloadBtn} style={{ opacity: 0.5, cursor: "not-allowed", background: "var(--muted)", borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                                                Coming Soon
                                            </div>
                                        )}
                                    </div>
                                </div>
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
                            <AboutIcon />
                        </div>
                        <h2 className={styles.aboutTitle}>Experimentation Logs</h2>
                        <p className={styles.aboutText}>
                            This series documents my participation in data science competitions, focusing not just on the final score, but on the rigorous scientific process used to get there. Each case study details the hypothesis generation, experimental design, and validation strategies employed in low-signal-to-noise environments.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
