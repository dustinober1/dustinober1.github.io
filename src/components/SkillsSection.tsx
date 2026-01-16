const skillCategories = [
    {
        title: "Data Science & ML",
        icon: "fas fa-brain",
        tags: [
            "NLP (Custom NER)",
            "Machine Learning",
            "TensorFlow",
            "PyTorch",
            "Pandas",
            "NumPy",
            "Scikit-Learn",
            "Feature Engineering",
            "Model Evaluation",
            "A/B Testing",
            "Statistical Analysis",
        ],
    },
    {
        title: "Languages & Frameworks",
        icon: "fas fa-code",
        tags: ["Python", "JavaScript", "SQL", "FastAPI", "DSPy", "LangChain", "Bash"],
    },
    {
        title: "ML Ops & DevOps",
        icon: "fas fa-cogs",
        tags: ["Docker", "Git", "CI/CD", "Jupyter", "RESTful APIs", "MLflow", "Agile/Scrum"],
    },
    {
        title: "Instructional Design",
        icon: "fas fa-chalkboard-teacher",
        tags: [
            "ADDIE Model",
            "Technical Writing",
            "Adult Learning",
        ],
    },
];

export default function SkillsSection() {
    return (
        <section id="skills">
            <div className="container">
                <h2>Technical Skills</h2>
                <div className="skills-grid">
                    {skillCategories.map((category) => (
                        <div key={category.title} className="skill-category">
                            <h3>
                                <i className={category.icon}></i> {category.title}
                            </h3>
                            <div className="tags">
                                {category.tags.map((tag) => (
                                    <span key={tag} className="tag">
                                        {tag}
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
