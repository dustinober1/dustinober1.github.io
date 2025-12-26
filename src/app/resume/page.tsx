"use client";

import Link from "next/link";
import styles from "./resume.module.css";

const experiences = [
    {
        title: "Developer",
        date: "07/2024 – Present",
        company: "Leidos - Chantilly, VA",
        bullets: [
            "Engineered state-of-the-art NLP models: Designed custom Named Entity Recognition (NER) models for specialized datasets, achieving high extraction accuracy.",
            "Architected AI pipelines: Trained and deployed 30+ ML models using TensorFlow and DSPy for production insights.",
            "Modernized infrastructure: Built secure FastAPI REST services with JWT and Dockerized applications for 99.9% consistency.",
            "Project Leadership: Lead PMP Instructor for 4+ cohorts and author of the PMP 2026 Exam Prep Ebook.",
        ],
    },
    {
        title: "Instructional Systems Designer",
        date: "10/2023 – 07/2024",
        company: "Peraton - Chantilly, VA",
        bullets: [
            "Directed and mentored a team of instructional designers to achieve course development objectives.",
            "Managed a portfolio of 8 courses, overseeing end-to-end design and implementation.",
            "Coordinated multiple projects with strict deadlines in a fast-paced environment.",
        ],
    },
    {
        title: "E-Learning Developer",
        date: "01/2022 – 10/2023",
        company: "Leidos - Chantilly, VA",
        bullets: [
            "Leveraged Python (Pandas/NumPy) to analyze training trends, improving completion rates by 20%.",
            "Automated data collection via web-scraping, reducing manual workloads by 15 hours per week.",
            "Developed and deployed 5 comprehensive WBTs within 90 days for organizational missions.",
        ],
    },
    {
        title: "Instructional Designer",
        date: "03/2021 – 12/2021",
        company: "Tekmasters - Springfield, VA",
        bullets: [
            "Developed interactive digital learning materials using Articulate 360, Captivate, and Camtasia.",
            "Created learner-centered curricula tailored to adult education for intelligence environments.",
        ],
    },
    {
        title: "Instructor / Course Developer",
        date: "06/1999 – 08/2014",
        company: "United States Air Force",
        bullets: [
            "15+ years of distinguished service across multiple technical and leadership roles.",
            "Authored 52 technical scenarios for firearms training simulators.",
            "Maintained technical databases with 1,000+ entries achieving 100% data accuracy.",
            "Reduced performance report rewrites by 25% through evidence-based curriculum adjustments.",
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
        degree: "Master of Education: ID & Technology",
        school: "Liberty University",
    },
    {
        degree: "BS in Management / CIS",
        school: "Park University",
    },
];

const skills = [
    {
        category: "AI & Data",
        items: "TensorFlow, PyTorch, DSPy, NLP, Scikit-Learn, Pandas, NumPy, Vector Databases",
    },
    {
        category: "Development",
        items: "Python, JavaScript, FastAPI, SQL, Docker, Git, RESTful APIs, JWT, Bash",
    },
    {
        category: "Strategy",
        items: "Instructional Design (ADDIE), Articulate 360, Agile/Scrum, PMP Methodology",
    },
    {
        category: "Interests",
        items: "Neuro-symbolic AI, LLM Automation, Olympic Weightlifting, CrossFit",
    },
];

export default function ResumePage() {
    // handlePrint removed in favor of direct PDF download

    return (
        <div className={styles.resumeBody}>
            <div className={styles.noPrint}>
                <a
                    href="/documents/resume.pdf"
                    download="Dustin_Ober_Resume.pdf"
                    className={styles.downloadBtn}
                >
                    Download PDF Resume
                </a>
                <Link
                    href="/cv"
                    className={`${styles.downloadBtn} ${styles.downloadBtnSecondary}`}
                >
                    View Full CV
                </Link>
            </div>

            <div className={styles.resumeContainer}>
                <header className={styles.resumeHeader}>
                    <div className={styles.headerLeft}>
                        <h1>Dustin J. Ober</h1>
                        <p>AI Developer & Technical Instructional Systems Designer</p>
                    </div>
                    <div className={styles.headerRight}>
                        <div>dustinober@me.com</div>
                        <div>540-793-0177</div>
                        <div>Chantilly, VA</div>
                        <div>linkedin.com/in/dober1</div>
                        <div className={styles.portfolioLink}>aiober.com</div>
                    </div>
                </header>

                <div className={styles.clearanceBanner}>
                    Security Clearance: Top Secret Clearance with SCI and Poly
                </div>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Summary</h2>
                    <p>
                        Technical Instructional Systems Designer and Full Stack Developer specialized in bridging Educational Strategy and AI Implementation. Extensive experience leveraging Data Science, NLP, and LLMs to optimize training outcomes for defense and intelligence missions. Proven track record in architecting end-to-end AI pipelines and modernizing technical infrastructure.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Professional Experience</h2>
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
                    <h2 className={styles.sectionTitle}>Education & Credentials</h2>
                    {education.map((edu, idx) => (
                        <div key={idx} className={styles.jobEntry}>
                            <div className={styles.jobHeader}>
                                <span>{edu.degree}</span>
                                {edu.year && <span className={styles.jobDate}>{edu.year}</span>}
                            </div>
                            <div className={styles.jobCompany}>{edu.school}</div>
                        </div>
                    ))}
                    <p className={styles.certText}>
                        <strong>Key Certifications:</strong> Project Management Professional (PMP),
                        TensorFlow Developer, AWS Certified Cloud Practitioner, IBM Data Science,
                        Google Data Analytics.
                    </p>
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
