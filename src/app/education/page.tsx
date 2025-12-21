import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Education & Certifications",
    description:
        "Dustin J. Ober's academic background and technical certifications, including AI Systems Management, PMP, and specialized Nanodegrees.",
};

const formalEducation = [
    {
        degree: "Graduate Certificate in AI Systems Management",
        school: "Strayer University (2025)",
        logo: "/education/Strayer_University.png",
    },
    {
        degree: "Master of Education (M.Ed.) in ID & Technology",
        school: "Liberty University",
        logo: "/education/Liberty_University.png",
    },
    {
        degree: "BS in Management / CIS",
        school: "Park University",
        logo: "/education/Park_University.png",
    },
];

const certifications = [
    {
        name: "Project Management Professional (PMP)",
        issuer: "Project Management Institute",
        logo: "/Professional_Certifications/project-management-professional-pmp.png",
    },
    {
        name: "TensorFlow Developer",
        issuer: "DeepLearning.AI",
        logo: "/Professional_Certifications/Sponsors/dlai-logo-square.png",
    },
    {
        name: "Generative AI Fundamentals",
        issuer: "Databricks",
        logo: "/Professional_Certifications/fundamentals-badge-generative-lp-black.png",
        className: "dark-bg-icon",
    },
    {
        name: "Google Data Analytics",
        issuer: "Google Professional Certificate",
        logo: "/Professional_Certifications/Sponsors/Google.png",
    },
    {
        name: "IBM Data Science",
        issuer: "IBM Professional Certificate",
        logo: "/Professional_Certifications/Sponsors/IBM.png",
    },
    {
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        logo: "/Professional_Certifications/aws-certified-cloud-practitioner.png",
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

export default function EducationPage() {
    return (
        <main>
            {/* Hero Section */}
            <section className="hero" style={{ padding: "6rem 0 3rem" }}>
                <div className="container">
                    <h1>Academic Background & Key Credentials</h1>
                    <p>
                        Strategic education and specialized certifications focusing on AI leadership and
                        project excellence.
                    </p>
                </div>
            </section>

            {/* Education Section */}
            <section id="education">
                <div className="container">
                    {/* Formal Education */}
                    <h2 style={{ left: 0, transform: "none", marginBottom: "2rem" }}>
                        Formal Education
                    </h2>
                    <div className="edu-grid">
                        {formalEducation.map((edu) => (
                            <div key={edu.degree} className="edu-card">
                                <Image
                                    src={edu.logo}
                                    alt={`${edu.school} Logo`}
                                    width={100}
                                    height={100}
                                    style={{ objectFit: "contain" }}
                                />
                                <h3>{edu.degree}</h3>
                                <div className="edu-school">{edu.school}</div>
                            </div>
                        ))}
                    </div>

                    {/* Key Professional Certifications */}
                    <h2
                        style={{
                            marginTop: "5rem",
                            left: 0,
                            transform: "none",
                            marginBottom: "2rem",
                        }}
                    >
                        Key Professional Certifications
                    </h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                        Curated selection of my most impactful industry credentials.
                    </p>

                    <div className="edu-grid">
                        {certifications.map((cert) => (
                            <div key={cert.name} className="edu-card">
                                <Image
                                    src={cert.logo}
                                    alt={`${cert.name} Logo`}
                                    width={100}
                                    height={100}
                                    style={{ objectFit: "contain" }}
                                    className={cert.className}
                                />
                                <h3>{cert.name}</h3>
                                <div className="edu-school">{cert.issuer}</div>
                            </div>
                        ))}
                    </div>

                    {/* Continuous Learning Section */}
                    <div
                        style={{
                            marginTop: "5rem",
                            background: "var(--card-bg)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            padding: "3rem",
                        }}
                    >
                        <h2
                            style={{
                                left: 0,
                                transform: "none",
                                marginBottom: "1.5rem",
                                fontSize: "1.75rem",
                            }}
                        >
                            Continuous Learning & Technical Upskilling
                        </h2>
                        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                            Beyond my core credentials, I maintain an active portfolio of 20+ specialized
                            technical nanodegrees and certificates focused on emerging technologies.
                        </p>

                        <div
                            className="skills-grid"
                            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
                        >
                            <div>
                                <h4 style={{ color: "var(--accent)", marginBottom: "1rem" }}>
                                    Data & AI Specialized
                                </h4>
                                <ul
                                    style={{
                                        color: "var(--text-secondary)",
                                        listStyle: "none",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    {continuousLearning.dataAI.map((item) => (
                                        <li key={item} style={{ marginBottom: "0.5rem" }}>
                                            <i className="fas fa-check-circle"></i> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ color: "var(--accent)", marginBottom: "1rem" }}>
                                    Technical Strategy
                                </h4>
                                <ul
                                    style={{
                                        color: "var(--text-secondary)",
                                        listStyle: "none",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    {continuousLearning.technicalStrategy.map((item) => (
                                        <li key={item} style={{ marginBottom: "0.5rem" }}>
                                            <i className="fas fa-check-circle"></i> {item}
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
