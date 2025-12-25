"use client";

import { AuthorBio, ContactInfo } from "@/lib/seo/types";

interface AuthorBioSectionProps {
  authorBio: AuthorBio;
  contactInfo: ContactInfo;
  className?: string;
}

export default function AuthorBioSection({ authorBio, contactInfo, className = "" }: AuthorBioSectionProps) {
  return (
    <section id="author-bio" className={`author-bio-section ${className}`}>
      <div className="container">
        <div className="bio-content">
          <div className="bio-main">
            <div className="bio-header">
              <h2>{authorBio.name}</h2>
              <div className="bio-title">{authorBio.title}</div>
              <div className="bio-location">
                <i className="fas fa-map-marker-alt"></i>
                {authorBio.location}
              </div>
            </div>
            
            <div className="bio-description">
              <p>{authorBio.detailedBackground}</p>
            </div>

            <div className="bio-highlights">
              <div className="highlight-item">
                <div className="highlight-number">{authorBio.yearsOfExperience}+</div>
                <div className="highlight-label">Years Experience</div>
              </div>
              <div className="highlight-item">
                <div className="highlight-number">{authorBio.specializations.length}</div>
                <div className="highlight-label">Core Specializations</div>
              </div>
              <div className="highlight-item">
                <div className="highlight-number">100%</div>
                <div className="highlight-label">Client Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="bio-sidebar">
            <div className="specializations">
              <h3>Core Specializations</h3>
              <div className="specialization-tags">
                {authorBio.specializations.map((spec, index) => (
                  <span key={index} className="specialization-tag">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="current-role">
              <h3>Current Position</h3>
              <div className="role-info">
                <div className="role-title">{authorBio.currentRole}</div>
                <div className="role-company">{authorBio.currentCompany}</div>
              </div>
            </div>

            <div className="contact-availability">
              <h3>Availability</h3>
              <p>{contactInfo.availability}</p>
              <div className="contact-methods">
                <a href={`mailto:${contactInfo.email}`} className="contact-method">
                  <i className="fas fa-envelope"></i>
                  Email
                </a>
                {contactInfo.linkedinUrl && (
                  <a href={contactInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-method">
                    <i className="fab fa-linkedin"></i>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>

            <div className="languages">
              <h3>Languages</h3>
              <div className="language-list">
                {authorBio.languages?.map((lang, index) => (
                  <span key={index} className="language-item">
                    <i className="fas fa-globe"></i>
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .author-bio-section {
          padding: 4rem 0;
          background: var(--bg-primary);
        }

        .bio-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .bio-header {
          margin-bottom: 2rem;
        }

        .bio-header h2 {
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          font-size: 2.5rem;
          font-weight: 700;
        }

        .bio-title {
          color: var(--accent);
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .bio-location {
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
        }

        .bio-description {
          margin-bottom: 2rem;
        }

        .bio-description p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.7;
          margin: 0;
        }

        .bio-highlights {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .highlight-item {
          text-align: center;
        }

        .highlight-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent);
          line-height: 1;
        }

        .highlight-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        .bio-sidebar {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem;
          position: sticky;
          top: 2rem;
        }

        .bio-sidebar h3 {
          color: var(--text-primary);
          font-size: 1.1rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--accent);
        }

        .bio-sidebar > div {
          margin-bottom: 2rem;
        }

        .bio-sidebar > div:last-child {
          margin-bottom: 0;
        }

        .specialization-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .specialization-tag {
          background: rgba(47, 129, 247, 0.1);
          color: var(--accent);
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .role-info {
          background: rgba(47, 129, 247, 0.05);
          padding: 1rem;
          border-radius: 8px;
        }

        .role-title {
          color: var(--text-primary);
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .role-company {
          color: var(--accent);
          font-weight: 500;
        }

        .contact-availability p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .contact-method {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-primary);
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .contact-method:hover {
          background: var(--accent);
          color: white;
          transform: translateX(2px);
        }

        .language-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .language-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .language-item i {
          color: var(--accent);
        }

        @media (max-width: 1024px) {
          .bio-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .bio-sidebar {
            position: static;
          }

          .bio-highlights {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .bio-header h2 {
            font-size: 2rem;
          }

          .bio-title {
            font-size: 1.1rem;
          }

          .bio-highlights {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .highlight-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            text-align: left;
          }

          .highlight-number {
            font-size: 2rem;
          }

          .bio-sidebar {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}