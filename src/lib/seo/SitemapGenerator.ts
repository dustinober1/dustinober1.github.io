import { MetadataRoute } from 'next';

export type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface SitemapRoute {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: ChangeFrequency;
  priority?: number;
  images?: string[]; // For image sitemap
}

export class SitemapGenerator {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  public generate(routes: SitemapRoute[]): MetadataRoute.Sitemap {
    return routes.map(route => {
      const entry: any = {
        url: this.resolveUrl(route.url),
        lastModified: route.lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      };
      
      // Next.js MetadataRoute.Sitemap doesn't explicitly support image sitemaps in the type definition 
      // in all versions, but we can try to include it if we were generating XML manually.
      // However, app/sitemap.ts expects strictly MetadataRoute.Sitemap which is an array of objects.
      // Image sitemaps usually require specific XML extension.
      // Next.js docs say sitemap.js/ts returns an array of URLs. 
      // For standard sitemap, this is sufficient.
      
      return entry;
    });
  }

  public generateRobotsTxt(rules: { 
    userAgent: string | string[]; 
    allow?: string | string[]; 
    disallow?: string | string[]; 
    crawlDelay?: number; 
  }[], sitemapUrl?: string): MetadataRoute.Robots {
    return {
      rules: rules.map(rule => ({
        userAgent: rule.userAgent,
        allow: rule.allow,
        disallow: rule.disallow,
        crawlDelay: rule.crawlDelay,
      })),
      sitemap: sitemapUrl ? this.resolveUrl(sitemapUrl) : this.resolveUrl('/sitemap.xml'),
    };
  }

  private resolveUrl(url: string): string {
    if (url.startsWith('http')) return url;
    return `${this.baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  }
}
