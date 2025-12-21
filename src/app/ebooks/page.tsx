import type { Metadata } from "next";
import EbookProgressCard from "@/components/progress/EbookProgressCard";
import ReadingDashboard from "@/components/progress/ReadingDashboard";

export const metadata: Metadata = {
    title: "Ebooks",
    description:
        "Download technical ebooks and study guides on PMP exam preparation and AI implementation in education by Dustin J. Ober.",
};

const ebooks = [
    {
        id: "pmp",
        title: "PMP Exam Prep",
        shortTitle: "PMP Exam Prep (2026)",
        category: "Project Management",
        logo: "/images/pmp-ebook-logo.png",
        description:
            "Comprehensive digital textbook covering the PMBOK Guide 7th Edition and Agile Practice Guide.",
        features: ["Interactive Modules", "Exam Strategy Guides", "Open-Source Resource"],
        link: "https://dustinober1.github.io/PMP-2026/",
    },
    {
        id: "ai-id",
        title: "AI-Powered ID",
        shortTitle: "AI-Powered Instructional Design",
        category: "Instructional Design",
        logo: "/images/ai-id-ebook-logo.png",
        description:
            "Exploring how AI can modernize the ADDIE model and automate content creation for IDs.",
        features: ["AI-Driven Workflows", "Prompt Engineering", "Personalized Learning"],
        link: "https://dustinober1.github.io/Ebook_AI-Powered_Instructional_Design/",
    },
    {
        id: "dspy",
        title: "DSPy Guide",
        shortTitle: "DSPy: Programming Models",
        category: "AI Engineering",
        logo: "/images/dspy-ebook-logo.png",
        description:
            "A practical guide for developers to programmatically optimize Large Language Model pipelines.",
        features: ["Signature Optimization", "LLM Logic Pipelines", "Production Integration"],
        link: "https://dustinober1.github.io/Ebook_DSPy/",
    },
];

export default function EbooksPage() {
    return (
        <main>
            {/* Hero Section */}
            <section className="hero" style={{ padding: "6rem 0 1rem" }}>
                <div className="container">
                    <h1>Published Ebooks</h1>
                    <p>
                        Comprehensive guides and educational resources authored for the technical
                        community.
                    </p>
                </div>
            </section>

            {/* Dashboard Section */}
            <ReadingDashboard />

            {/* Ebooks Grid */}
            <section id="ebooks" style={{ padding: "1rem 0" }}>
                <div className="container">
                    <div className="projects-grid">
                        {ebooks.map((ebook) => (
                            <EbookProgressCard key={ebook.id} ebook={ebook} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
