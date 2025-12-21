import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "./casestudy.module.css";

export const metadata: Metadata = {
    title: "Case Study: ChainReaction",
    description:
        "Detailing the architecture and impact of ChainReaction, a multi-agent AI system for supply chain risk monitoring.",
};

const metrics = [
    { value: "40%", label: "Reduction in Risk Detection Latency" },
    { value: "100+", label: "Events Processed Per Minute" },
    { value: "99%", label: "NER Extraction Reliability via DSPy" },
];

const agents = [
    {
        icon: "fas fa-search-location",
        name: "Scout Agent",
        description:
            'The "eyes" of the system. Continuously monitors RSS feeds, geopolitical news, and trade data. It identifies potential risk signals and passes them to the orchestration layer.',
    },
    {
        icon: "fas fa-brain",
        name: "DSPy Analyst",
        description:
            "Uses DSPy-based risk extraction to convert unstructured text into structured JSON. Includes confidence scoring and validation to ensure 99% accuracy in entity mapping.",
    },
    {
        icon: "fas fa-project-diagram",
        name: "GraphRAG Engine",
        description:
            "Powered by Neo4j, it traces multi-hop impact paths. It doesn't just find the supplier; it finds every component and assembly downstream that will be stalled.",
    },
];

const architectureSteps = [
    {
        title: "Ingestion",
        description: "Scout Agent feeds live news to the pipeline.",
    },
    {
        title: "Extraction",
        description: "LLM (GPT-4o/Ollama) with DSPy structures data.",
    },
    {
        title: "Correlation",
        description: "Neo4j maps entities to known supply chain nodes.",
    },
    {
        title: "Alerting",
        description: "Next.js Dashboard & Webhooks notify stakeholders.",
    },
];

const features = [
    {
        icon: "fas fa-bell",
        title: "Advanced Alerting",
        tag: "NEW",
        description:
            "Multi-channel delivery (Email, Slack) with escalation rules and acknowledgment tracking. Integrates directly with existing enterprise ERPs via bidirectional APIs.",
    },
    {
        icon: "fas fa-bolt",
        title: "Query Performance",
        tag: "OPTIMIZED",
        description:
            "Implemented query caching with TTL and batch processing, allowing the system to handle 100+ events per minute without degrading performance.",
    },
    {
        icon: "fas fa-lock",
        title: "Local-First AI",
        tag: null,
        description:
            "Support for Ollama allows for deployments in secure, air-gapped environments, ensuring mission-critical data never leaves the network.",
    },
    {
        icon: "fas fa-universal-access",
        title: "WCAG 2.1 AA",
        tag: null,
        description:
            "A fully accessible Next.js dashboard with force-directed graph visualizations, ensuring all decision-makers have equal access to insights.",
    },
];

const techStack = [
    { icon: "fab fa-python", name: "Python 3.11" },
    { icon: "fas fa-brain", name: "LangGraph / DSPy" },
    { icon: "fas fa-database", name: "Neo4j (Cypher)" },
    { icon: "fas fa-server", name: "FastAPI (v2)" },
    { icon: "fab fa-react", name: "Next.js 14" },
    { icon: "fab fa-docker", name: "Docker Compose" },
];

