import * as fc from 'fast-check';
import { EATManager } from '../../../lib/seo/EATManager';
import { 
  Certification, 
  Publication, 
  ProfessionalAffiliation, 
  ClientTestimonial, 
  ProjectOutcome, 
  AuthorBio, 
  ContactInfo 
} from '../../../lib/seo/types';

/**
 * Property-Based Tests for E-A-T Signal Implementation
 * **Feature: seo-ai-optimization, Property 10: E-A-T Signal Implementation**
 * **Validates: Requirements 14.1, 14.2, 14.3, 14.5**
 */

describe('EATManager Property Tests', () => {
  const eatManager = new EATManager();

  // Generators for E-A-T data structures
  const certificationGenerator = fc.record({
    name: fc.string({ minLength: 1 }),
    issuingOrganization: fc.string({ minLength: 1 }),
    organizationUrl: fc.option(fc.webUrl()),
    dateEarned: fc.date({ noInvalidDate: true }).map(d => d.toISOString()),
    expirationDate: fc.option(fc.date({ noInvalidDate: true }).map(d => d.toISOString())),
    verificationUrl: fc.option(fc.webUrl()),
    category: fc.constantFrom('professional', 'technical', 'academic', 'advanced'),
    description: fc.option(fc.string())
  }) as fc.Arbitrary<Certification>;

  const publicationGenerator = fc.record({
    title: fc.string({ minLength: 1 }),
    type: fc.constantFrom('article', 'whitepaper', 'book', 'research', 'blog'),
    url: fc.option(fc.webUrl()),
    publishedDate: fc.date({ noInvalidDate: true }).map(d => d.toISOString()),
    publisher: fc.option(fc.string()),
    description: fc.option(fc.string()),
    isPeerReviewed: fc.option(fc.boolean()),
    citationCount: fc.option(fc.nat())
  }) as fc.Arbitrary<Publication>;

  const affiliationGenerator = fc.record({
    organizationName: fc.string({ minLength: 1 }),
    organizationUrl: fc.option(fc.webUrl()),
    role: fc.option(fc.string()),
    startDate: fc.date({ noInvalidDate: true }).map(d => d.toISOString()),
    endDate: fc.option(fc.date({ noInvalidDate: true }).map(d => d.toISOString())),
    type: fc.constantFrom('professional', 'education', 'volunteer'),
    description: fc.option(fc.string())
  }) as fc.Arbitrary<ProfessionalAffiliation>;

  const testimonialGenerator = fc.record({
    quote: fc.string({ minLength: 10 }),
    clientName: fc.option(fc.string()),
    clientTitle: fc.string({ minLength: 1 }),
    clientCompany: fc.string({ minLength: 1 }),
    projectContext: fc.option(fc.string()),
    dateGiven: fc.date({ noInvalidDate: true }).map(d => d.toISOString()),
    isVerified: fc.option(fc.boolean()),
    linkedinUrl: fc.option(fc.webUrl())
  }) as fc.Arbitrary<ClientTestimonial>;

  const projectOutcomeGenerator = fc.record({
    projectName: fc.string({ minLength: 1 }),
    description: fc.string({ minLength: 1 }),
    role: fc.string({ minLength: 1 }),
    completionDate: fc.date({ noInvalidDate: true }).map(d => d.toISOString()),
    successMetrics: fc.option(fc.array(fc.record({
      metric: fc.string({ minLength: 1 }),
      value: fc.string({ minLength: 1 }),
      improvement: fc.option(fc.string())
    }))),
    clientType: fc.constantFrom('government', 'enterprise', 'startup', 'nonprofit'),
    technologies: fc.option(fc.array(fc.string({ minLength: 1 }))),
    teamSize: fc.option(fc.nat({ max: 50 }))
  }) as fc.Arbitrary<ProjectOutcome>;

  const authorBioGenerator = fc.record({
    name: fc.string({ minLength: 1 }),
    title: fc.string({ minLength: 1 }),
    detailedBackground: fc.string({ minLength: 50 }),
    yearsOfExperience: fc.nat({ max: 50 }),
    specializations: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
    currentRole: fc.option(fc.string()),
    currentCompany: fc.option(fc.string()),
    location: fc.option(fc.string()),
    languages: fc.option(fc.array(fc.string({ minLength: 1 })))
  }) as fc.Arbitrary<AuthorBio>;

  const contactInfoGenerator = fc.record({
    email: fc.emailAddress(),
    phone: fc.option(fc.string()),
    location: fc.option(fc.string()),
    linkedinUrl: fc.option(fc.webUrl()),
    githubUrl: fc.option(fc.webUrl()),
    personalWebsite: fc.option(fc.webUrl()),
    languages: fc.option(fc.array(fc.string({ minLength: 1 }))),
    availability: fc.option(fc.string())
  }) as fc.Arbitrary<ContactInfo>;

  const eatDataGenerator = fc.record({
    certifications: fc.array(certificationGenerator, { minLength: 1 }),
    publications: fc.array(publicationGenerator),
    affiliations: fc.array(affiliationGenerator),
    testimonials: fc.array(testimonialGenerator),
    projectOutcomes: fc.array(projectOutcomeGenerator),
    authorBio: authorBioGenerator,
    contactInfo: contactInfoGenerator
  });

  test('Property 10.1: E-A-T signals generation produces complete structure', () => {
    fc.assert(
      fc.property(
        eatDataGenerator,
        (data) => {
          const signals = eatManager.generateEATSignals(data);

          // Validate expertise signals
          expect(signals.expertise).toBeDefined();
          expect(signals.expertise.certifications).toEqual(data.certifications);
          expect(signals.expertise.publications).toEqual(data.publications);
          expect(signals.expertise.authorBio).toEqual(data.authorBio);
          expect(signals.expertise.projectOutcomes).toEqual(data.projectOutcomes);

          // Validate authoritativeness signals
          expect(signals.authoritativeness).toBeDefined();
          expect(signals.authoritativeness.publications).toEqual(data.publications);
          expect(signals.authoritativeness.affiliations).toEqual(data.affiliations);
          expect(signals.authoritativeness.testimonials).toEqual(data.testimonials);
          expect(Array.isArray(signals.authoritativeness.professionalProfiles)).toBe(true);

          // Validate trustworthiness signals
          expect(signals.trustworthiness).toBeDefined();
          expect(signals.trustworthiness.contactInfo).toEqual(data.contactInfo);
          expect(signals.trustworthiness.affiliations).toEqual(data.affiliations);
          expect(signals.trustworthiness.testimonials).toEqual(data.testimonials);
          expect(Array.isArray(signals.trustworthiness.verifiableCredentials)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 10.2: Professional profiles extraction includes all valid URLs', () => {
    fc.assert(
      fc.property(
        contactInfoGenerator,
        (contactInfo) => {
          const data = {
            certifications: [],
            publications: [],
            affiliations: [],
            testimonials: [],
            projectOutcomes: [],
            authorBio: {
              name: 'Test',
              title: 'Test',
              detailedBackground: 'Test background',
              yearsOfExperience: 5,
              specializations: ['Test']
            },
            contactInfo
          };

          const signals = eatManager.generateEATSignals(data);
          const profiles = signals.authoritativeness.professionalProfiles;

          // Count expected profiles
          let expectedCount = 0;
          if (contactInfo.linkedinUrl) expectedCount++;
          if (contactInfo.githubUrl) expectedCount++;
          if (contactInfo.personalWebsite) expectedCount++;

          expect(profiles).toHaveLength(expectedCount);

          // Verify all URLs are included
          if (contactInfo.linkedinUrl) {
            expect(profiles).toContain(contactInfo.linkedinUrl);
          }
          if (contactInfo.githubUrl) {
            expect(profiles).toContain(contactInfo.githubUrl);
          }
          if (contactInfo.personalWebsite) {
            expect(profiles).toContain(contactInfo.personalWebsite);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 10.3: Verifiable credentials filtering works correctly', () => {
    fc.assert(
      fc.property(
        fc.array(certificationGenerator, { minLength: 1 }),
        (certifications) => {
          const data = {
            certifications,
            publications: [],
            affiliations: [],
            testimonials: [],
            projectOutcomes: [],
            authorBio: {
              name: 'Test',
              title: 'Test',
              detailedBackground: 'Test background',
              yearsOfExperience: 5,
              specializations: ['Test']
            },
            contactInfo: { email: 'test@example.com' }
          };

          const signals = eatManager.generateEATSignals(data);
          const verifiableCreds = signals.trustworthiness.verifiableCredentials;

          // All verifiable credentials should have verification URLs
          verifiableCreds.forEach(cert => {
            expect(cert.verificationUrl).toBeDefined();
            expect(cert.verificationUrl).not.toBe('');
          });

          // Count should match certifications with verification URLs
          const expectedCount = certifications.filter(cert => cert.verificationUrl).length;
          expect(verifiableCreds).toHaveLength(expectedCount);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 10.4: E-A-T validation scoring is consistent', () => {
    fc.assert(
      fc.property(
        eatDataGenerator,
        (data) => {
          const signals = eatManager.generateEATSignals(data);
          const validation = eatManager.validateEATSignals(signals);

          // Score should be between 0 and 100
          expect(validation.score).toBeGreaterThanOrEqual(0);
          expect(validation.score).toBeLessThanOrEqual(100);

          // If no missing signals, should be valid
          if (validation.missingSignals.length === 0) {
            expect(validation.isValid).toBe(true);
          }

          // Missing signals should be an array
          expect(Array.isArray(validation.missingSignals)).toBe(true);

          // Score should increase with more complete data
          if (data.certifications.length > 0) {
            expect(validation.score).toBeGreaterThan(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 10.5: Structured data generation produces valid Schema.org format', () => {
    fc.assert(
      fc.property(
        eatDataGenerator,
        (data) => {
          const signals = eatManager.generateEATSignals(data);
          const structuredData = eatManager.generateEATStructuredData(signals);

          // Validate basic Schema.org structure
          expect(structuredData['@context']).toBe('https://schema.org');
          expect(structuredData['@type']).toBe('Person');

          // Validate credentials structure
          if (structuredData.hasCredential) {
            expect(Array.isArray(structuredData.hasCredential)).toBe(true);
            structuredData.hasCredential.forEach((cred: any) => {
              expect(cred['@type']).toBe('EducationalOccupationalCredential');
              expect(cred.name).toBeDefined();
              expect(cred.issuedBy).toBeDefined();
              expect(cred.issuedBy['@type']).toBe('Organization');
            });
          }

          // Validate contact point structure
          if (structuredData.contactPoint) {
            expect(structuredData.contactPoint['@type']).toBe('ContactPoint');
            expect(structuredData.contactPoint.contactType).toBe('professional');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 10.6: Content optimization generates appropriate highlights', () => {
    fc.assert(
      fc.property(
        eatDataGenerator,
        (data) => {
          const signals = eatManager.generateEATSignals(data);
          const optimizedContent = eatManager.generateEATOptimizedContent(signals);

          // Validate structure
          expect(optimizedContent.credibilitySection).toBeDefined();
          expect(typeof optimizedContent.credibilitySection).toBe('string');
          expect(optimizedContent.credibilitySection.length).toBeGreaterThan(0);

          expect(Array.isArray(optimizedContent.expertiseHighlights)).toBe(true);
          expect(Array.isArray(optimizedContent.authorityIndicators)).toBe(true);
          expect(Array.isArray(optimizedContent.trustSignals)).toBe(true);

          // Validate content includes key information
          if (data.certifications.length > 0) {
            expect(optimizedContent.credibilitySection).toContain(data.certifications.length.toString());
          }

          if (data.authorBio.yearsOfExperience > 0) {
            expect(optimizedContent.credibilitySection).toContain(data.authorBio.yearsOfExperience.toString());
          }

          // Validate highlights are meaningful
          optimizedContent.expertiseHighlights.forEach(highlight => {
            expect(typeof highlight).toBe('string');
            expect(highlight.length).toBeGreaterThan(0);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 10.7: E-A-T signals maintain data integrity across transformations', () => {
    fc.assert(
      fc.property(
        eatDataGenerator,
        (data) => {
          const signals = eatManager.generateEATSignals(data);
          const structuredData = eatManager.generateEATStructuredData(signals);
          const optimizedContent = eatManager.generateEATOptimizedContent(signals);

          // Original data should be preserved in signals
          expect(signals.expertise.certifications).toEqual(data.certifications);
          expect(signals.expertise.publications).toEqual(data.publications);
          expect(signals.expertise.authorBio).toEqual(data.authorBio);

          // Structured data should reference original data
          if (data.certifications.length > 0 && structuredData.hasCredential) {
            expect(structuredData.hasCredential.length).toBe(data.certifications.length);
          }

          // Optimized content should reflect original data metrics
          if (data.certifications.length > 0) {
            const credibilityText = optimizedContent.credibilitySection;
            expect(credibilityText).toContain(data.certifications.length.toString());
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});