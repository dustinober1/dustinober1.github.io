import type { Metadata } from "next";
import Link from "next/link";
import styles from "../research/research.module.css";
import { structuredDataEngine } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Technical Projects | Dustin J. Ober - AI & ML Portfolio",
    description:
        "Explore a showcase of AI-driven projects including custom NER models, multi-agent systems with LangGraph, DSPy optimization, and full-stack applications developed by Dustin J. Ober.",
    keywords: [
        "AI projects portfolio",
        "NLP machine learning projects",
        "LangGraph multi-agent systems",
        "DSPy prompt optimization",
        "TensorFlow projects",
        "supply chain AI",
        "RAG pipelines",
        "computer vision projects",
    ],
    openGraph: {
        title: "Technical Projects | Dustin J. Ober",
        description:
            "AI-driven projects including NER models, multi-agent systems, and full-stack applications.",
        url: "https://aiober.com/projects",
        type: "website",
    },
    alternates: {
        canonical: "https://aiober.com/projects",
    },
};

const projectsSeriesInfo = {
    title: "Technical Projects",
    subtitle: "Engineering Solutions with Measurable Impact",
};

const projects = [
    {
        id: "proj-01",
        type: "Constraint-Based Optimization",
        title: "EduSched",
        subtitle: "Intelligent Educational Scheduling",
        abstract:
            "A hybrid heuristic + Google OR-Tools solver that generates optimal multi-constraint schedules in seconds. Reduced administrative scheduling time by ~80% in pilot tests.",
        link: "https://github.com/dustinober1/edusched-scheduler",
    },
    {
        id: "proj-02",
        type: "Graph AI Risk Monitoring",
        title: "ChainReaction",
        subtitle: "Supply Chain Intelligence Platform",
        abstract:
            "Multi-agent system (LangGraph) that maps global news to supply chain graphs via Neo4j using NER. Real-time risk detection allows for 40% faster contingency planning.",
        link: "https://github.com/dustinober1/ChainReaction",
    },
    {
        id: "proj-03",
        type: "LLM Optimization (DSPy)",
        title: "Prompt Trainer",
        subtitle: "Human-in-the-Loop Prompt Engineering",
        abstract:
            "Uses DSPy to programmatically optimize prompts based on user feedback. Increased AI grading alignment with human instructors from 65% to 92% over 50 iterations.",
        link: "https://github.com/dustinober1/Prompt_Trainer",
    },
    {
        id: "proj-04",
        type: "AI Productivity Tools",
        title: "Vibe Coder",
        subtitle: "Provider-Independent CLI Assistant",
        abstract:
            "A CLI assistant with 40+ specialized commands for refactoring and testing. Benchmarked a 30% reduction in typical \"chat-to-code\" cognitive context switching overhead.",
        link: "https://github.com/dustinober1/cli",
    },
    {
        id: "proj-05",
        type: "Sentiment & Trend Analytics",
        title: "Tech-Pulse",
        subtitle: "Real-Time Market Intelligence",
        abstract:
            "Streamlit dashboard using BERTopic for grouping and VADER for sentiment scoring. Provides actionable daily intelligence summaries in < 5 minutes of review.",
        link: "https://github.com/dustinober1/tech-pulse",
    },
    {
        id: "proj-06",
        type: "Vision-Language AI",
        title: "ImageMD",
        subtitle: "Document-to-Markdown Extraction",
        abstract:
            "Pipeline using vision transformers to convert document screenshots directly into clean Markdown. High-fidelity extraction of academic papers for ingestion into RAG pipelines.",
        link: "https://github.com/dustinober1/imagemd",
    },
];

// SVG Icons
const GithubIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
);

const AboutIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
);

export default function ProjectsPage() {
    // Generate SoftwareSourceCode schema for each project
    const projectSchemas = projects.map(project =>
        structuredDataEngine.generateTechArticle({
            headline: `${project.title}: ${project.subtitle}`,
            description: project.abstract,
            author: "Dustin J. Ober",
            url: project.link,
        })
    );

    return (
        <main className={styles.researchMain}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(projectSchemas),
                }}
            />

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.seriesTitle}>{projectsSeriesInfo.title}</h1>
                    <p className={styles.seriesSubtitle}>
                        {projectsSeriesInfo.subtitle}
                    </p>
                    <div className={styles.divider}></div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className={styles.whitepaperSection}>
                <div className="container">
                    <div className={styles.whitepaperGrid}>
                        {projects.map((project) => (
                            <article key={project.id} className={styles.whitepaperCard}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.paperType}>{project.type}</span>
                                </div>

                                <div className={styles.cardBody}>
                                    <Link href={project.link} target="_blank" rel="noopener noreferrer" className={styles.titleLink}>
                                        <h2 className={styles.paperTitle}>{project.title}</h2>
                                    </Link>
                                    <h3 className={styles.paperSubtitle}>{project.subtitle}</h3>
                                    <p className={styles.paperAbstract}>{project.abstract}</p>
                                </div>

                                <div className={styles.cardFooter}>
                                    <div className={styles.actionButtons}>
                                        <Link
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.downloadBtn}
                                        >
                                            <span className={styles.downloadIcon}>
                                                <GithubIcon />
                                            </span>
                                            View Code
                                        </Link>
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
                        <h2 className={styles.aboutTitle}>Open Source Portfolio</h2>
                        <p className={styles.aboutText}>
                            These projects represent my hands-on engineering work across AI/ML, optimization, and full-stack development. Each project follows a Problem → Solution → Impact framework, demonstrating measurable outcomes and production-ready architecture patterns.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
