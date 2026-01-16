import type { Metadata } from "next";
import Link from "next/link";
import styles from "./research.module.css";
import { structuredDataEngine } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Research Series | Dustin J. Ober",
    description:
        "The Sovereign AI Handbook: Architecting Intelligent Systems for Disconnected Environments. Technical whitepapers on AI infrastructure, secure pipelines, and data sovereignty.",
    keywords: [
        "sovereign AI",
        "air-gapped AI",
        "disconnected environments AI",
        "secure AI infrastructure",
        "private RAG systems",
        "zero trust AI",
        "defense AI whitepapers",
    ],
    openGraph: {
        title: "The Sovereign AI Handbook | Research Series",
        description:
            "Technical whitepapers on AI infrastructure for disconnected, secure, and compliance-heavy environments.",
        url: "https://aiober.com/research",
        type: "website",
    },
    alternates: {
        canonical: "https://aiober.com/research",
    },
};

const seriesInfo = {
    title: "The Sovereign AI Handbook",
    subtitle: "Architecting Intelligent Systems for Disconnected Environments",
};

const sovereignWhitepapers = [
    {
        id: "wp-01",
        slug: "sovereign-ai-infrastructure",
        type: "Whitepaper #01",
        title: "Sovereign AI Infrastructure",
        subtitle: "Hardware & Architecture for Disconnected Environments",
        abstract:
            "A guide to sizing hardware and architecting networks when cloud APIs are not an option. Focuses on GPU optimization and VRAM constraints for local inference.",
        pdfUrl: "/whitepapers/pdf/01-sovereign-ai-infrastructure.pdf",
    },
    {
        id: "wp-02",
        slug: "disconnected-pipeline",
        type: "Whitepaper #02",
        title: "The Disconnected Pipeline",
        subtitle: "Solving Dependency Management in Secure Facilities",
        abstract:
            'A blueprint for modern software engineering without internet access. Covers "Sneakernet" strategies, local PyPI mirrors, and containerization for Zero Trust.',
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
        pdfUrl: "/whitepapers/pdf/04-verifiable-intelligence.pdf",
    },
    {
        id: "wp-05",
        slug: "agentic-architectures",
        type: "Whitepaper #05",
        title: "Agentic Architectures in Secure Enclaves",
        subtitle: "Multi-Agent Systems for Zero-Egress Environments",
        abstract:
            "A reference architecture for deploying LangGraph-style multi-agent workflows inside air-gapped networks. Covers sandboxed tool execution and encrypted state management.",
        pdfUrl: "/whitepapers/pdf/05-agentic-architectures-in-secure-enclaves.pdf",
    },
    {
        id: "wp-06",
        slug: "dspy-ai-tutors",
        type: "Whitepaper #06",
        title: "Beyond \"Vibes\"",
        subtitle: "Engineering Reliable AI Tutors with DSPy",
        author: "Dustin J. Ober, PMP",
        pdfPath: "/whitepapers/pdf/06-beyond-vibes-engineering-reliable-ai-tutors-with-dspy.pdf",
        markdownFile: "06_Beyond Vibes Engineering Reliable AI Tutors with DSPy.md",
        status: "available",
        abstract:
            "Moving from 'Prompt Engineering' to 'AI Engineering'. A practical guide to building verifiable, metrics-driven educational AI for enterprise training.",
        pdfUrl: "/whitepapers/pdf/06-beyond-vibes-engineering-reliable-ai-tutors-with-dspy.pdf",
    },
    {
        id: "wp-07",
        slug: "neuro-symbolic-tutors",
        type: "Whitepaper #07",
        title: "The Future of Neuro-Symbolic Tutors",
        subtitle: "Hyper-Personalized, Verifiable Learning Paths",
        abstract:
            "Exploration of combining deep learning's pattern recognition with symbolic logic to create hyper-personalized, verifiable learning paths.",
        pdfUrl: "/whitepapers/pdf/07-the-future-of-neuro-symbolic-tutors.pdf",
    },
    {
        id: "wp-08",
        slug: "scaling-llm-evaluation",
        type: "Whitepaper #08",
        title: "Scaling LLM Evaluation with DSPy",
        subtitle: "From Manual Prompting to Optimized Pipelines",
        abstract:
            "Case studies on transitioning to DSPy pipelines: Achieving 99% accuracy in clinical extraction and 0.92 human-alignment in subjective essay grading.",
        pdfUrl: "/whitepapers/pdf/08-scaling-llm-evaluation-with-dspy.pdf",
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
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

export default function ResearchPage() {
    // Generate TechArticle schema for all whitepapers
    const articleSchemas = sovereignWhitepapers.map(paper =>
        structuredDataEngine.generateTechArticle({
            headline: `${paper.title}: ${paper.subtitle}`,
            description: paper.abstract,
            author: "Dustin J. Ober",
            url: `https://aiober.com/research/${paper.slug}`,
        })
    );

    return (
        <main className={styles.researchMain}>
            {/* TechArticle Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleSchemas),
                }}
            />

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.seriesTitle}>{seriesInfo.title}</h1>
                    <p className={styles.seriesSubtitle}>{seriesInfo.subtitle}</p>
                    <div className={styles.divider}></div>
                </div>
            </section>

            {/* Sovereign AI Series */}
            <section className={styles.whitepaperSection}>
                <div className="container">
                    <div className={styles.whitepaperGrid}>
                        {sovereignWhitepapers.map((paper) => (
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
