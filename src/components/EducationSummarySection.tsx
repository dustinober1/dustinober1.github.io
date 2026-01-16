import Link from "next/link";

const degrees = [
    {
        title: "Graduate Certificate in AI Systems Management",
        school: "Strayer University (2025)",
    },
    {
        title: "Master of Education (M.Ed.) in Instructional Design & Technology",
        school: "Liberty University",
    },
    {
        title: "BS in Management / CIS",
        school: "Park University",
    },
    {
        title: "AAS in Criminal Justice",
        school: "Community College of the Air Force",
    },
];

export default function EducationSummarySection() {
    return (
        <section id="education">
            <div className="container">
                <h2>Education</h2>
                <div className="edu-grid">
                    {degrees.map((degree, index) => (
                        <div key={index} className="edu-card">
                            <h3>{degree.title}</h3>
                            <div className="edu-school">{degree.school}</div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                    <Link href="/education" style={{ fontSize: "0.9rem", color: "var(--accent)" }}>
                        View Full Education Details →
                    </Link>
                </div>
            </div>
        </section>
    );
}

