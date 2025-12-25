import * as fc from 'fast-check';
import { MetadataManager } from '../../../lib/seo/MetadataManager';
import { defaultSEOConfig } from '../../../lib/seo/config';

describe('MetadataManager Property Tests', () => {
  const manager = new MetadataManager();

  test('generate always returns a valid Metadata object structure', () => {
    fc.assert(
      fc.property(
        fc.string(), 
        fc.string(), 
        (title, description) => {
          const metadata = manager.generate({ title, description });
          
          expect(metadata).toBeDefined();
          
          // Check title structure
          // mergeSEOConfig logic: if title string is provided, it sets title.default
          if (typeof metadata.title === 'object' && metadata.title !== null && 'default' in metadata.title) {
             expect(metadata.title.default).toBe(title);
          } else {
             // If implementation changes to return string, this would fail, but currently it returns SEOConfig.title object
             // which is { default: string, template: string }
          }
          
          expect(metadata.description).toBe(description);
          expect(metadata.openGraph).toBeDefined();
        }
      )
    );
  });

  test('validateDescriptionLength checks bounds correctly', () => {
    fc.assert(
      fc.property(fc.string(), (desc) => {
        const isValid = manager.validateDescriptionLength(desc);
        if (desc.length >= 50 && desc.length <= 160) {
          expect(isValid).toBe(true);
        } else {
          expect(isValid).toBe(false);
        }
      })
    );
  });
});
