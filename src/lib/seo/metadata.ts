import { SEOConfig, PageSEO } from './types';
import { defaultSEOConfig } from './config';

/**
 * Deep merges two SEO configuration objects.
 * Page-specific configuration overrides default configuration.
 */
export function mergeSEOConfig(pageSEO?: PageSEO): SEOConfig {
  if (!pageSEO) {
    return defaultSEOConfig;
  }

  const merged: SEOConfig = { ...defaultSEOConfig };

  if (pageSEO.title !== undefined) {
    merged.title = {
      ...merged.title,
      default: pageSEO.title,
    };
  }

  if (pageSEO.description !== undefined) {
    merged.description = pageSEO.description;
  }

  // Merge other properties as needed... 
  // For now, doing a shallow merge of top-level properties and specific deep merges where critical
  
  if (pageSEO.robots) {
    merged.robots = { ...merged.robots, ...pageSEO.robots };
  }

  if (pageSEO.openGraph) {
     merged.openGraph = { ...merged.openGraph, ...pageSEO.openGraph };
  }
  
  if (pageSEO.twitter) {
    merged.twitter = { ...merged.twitter, ...pageSEO.twitter };
  }

  if (pageSEO.alternates) {
    merged.alternates = { ...merged.alternates, ...pageSEO.alternates };
  }
  
  // Array replacements (simple strategy for now)
  if (pageSEO.keywords) {
    merged.keywords = pageSEO.keywords;
  }

  return merged;
}

/**
 * Validates SEO Configuration
 * @param config SEOConfig object
 * @returns boolean isValid
 */
export function validateSEOConfig(config: SEOConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!config.title.default) {
    errors.push('Title default is required');
  }
  
  if (config.description && config.description.length > 300) { // arbitrary soft limit check
     // This is just an example validtion
  }

  if (!config.openGraph.url) {
    errors.push('OpenGraph URL is required');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
