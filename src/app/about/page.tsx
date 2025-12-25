import { Metadata } from 'next';
import EATSignalsSection from '@/components/EATSignalsSection';
import AuthorBioSection from '@/components/AuthorBioSection';
import { eatManager } from '@/lib/seo';
import { eatData } from '@/lib/seo/eatData';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Dustin J. Ober | Professional Background & Credentials',
  description: 'Learn about Dustin J. Ober\'s professional background, certifications, published work, and proven track record in AI development and instructional design.',
  keywords: [
    'Dustin Ober biography',
    'AI developer credentials',
    'instructional design expert',
    'professional certifications',
    'published research',
    'client testimonials',
    'project outcomes'
  ],
  openGraph: {
    title: 'About Dustin J. Ober | Professional Background & Credentials',
    description: 'Learn about Dustin J. Ober\'s professional background, certifications, published work, and proven track record in AI development and instructional design.',
    type: 'profile',
    url: 'https://aiober.com/about',
  },
  alternates: {
    canonical: 'https://aiober.com/about',
  },
};

export default function AboutPage() {
  // Generate E-A-T signals from the data
  const eatSignals = eatManager.generateEATSignals(eatData);
  
  // Generate structured data for E-A-T
  const eatStructuredData = eatManager.generateEATStructuredData(eatSignals);

  return (
    <main>
      {/* Structured Data for E-A-T Signals */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eatStructuredData),
        }}
      />

      {/* Author Bio Section */}
      <AuthorBioSection 
        authorBio={eatData.authorBio} 
        contactInfo={eatData.contactInfo}
      />

      {/* E-A-T Signals Section */}
      <EATSignalsSection signals={eatSignals} />

      {/* Additional credibility section */}
      <section className={styles.credibilitySection}>
        <div className="container">
          <h2>Professional Credibility Summary</h2>
          <div className={styles.credibilityGrid}>
            <div className={styles.credibilityItem}>
              <div className={styles.credibilityIcon}>
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className={styles.credibilityContent}>
                <h3>Educational Excellence</h3>
                <p>
                  Master's degree in Instructional Design & Technology from Liberty University, 
                  currently pursuing Graduate Certificate in AI Systems Management from Strayer University.
                </p>
              </div>
            </div>

            <div className={styles.credibilityItem}>
              <div className={styles.credibilityIcon}>
                <i className="fas fa-certificate"></i>
              </div>
              <div className={styles.credibilityContent}>
                <h3>Industry Certifications</h3>
                <p>
                  {eatSignals.expertise.certifications.length} professional certifications including 
                  PMP, AI/ML specializations, and data science credentials from leading organizations.
                </p>
              </div>
            </div>

            <div className={styles.credibilityItem}>
              <div className={styles.credibilityIcon}>
                <i className="fas fa-file-alt"></i>
              </div>
              <div className={styles.credibilityContent}>
                <h3>Published Research</h3>
                <p>
                  Author of {eatSignals.expertise.publications.length} published whitepapers on AI infrastructure, 
                  data science, and secure AI implementation for government and enterprise applications.
                </p>
              </div>
            </div>

            <div className={styles.credibilityItem}>
              <div className={styles.credibilityIcon}>
                <i className="fas fa-handshake"></i>
              </div>
              <div className={styles.credibilityContent}>
                <h3>Client Success</h3>
                <p>
                  Proven track record with measurable outcomes: 40% training efficiency improvements, 
                  300% faster data processing, and 25% accuracy increases in mission-critical systems.
                </p>
              </div>
            </div>

            <div className={styles.credibilityItem}>
              <div className={styles.credibilityIcon}>
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className={styles.credibilityContent}>
                <h3>Security Clearance</h3>
                <p>
                  Trusted professional with government security clearance, working on sensitive 
                  defense and intelligence projects requiring the highest levels of trust and expertise.
                </p>
              </div>
            </div>

            <div className={styles.credibilityItem}>
              <div className={styles.credibilityIcon}>
                <i className="fas fa-users"></i>
              </div>
              <div className={styles.credibilityContent}>
                <h3>Professional Network</h3>
                <p>
                  Active member of professional organizations including PMI and Scrum Alliance, 
                  with verified testimonials from senior leaders at Leidos and federal partners.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.verificationNotice}>
            <div className={styles.verificationContent}>
              <i className="fas fa-check-circle"></i>
              <div>
                <h4>Verification Available</h4>
                <p>
                  All certifications, publications, and professional claims can be independently verified. 
                  Contact information and verification links are provided for transparency and trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}