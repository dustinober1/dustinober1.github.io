import * as fc from 'fast-check';
import { SitemapGenerator, ChangeFrequency } from '../../../lib/seo/SitemapGenerator';

describe('SitemapGenerator Property Tests', () => {
  const baseUrl = 'https://example.com';
  const generator = new SitemapGenerator(baseUrl);

  test('generate produces valid sitemap entries with resolved URLs', () => {
    fc.assert(
      fc.property(
        fc.string(), // path
        fc.option(fc.date()), // lastModified
        fc.option(fc.constantFrom<ChangeFrequency>('daily', 'weekly')), // changeFrequency
        (path, lastMod, freq) => {
          const routes = [{
            url: path,
            lastModified: lastMod || undefined,
            changeFrequency: freq || undefined
          }];
          
          const sitemap = generator.generate(routes);
          expect(sitemap).toHaveLength(1);
          
          const entry = sitemap[0];
          expect(entry.url).toMatch(/^https:\/\/example\.com/);
          if (lastMod) expect(entry.lastModified).toBe(lastMod);
          if (freq) expect(entry.changeFrequency).toBe(freq);
        }
      )
    );
  });

  test('generateRobotsTxt produces valid structure', () => {
     fc.assert(
        fc.property(
           fc.array(fc.string()), // allowed
           fc.array(fc.string()), // disallowed
           (allow, disallow) => {
              const robots = generator.generateRobotsTxt([{
                 userAgent: '*',
                 allow,
                 disallow
              }]);
              
              expect(robots.rules).toHaveLength(1);
              if (Array.isArray(robots.rules)) {
                 expect(robots.rules[0].allow).toEqual(allow);
                 expect(robots.rules[0].disallow).toEqual(disallow);
              }
              expect(robots.sitemap).toBe(`${baseUrl}/sitemap.xml`);
           }
        )
     )
  });
});
