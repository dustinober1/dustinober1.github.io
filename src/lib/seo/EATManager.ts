import { 
  EATSignals, 
  Certification, 
  Publication, 
  ProfessionalAffiliation, 
  ClientTestimonial, 
  ProjectOutcome,
  AuthorBio,
  ContactInfo
} from './types';

/**
 * E-A-T (Expertise, Authoritativeness, Trustworthiness) Manager
 * Handles the display and management of expertise and authority signals
 * for SEO and credibility enhancement
 */
export class EATManager {
  
  /**
   * Generate comprehensive E-A-T signals for a professional profile
   */
  public generateEATSignals(data: {
    certifications: Certification[];
    publications: Publication[];
    affiliations: ProfessionalAffiliation[];
    testimonials: ClientTestimonial[];
    projectOutcomes: ProjectOutcome[];
    authorBio: AuthorBio;
    contactInfo: ContactInfo;
  }): EATSignals {
    return {
      expertise: {
        certifications: data.certifications,
        publications: data.publications,
        authorBio: data.authorBio,
        projectOutcomes: data.projectOutcomes
      },
      authoritativeness: {
        publications: data.publications,
        affiliations: data.affiliations,
        testimonials: data.testimonials,
        professionalProfiles: this.extractProfessionalProfiles(data.contactInfo)
      },
      trustworthiness: {
        contactInfo: data.contactInfo,
        affiliations: data.affiliations,
        testimonials: data.testimonials,
        verifiableCredentials: data.certifications.filter(cert => cert.verificationUrl)
      }
    };
  }

