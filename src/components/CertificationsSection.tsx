import styles from './CertificationsSection.module.css';

interface Certification {
    name: string;
    issuer: string;
}

interface CertificationCategory {
    title: string;
    icon: string;
    certifications: Certification[];
}

const certificationCategories: CertificationCategory[] = [
    {
        title: "AI & Machine Learning",
        icon: "fas fa-brain",
        certifications: [
            { name: "Deep Learning", issuer: "Udacity Nanodegree" },
            { name: "Natural Language Processing", issuer: "Udacity Nanodegree" },
            { name: "Computer Vision", issuer: "Udacity Nanodegree" },
            { name: "Generative AI", issuer: "Udacity Nanodegree" },
            { name: "Artificial Intelligence", issuer: "Udacity Nanodegree" },
            { name: "Deep Reinforcement Learning", issuer: "Udacity Nanodegree" },
            { name: "Intro to Machine Learning (PyTorch)", issuer: "Udacity Nanodegree" },
            { name: "AI Programming with Python", issuer: "Udacity Nanodegree" },
            { name: "AI Product Manager", issuer: "Udacity Nanodegree" },
        ]
    },
    {
        title: "Data & Cloud Platforms",
        icon: "fas fa-cloud",
        certifications: [
            { name: "Generative AI Fundamentals", issuer: "Databricks" },
            { name: "Lakehouse Platform Essentials", issuer: "Databricks" },
            { name: "Cloud Practitioner (Foundational)", issuer: "AWS" },
            { name: "Business Analytics", issuer: "Udacity Nanodegree" },
            { name: "Statistics for Data Analysis", issuer: "Udacity Nanodegree" },
        ]
    },
    {
        title: "Project Management",
        icon: "fas fa-tasks",
        certifications: [
            { name: "Project Management Professional (PMP)", issuer: "PMI" },
        ]
    }
];

export default function CertificationsSection() {
    return (
        <section className={styles.certifications}>
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.ruleLine}></span>
                    <span className={styles.label}>Credentials</span>
                    <span className={styles.ruleLine}></span>
                </div>
                <h2 className={styles.title}>Professional Certifications</h2>
                <p className={styles.subtitle}>
                    Industry-recognized credentials in AI, Machine Learning, and Data Science
                </p>
                <div className={styles.grid}>
                    {certificationCategories.map((category) => (
                        <div key={category.title} className={styles.category}>
                            <div className={styles.categoryHeader}>
                                <i className={category.icon}></i>
                                <h3>{category.title}</h3>
                            </div>
                            <ul className={styles.certList}>
                                {category.certifications.map((cert) => (
                                    <li key={cert.name} className={styles.certItem}>
                                        <span className={styles.certName}>{cert.name}</span>
                                        <span className={styles.certIssuer}>{cert.issuer}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
