export * from './types';
export * from './config';
export * from './metadata';
export * from './MetadataManager';
export * from './StructuredDataEngine';
export * from './SitemapGenerator';
export * from './EATManager';
export * from './eatData';
export * from './VoiceSearchOptimizer';

import { MetadataManager } from './MetadataManager';
import { StructuredDataEngine } from './StructuredDataEngine';
import { SitemapGenerator } from './SitemapGenerator';
import { EATManager } from './EATManager';
import { VoiceSearchOptimizer } from './VoiceSearchOptimizer';
import { defaultSEOConfig } from './config';

export const metadataManager = new MetadataManager(defaultSEOConfig);
export const structuredDataEngine = new StructuredDataEngine();
export const sitemapGenerator = new SitemapGenerator('https://aiober.com');
export const eatManager = new EATManager();
export const voiceSearchOptimizer = new VoiceSearchOptimizer();