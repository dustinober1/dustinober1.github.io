import Link from "next/link";

interface HighlightItem {
    text: string;
    bold?: string;
    link?: {
        href: string;
        label: string;
    };
}

interface ExperienceItem {
    title: string;
    company: string;
    date: string;
    highlights: HighlightItem[];
}

const experiences: ExperienceItem[] = [
    {
        title: "Developer",
        company: "Leidos - Chantilly, VA",
        date: "07/2024 – Present",
        highlights: [
            {
                bold: "Engineered state-of-the-art NLP models:",
                text: "Designed custom Named Entity Recognition (NER) models for specialized customer datasets, achieving extraction accuracy exceeding industry standard benchmarks.",
            },
            {
                bold: "Architected end-to-end AI pipelines:",
                text: "Trained and deployed 30+ ML models using TensorFlow and DSPy, streamlining data extraction from SharePoint/Oracle into production-ready insights.",
            },
            {
                bold: "Modernized technical infrastructure:",
                text: "Built secure FastAPI REST services with JWT authentication and Dockerized applications to ensure 99.9% deployment consistency across environments.",
            },
            {
                bold: "Project Leadership:",
                text: "Serves as Lead PMP Instructor for 4+ cohorts",
                link: {
                    href: "https://dustinober1.github.io/PMP-2026/",
                    label: "PMP 2026 Exam Prep Ebook",
                },
            },
        ],
    },
    {
        title: "Instructional Systems Designer",
        company: "Peraton - Chantilly, VA",
        date: "10/2023 – 07/2024",
        highlights: [
            { text: "Directed and mentored a team of three instructional designers, fostering a collaborative environment to achieve course development objectives." },
            { text: "Managed a portfolio of 8 courses, overseeing design, development, and implementation to align with organizational goals." },
            { text: "Leveraged project management skills to coordinate multiple projects, prioritize tasks, and meet deadlines in a fast-paced environment." },
        ],
    },
    {
        title: "E-Learning Developer",
        company: "Leidos - Chantilly, VA",
        date: "01/2022 – 10/2023",
        highlights: [
            { bold: "Data-Driven Instructional Design:", text: "Leveraged Python (Pandas/NumPy) to analyze training trends, leading to a 20% improvement in WBT completion rates." },
            { bold: "Process Automation:", text: "Automated training data collection via web-scraping, reducing manual data entry work by ~15 hours per week." },
            { bold: "Rapid Content Delivery:", text: "Developed and deployed 5 comprehensive WBTs within 90 days, meeting aggressive organizational mission timelines." },
        ],
    },
    {
        title: "Instructional Designer",
        company: "Tekmasters - Springfield, VA",
        date: "03/2021 – 12/2021",
        highlights: [
            { text: "Designed and developed interactive digital learning materials using eLearning authoring tools (Adobe Captivate, Articulate 360, Camtasia)." },
            { text: "Utilized expertise in adult education practices to create engaging, learner-centered curricula tailored to adult learners." },
            { text: "Conducted research across academic, industrial, and government organizations to identify and implement innovative learning solutions." },
        ],
    },
    {
        title: "Training Development Specialist",
        company: "Tridea Works - Fredericksburg, VA",
        date: "05/2020 – 03/2021",
        highlights: [
            { text: "Led the development of instructional curriculum for topics including NDCAC tools, geolocation, and CLOUD ACT." },
            { text: "Established remote learning opportunities using Adobe Connect and Microsoft Teams to facilitate live classes and collaborative learning." },
        ],
    },
    {
        title: "Instructional Systems Specialist",
        company: "DEA - Quantico, VA",
        date: "01/2019 – 05/2020",
        highlights: [
            { bold: "Curriculum Innovation:", text: "Led development of the Cyber Drug Investigator Course, identifying 290+ critical tasks via Job Task Analysis (JTA) with SMEs." },
            { bold: "Project Management:", text: "Coordinated cross-functional teams to deliver a comprehensive training suite, including presentations, labs, and performance-based testing." },
        ],
    },
    {
        title: "Owner",
        company: "Kentucky Senior Benefits - Lexington, KY",
        date: "08/2014 – 12/2019",
        highlights: [
            { text: "Identified client needs and analyzed financial data to propose tailored solutions, directly impacting client retention and satisfaction." },
            { text: "Designed and delivered compliance-approved presentations and technical scripts for seminars ranging from 12-120 attendees." },
        ],
    },
    {
        title: "Instructor / Course Developer",
        company: "United States Air Force",
        date: "03/2004 – 08/2014",
        highlights: [
            { text: "Maintained a technical training database with 1,000+ entries, achieving 100% data accuracy for tracking personnel proficiency." },
            { text: "Authored 52 technical scenarios for firearms training simulators, integrating hardware and software requirements into the curriculum." },
            { text: "Conducted evaluations and analyzed student performance data, reducing performance report rewrites by 25% through evidence-based curriculum adjustments." },
        ],
    },
];

export default function ExperienceSection() {
    return (
        <section id="experience">
            <div className="container">
                <h2>Professional Experience</h2>
                <div className="timeline">
                    {experiences.map((job, index) => (
                        <div key={index} className="job-card">
                            <div className="job-header">
                                <div>
                                    <div className="job-title">{job.title}</div>
                                    <div className="company">{job.company}</div>
                                </div>
                                <div className="date">{job.date}</div>
                            </div>
                            <div className="job-details">
                                <ul>
                                    {job.highlights.map((highlight, hIndex) => (
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
                                                    {" with high community engagement."}
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
        </section>
    );
}
