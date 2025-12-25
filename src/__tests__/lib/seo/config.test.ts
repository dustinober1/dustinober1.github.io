import * as fc from 'fast-check';
import { mergeSEOConfig, validateSEOConfig } from '../../../lib/seo/metadata';
import { defaultSEOConfig } from '../../../lib/seo/config';
import { PageSEO } from '../../../lib/seo/types';

describe('SEO Configuration Property Tests', () => {
  
  test('mergeSEOConfig always returns a valid config structure based on default', () => {
    fc.assert(
      fc.property(
        fc.option(fc.string(), { nil: undefined }), // title
        fc.option(fc.string(), { nil: undefined }), // description
        (title, description) => {
          const pageSEO: PageSEO = {};
          if (title) pageSEO.title = title;
          if (description) pageSEO.description = description;

          const merged = mergeSEOConfig(pageSEO);

          expect(merged).toBeDefined();
          expect(merged.openGraph).toBeDefined(); // Should inherit default
          
          if (title) {
            expect(merged.title.default).toBe(title);
          } else {
            expect(merged.title.default).toBe(defaultSEOConfig.title.default);
          }

          if (description) {
            expect(merged.description).toBe(description);
          } else {
            expect(merged.description).toBe(defaultSEOConfig.description);
          }
        }
      )
    );
  });

  test('validateSEOConfig returns valid for default config', () => {
    const result = validateSEOConfig(defaultSEOConfig);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('validateSEOConfig detects missing critical fields', () => {
    // We intentionally break the config to see if it catches it
    const brokenConfig = { ...defaultSEOConfig, title: { ...defaultSEOConfig.title, default: '' } };
    const result = validateSEOConfig(brokenConfig);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Title default is required');
  });

  test('mergeSEOConfig preserves default values when overrides are missing', () => {
     fc.assert(
        fc.property(fc.object(), (randomObj) => {
           // even with random junk as input (casted to PageSEO for testing robustness, though TS prevents this static usage)
           // we expect it to not crash and return something resembling default
           const merged = mergeSEOConfig(randomObj as any);
           expect(merged.applicationName).toBe(defaultSEOConfig.applicationName);
        })
     )
  });
});
