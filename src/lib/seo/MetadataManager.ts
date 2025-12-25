import { Metadata } from 'next';
import { SEOConfig, PageSEO } from './types';
import { defaultSEOConfig } from './config';
import { mergeSEOConfig } from './metadata';

export class MetadataManager {
  private config: SEOConfig;

  constructor(baseConfig: SEOConfig = defaultSEOConfig) {
    this.config = baseConfig;
  }

  public generate(pageSEO?: PageSEO): Metadata {
    const merged = mergeSEOConfig(pageSEO);
    
    // Construct the Next.js Metadata object
    const metadata: Metadata = {
      title: merged.title,
      description: merged.description,
      applicationName: merged.applicationName,
      authors: merged.authors,
      generator: merged.generator,
      keywords: merged.keywords,
      referrer: merged.referrer,
      creator: merged.creator,
      publisher: merged.publisher,
      robots: merged.robots,
      openGraph: {
        ...merged.openGraph,
        // Map any custom OG types if necessary, mostly 1:1 match with Next.js types
      },
      twitter: {
        ...merged.twitter,
        card: merged.twitter.card, // Ensure literal type match
      },
      alternates: merged.alternates,
      metadataBase: new URL(merged.openGraph.url), // Using OG URL as base if not provided otherwise
    };

    return metadata;
  }

  public validateDescriptionLength(description: string): boolean {
    return description.length >= 50 && description.length <= 160;
  }

  public generateTitle(title: string): string {
    // Simple implementation utilizing the template from config
    // In Next.js the template is handled automatically if we return the object
    // But if we need raw string:
    return this.config.title.template.replace('%s', title);
  }
}
