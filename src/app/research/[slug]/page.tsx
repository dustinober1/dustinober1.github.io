import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import styles from "./whitepaper.module.css";

// Whitepaper metadata registry
const whitepaperRegistry: Record<
    string,
    {
        id: string;
        type: string;
        title: string;
        subtitle: string;
        author: string;
        pdfPath: string | null;
        markdownFile: string;
        status: "available" | "coming-soon";
        series?: string;
    }
> = {
    "sovereign-ai-infrastructure": {
        id: "wp-01",
        type: "Whitepaper #01",
        title: "Sovereign AI Infrastructure",
        subtitle: "Hardware & Architecture for Disconnected Environments",
        author: "Dustin J. Ober, PMP",
        pdfPath: "/whitepapers/pdf/01-sovereign-ai-infrastructure.pdf",
        markdownFile: "01_Sovereign AI Infrastructure.md",
        status: "available",
    },
    "disconnected-pipeline": {
        id: "wp-02",
        type: "Whitepaper #02",
        title: "The Disconnected Pipeline",
        subtitle: "Solving Dependency Management in Secure Facilities",
        author: "Dustin J. Ober, PMP",
        pdfPath: "/whitepapers/pdf/02-the-disconnected-pipeline.pdf",
        markdownFile: "02_The Disconnected Pipeline.md",
        status: "available",
    },
    "private-knowledge-retrieval": {
        id: "wp-03",
        type: "Whitepaper #03",
        title: "Private Knowledge Retrieval",
        subtitle: "Architecting Local RAG Systems",
        author: "Dustin J. Ober, PMP",
        pdfPath: "/whitepapers/pdf/03-private-knowledge-retrieval.pdf",
        markdownFile: "03_Private Knowledge Retrieval.md",
        status: "available",
    },
    "verifiable-intelligence": {
        id: "wp-04",
        type: "Whitepaper #04",
        title: "Verifiable Intelligence",
        subtitle: "DSPy, Governance, and Hallucination Control",
        author: "Dustin J. Ober, PMP",
        pdfPath: "/whitepapers/pdf/04-verifiable-intelligence.pdf",
        markdownFile: "04_Verifiable Intelligence.md",
        status: "available",
    },
    "agentic-architectures": {
        id: "wp-05",
        type: "Whitepaper #05",
        title: "Agentic Architectures in Secure Enclaves",
        subtitle: "Multi-Agent Systems for Zero-Egress Environments",
        author: "Dustin J. Ober, PMP",
        pdfPath: "/whitepapers/pdf/05-agentic-architectures-in-secure-enclaves.pdf",
        markdownFile: "05_Agentic Architectures in Secure Enclaves.md",
        status: "available",
    },
    "dspy-ai-tutors": {
        id: "wp-06",
        type: "Whitepaper #06",
        title: "Beyond \"Vibes\"",
        subtitle: "Engineering Reliable AI Tutors with DSPy",
        author: "Dustin J. Ober, PMP",
        pdfPath: "/whitepapers/pdf/06-beyond-vibes-engineering-reliable-ai-tutors-with-dspy.pdf",
        markdownFile: "06_Beyond Vibes Engineering Reliable AI Tutors with DSPy.md",
        status: "available",
    },
    "neuro-symbolic-tutors": {
        id: "wp-07",
        type: "Whitepaper #07",
        title: "The Future of Neuro-Symbolic Tutors",
        subtitle: "Hyper-Personalized, Verifiable Learning Paths",
        author: "Dustin J. Ober, PMP",
        pdfPath: "/whitepapers/pdf/07-the-future-of-neuro-symbolic-tutors.pdf",
        markdownFile: "07_The Future of Neuro-Symbolic Tutors.md",
        status: "available",
    },
    "scaling-llm-evaluation": {
        id: "wp-08",
        type: "Whitepaper #08",
        title: "Scaling LLM Evaluation with DSPy",
        subtitle: "From Manual Prompting to Optimized Pipelines",
        author: "Dustin J. Ober, PMP",
        pdfPath: "/whitepapers/pdf/08-scaling-llm-evaluation-with-dspy.pdf",
        markdownFile: "08_Scaling LLM Evaluation with DSPy.md",
        status: "available",
    },
    "kaggle-hedge-fund": {
        id: "kc-01",
        type: "Case Study #01",
        title: "Hypothesis-Driven Time Series Forecasting",
        subtitle: "Process Over Results in Low-SNR Competitions",
        author: "Dustin J. Ober, PMP",
        pdfPath: null,
        markdownFile: "K01_Hypothesis-Driven Time Series Forecasting.md",
        status: "available",
        series: "Kaggle Competitions",
    },
};

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const paper = whitepaperRegistry[slug];

    if (!paper) {
        return { title: "Whitepaper Not Found" };
    }

    return {
        title: `${paper.title} | Research Series`,
        description: `${paper.subtitle} - Part of ${paper.series || "The Sovereign AI Handbook"} by ${paper.author}`,
    };
}

