import Link from "next/link";
import Hero from "@/components/Hero";
import TechStackSection from "@/components/TechStackSection";
import SkillsSection from "@/components/SkillsSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ExperienceSection from "@/components/ExperienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InsightsSection from "@/components/InsightsSection";
import EducationSummarySection from "@/components/EducationSummarySection";
import CertificationsSection from "@/components/CertificationsSection";
import { eatManager, structuredDataEngine } from "@/lib/seo";
import { eatData } from "@/lib/seo/eatData";
import styles from './home.module.css';

export default function Home() {
  // Generate E-A-T structured data for the homepage
  const eatSignals = eatManager.generateEATSignals(eatData);
  const eatStructuredData = eatManager.generateEATStructuredData(eatSignals);

  // Generate Person schema with E-A-T enhancements
  const personSchema = structuredDataEngine.generatePerson({
    name: eatData.authorBio.name,
    jobTitle: eatData.authorBio.title,
    url: "https://aiober.com",
    sameAs: [
      eatData.contactInfo.linkedinUrl!,
      eatData.contactInfo.personalWebsite!
    ],
    knowsAbout: eatData.authorBio.specializations,
    image: "https://aiober.com/profile-image.jpg",
    description: eatData.authorBio.detailedBackground
  });

  return (
    <main>
      {/* Enhanced Structured Data with E-A-T Signals */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personSchema, eatStructuredData]),
        }}
      />

      <Hero />
      <TechStackSection />
      <SkillsSection />
      <ExpertiseSection />
      <ExperienceSection />
      <TestimonialsSection />
      <InsightsSection />
      <EducationSummarySection />
      <CertificationsSection />

      {/* E-A-T Trust Signals Footer */}
      <section className={styles.eatTrustSignals}>
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={styles.trustSignal}>
              <i className="fas fa-certificate"></i>
              <div>
                <strong>{eatSignals.expertise.certifications.length} Professional Certifications</strong>
                <p>Including PMP, AI/ML, and Data Science credentials</p>
              </div>
            </div>
            <div className={styles.trustSignal}>
              <i className="fas fa-file-alt"></i>
              <div>
                <strong>{eatSignals.expertise.publications.length} Published Works</strong>
                <p>Research papers on AI infrastructure and security</p>
              </div>
            </div>
            <div className={styles.trustSignal}>
              <i className="fas fa-handshake"></i>
              <div>
                <strong>Verified Client Success</strong>
                <p>Measurable outcomes with government and enterprise clients</p>
              </div>
            </div>
            <div className={styles.trustSignal}>
              <i className="fas fa-shield-alt"></i>
              <div>
                <strong>Security Clearance</strong>
                <p>Trusted for sensitive defense and intelligence projects</p>
              </div>
            </div>
          </div>
          <div className={styles.verificationLink}>
            <Link href="/about" className={styles.verificationButton}>
              View Full Credentials & Verification →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
