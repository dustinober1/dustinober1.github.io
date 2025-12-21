"use client";

import Link from "next/link";
import styles from "./cv.module.css";

const technicalProficiencies = [
    {
        area: "AI & Data Science",
        skills:
            "TensorFlow, PyTorch, DSPy, LangChain, Custom NER, BERT/Transformers, Vector Search (ChromaDB, Neo4j), Pandas, NumPy, Scikit-Learn.",
    },
    {
        area: "Software Engineering",
        skills:
            "Python (Advanced), JavaScript/TypeScript, SQL, FastAPI, Docker, Git, CI/CD, RESTful APIs, JWT Authentication.",
    },
    {
        area: "Instructional Design & Strategy",
        skills:
            "ADDIE Model, SAM, Articulate 360, Adobe Captivate Specialists, Adult Learning Theory, Job Task Analysis (JTA), Learning Analytics.",
    },
    {
        area: "Leadership & Management",
        skills:
            "Project Management Professional (PMP), Agile/Scrum (CSM), Team Leadership, Technical Curriculum Strategy.",
    },
];

const experiences = [
    {
        title: "Developer",
        date: "07/2024 – Present",
        company: "Leidos - Chantilly, VA",
        bullets: [
            "Engineered custom Named Entity Recognition (NER) models for specialized customer datasets, exceeding industry benchmarks.",
            "Architected and deployed 30+ machine learning models into production environments using TensorFlow and DSPy pipelines.",
            "Developed secure, high-concurrency FastAPI microservices with Dockerized deployments.",
            "Leads internal technical training initiatives, including PMP certification prep and AI workshops.",
        ],
    },
    {
        title: "Instructional Systems Designer",
        date: "10/2023 – 07/2024",
        company: "Peraton - Chantilly, VA",
        bullets: [
            "Directed a team of instructional designers supporting complex intelligence mission training.",
            "Managed a high-priority course portfolio through the full ADDIE lifecycle.",
            "Improved project delivery timelines by implementing Agile-inspired design sprints.",
        ],
    },
    {
        title: "E-Learning Developer",
        date: "01/2022 – 10/2023",
        company: "Leidos - Chantilly, VA",
        bullets: [
            "Pioneered the use of Python for learning analytics, resulting in a 20% increase in training effectiveness metrics.",
            "Automated cross-platform training data ingestion using custom web scrapers and Python scripts.",
            "Developed 5 massive-scale web-based training (WBT) modules under aggressive schedules.",
        ],
    },
    {
        title: "Instructional Designer",
        date: "03/2021 – 12/2021",
        company: "Tekmasters - Springfield, VA",
        bullets: [
            "Built interactive e-learning solutions using the full Articulate 360 and Adobe suites.",
            "Conducted deep-dive research into emerging educational technologies for federal adoption.",
        ],
    },
    {
        title: "Training Development Specialist",
        date: "05/2020 – 03/2021",
        company: "Tridea Works - Fredericksburg, VA",
        bullets: [],
    },
    {
        title: "Instructional Systems Specialist",
        date: "01/2019 – 05/2020",
        company: "Drug Enforcement Administration (DEA) - Quantico, VA",
        bullets: [],
    },
    {
        title: "Instructor / Course Developer",
        date: "03/2004 – 08/2014",
        company: "United States Air Force",
        bullets: [
            "Managed technical training for thousands of personnel with 100% database accuracy.",
            "Developed simulation-based curricula for high-stakes operational environments.",
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
        degree: "Master of Education (M.Ed.): Instructional Design & Technology",
        school: "Liberty University",
    },
    {
        degree: "Bachelor of Science (B.S.): Management / CIS",
        school: "Park University",
    },
];

const primaryCertifications = [
    "Project Management Professional (PMP) - PMI",
    "DeepLearning.AI TensorFlow Developer",
    "Certified Scrum Master (CSM)",
    "AWS Certified Cloud Practitioner",
    "IBM Data Science Professional Certificate",
    "Google Data Analytics Professional Certificate",
    "Databricks Generative AI Fundamentals",
    "Adobe Captivate Specialist",
];

const nanodegrees = [
    [
        "Udacity Deep Reinforcement Learning",
        "Udacity Natural Language Processing",
        "Udacity Computer Vision",
        "Udacity Artificial Intelligence",
        "Udacity Deep Learning",
    ],
    [
        "Udacity AI Product Manager",
        "Udacity AI Programming with Python",
        "Udacity Generative AI",
        "Udacity Business Intelligence Analytics",
        "Stanford Machine Learning",
    ],
];

export default function CVPage() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className={styles.cvBody}>
            <div className={styles.noPrint}>
                <button onClick={handlePrint} className={styles.actionBtn}>
                    Print CV / Save as PDF
                </button>
                <Link
                    href="/resume"
                    className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}
                >
                    View Resume
                </Link>
            </div>

            <div className={styles.cvContainer}>
                <header className={styles.cvHeader}>
                    <div className={styles.headerLeft}>
                        <h1>Dustin J. Ober</h1>
                        <p>AI Developer & Technical Instructional Systems Designer</p>
                    </div>
                    <div className={styles.headerRight}>
                        <div>dustinober@me.com</div>
                        <div>540-793-0177</div>
                        <div>Chantilly, VA</div>
                        <div>linkedin.com/in/dober1</div>
                        <div className={styles.portfolioLink}>dustinober1.github.io</div>
                    </div>
                </header>

                <div className={styles.clearanceBanner}>
                    Security Clearance: Top Secret Clearance with SCI and Poly
                </div>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Professional Profile</h2>
                    <p>
                        A high-performing Technical Instructional Systems Designer and Full Stack
                        Developer with over 20 years of experience spanning military service, federal
                        contracting, and advanced AI development. Expert in bridging the gap between
                        educational strategy and technical implementation, specifically within the
                        defense and intelligence communities. Specialized in NLP, LLM automation
                        (DSPy/LangChain), and data-driven learning analytics.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Technical Proficiencies</h2>
                    <div className={styles.skillsSection}>
                        {technicalProficiencies.map((item) => (
                            <div key={item.area} className={styles.skillGroup}>
                                <strong>{item.area}</strong>
                                <p>{item.skills}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Professional Experience</h2>
                    {experiences.map((exp, idx) => (
                        <div key={idx} className={styles.entry}>
                            <div className={styles.entryHeader}>
                                <span>{exp.title}</span>
                                <span>{exp.date}</span>
                            </div>
                            <div className={styles.entrySubheader}>{exp.company}</div>
                            {exp.bullets.length > 0 && (
                                <ul className={styles.entryList}>
                                    {exp.bullets.map((bullet, bidx) => (
                                        <li key={bidx}>{bullet}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Education & Academic Credentials</h2>
                    {education.map((edu, idx) => (
                        <div key={idx} className={styles.entry}>
                            <div className={styles.entryHeader}>
                                <span>{edu.degree}</span>
                                {edu.year && <span>{edu.year}</span>}
                            </div>
                            <div className={styles.entrySubheader}>{edu.school}</div>
                        </div>
                    ))}
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Certifications & Technical Training</h2>
                    <h3 className={styles.subTitle}>Primary Industry Credentials</h3>
                    <ul className={styles.entryList}>
                        {primaryCertifications.map((cert) => (
                            <li key={cert}>{cert}</li>
                        ))}
                    </ul>

                    <h3 className={styles.subTitle}>Specialized Technical Nanodegrees</h3>
                    <div className={styles.skillsSection} style={{ marginTop: "10px" }}>
                        {nanodegrees.map((column, idx) => (
                            <ul key={idx} className={styles.entryList}>
                                {column.map((nd) => (
                                    <li key={nd}>{nd}</li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Professional Affiliations & Interests</h2>
                    <p>
                        <strong>Interests:</strong> Neuro-symbolic AI, LLM fine-tuning, automated
                        intelligent tutoring systems, Olympic Weightlifting, CrossFit.
                    </p>
                </section>
            </div>
        </div>
    );
}
