import type { Metadata } from "next";
import styles from "./education.module.css";

export const metadata: Metadata = {
    title: "Education & Certifications",
    description:
        "Dustin J. Ober's academic background and technical certifications, including AI Systems Management, PMP, and specialized Nanodegrees.",
};

const formalEducation = [
    {
        degree: "Graduate Certificate in AI Systems Management",
        school: "Strayer University (2025)",
    },
    {
        degree: "Master of Education (M.Ed.) in ID & Technology",
        school: "Liberty University",
    },
    {
        degree: "BS in Management / CIS",
        school: "Park University",
    },
];

const certifications = [
    {
        name: "Project Management Professional (PMP)",
        issuer: "Project Management Institute",
    },
    {
        name: "TensorFlow Developer",
        issuer: "DeepLearning.AI",
    },
    {
        name: "Generative AI Fundamentals",
        issuer: "Databricks",
    },
    {
        name: "Google Data Analytics",
        issuer: "Google Professional Certificate",
    },
    {
        name: "IBM Data Science",
        issuer: "IBM Professional Certificate",
    },
    {
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
    },
];

const continuousLearning = {
    dataAI: [
        "Udacity Deep Reinforcement Learning",
        "Udacity Natural Language Processing",
        "Udacity Computer Vision",
        "Stanford Machine Learning",
    ],
    technicalStrategy: [
        "Certified Scrum Master (CSM)",
        "Ethical Hacker Certification",
        "Kirkpatrick Bronze Certification",
        "Adobe Captivate Specialist",
    ],
};

// Simple SVG Icons as components
const GraduationCapIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
);

const CertificateIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
);

const BookIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
);

const CheckIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export default function EducationPage() {
    return (
        <main className={styles.pageWrapper}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <h1>Academic Background & Key Credentials</h1>
                    <p>
                        Strategic education and specialized certifications focusing on AI leadership and
                        project excellence.
                    </p>
                </div>
            </section>

            {/* Formal Education Section */}
            <section className={styles.section}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Formal Education</h2>
                    </div>
                    <div className={styles.cardGrid}>
                        {formalEducation.map((edu) => (
                            <div key={edu.degree} className={styles.card}>
                                <div className={styles.iconWrapper}>
                                    <GraduationCapIcon />
                                </div>
                                <h3 className={styles.cardTitle}>{edu.degree}</h3>
                                <span className={styles.cardIssuer}>{edu.school}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Professional Certifications Section */}
            <section className={styles.section}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Key Professional Certifications</h2>
                        <p className={styles.sectionSubtitle}>
                            Curated selection of my most impactful industry credentials.
                        </p>
                    </div>
                    <div className={styles.cardGrid}>
                        {certifications.map((cert) => (
                            <div key={cert.name} className={styles.card}>
                                <div className={styles.iconWrapper}>
                                    <CertificateIcon />
                                </div>
                                <h3 className={styles.cardTitle}>{cert.name}</h3>
                                <span className={styles.cardIssuer}>{cert.issuer}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Continuous Learning Section */}
            <section className={styles.section}>
                <div className="container">
                    <div className={styles.learningSection}>
                        <div className={styles.learningHeader}>
                            <h2 className={styles.learningTitle}>
                                Continuous Learning & Technical Upskilling
                            </h2>
                            <p className={styles.learningSubtitle}>
                                Beyond my core credentials, I maintain an active portfolio of 20+ specialized
                                technical nanodegrees and certificates focused on emerging technologies.
                            </p>
                        </div>

                        <div className={styles.learningGrid}>
                            <div className={styles.learningCategory}>
                                <h4 className={styles.categoryTitle}>
                                    <BookIcon />
                                    Data & AI Specialized
                                </h4>
                                <ul className={styles.categoryList}>
                                    {continuousLearning.dataAI.map((item) => (
                                        <li key={item}>
                                            <span className={styles.checkIcon}>
                                                <CheckIcon />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.learningCategory}>
                                <h4 className={styles.categoryTitle}>
                                    <BookIcon />
                                    Technical Strategy
                                </h4>
                                <ul className={styles.categoryList}>
                                    {continuousLearning.technicalStrategy.map((item) => (
                                        <li key={item}>
                                            <span className={styles.checkIcon}>
                                                <CheckIcon />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
