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
    }
> = {
    "sovereign-ai-infrastructure": {
        id: "wp-01",
        type: "Whitepaper #01",
        title: "Sovereign AI Infrastructure",
        subtitle: "Hardware & Architecture for Disconnected Environments",
        author: "Dustin J. Ober, PMP",
        pdfPath: "/whitepapers/01-sovereign-ai-infrastructure.pdf",
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
        pdfPath: null,
        markdownFile: "03_Private Knowledge Retrieval.md",
        status: "coming-soon",
    },
    "verifiable-intelligence": {
        id: "wp-04",
        type: "Whitepaper #04",
        title: "Verifiable Intelligence",
        subtitle: "DSPy, Governance, and Hallucination Control",
        author: "Dustin J. Ober, PMP",
        pdfPath: null,
        markdownFile: "04_Verifiable Intelligence.md",
        status: "coming-soon",
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
        description: `${paper.subtitle} - Part of The Sovereign AI Handbook by ${paper.author}`,
    };
}

export async function generateStaticParams() {
    return Object.keys(whitepaperRegistry).map((slug) => ({ slug }));
}

// Simple markdown to HTML converter (basic implementation)
function parseMarkdown(markdown: string): string {
    let html = markdown;

    // Remove the title and first few metadata lines (we render those separately)
    const lines = html.split("\n");
    let contentStartIndex = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("---") && i > 0) {
            contentStartIndex = i + 1;
            break;
        }
        if (lines[i].startsWith("### ")) {
            contentStartIndex = i;
            break;
        }
    }
    html = lines.slice(contentStartIndex).join("\n");

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="wp-h3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="wp-h2">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="wp-h1">$1</h1>');
    html = html.replace(/^#### (.*$)/gim, '<h4 class="wp-h4">$1</h4>');

    // Bold and italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="wp-inline-code">$1</code>');

    // Links [text](url)
    html = html.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="wp-link" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Block quotes
    html = html.replace(
        /^> (.*$)/gim,
        '<blockquote class="wp-blockquote">$1</blockquote>'
    );

    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr class="wp-hr" />');

    // Unordered lists
    html = html.replace(/^\* (.*$)/gim, '<li class="wp-li">$1</li>');
    html = html.replace(
        /(<li class="wp-li">.*<\/li>\n?)+/g,
        '<ul class="wp-ul">$&</ul>'
    );

    // Numbered lists (basic)
    html = html.replace(/^\d+\.\s+(.*$)/gim, '<li class="wp-li-num">$1</li>');

    // Math blocks (LaTeX-style) - just style them nicely
    html = html.replace(
        /\$\$([\s\S]*?)\$\$/g,
        '<div class="wp-math">$1</div>'
    );

    // Paragraphs (wrap remaining text blocks)
    html = html
        .split("\n\n")
        .map((block) => {
            const trimmed = block.trim();
            if (
                trimmed &&
                !trimmed.startsWith("<h") &&
                !trimmed.startsWith("<ul") &&
                !trimmed.startsWith("<li") &&
                !trimmed.startsWith("<blockquote") &&
                !trimmed.startsWith("<hr") &&
                !trimmed.startsWith("<div")
            ) {
                return `<p class="wp-p">${trimmed}</p>`;
            }
            return block;
        })
        .join("\n\n");

    return html;
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
        content = parseMarkdown(markdown);
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
                        <span className={styles.seriesLabel}>The Sovereign AI Handbook</span>
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
