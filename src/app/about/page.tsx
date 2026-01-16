import { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.css";
import { structuredDataEngine } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Dustin J. Ober | Professional Background & Credentials",
  description:
    "Learn about Dustin J. Ober's professional background, certifications, published work, and proven track record in AI development and instructional design.",
  keywords: [
    "Dustin Ober biography",
    "AI developer credentials",
    "instructional design expert",
    "professional certifications",
    "published research",
    "client testimonials",
    "project outcomes",
  ],
  openGraph: {
    title: "About Dustin J. Ober | Professional Background & Credentials",
    description:
      "Learn about Dustin J. Ober's professional background, certifications, published work, and proven track record in AI development and instructional design.",
    type: "profile",
    url: "https://aiober.com/about",
  },
  alternates: {
    canonical: "https://aiober.com/about",
  },
};

const specializations = [
  "AI/ML Implementation",
  "LangGraph & Multi-Agent Systems",
  "DSPy & Prompt Optimization",
  "NLP & Named Entity Recognition",
  "Sovereign AI Architecture",
  "Instructional Design (ADDIE)",
];

const credentials = [
  { name: "Project Management Professional (PMP)", org: "PMI", year: "2024" },
  { name: "TensorFlow Developer Certificate", org: "Google", year: "2023" },
  { name: "AWS Cloud Practitioner", org: "Amazon", year: "2023" },
  { name: "IBM Data Science Professional", org: "IBM", year: "2022" },
  { name: "Google Data Analytics", org: "Google", year: "2022" },
];

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "30+", label: "ML Models Deployed" },
  { value: "8", label: "Published Whitepapers" },
  { value: "PMP", label: "Certified" },
];

const faqs = [
  {
    question: "How do you implement AI in classified environments?",
    answer: "I specialize in deploying AI systems within air-gapped, classified networks using sovereign infrastructure patterns. This includes local model hosting, containerized deployments (Docker/Apptainer), and secure dependency management without internet access."
  },
  {
    question: "What is sovereign AI infrastructure?",
    answer: "Sovereign AI refers to AI systems that operate entirely within controlled boundaries—no cloud dependencies, no data egress. It's essential for defense, intelligence, and regulated industries requiring 100% data sovereignty."
  },
  {
    question: "Do you work with defense contractors?",
    answer: "Yes, I have extensive experience working with defense and intelligence organizations. I hold a Top Secret clearance with SCI and Polygraph, enabling me to support sensitive mission-critical projects."
  },
  {
    question: "How long does AI training curriculum development take?",
    answer: "Typical AI training curriculum development ranges from 4-12 weeks depending on scope. I use the ADDIE framework combined with rapid prototyping to deliver comprehensive technical training efficiently."
  },
];

