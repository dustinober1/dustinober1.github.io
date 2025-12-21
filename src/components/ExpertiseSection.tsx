const expertiseAreas = [
    {
        title: "Python Scripting & Data Automation",
        description: `I have solid experience in scripting with Python to support data analysis, automation, and
      process optimization. I utilize Python libraries such as Pandas, NumPy, and Matplotlib for
      analyzing training data, identifying trends, and generating insights. Additionally, I have
      applied web scraping techniques to automate the collection of diverse datasets, enhancing data
      gathering efficiency. My scripting skills enable me to build custom scripts that streamline
      repetitive tasks and manage large datasets.`,
    },
    {
        title: "Project Leadership",
        description: `I have demonstrated strong project leadership skills by managing multiple complex training and
      development projects from inception to completion. My approach involves setting clear
      objectives, defining project scope, managing resources, and establishing effective communication
      channels. I am adept at utilizing project management methodologies to prioritize tasks, mitigate
      risks, and deliver projects on time and within budget, fostering a collaborative and
      high-performing team environment.`,
    },
    {
        title: "Curriculum Development & Strategy",
        description: `I have extensive experience in creating learner-centered programs that align with organizational
      goals. I design comprehensive curricula by conducting thorough needs assessments and
      incorporating adult learning principles. My approach integrates various instructional methods,
      including instructor-led training, e-learning, and blended learning. I use data analysis to
      evaluate curriculum effectiveness, ensuring that curricula not only meet compliance standards
      but also promote measurable learning outcomes.`,
    },
];

export default function ExpertiseSection() {
    return (
        <section id="expertise">
            <div className="container">
                <h2>Technical & Operational Expertise</h2>
                {expertiseAreas.map((area) => (
                    <div key={area.title} className="job-card">
                        <div className="job-header">
                            <div className="job-title" style={{ color: "var(--accent)" }}>
                                {area.title}
                            </div>
                        </div>
                        <p style={{ color: "var(--text-secondary)" }}>{area.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