export async function generateStaticParams() {
    return Object.keys(whitepaperRegistry).map((slug) => ({ slug }));
}

import { marked } from "marked";

// Configure marked options
marked.use({
    gfm: true,
    breaks: true,
});

async function parseMarkdown(markdown: string): Promise<string> {
    return marked(markdown) as Promise<string>;
}

export default async function WhitepaperPage({ params }: Props) {
    const { slug } = await params;
    const paper = whitepaperRegistry[slug];

    if (!paper) {
        notFound();
    }

    // If coming soon, show placeholder
    if (paper.status === "coming-soon") {
        return (
            <main className={styles.whitepaperMain}>
                <div className="container">
                    <div className={styles.comingSoonWrapper}>
                        <div className={styles.paperType}>{paper.type}</div>
                        <h1 className={styles.paperTitle}>{paper.title}</h1>
                        <h2 className={styles.paperSubtitle}>{paper.subtitle}</h2>
                        <div className={styles.comingSoonBadge}>Coming Soon</div>
                        <p className={styles.comingSoonText}>
                            This whitepaper is currently in development. Subscribe to be notified
                            when it becomes available.
                        </p>
                        <Link href="/research" className={styles.backLink}>
                            ← Back to Research Series
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    // Read and parse markdown
    let content = "";
    try {
        const markdownPath = path.join(
            process.cwd(),
            "whitepapers",
            "markdown",
            paper.markdownFile
        );
        const markdown = fs.readFileSync(markdownPath, "utf-8");
        // Remove frontmatter if present (lines between ---)
        let cleanMarkdown = markdown;
        if (markdown.startsWith("---")) {
            const parts = markdown.split("---");
            if (parts.length >= 3) {
                cleanMarkdown = parts.slice(2).join("---");
            }
        }
        content = await parseMarkdown(cleanMarkdown);
    } catch {
        content = "<p>Content could not be loaded.</p>";
    }

    return (
        <main className={styles.whitepaperMain}>
            {/* Header */}
            <header className={styles.header}>
                <div className="container">
                    <Link href="/research" className={styles.backLink}>
                        ← Back to Research Series
                    </Link>
                    <div className={styles.headerMeta}>
                        <span className={styles.paperType}>{paper.type}</span>
                        <span className={styles.seriesLabel}>{paper.series || "The Sovereign AI Handbook"}</span>
                    </div>
                    <h1 className={styles.paperTitle}>{paper.title}</h1>
                    <h2 className={styles.paperSubtitle}>{paper.subtitle}</h2>
                    <div className={styles.authorLine}>
                        <span>Author: {paper.author}</span>
                    </div>
                    {paper.pdfPath && (
                        <a
                            href={paper.pdfPath}
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
                            Download PDF
                        </a>
                    )}
                </div>
            </header>

            {/* Content */}
            <article className={styles.article}>
                <div className="container">
                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </article>

            {/* Footer CTA */}
            <section className={styles.footerCta}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h3>Continue Reading</h3>
                        <p>Explore more whitepapers in The Sovereign AI Handbook series.</p>
                        <Link href="/research" className={styles.ctaBtn}>
                            View All Research →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
