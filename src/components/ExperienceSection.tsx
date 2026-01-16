import Link from "next/link";
import styles from "./ExperienceSection.module.css";

interface HighlightItem {
    text: string;
    bold?: string;
    link?: {
        href: string;
        label: string;
    };
}

interface CareerArc {
    arcTitle: string;
    arcDescription: string;
    period: string;
    roles: {
        title: string;
        company: string;
        date: string;
        highlights: HighlightItem[];
    }[];
}

const careerArcs: CareerArc[] = [
    {
        arcTitle: "ML Engineering & AI Development",
        arcDescription: "Production ML systems and NLP models for defense applications",
        period: "2024 – Present",
        roles: [
            {
                title: "ML Engineer / Data Scientist",
                company: "Leidos",
                date: "2024 – Present",
                highlights: [
                    {
                        bold: "Letter of Appreciation:",
                        text: "Received formal customer recognition for leading AI implementation into workflows, products, and processes.",
                    },
                    {
                        bold: "Custom NER Models:",
                        text: "Designed and deployed Named Entity Recognition models for specialized intelligence datasets, achieving extraction accuracy exceeding industry benchmarks.",
                    },
                    {
                        bold: "Production ML Pipelines:",
                        text: "Trained and deployed 30+ ML models using TensorFlow and DSPy, streamlining data extraction from enterprise systems into production insights.",
                    },
                    {
                        bold: "ML Infrastructure:",
                        text: "Built secure FastAPI REST services with JWT authentication and Dockerized deployments ensuring 99.9% consistency across environments.",
                    },
                    {
                        bold: "Technical Leadership:",
                        text: "Lead PMP Instructor for 4+ cohorts",
                        link: {
                            href: "https://dustinober1.github.io/PMP-2026/",
                            label: "PMP 2026 Exam Prep Ebook",
                        },
                    },
                ],
            },
        ],
    },
    {
        arcTitle: "Data-Driven Instructional Systems",
        arcDescription: "Applied data science to optimize training outcomes across defense programs",
        period: "2019 – 2024",
        roles: [
            {
                title: "Technical Lead",
                company: "Peraton",
                date: "2023 – 2024",
                highlights: [
                    { bold: "Award Nomination:", text: "Nominated for Schoolhouse Training Award for 4-week core-skills course matching agency certification standards." },
                    { text: "Directed team of three designers, applying Agile methodologies to course development pipelines." },
                    { text: "Managed portfolio of 8 technical courses, leveraging analytics to optimize learning outcomes." },
                ],
            },
            {
                title: "Data Analyst / E-Learning Developer",
                company: "Leidos",
                date: "2022 – 2023",
                highlights: [
                    { bold: "Data-Driven Optimization:", text: "Leveraged Python (Pandas/NumPy) to analyze training trends, leading to 20% improvement in completion rates." },
                    { bold: "97% Automation:", text: "Built automated data pipeline reducing report generation from 1 week to 30 minutes." },
                    { bold: "Accessibility Leadership:", text: "Created searchable Section 508/WCAG database adopted organization-wide by NCTC." },
                    { bold: "Rapid Delivery:", text: "Developed and deployed 5 comprehensive WBTs within 90 days." },
                ],
            },
            {
                title: "Instructional Designer",
                company: "Tekmasters",
                date: "2021",
                highlights: [
                    { text: "Designed interactive digital learning materials using eLearning authoring tools." },
                ],
            },
            {
                title: "Training Specialist",
                company: "Tridea Works",
                date: "2020 – 2021",
                highlights: [
                    { text: "Led curriculum development for NDCAC tools, geolocation, and CLOUD ACT training." },
                ],
            },
            {
                title: "Instructional Systems Specialist",
                company: "DEA",
                date: "2019 – 2020",
                highlights: [
                    { bold: "Curriculum Innovation:", text: "Led development of Cyber Drug Investigator Course, identifying 290+ critical tasks via Job Task Analysis." },
                ],
            },
        ],
    },
    {
        arcTitle: "Earlier Career",
        arcDescription: "Military instruction and technical training foundations",
        period: "2004 – 2019",
        roles: [
            {
                title: "Instructor / Course Developer",
                company: "United States Air Force",
                date: "2004 – 2014",
                highlights: [
                    { text: "Maintained technical training database with 1,000+ entries at 100% accuracy." },
                    { text: "Authored 52 technical scenarios for firearms training simulators." },
                ],
            },
        ],
    },
];

export default function ExperienceSection() {
    return (
        <section id="experience" className={styles.experienceSection}>
            <div className="container">
                <h2>Professional Experience</h2>

                {/* Career Journey Context */}
                <div className={styles.careerContext}>
                    <p className={styles.journeyNarrative}>
                        My career represents an intentional progression from <strong>military technical instruction</strong> →
                        <strong> data-driven instructional design</strong> → <strong>full-stack ML engineering</strong>.
                        Each phase built capabilities in the next: understanding how people learn informed how I design
                        AI systems that teach and explain.
                    </p>
                    <p className={styles.contractNote}>
                        <i className="fas fa-info-circle"></i>
                        Contract-based roles supporting classified defense and intelligence missions.
                        Project transitions reflect mission requirements, not job changes.
                    </p>
                </div>

                <div className={styles.arcsContainer}>
                    {careerArcs.map((arc, arcIndex) => (
                        <div key={arcIndex} className={styles.careerArc}>
                            <div className={styles.arcHeader}>
                                <div className={styles.arcTitleBlock}>
                                    <h3 className={styles.arcTitle}>{arc.arcTitle}</h3>
                                    <p className={styles.arcDescription}>{arc.arcDescription}</p>
                                </div>
                                <span className={styles.arcPeriod}>{arc.period}</span>
                            </div>

                            <div className={styles.rolesTimeline}>
                                {arc.roles.map((role, roleIndex) => (
                                    <div key={roleIndex} className={styles.roleCard}>
                                        <div className={styles.roleHeader}>
                                            <div>
                                                <div className={styles.roleTitle}>{role.title}</div>
                                                <div className={styles.company}>{role.company}</div>
                                            </div>
                                            <div className={styles.date}>{role.date}</div>
                                        </div>
                                        <div className={styles.roleDetails}>
                                            <ul>
                                                {role.highlights.map((highlight, hIndex) => (
                                                    <li key={hIndex}>
                                                        {highlight.bold && <strong>{highlight.bold} </strong>}
                                                        {highlight.text}
                                                        {highlight.link && (
                                                            <>
                                                                {" "}
                                                                <Link
                                                                    href={highlight.link.href}
                                                                    style={{ color: "var(--accent)" }}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    {highlight.link.label}
                                                                </Link>
                                                            </>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
