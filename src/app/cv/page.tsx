"use client";

import styles from "../resume/resume.module.css";

const experiences = [
    {
        title: "ML Engineer / Data Scientist",
        date: "2024 – Present",
        company: "Leidos - Chantilly, VA",
        bullets: [
            "Received Letter of Appreciation from customer for leading AI implementation into workflows and processes.",
            "Designed and deployed custom NER models for specialized intelligence datasets, achieving extraction accuracy exceeding industry benchmarks.",
            "Trained and deployed 30+ ML models using TensorFlow and DSPy, streamlining data extraction into production-ready insights.",
            "Built secure FastAPI REST services with JWT authentication and Dockerized applications ensuring 99.9% deployment consistency.",
            "Lead PMP Instructor for 4+ cohorts; authored PMP 2026 Exam Prep Ebook with high community engagement.",
        ],
    },
    {
        title: "Technical Lead / Data Analyst",
        date: "2022 – 2024",
        company: "Peraton & Leidos - Chantilly, VA",
        bullets: [
            "Nominated for Schoolhouse Training Award for 4-week core-skills course matching agency certification standards.",
            "Directed team of instructional designers using Agile methodologies for course development pipelines.",
            "Automated reporting pipeline reducing generation time by 97% (from 1 week to 30 minutes).",
            "Created searchable Section 508/WCAG accessibility database adopted across NCTC.",
        ],
    },
    {
        title: "Instructional Systems Specialist",
        date: "2019 – 2021",
        company: "DEA, Tekmasters, Tridea Works",
        bullets: [
            "Led development of Cyber Drug Investigator Course, identifying 290+ critical tasks via Job Task Analysis.",
            "Created learner-centered curricula using Articulate 360, Captivate, and Camtasia for intelligence environments.",
            "Established remote learning infrastructure using Adobe Connect and Microsoft Teams.",
        ],
    },
    {
        title: "Instructor / Course Developer",
        date: "2004 – 2014",
        company: "United States Air Force",
        bullets: [
            "15+ years of distinguished service across technical training and leadership roles.",
            "Maintained technical databases with 1,000+ entries achieving 100% data accuracy.",
            "Authored 52 technical scenarios for firearms training simulators.",
        ],
    },
];

const education = [
    {
        degree: "Graduate Certificate: AI Systems Management",
        school: "Strayer University",
        year: "2025",
    },
    {
        degree: "Master of Education: Instructional Design & Technology",
        school: "Liberty University",
        year: "2018",
    },
    {
        degree: "BS in Management / Computer Information Systems",
        school: "Park University",
        year: "2014",
    },
];

const sovereignWhitepapers = [
    {
        title: "Sovereign AI Infrastructure",
        subtitle: "Hardware & Architecture for Disconnected Environments",
    },
    {
        title: "The Disconnected Pipeline",
        subtitle: "Solving Dependency Management in Secure Facilities",
    },
    {
        title: "Private Knowledge Retrieval",
        subtitle: "Architecting Local RAG Systems",
    },
    {
        title: "Verifiable Intelligence",
        subtitle: "DSPy, Governance, and Hallucination Control",
    },
    {
        title: "Agentic Architectures in Secure Enclaves",
        subtitle: "Multi-Agent Systems for Zero-Egress Environments",
    },
    {
        title: "Beyond \"Vibes\"",
        subtitle: "Engineering Reliable AI Tutors with DSPy",
    },
    {
        title: "The Future of Neuro-Symbolic Tutors",
        subtitle: "Hyper-Personalized, Verifiable Learning Paths",
    },
    {
        title: "Scaling LLM Evaluation with DSPy",
        subtitle: "From Manual Prompting to Optimized Pipelines",
    },
];

const certifications = [
    "Project Management Professional (PMP) - PMI",
    "Deep Learning Nanodegree - Udacity",
    "Natural Language Processing Nanodegree - Udacity",
    "Computer Vision Nanodegree - Udacity",
    "Generative AI Nanodegree - Udacity",
    "Artificial Intelligence Nanodegree - Udacity",
    "Deep Reinforcement Learning Nanodegree - Udacity",
    "Intro to Machine Learning (PyTorch) - Udacity",
    "AI Programming with Python - Udacity",
    "AI Product Manager - Udacity",
    "Generative AI Fundamentals - Databricks",
    "Lakehouse Platform Essentials - Databricks",
    "AWS Cloud Practitioner (Foundational) - AWS",
    "Business Analytics Nanodegree - Udacity",
    "Statistics for Data Analysis - Udacity",
];

