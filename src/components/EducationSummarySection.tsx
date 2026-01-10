import Link from "next/link";

const degrees = [
    {
        title: "Graduate Certificate in AI Systems Management",
        school: "Strayer University (2025)",
    },
    {
        title: "Master of Education (M.Ed.) in Instructional Design & Technology",
        school: "Liberty University",
    },
    {
        title: "BS in Management / CIS",
        school: "Park University",
    },
    {
        title: "AAS in Criminal Justice",
        school: "Community College of the Air Force",
    },
];

const certificationCategories = [
    {
        title: "Project Management",
        icon: "fas fa-project-diagram",
        certs: ["Project Management Professional (PMP)", "Certified Scrum Master"],
    },
    {
        title: "AI & Machine Learning",
        icon: "fas fa-robot",
        certs: [
            "Graduate Certificate: AI Systems Management",
            "DeepLearning.AI TensorFlow Developer",
            "Databricks Accredited Generative AI",
        ],
    },
    {
        title: "Data Science",
        icon: "fas fa-chart-line",
        certs: ["IBM Data Science Professional", "Google Data Analytics Professional"],
    },
];

export default function EducationSummarySection() {
    return (
        <>
            {/* Education Section */}
            <section id="education">
                <div className="container">
                    <h2>Education</h2>
                    <div className="edu-grid">
                        {degrees.map((degree, index) => (
                            <div key={index} className="edu-card">
                                <h3>{degree.title}</h3>
                                <div className="edu-school">{degree.school}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Certifications Section - Separate from Education */}
            <section id="certifications" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
                <div className="container">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            marginBottom: "2.5rem",
                        }}
                    >
                        <h2 style={{ margin: 0 }}>Key Certifications</h2>
                        <Link href="/education" style={{ fontSize: "0.9rem", color: "var(--accent)" }}>
                            View All Certifications →
                        </Link>
                    </div>
                    <div className="skills-grid">
                        {certificationCategories.map((category, index) => (
                            <div key={index} className="skill-category">
                                <h3>
                                    <i className={category.icon}></i> {category.title}
                                </h3>
                                <ul style={{ color: "var(--text-secondary)", listStyle: "none" }}>
                                    {category.certs.map((cert, cIndex) => (
                                        <li key={cIndex}>
                                            <i
                                                className="fas fa-check-circle"
                                                style={{ color: "var(--accent)" }}
                                            ></i>{" "}
                                            {cert}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div
                        style={{
                            marginTop: "2.5rem",
                            background: "var(--card-bg)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            padding: "1.5rem",
                        }}
                    >
                        <h4 style={{ marginBottom: "1rem", color: "var(--accent)" }}>
                            Continuous Learning
                        </h4>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", margin: 0 }}>
                            Actively maintaining 20+ Udacity Nanodegrees and specialized certifications in NLP,
                            AWS Cloud, and Ethical Hacking to stay at the forefront of technical innovation.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
