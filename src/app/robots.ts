import { MetadataRoute } from 'next';
import { sitemapGenerator } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return sitemapGenerator.generateRobotsTxt([
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    }
  ]);
}