const skills = [
    {
        category: "Data Science & ML",
        items: "TensorFlow, PyTorch, DSPy, NLP/NER, Scikit-Learn, Pandas, NumPy, Feature Engineering, A/B Testing",
    },
    {
        category: "ML Ops & Dev",
        items: "Python, FastAPI, Docker, Git, MLflow, RESTful APIs, Jupyter, SQL, LangChain, LangGraph",
    },
    {
        category: "Databases",
        items: "PostgreSQL, Neo4j, Qdrant, SQLite, Redis, Vector Databases",
    },
    {
        category: "Leadership",
        items: "PMP Methodology, Agile/Scrum, Technical Training, ADDIE, Team Leadership",
    },
    {
        category: "Accessibility",
        items: "Section 508 Compliance, WCAG 2.1, Government Standards, A11y Testing",
    },
];

export default function CVPage() {
    return (
        <div className={styles.resumeBody}>
            <div className={styles.noPrint}>
                <div className={styles.buttonGroup}>
                    <a
                        href="/documents/cv.pdf"
                        download="Dustin_Ober_CV.pdf"
                        className={styles.downloadBtn}
                    >
                        Download Full CV Includes Publications
                    </a>
                </div>
            </div>

            <div className={styles.resumeContainer}>
                <header className={styles.resumeHeader}>
                    <div className={styles.headerLeft}>
                        <h1>Dustin J. Ober</h1>
                        <p>Data Scientist & ML Engineer</p>
                    </div>
                    <div className={styles.headerRight}>
                        <div>dustin@aiober.com</div>
                        <div>540-793-0177</div>
                        <div>Chantilly, VA</div>
                        <div>linkedin.com/in/dober1</div>
                        <div className={styles.portfolioLink}>aiober.com</div>
                    </div>
                </header>

                <div className={styles.clearanceBanner}>
                    Security Clearance: Top Secret with SCI and Poly
                </div>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Summary</h2>
                    <p>
                        Data Scientist specializing in NLP, Machine Learning, and Production ML Systems.
                        30+ models deployed for defense and intelligence applications. Extensive experience
                        architecting end-to-end AI pipelines, custom NER systems, and secure ML infrastructure.
                        PMP-certified technical leader bridging data science with mission-critical training outcomes.
                        Author of "The Sovereign AI Handbook" series on disconnected AI architectures.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Professional Experience</h2>
                    <p className={styles.contractNote}>
                        Contract-based roles supporting classified defense and intelligence missions.
                    </p>
                    {experiences.map((exp, idx) => (
                        <div key={idx} className={styles.jobEntry}>
                            <div className={styles.jobHeader}>
                                <span>{exp.title}</span>
                                <span className={styles.jobDate}>{exp.date}</span>
                            </div>
                            <div className={styles.jobCompany}>{exp.company}</div>
                            <ul className={styles.jobList}>
                                {exp.bullets.map((bullet, bidx) => (
                                    <li key={bidx}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Publications & Research</h2>
                    <div style={{ marginBottom: "1rem" }}>
                        <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>
                            The Sovereign AI Handbook Series
                        </p>
                        <ul className={styles.jobList}>
                            {sovereignWhitepapers.map((paper, idx) => (
                                <li key={idx}>
                                    <strong>{paper.title}</strong>: {paper.subtitle}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Education</h2>
                    {education.map((edu, idx) => (
                        <div key={idx} className={styles.jobEntry}>
                            <div className={styles.jobHeader}>
                                <span>{edu.degree}</span>
                                {edu.year && <span className={styles.jobDate}>{edu.year}</span>}
                            </div>
                            <div className={styles.jobCompany}>{edu.school}</div>
                        </div>
                    ))}
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Certifications</h2>
                    <ul className={styles.jobList} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                        {certifications.map((cert, idx) => (
                            <li key={idx} style={{ breakInside: "avoid" }}>{cert}</li>
                        ))}
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Technical Skills</h2>
                    <div className={styles.skillsGrid}>
                        {skills.map((skill) => (
                            <div key={skill.category} className={styles.skillItem}>
                                <strong>{skill.category}</strong>
                                <span>{skill.items}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
