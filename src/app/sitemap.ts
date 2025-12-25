import { MetadataRoute } from 'next';
import { sitemapGenerator } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/projects',
    '/research',
    '/education',
    '/contact',
    '/resume',
    '/cv',
    '/case-study-chain-reaction'
  ].map(route => ({
    url: route,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return sitemapGenerator.generate(routes);
}