  /**
   * Generate structured data for E-A-T signals
   */
  public generateEATStructuredData(signals: EATSignals): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      hasCredential: signals.expertise.certifications.map(cert => ({
        '@type': 'EducationalOccupationalCredential',
        name: cert.name,
        credentialCategory: cert.category,
        issuedBy: {
          '@type': 'Organization',
          name: cert.issuingOrganization,
          url: cert.organizationUrl
        },
        dateCreated: cert.dateEarned,
        url: cert.verificationUrl
      })),
      alumniOf: signals.authoritativeness.affiliations
        .filter(aff => aff.type === 'education')
        .map(aff => ({
          '@type': 'EducationalOrganization',
          name: aff.organizationName,
          url: aff.organizationUrl
        })),
      memberOf: signals.authoritativeness.affiliations
        .filter(aff => aff.type === 'professional')
        .map(aff => ({
          '@type': 'Organization',
          name: aff.organizationName,
          url: aff.organizationUrl
        })),
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'professional',
        email: signals.trustworthiness.contactInfo.email,
        telephone: signals.trustworthiness.contactInfo.phone,
        availableLanguage: signals.trustworthiness.contactInfo.languages || ['English']
      }
    };
  }

  /**
   * Validate E-A-T signals completeness
   */
  public validateEATSignals(signals: EATSignals): {
    isValid: boolean;
    missingSignals: string[];
    score: number;
  } {
    const missingSignals: string[] = [];
    let score = 0;

    // Expertise validation
    if (signals.expertise.certifications.length === 0) {
      missingSignals.push('certifications');
    } else {
      score += 25;
    }

    if (signals.expertise.publications.length === 0) {
      missingSignals.push('publications');
    } else {
      score += 20;
    }

    if (!signals.expertise.authorBio.detailedBackground) {
      missingSignals.push('detailed author bio');
    } else {
      score += 15;
    }

    // Authoritativeness validation
    if (signals.authoritativeness.affiliations.length === 0) {
      missingSignals.push('professional affiliations');
    } else {
      score += 20;
    }

    if (signals.authoritativeness.testimonials.length === 0) {
      missingSignals.push('client testimonials');
    } else {
      score += 10;
    }

    // Trustworthiness validation
    if (!signals.trustworthiness.contactInfo.email || !signals.trustworthiness.contactInfo.phone) {
      missingSignals.push('complete contact information');
    } else {
      score += 10;
    }

    return {
      isValid: missingSignals.length === 0,
      missingSignals,
      score
    };
  }

  /**
   * Generate E-A-T optimized content structure
   */
  public generateEATOptimizedContent(signals: EATSignals): {
    credibilitySection: string;
    expertiseHighlights: string[];
    authorityIndicators: string[];
    trustSignals: string[];
  } {
    return {
      credibilitySection: this.generateCredibilitySection(signals),
      expertiseHighlights: this.generateExpertiseHighlights(signals.expertise),
      authorityIndicators: this.generateAuthorityIndicators(signals.authoritativeness),
      trustSignals: this.generateTrustSignals(signals.trustworthiness)
    };
  }

  private extractProfessionalProfiles(contactInfo: ContactInfo): string[] {
    const profiles: string[] = [];
    
    if (contactInfo.linkedinUrl) profiles.push(contactInfo.linkedinUrl);
    if (contactInfo.githubUrl) profiles.push(contactInfo.githubUrl);
    if (contactInfo.personalWebsite) profiles.push(contactInfo.personalWebsite);
    
    return profiles;
  }

  private generateCredibilitySection(signals: EATSignals): string {
    const certCount = signals.expertise.certifications.length;
    const pubCount = signals.expertise.publications.length;
    const yearsExperience = signals.expertise.authorBio.yearsOfExperience;

    return `Professional with ${yearsExperience}+ years of experience, ${certCount} industry certifications, and ${pubCount} published works. Verified expertise in ${signals.expertise.authorBio.specializations.join(', ')}.`;
  }

  private generateExpertiseHighlights(expertise: EATSignals['expertise']): string[] {
    const highlights: string[] = [];

    // Add certification highlights
    const premiumCerts = expertise.certifications.filter(cert => 
      cert.category === 'professional' || cert.category === 'advanced'
    );
    if (premiumCerts.length > 0) {
      highlights.push(`${premiumCerts.length} professional certifications including ${premiumCerts[0].name}`);
    }

    // Add publication highlights
    if (expertise.publications.length > 0) {
      highlights.push(`Author of ${expertise.publications.length} published works`);
    }

    // Add project outcome highlights
    const successfulProjects = expertise.projectOutcomes.filter(project => project.successMetrics);
    if (successfulProjects.length > 0) {
      highlights.push(`Led ${successfulProjects.length} successful projects with measurable outcomes`);
    }

    return highlights;
  }

  private generateAuthorityIndicators(authoritativeness: EATSignals['authoritativeness']): string[] {
    const indicators: string[] = [];

    // Professional affiliations
    const professionalOrgs = authoritativeness.affiliations.filter(aff => aff.type === 'professional');
    if (professionalOrgs.length > 0) {
      indicators.push(`Member of ${professionalOrgs.length} professional organizations`);
    }

    // Publications in reputable venues
    const peerReviewedPubs = authoritativeness.publications.filter(pub => pub.isPeerReviewed);
    if (peerReviewedPubs.length > 0) {
      indicators.push(`${peerReviewedPubs.length} peer-reviewed publications`);
    }

    // Client testimonials
    if (authoritativeness.testimonials.length > 0) {
      indicators.push(`${authoritativeness.testimonials.length} client testimonials from industry leaders`);
    }

    return indicators;
  }

  private generateTrustSignals(trustworthiness: EATSignals['trustworthiness']): string[] {
    const signals: string[] = [];

    // Contact transparency
    if (trustworthiness.contactInfo.email && trustworthiness.contactInfo.phone) {
      signals.push('Complete contact information provided');
    }

    // Verifiable credentials
    if (trustworthiness.verifiableCredentials.length > 0) {
      signals.push(`${trustworthiness.verifiableCredentials.length} verifiable credentials`);
    }

    // Professional affiliations
    if (trustworthiness.affiliations.length > 0) {
      signals.push('Affiliated with recognized professional organizations');
    }

    return signals;
  }
}