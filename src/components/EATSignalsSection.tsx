"use client";

import Link from "next/link";
import { EATSignals, Certification, Publication, ClientTestimonial, ProjectOutcome } from "@/lib/seo/types";

interface EATSignalsSectionProps {
  signals: EATSignals;
  className?: string;
}

export default function EATSignalsSection({ signals, className = "" }: EATSignalsSectionProps) {
  return (
    <section id="eat-signals" className={`eat-signals-section ${className}`}>
      <div className="container">
        <h2>Professional Credentials & Authority</h2>
        
        {/* Expertise Section */}
        <div className="eat-category">
          <h3>
            <i className="fas fa-certificate"></i> Expertise & Certifications
          </h3>
          <div className="certifications-grid">
            {signals.expertise.certifications.slice(0, 6).map((cert, index) => (
              <CertificationCard key={index} certification={cert} />
            ))}
          </div>
          
          {signals.expertise.certifications.length > 6 && (
            <div className="view-more">
              <Link href="/education" className="view-more-link">
                View All {signals.expertise.certifications.length} Certifications →
              </Link>
            </div>
          )}
        </div>

        {/* Publications Section */}
        <div className="eat-category">
          <h3>
            <i className="fas fa-file-alt"></i> Published Work & Research
          </h3>
          <div className="publications-grid">
            {signals.expertise.publications.map((publication, index) => (
              <PublicationCard key={index} publication={publication} />
            ))}
          </div>
        </div>

        {/* Authority Section */}
        <div className="eat-category">
          <h3>
            <i className="fas fa-award"></i> Professional Recognition
          </h3>
          <div className="testimonials-grid">
            {signals.authoritativeness.testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Project Outcomes Section */}
        <div className="eat-category">
          <h3>
            <i className="fas fa-chart-line"></i> Proven Results
          </h3>
          <div className="outcomes-grid">
            {signals.expertise.projectOutcomes.map((outcome, index) => (
              <ProjectOutcomeCard key={index} outcome={outcome} />
            ))}
          </div>
        </div>

        {/* Trust Signals Section */}
        <div className="eat-category">
          <h3>
            <i className="fas fa-shield-alt"></i> Trust & Verification
          </h3>
          <div className="trust-signals">
            <div className="trust-item">
              <i className="fas fa-envelope-open"></i>
              <div>
                <strong>Direct Contact</strong>
                <p>Verified email and phone contact available</p>
              </div>
            </div>
            <div className="trust-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <strong>Verifiable Credentials</strong>
                <p>{signals.trustworthiness.verifiableCredentials.length} certifications with verification links</p>
              </div>
            </div>
            <div className="trust-item">
              <i className="fas fa-users"></i>
              <div>
                <strong>Professional Affiliations</strong>
                <p>Member of {signals.trustworthiness.affiliations.length} professional organizations</p>
              </div>
            </div>
            <div className="trust-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <strong>Location Transparency</strong>
                <p>Based in {signals.trustworthiness.contactInfo.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Profiles */}
        <div className="professional-profiles">
          <h4>Professional Profiles</h4>
          <div className="profile-links">
            {signals.authoritativeness.professionalProfiles.map((profile, index) => (
              <a 
                key={index} 
                href={profile} 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-link"
              >
                {getProfileIcon(profile)} {getProfileName(profile)}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .eat-signals-section {
          padding: 4rem 0;
          background: var(--bg-primary);
        }

        .eat-category {
          margin-bottom: 3rem;
        }

        .eat-category h3 {
          color: var(--accent);
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
        }

        .eat-category h3 i {
          margin-right: 0.5rem;
        }

        .certifications-grid,
        .publications-grid,
        .testimonials-grid,
        .outcomes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1rem;
        }

        .trust-signals {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .trust-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 8px;
        }

        .trust-item i {
          color: var(--accent);
          font-size: 1.2rem;
          margin-top: 0.2rem;
        }

        .trust-item strong {
          color: var(--text-primary);
          display: block;
          margin-bottom: 0.25rem;
        }

        .trust-item p {
          color: var(--text-secondary);
          margin: 0;
          font-size: 0.9rem;
        }

        .professional-profiles {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }

        .professional-profiles h4 {
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .profile-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .profile-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-primary);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .profile-link:hover {
          background: var(--accent);
          color: white;
          transform: translateY(-1px);
        }

        .view-more {
          text-align: center;
          margin-top: 1rem;
        }

        .view-more-link {
          color: var(--accent);
          text-decoration: none;
          font-weight: 500;
        }

        .view-more-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .certifications-grid,
          .publications-grid,
          .testimonials-grid,
          .outcomes-grid {
            grid-template-columns: 1fr;
          }

          .trust-signals {
            grid-template-columns: 1fr;
          }

          .profile-links {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}

// Individual card components
function CertificationCard({ certification }: { certification: Certification }) {
  return (
    <div className="certification-card">
      <div className="cert-header">
        <h4>{certification.name}</h4>
        <span className={`cert-category ${certification.category}`}>
          {certification.category}
        </span>
      </div>
      <div className="cert-issuer">
        <i className="fas fa-building"></i>
        {certification.organizationUrl ? (
          <a href={certification.organizationUrl} target="_blank" rel="noopener noreferrer">
            {certification.issuingOrganization}
          </a>
        ) : (
          <span>{certification.issuingOrganization}</span>
        )}
      </div>
      <div className="cert-date">
        <i className="fas fa-calendar"></i>
        {new Date(certification.dateEarned).toLocaleDateString()}
      </div>
      {certification.verificationUrl && (
        <div className="cert-verification">
          <a href={certification.verificationUrl} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-external-link-alt"></i> Verify Credential
          </a>
        </div>
      )}

      <style jsx>{`
        .certification-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1.5rem;
          transition: transform 0.2s ease;
        }

        .certification-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .cert-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .cert-header h4 {
          margin: 0;
          color: var(--text-primary);
          font-size: 1rem;
          line-height: 1.3;
        }

        .cert-category {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .cert-category.professional {
          background: rgba(47, 129, 247, 0.1);
          color: var(--accent);
        }

        .cert-category.technical {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .cert-category.academic {
          background: rgba(168, 85, 247, 0.1);
          color: #a855f7;
        }

        .cert-category.advanced {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .cert-issuer,
        .cert-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .cert-issuer a {
          color: var(--accent);
          text-decoration: none;
        }

        .cert-issuer a:hover {
          text-decoration: underline;
        }

        .cert-verification {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }

        .cert-verification a {
          color: var(--accent);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .cert-verification a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <div className="publication-card">
      <div className="pub-header">
        <h4>{publication.title}</h4>
        <span className={`pub-type ${publication.type}`}>
          {publication.type}
        </span>
      </div>
      <p className="pub-description">{publication.description}</p>
      <div className="pub-meta">
        <div className="pub-date">
          <i className="fas fa-calendar"></i>
          {new Date(publication.publishedDate).toLocaleDateString()}
        </div>
        {publication.publisher && (
          <div className="pub-publisher">
            <i className="fas fa-building"></i>
            {publication.publisher}
          </div>
        )}
      </div>
      {publication.url && (
        <div className="pub-link">
          <a href={publication.url} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-external-link-alt"></i> Read Publication
          </a>
        </div>
      )}

      <style jsx>{`
        .publication-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1.5rem;
          transition: transform 0.2s ease;
        }

        .publication-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .pub-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .pub-header h4 {
          margin: 0;
          color: var(--text-primary);
          font-size: 1rem;
          line-height: 1.3;
        }

        .pub-type {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          background: rgba(47, 129, 247, 0.1);
          color: var(--accent);
        }

        .pub-description {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .pub-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .pub-date,
        .pub-publisher {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .pub-link {
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }

        .pub-link a {
          color: var(--accent);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .pub-link a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: ClientTestimonial }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-quote">
        <i className="fas fa-quote-left"></i>
        <p>{testimonial.quote}</p>
      </div>
      <div className="testimonial-author">
        <div className="author-info">
          <strong>{testimonial.clientTitle}</strong>
          <span>{testimonial.clientCompany}</span>
          {testimonial.projectContext && (
            <small>{testimonial.projectContext}</small>
          )}
        </div>
        {testimonial.isVerified && (
          <div className="verified-badge">
            <i className="fas fa-check-circle"></i>
            Verified
          </div>
        )}
      </div>

      <style jsx>{`
        .testimonial-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1.5rem;
          transition: transform 0.2s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .testimonial-quote {
          margin-bottom: 1.5rem;
        }

        .testimonial-quote i {
          color: var(--accent);
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .testimonial-quote p {
          color: var(--text-primary);
          font-style: italic;
          line-height: 1.6;
          margin: 0;
        }

        .testimonial-author {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .author-info strong {
          display: block;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .author-info span {
          display: block;
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-top: 0.25rem;
        }

        .author-info small {
          display: block;
          color: var(--text-light);
          font-size: 0.8rem;
          margin-top: 0.25rem;
        }

        .verified-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #22c55e;
          font-size: 0.8rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

function ProjectOutcomeCard({ outcome }: { outcome: ProjectOutcome }) {
  return (
    <div className="outcome-card">
      <div className="outcome-header">
        <h4>{outcome.projectName}</h4>
        <span className={`client-type ${outcome.clientType}`}>
          {outcome.clientType}
        </span>
      </div>
      <p className="outcome-description">{outcome.description}</p>
      <div className="outcome-role">
        <strong>Role:</strong> {outcome.role}
      </div>
      
      {outcome.successMetrics && outcome.successMetrics.length > 0 && (
        <div className="success-metrics">
          <h5>Key Results:</h5>
          {outcome.successMetrics.map((metric, index) => (
            <div key={index} className="metric">
              <div className="metric-value">{metric.value}</div>
              <div className="metric-name">{metric.metric}</div>
              {metric.improvement && (
                <div className="metric-improvement">{metric.improvement}</div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="outcome-meta">
        <div className="completion-date">
          <i className="fas fa-calendar-check"></i>
          Completed {new Date(outcome.completionDate).toLocaleDateString()}
        </div>
        {outcome.teamSize && (
          <div className="team-size">
            <i className="fas fa-users"></i>
            Team of {outcome.teamSize}
          </div>
        )}
      </div>

      <style jsx>{`
        .outcome-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1.5rem;
          transition: transform 0.2s ease;
        }

        .outcome-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .outcome-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .outcome-header h4 {
          margin: 0;
          color: var(--text-primary);
          font-size: 1rem;
          line-height: 1.3;
        }

        .client-type {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .client-type.government {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .client-type.enterprise {
          background: rgba(47, 129, 247, 0.1);
          color: var(--accent);
        }

        .outcome-description {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .outcome-role {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .outcome-role strong {
          color: var(--text-primary);
        }

        .success-metrics {
          margin-bottom: 1rem;
        }

        .success-metrics h5 {
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
        }

        .metric {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
          padding: 0.5rem;
          background: rgba(47, 129, 247, 0.05);
          border-radius: 4px;
        }

        .metric-value {
          font-weight: 600;
          color: var(--accent);
          font-size: 0.9rem;
          min-width: 80px;
        }

        .metric-name {
          color: var(--text-primary);
          font-size: 0.85rem;
          font-weight: 500;
        }

        .metric-improvement {
          color: var(--text-secondary);
          font-size: 0.8rem;
          margin-left: auto;
        }

        .outcome-meta {
          display: flex;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .completion-date,
        .team-size {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
}

// Helper functions
function getProfileIcon(url: string): React.ReactElement {
  if (url.includes('linkedin')) return <i className="fab fa-linkedin"></i>;
  if (url.includes('github')) return <i className="fab fa-github"></i>;
  if (url.includes('aiober.com')) return <i className="fas fa-globe"></i>;
  return <i className="fas fa-link"></i>;
}

function getProfileName(url: string): string {
  if (url.includes('linkedin')) return 'LinkedIn';
  if (url.includes('github')) return 'GitHub';
  if (url.includes('aiober.com')) return 'Portfolio';
  return 'Profile';
}