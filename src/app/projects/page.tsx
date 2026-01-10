import type { Metadata } from "next";
import Link from "next/link";

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

// SVG Icon Components
const CalendarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <rect x="7" y="14" width="3" height="3" rx="0.5" />
        <rect x="14" y="14" width="3" height="3" rx="0.5" />
    </svg>
);

const NetworkIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="19" r="3" />
        <circle cx="19" cy="19" r="3" />
        <line x1="12" y1="8" x2="5" y2="16" />
        <line x1="12" y1="8" x2="19" y2="16" />
        <line x1="5" y1="19" x2="19" y2="19" />
    </svg>
);

const BrainIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5" />
        <path d="M12 4.5a2.5 2.5 0 0 1 4.96-.46 2.5 2.5 0 0 1 1.98 3 2.5 2.5 0 0 1 1.32 4.24 3 3 0 0 1-.34 5.58 2.5 2.5 0 0 1-2.96 3.08A2.5 2.5 0 0 1 12 19.5" />
        <path d="M12 4.5v15" />
    </svg>
);

const TerminalIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <polyline points="7,9 10,12 7,15" />
        <line x1="13" y1="15" x2="17" y2="15" />
    </svg>
);

const PulseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h4l3-9 4 18 3-9h4" />
    </svg>
);

const DocumentImageIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <circle cx="10" cy="13" r="2" />
        <path d="M20 17l-1.5-1.5a2 2 0 0 0-3 0L6 17" />
    </svg>
);

const projects = [
    {
        name: "EduSched",
        category: "Constraint-Based Optimization",
        icon: <CalendarIcon />,
        problem:
            "Educational institutions struggle with multi-constraint scheduling (rooms, instructors, student requirements).",
        solution:
            "A hybrid heuristic + Google OR-Tools solver that generates optimal schedules in seconds.",
        impact: "Reduced administrative scheduling time by ~80% in pilot tests.",
        link: "https://github.com/dustinober1/edusched-scheduler",
    },
    {
        name: "ChainReaction",
        category: "Graph AI Risk Monitoring",
        icon: <NetworkIcon />,
        problem: "Global supply chains are vulnerable to rapid, unforeseen geopolitical shifts.",
        solution:
            "Multi-agent system (LangGraph) that maps news to supply chain graphs via Neo4j.",
        impact: "Real-time risk detection allows for 40% faster contingency planning.",
        link: "https://github.com/dustinober1/ChainReaction",
    },
    {
        name: "Prompt Trainer",
        category: "LLM Optimization (DSPy)",
        icon: <BrainIcon />,
        problem:
            "AI-generated feedback often lacks consistency and doesn't align with human rubrics.",
        solution:
            "Human-in-the-loop system that uses DSPy to programmatically optimize prompts based on user feedback.",
        impact:
            "Increased AI grading alignment with human instructors from 65% to 92% over 50 iterations.",
        link: "https://github.com/dustinober1/Prompt_Trainer",
    },
    {
        name: "Vibe Coder",
        category: "AI Productivity Tools",
        icon: <TerminalIcon />,
        problem: "Switching between IDE and AI chat interfaces breaks developer flow state.",
        solution:
            "A provider-independent CLI assistant with 40+ specialized commands for refactoring and testing.",
        impact:
            'Benchmarked a 30% reduction in typical "chat-to-code" cognitive context switching overhead.',
        link: "https://github.com/dustinober1/cli",
    },
    {
        name: "Tech-Pulse",
        category: "Sentiment & Trend Analytics",
        icon: <PulseIcon />,
        problem:
            "Information overload makes it difficult to track market sentiment and emerging tech trends.",
        solution:
            "Real-time Streamlit dashboard using BERTopic for grouping and VADER for sentiment scoring.",
        impact: "Provides actionable daily intelligence summaries in < 5 minutes of review.",
        link: "https://github.com/dustinober1/tech-pulse",
    },
    {
        name: "ImageMD",
        category: "Vision-Language AI",
        icon: <DocumentImageIcon />,
        problem:
            "Extracting structured data from complex PDFs with tables and formulas is notoriously difficult.",
        solution:
            "Pipeline using vision transformers to convert document screenshots directly into clean Markdown.",
        impact: "High-fidelity extraction of academic papers for ingestion into RAG pipelines.",
        link: "https://github.com/dustinober1/imagemd",
    },
];

