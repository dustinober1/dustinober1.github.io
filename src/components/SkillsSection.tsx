const skillCategories = [
    {
        title: "Languages & Frameworks",
        icon: "fas fa-code",
        tags: ["Python", "JavaScript", "SQL", "FastAPI", "DSPy", "HTML/CSS", "Bash Scripting"],
    },
    {
        title: "Data Science & AI",
        icon: "fas fa-brain",
        tags: [
            "NLP (Custom NER)",
            "Machine Learning",
            "TensorFlow",
            "PyTorch",
            "Pandas",
            "NumPy",
            "Matplotlib",
            "Scikit-Learn",
            "Data Cleaning & ETL",
            "LangChain",
        ],
    },
    {
        title: "DevOps & Tools",
        icon: "fas fa-cogs",
        tags: ["Docker", "Git", "Jupyter Notebooks", "RESTful APIs", "JWT", "Agile/Scrum"],
    },
    {
        title: "Instructional Design",
        icon: "fas fa-chalkboard-teacher",
        tags: [
            "ADDIE Model",
            "Articulate 360",
            "Adobe Captivate",
            "Camtasia",
            "Adult Learning Principles",
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
