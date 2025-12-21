import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Explore a showcase of AI-driven projects, custom NLP models, and full-stack applications developed by Dustin J. Ober.",
};

const projects = [
    {
        name: "EduSched",
        category: "Constraint-Based Optimization",
        logo: "/logos/edusched-scheduler.png",
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
        logo: "/logos/chain-reaction.png",
        problem: "Global supply chains are vulnerable to rapid, unforeseen geopolitical shifts.",
        solution:
            "Multi-agent system (LangGraph) that maps news to supply chain graphs via Neo4j.",
        impact: "Real-time risk detection allows for 40% faster contingency planning.",
        link: "https://github.com/dustinober1/ChainReaction",
    },
    {
        name: "Prompt Trainer",
        category: "LLM Optimization (DSPy)",
        logo: "/logos/prompt-trainer.png",
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
        logo: "/logos/cli.png",
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
        logo: "/logos/tech-pulse.png",
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
        logo: "/logos/imagemd.png",
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
                style={{ padding: "4rem 0", background: "rgba(47, 129, 247, 0.03)" }}
            >
                <div className="container">
                    <h2 style={{ marginBottom: "2.5rem", textAlign: "center" }}>
                        Featured Case Study: ChainReaction
                    </h2>
                    <div
                        className="job-card"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "3rem",
                            alignItems: "center",
                            padding: "3rem",
                        }}
                    >
                        <div style={{ textAlign: "center" }}>
                            <Image
                                src="/logos/chain-reaction.png"
                                alt="ChainReaction Case Study"
                                width={250}
                                height={250}
                                style={{
                                    width: "100%",
                                    maxWidth: "250px",
                                    height: "auto",
                                    aspectRatio: "1/1",
                                    objectFit: "contain",
                                    borderRadius: "12px",
                                    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))",
                                }}
                            />
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
                                        <Image
                                            src={project.logo}
                                            alt={`${project.name} Logo`}
                                            width={200}
                                            height={200}
                                        />
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
