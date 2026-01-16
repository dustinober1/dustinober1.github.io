import styles from './TechStackSection.module.css';

const techCategories = [
    {
        name: "Data Science Core",
        icon: "fas fa-chart-line",
        techs: ["Python", "NumPy", "Pandas", "Scikit-Learn", "Jupyter", "SciPy"]
    },
    {
        name: "Deep Learning",
        icon: "fas fa-brain",
        techs: ["TensorFlow", "PyTorch", "Keras", "CUDA", "Transformers"]
    },
    {
        name: "NLP & LLMs",
        icon: "fas fa-comments",
        techs: ["DSPy", "LangChain", "LangGraph", "spaCy", "Custom NER"]
    },
    {
        name: "ML Ops & Infrastructure",
        icon: "fas fa-server",
        techs: ["Docker", "FastAPI", "Git", "MLflow", "REST APIs"]
    },
    {
        name: "Databases",
        icon: "fas fa-database",
        techs: ["PostgreSQL", "Neo4j", "Qdrant", "SQLite", "Redis"]
    },
    {
        name: "Visualization",
        icon: "fas fa-chart-bar",
        techs: ["Matplotlib", "Seaborn", "Plotly", "Streamlit"]
    }
];

export default function TechStackSection() {
    return (
        <section className={styles.techStack}>
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.ruleLine}></span>
                    <span className={styles.label}>Tech Stack</span>
                    <span className={styles.ruleLine}></span>
                </div>
                <h2 className={styles.title}>Data Science & ML Technologies</h2>
                <p className={styles.subtitle}>
                    Production-ready tools and frameworks used across 30+ deployed ML models
                </p>
                <div className={styles.grid}>
                    {techCategories.map((category) => (
                        <div key={category.name} className={styles.category}>
                            <div className={styles.categoryHeader}>
                                <i className={category.icon}></i>
                                <h3>{category.name}</h3>
                            </div>
                            <div className={styles.techTags}>
                                {category.techs.map((tech) => (
                                    <span key={tech} className={styles.techTag}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