export default function CaseStudyChainReactionPage() {
    return (
        <main>
            {/* Hero Section */}
            <section className="hero" style={{ padding: "8rem 0 4rem", textAlign: "left" }}>
                <div className="container">
                    <div
                        style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2rem" }}
                    >
                        <Image
                            src="/logos/chain-reaction.png"
                            alt="ChainReaction Logo"
                            width={80}
                            height={80}
                            style={{ objectFit: "contain" }}
                        />
                        <span
                            className="tag"
                            style={{ background: "rgba(47, 129, 247, 0.2)", color: "var(--accent)" }}
                        >
                            Featured Case Study
                        </span>
                    </div>
                    <h1 style={{ maxWidth: "800px", marginBottom: "1.5rem" }}>
                        ChainReaction: Graph-Powered Predictive Risk Intelligence
                    </h1>
                    <p
                        style={{
                            fontSize: "1.25rem",
                            maxWidth: "700px",
                            color: "var(--text-secondary)",
                        }}
                    >
                        An autonomous GraphRAG ecosystem that continuously monitors global news, extracts
                        risk entities using DSPy, and traces cascading impacts across multi-hop supply
                        chain networks.
                    </p>

                    <div className={styles.metricsGrid}>
                        {metrics.map((metric) => (
                            <div key={metric.label} className={styles.metricCard}>
                                <span className={styles.metricValue}>{metric.value}</span>
                                <span className={styles.metricLabel}>{metric.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Problem */}
            <section style={{ padding: "5rem 0" }}>
                <div className="container" style={{ maxWidth: "900px" }}>
                    <h2 style={{ marginBottom: "2.5rem" }}>
                        The Visibility Gap: Reactive vs. Proactive
                    </h2>
                    <p
                        style={{
                            color: "var(--text-secondary)",
                            lineHeight: 1.8,
                            marginBottom: "2rem",
                            fontSize: "1.1rem",
                        }}
                    >
                        Global supply chains are opaque. When a geopolitical event occurs—a strike, a port
                        closure, or a regional conflict—logistics teams often don&apos;t realize they are
                        affected until a shipment fails to arrive. This &quot;Domino Effect&quot; is
                        difficult to track because relationships between tier-1, tier-2, and tier-3
                        suppliers are rarely mapped to real-world events.
                    </p>
                    <div
                        className="job-card"
                        style={{ borderLeft: "4px solid #ef4444", marginBottom: "3rem" }}
                    >
                        <p style={{ margin: 0, fontStyle: "italic" }}>
                            &quot;Traditional risk management is a backward-looking spreadsheet.
                            ChainReaction is a forward-looking intelligence engine.&quot;
                        </p>
                    </div>
                </div>
            </section>

            {/* Multi-Agent Orchestration */}
            <section
                style={{ padding: "5rem 0", background: "rgba(255,255,255,0.02)" }}
            >
                <div className="container">
                    <h2 style={{ textAlign: "center", marginBottom: "4rem" }}>
                        The Autonomous Ecosystem (LangGraph)
                    </h2>

                    <div className="edu-grid">
                        {agents.map((agent) => (
                            <div key={agent.name} className="skill-category">
                                <i
                                    className={`${agent.icon} ${styles.stackIcon}`}
                                    style={{ marginBottom: "1rem" }}
                                ></i>
                                <h3>{agent.name}</h3>
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                                    {agent.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Architecture Visualization */}
                    <div className={styles.diagramContainer}>
                        <h3 style={{ textAlign: "center", marginBottom: "3rem" }}>
                            Event-Driven Architecture
                        </h3>
                        <div className={styles.architectureGrid}>
                            {architectureSteps.map((step, idx) => (
                                <div key={idx} className={styles.archNode}>
                                    <strong
                                        style={{
                                            display: "block",
                                            color: "var(--accent)",
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        {step.title}
                                    </strong>
                                    <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                                        {step.description}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* v1.0 Features */}
            <section style={{ padding: "5rem 0" }}>
                <div className="container">
                    <h2 style={{ textAlign: "center", marginBottom: "4rem" }}>
                        v1.0 Enhancements & Enterprise Readiness
                    </h2>
                    <div className="skills-grid">
                        {features.map((feature) => (
                            <div key={feature.title} className={styles.featureItem}>
                                <h4 style={{ marginBottom: "1rem" }}>
                                    <i className={feature.icon} style={{ color: "var(--accent)" }}></i>{" "}
                                    {feature.title}
                                    {feature.tag && <span className={styles.featureTag}>{feature.tag}</span>}
                                </h4>
                                <p
                                    style={{
                                        color: "var(--text-secondary)",
                                        fontSize: "0.9rem",
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Stack */}
            <section style={{ padding: "5rem 0", background: "rgba(0,0,0,0.2)" }}>
                <div className="container" style={{ maxWidth: "900px" }}>
                    <h2 style={{ marginBottom: "3rem" }}>The Technical Stack</h2>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "1.5rem",
                        }}
                    >
                        {techStack.map((tech) => (
                            <div key={tech.name} className={styles.stackItem}>
                                <i className={`${tech.icon} ${styles.stackIcon}`}></i>
                                <span>{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                style={{
                    padding: "5rem 0",
                    textAlign: "center",
                    borderTop: "1px solid var(--border)",
                }}
            >
                <div className="container">
                    <h2>Explore the Architecture</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                        The complete codebase, documentation, and deployment guides are available on
                        GitHub.
                    </p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1.5rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <Link
                            href="https://github.com/dustinober1/ChainReaction"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-btn"
                            style={{ width: "auto", padding: "1rem 3rem" }}
                        >
                            <i className="fab fa-github"></i> GitHub Repository
                        </Link>
                        <Link href="/projects" className="contact-item" style={{ padding: "1rem 3rem" }}>
                            Back to Projects
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