export default function AboutPage() {
  return (
    <main className={styles.aboutMain}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1>Dustin J. Ober</h1>
              <p className={styles.heroTitle}>
                Data Scientist & ML Engineer
              </p>
              <p className={styles.heroLocation}>
                <i className="fas fa-map-marker-alt"></i>
                Chantilly, VA
              </p>
              <p className={styles.heroBio}>
                Data Scientist specializing in NLP, Machine Learning, and Production ML Systems.
                30+ models deployed for defense and intelligence applications, bridging
                educational strategy with AI implementation.
              </p>
              <div className={styles.heroCta}>
                <Link href="/contact" className={styles.ctaPrimary}>
                  Get in Touch
                </Link>
                <Link href="/resume" className={styles.ctaSecondary}>
                  View Resume
                </Link>
              </div>
            </div>
            <div className={styles.heroStats}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className={styles.specializationsSection}>
        <div className="container">
          <h2>Core Specializations</h2>
          <div className={styles.specializationsGrid}>
            {specializations.map((spec) => (
              <div key={spec} className={styles.specializationTag}>
                <i className="fas fa-check-circle"></i>
                {spec}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Role */}
      <section className={styles.roleSection}>
        <div className="container">
          <div className={styles.roleCard}>
            <div className={styles.roleHeader}>
              <div className={styles.roleIcon}>
                <i className="fas fa-briefcase"></i>
              </div>
              <div>
                <h3>Current Position</h3>
                <p className={styles.roleTitle}>Developer</p>
                <p className={styles.roleCompany}>Leidos - Chantilly, VA</p>
              </div>
            </div>
            <ul className={styles.roleHighlights}>
              <li>
                Engineered state-of-the-art NLP models: Designed custom Named
                Entity Recognition (NER) models for specialized datasets
              </li>
              <li>
                Architected AI pipelines: Trained and deployed 30+ ML models using
                TensorFlow and DSPy for production insights
              </li>
              <li>
                Modernized infrastructure: Built secure FastAPI REST services with
                JWT and Dockerized applications
              </li>
              <li>
                Project Leadership: Lead PMP Instructor for 4+ cohorts and author
                of The Sovereign AI Handbook series
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className={styles.credentialsSection}>
        <div className="container">
          <h2>Professional Credentials</h2>
          <div className={styles.credentialsGrid}>
            {credentials.map((cred) => (
              <div key={cred.name} className={styles.credentialCard}>
                <div className={styles.credentialIcon}>
                  <i className="fas fa-certificate"></i>
                </div>
                <h4>{cred.name}</h4>
                <p className={styles.credentialOrg}>{cred.org}</p>
                <p className={styles.credentialYear}>{cred.year}</p>
              </div>
            ))}
            <Link href="/education" className={styles.viewAllCard}>
              <i className="fas fa-arrow-right"></i>
              <span>View All Certifications</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className={styles.publicationsSection}>
        <div className="container">
          <h2>Published Research</h2>
          <p className={styles.sectionIntro}>
            Author of The Sovereign AI Handbook series - technical whitepapers on
            deploying AI systems in air-gapped, classified, and compliance-heavy
            environments.
          </p>
          <div className={styles.publicationsList}>
            <div className={styles.publicationItem}>
              <span className={styles.pubNumber}>01</span>
              <div className={styles.pubContent}>
                <h4>Sovereign AI Infrastructure</h4>
                <p>Hardware & Architecture for Disconnected Environments</p>
              </div>
            </div>
            <div className={styles.publicationItem}>
              <span className={styles.pubNumber}>02</span>
              <div className={styles.pubContent}>
                <h4>The Disconnected Pipeline</h4>
                <p>Solving Dependency Management in Secure Facilities</p>
              </div>
            </div>
            <div className={styles.publicationItem}>
              <span className={styles.pubNumber}>03</span>
              <div className={styles.pubContent}>
                <h4>Private Knowledge Retrieval</h4>
                <p>Architecting Local RAG Systems</p>
              </div>
            </div>
            <div className={styles.publicationItem}>
              <span className={styles.pubNumber}>04</span>
              <div className={styles.pubContent}>
                <h4>Verifiable Intelligence</h4>
                <p>DSPy, Governance, and Hallucination Control</p>
              </div>
            </div>
          </div>
          <div className={styles.publicationCta}>
            <Link href="/research" className={styles.ctaPrimary}>
              Read the Research Series
            </Link>
          </div>
        </div>
      </section>

      {/* Security Clearance */}
      <section className={styles.clearanceSection}>
        <div className="container">
          <div className={styles.clearanceCard}>
            <div className={styles.clearanceIcon}>
              <i className="fas fa-shield-alt"></i>
            </div>
            <div className={styles.clearanceContent}>
              <h3>Security Clearance</h3>
              <p className={styles.clearanceLevel}>
                Top Secret Clearance with SCI and Polygraph
              </p>
              <p className={styles.clearanceDesc}>
                Trusted professional working on sensitive defense and intelligence
                projects requiring the highest levels of trust and expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.credentialsSection}>
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredDataEngine.generateFAQPage(faqs))
            }}
          />
          <div className={styles.credentialsGrid} style={{ gridTemplateColumns: '1fr' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={styles.credentialCard} style={{ textAlign: 'left' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>
                  <i className="fas fa-question-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }}></i>
                  {faq.question}
                </h4>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2>Let&apos;s Work Together</h2>
            <p>
              Available for consulting on AI implementation, instructional design,
              and technical training development.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className={styles.ctaPrimary}>
                <i className="fas fa-envelope"></i>
                Contact Me
              </Link>
              <a
                href="https://linkedin.com/in/dober1"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondary}
              >
                <i className="fab fa-linkedin"></i>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}