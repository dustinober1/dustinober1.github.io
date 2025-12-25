export interface OpenGraphImage {
  url: string;
  width: number;
  height: number;
  alt: string;
  type?: string;
}

export interface OpenGraph {
  type: 'website' | 'article' | 'profile' | 'book' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';
  locale: string;
  url: string;
  siteName: string;
  title: string;
  description: string;
  images: OpenGraphImage[];
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    expirationTime?: string;
    authors?: string[];
    section?: string;
    tags?: string[];
  };
  profile?: {
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
  };
}

export interface TwitterCard {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  site: string;
  creator?: string;
  title: string;
  description: string;
  images: string[];
}

export interface SEOConfig {
  title: {
    default: string;
    template: string;
  };
  description: string;
  applicationName: string;
  authors: { name: string; url?: string }[];
  generator: string;
  keywords: string[];
  referrer: 'origin-when-cross-origin' | 'no-referrer' | 'origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'same-origin' | 'no-referrer-when-downgrade';
  creator: string;
  publisher: string;
  robots: {
    index: boolean;
    follow: boolean;
    nocache?: boolean;
    googleBot?: {
      index: boolean;
      follow: boolean;
      noimageindex?: boolean;
      'max-video-preview'?: number;
      'max-image-preview'?: 'large' | 'standard' | 'none';
      'max-snippet'?: number;
    };
  };
  openGraph: OpenGraph;
  twitter: TwitterCard;
  verification?: {
    google?: string;
    yandex?: string;
    yahoo?: string;
    other?: Record<string, string | number | (string | number)[]>;
  };
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
    media?: Record<string, string>;
    types?: Record<string, string>;
  };
}

export type PageSEO = Partial<SEOConfig> & {
  title?: string; // Override title structure for pages
};

// Structured Data Interfaces
export interface SchemaPerson {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  jobTitle: string;
  url: string;
  sameAs: string[];
  knowsAbout?: string[];
  image?: string;
  description?: string;
}

export interface SchemaCreativeWork {
  '@context': 'https://schema.org';
  '@type': 'CreativeWork' | 'SoftwareApplication';
  name: string;
  description: string;
  url: string;
  author: {
    '@type': 'Person';
    name: string;
  };
  datePublished?: string;
  applicationCategory?: string; // For SoftwareApplication
  operatingSystem?: string; // For SoftwareApplication
}

export interface SchemaArticle {
  '@context': 'https://schema.org';
  '@type': 'Article' | 'BlogPosting';
  headline: string;
  description: string;
  image?: string[];
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': 'Person';
    name: string;
    url?: string;
  };
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
}

export interface SchemaOrganization {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

export interface SchemaContactPoint {
  '@context': 'https://schema.org';
  '@type': 'ContactPoint';
  contactType: string;
  email?: string;
  telephone?: string;
  availableLanguage?: string | string[];
}

export interface SchemaFAQPage {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }[];
}

export interface SchemaBreadcrumbList {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }[];
}

// E-A-T (Expertise, Authoritativeness, Trustworthiness) Interfaces
export interface Certification {
  name: string;
  issuingOrganization: string;
  organizationUrl?: string;
  dateEarned: string;
  expirationDate?: string;
  verificationUrl?: string;
  category: 'professional' | 'technical' | 'academic' | 'advanced';
  description?: string;
}

export interface Publication {
  title: string;
  type: 'article' | 'whitepaper' | 'book' | 'research' | 'blog';
  url?: string;
  publishedDate: string;
  publisher?: string;
  description?: string;
  isPeerReviewed?: boolean;
  citationCount?: number;
}

export interface ProfessionalAffiliation {
  organizationName: string;
  organizationUrl?: string;
  role?: string;
  startDate: string;
  endDate?: string;
  type: 'professional' | 'education' | 'volunteer';
  description?: string;
}

export interface ClientTestimonial {
  quote: string;
  clientName?: string;
  clientTitle: string;
  clientCompany: string;
  projectContext?: string;
  dateGiven: string;
  isVerified?: boolean;
  linkedinUrl?: string;
}

export interface ProjectOutcome {
  projectName: string;
  description: string;
  role: string;
  completionDate: string;
  successMetrics?: {
    metric: string;
    value: string;
    improvement?: string;
  }[];
  clientType: 'government' | 'enterprise' | 'startup' | 'nonprofit';
  technologies?: string[];
  teamSize?: number;
}

export interface AuthorBio {
  name: string;
  title: string;
  detailedBackground: string;
  yearsOfExperience: number;
  specializations: string[];
  currentRole?: string;
  currentCompany?: string;
  location?: string;
  languages?: string[];
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  personalWebsite?: string;
  languages?: string[];
  availability?: string;
}

export interface EATSignals {
  expertise: {
    certifications: Certification[];
    publications: Publication[];
    authorBio: AuthorBio;
    projectOutcomes: ProjectOutcome[];
  };
  authoritativeness: {
    publications: Publication[];
    affiliations: ProfessionalAffiliation[];
    testimonials: ClientTestimonial[];
    professionalProfiles: string[];
  };
  trustworthiness: {
    contactInfo: ContactInfo;
    affiliations: ProfessionalAffiliation[];
    testimonials: ClientTestimonial[];
    verifiableCredentials: Certification[];
  };
}

// Voice Search and Featured Snippet Interfaces
export interface VoiceQuery {
  question: string;
  answer: string;
  keywords: string[];
  longTailVariations: string[];
  context?: string;
}

export interface FeaturedSnippet {
  question: string;
  answer: string;
  answerLength: number;
  format: 'paragraph' | 'list' | 'table';
  source: string;
}

export interface VoiceSearchContent {
  qaFormat: VoiceQuery[];
  featuredSnippets: FeaturedSnippet[];
  faqSchema: SchemaFAQPage;
  naturalLanguagePatterns: string[];
  conversationalContent: string[];
}

export interface VoiceOptimizationConfig {
  maxAnswerLength: number;
  targetKeywords: string[];
  conversationalTone: boolean;
  includeQuestionVariations: boolean;
  optimizeForLocalSearch: boolean;
}