export default function ProjectsPage() {
    return (
        <main>
            {/* Hero Section */}
            <section className="hero" style={{ padding: "6rem 0 3rem" }}>
                <div className="container">
                    <h1>Technical Projects</h1>
                    <p>
                        A showcase of engineering solutions, AI models, and data pipelines focusing on
                        measurable impact.
                    </p>
                </div>
            </section>

            {/* Featured Case Study */}
            <section
                className="featured-case-study"
                style={{ padding: "5rem 0", background: "var(--accent-muted)" }}
            >
                <div className="container">
                    <h2 style={{ marginBottom: "3rem", textAlign: "center" }}>
                        Featured Case Study: ChainReaction
                    </h2>
                    <div
                        className="job-card"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "280px 1fr",
                            gap: "4rem",
                            alignItems: "center",
                            padding: "3.5rem",
                        }}
                    >
                        <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div className="featured-icon-wrapper">
                                <NetworkIcon />
                            </div>
                        </div>
                        <div>
                            <h3 style={{ color: "var(--accent)", marginBottom: "1rem" }}>
                                Architecting Resilient Supply Chains with Multi-Agent AI
                            </h3>
                            <p
                                style={{
                                    color: "var(--text-secondary)",
                                    lineHeight: 1.7,
                                    marginBottom: "1.5rem",
                                }}
                            >
                                <strong>The Challenge:</strong> Global supply chains face increasing volatility
                                from geopolitical shifts. Traditional risk monitoring is reactive, often
                                missing the &quot;first domino&quot; in a sequence of events.
                            </p>
                            <p
                                style={{
                                    color: "var(--text-secondary)",
                                    lineHeight: 1.7,
                                    marginBottom: "1.5rem",
                                }}
                            >
                                <strong>The Solution:</strong> Built using <strong>LangGraph</strong> and{" "}
                                <strong>Neo4j</strong>, ChainReaction is a multi-agent system that autonomously
                                bridges the gap between global news and specific supply chain nodes using{" "}
                                <strong>Named Entity Recognition (NER)</strong>.
                            </p>
                            <p
                                style={{
                                    color: "var(--text-secondary)",
                                    lineHeight: 1.7,
                                    marginBottom: "2rem",
                                }}
                            >
                                <strong>The Impact:</strong> Successfully demonstrated a 40% reduction in risk
                                response time during trials, providing stakeholders with actionable
                                intelligence before disruptions hit.
                            </p>
                            <div className="tags" style={{ marginBottom: "2rem" }}>
                                <span className="tag">LangGraph</span>
                                <span className="tag">Neo4j</span>
                                <span className="tag">Python</span>
                                <span className="tag">Generative AI</span>
                            </div>
                            <Link
                                href="/case-study-chain-reaction"
                                className="view-btn"
                                style={{ width: "auto", padding: "0.8rem 2rem", borderRadius: "50px" }}
                            >
                                Read Full Case Study
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section id="projects-list">
                <div className="container">
                    <div className="projects-grid">
                        {projects.map((project) => (
                            <div key={project.name} className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <div className="project-icon-wrapper">
                                            {project.icon}
                                        </div>
                                        <h3>{project.name}</h3>
                                        <div className="category">{project.category}</div>
                                    </div>
                                    <div className="flip-card-back">
                                        <h3>{project.name}</h3>
                                        <p>
                                            <strong>Problem:</strong> {project.problem}
                                        </p>
                                        <p>
                                            <strong>Solution:</strong> {project.solution}
                                        </p>
                                        <p>
                                            <strong>Impact:</strong> {project.impact}
                                        </p>
                                        <Link
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="view-btn"
                                        >
                                            View Repository <i className="fas fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
