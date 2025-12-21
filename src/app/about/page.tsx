import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Me",
    description:
        "Learn more about Dustin J. Ober's journey from military instructor to AI Developer and Technical Instructional Systems Designer.",
};

export default function AboutPage() {
    return (
        <main>
            {/* Hero Section */}
            <section className="hero" style={{ padding: "6rem 0 3rem" }}>
                <div className="container">
                    <h1>Beyond the Code</h1>
                    <p>Strategist, Developer, and Lifelong Learner</p>
                </div>
            </section>

            {/* Career Narrative */}
            <section id="career-narrative">
                <div className="container">
                    <div
                        className="about-text"
                        style={{ textAlign: "left", maxWidth: "900px", marginBottom: "4rem" }}
                    >
                        <h2 style={{ marginBottom: "2rem" }}>
                            The Intersection of Strategy & Science
                        </h2>
                        <p>
                            My career has been a deliberate journey from high-stakes training environments to
                            the cutting edge of AI development. Starting as an instructor in the U.S. Air
                            Force, I learned the critical importance of effective communication and structured
                            knowledge transfer. This foundation led me to master{" "}
                            <strong>Instructional Systems Design (ISD)</strong>, where I spent years
                            developing curricula for federal agencies like the DEA.
                        </p>
                        <br />
                        <p>
                            However, I saw a gap: traditional training often lacked the agility and
                            data-driven precision needed in the modern tech landscape. This realization drove
                            me to pivot into <strong>Full Stack Development and Data Science</strong>.
                        </p>
                        <br />
                        <p>
                            Today, I bridge these worlds. At Leidos, I don&apos;t just build data pipelines; I
                            architect intelligent systems that empower users to learn and act more
                            effectively. Whether I&apos;m fine-tuning a Named Entity Recognition (NER) model
                            or automating complex workflows with DSPy, my goal is always the same:{" "}
                            <strong>
                                to transform complex data into actionable intelligence and impactful learning
                                experiences.
                            </strong>
                        </p>
                    </div>

                    <div className="skills-grid" style={{ marginTop: "4rem" }}>
                        <div className="skill-category">
                            <h3>
                                <i className="fas fa-mountain"></i> Professional Interests
                            </h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                                I am deeply interested in <strong>Neuro-symbolic AI</strong> and its
                                application in automated tutoring systems. I believe the future of education
                                lies in hyper-personalized learning paths powered by Large Language Models.
                            </p>
                        </div>
                        <div className="skill-category">
                            <h3>
                                <i className="fas fa-dumbbell"></i> Outside the Office
                            </h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                                When I&apos;m not behind a keyboard, I&apos;m likely pushing my limits at the
                                gym. I am an avid <strong>CrossFit</strong> and{" "}
                                <strong>Olympic Weightlifting</strong> enthusiast, applying the same discipline
                                and grit to my technical work as I do to a heavy lifting session or a
                                challenging workout.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                id="cta"
                style={{
                    textAlign: "center",
                    background: "rgba(47, 129, 247, 0.05)",
                    padding: "5rem 0",
                }}
            >
                <div className="container">
                    <h2>Looking for a technical partner?</h2>
                    <p
                        style={{
                            color: "var(--text-secondary)",
                            marginBottom: "2rem",
                            maxWidth: "600px",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        I thrive on solving complex problems at the intersection of data and design.
                        Let&apos;s build something impactful together.
                    </p>
                    <Link
                        href="/contact"
                        className="view-btn"
                        style={{
                            width: "fit-content",
                            padding: "1rem 3rem",
                            borderRadius: "50px",
                            display: "inline-block",
                            margin: "0 auto"
                        }}
                    >
                        Get in Touch
                    </Link>
                </div>
            </section>
        </main>
    );
}
