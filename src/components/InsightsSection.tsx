import Link from "next/link";

const insights = [
    {
        category: "ARTIFICIAL INTELLIGENCE",
        title: "Scaling LLM Evaluation with DSPy",
        excerpt: `How we transitioned from manual prompt engineering to programmatically optimized pipelines
      using DSPy assertions to ensure 99% extraction accuracy.`,
        date: "Dec 15, 2025",
        readTime: "5 min read",
    },
    {
        category: "INSTRUCTIONAL DESIGN",
        title: "The Future of Neuro-Symbolic Tutors",
        excerpt: `Exploration of combining deep learning's pattern recognition with symbolic logic to create
      hyper-personalized, verifiable learning paths.`,
        date: "Dec 02, 2025",
        readTime: "8 min read",
    },
];

export default function InsightsSection() {
    return (
        <section id="insights" style={{ padding: "5rem 0" }}>
            <div className="container">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "3rem",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    <h2>Technical Insights</h2>
                    <div style={{ display: "flex", gap: "1.5rem" }}>
                        <Link
                            href="/case-study-chain-reaction"
                            style={{ color: "var(--accent)", fontWeight: 600 }}
                        >
                            <i className="fas fa-file-contract"></i> Case Study →
                        </Link>
                        <Link href="/research" style={{ color: "var(--accent)", fontWeight: 600 }}>
                            <i className="fas fa-file-alt"></i> Research Series →
                        </Link>
                    </div>
                </div>
                <div className="edu-grid">
                    {insights.map((insight, index) => (
                        <div key={index} className="skill-category insight-card">
                            <div className="insight-category">{insight.category}</div>
                            <h3 className="insight-title">{insight.title}</h3>
                            <p className="insight-excerpt">{insight.excerpt}</p>
                            <div className="insight-meta">
                                {insight.date} • {insight.readTime}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
