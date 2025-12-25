import * as fc from 'fast-check';
import { ContentOptimizer } from '../../../lib/seo/ContentOptimizer';

describe('ContentOptimizer Property Tests', () => {
  const optimizer = new ContentOptimizer();

  test('validateHeadingHierarchy detects missing H1', () => {
    fc.assert(
      fc.property(fc.string(), (htmlFragment) => {
        // Ensure no H1 is present
        const cleanHtml = htmlFragment.replace(/<h1/gi, '<div');
        const result = optimizer.validateHeadingHierarchy(cleanHtml);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Missing H1 tag');
      })
    );
  });

  test('validateHeadingHierarchy accepts valid nesting', () => {
    // Construct a valid sequence: H1 -> H2 -> H3 -> H2 ...
    const result = optimizer.validateHeadingHierarchy('<h1>Title</h1><h2>Subtitle</h2><h3>Section</h3>');
    expect(result.valid).toBe(true);
  });
  
  test('validateHeadingHierarchy rejects invalid nesting (skipping levels)', () => {
    const result = optimizer.validateHeadingHierarchy('<h1>Title</h1><h3>Section</h3>'); // Skips H2
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toMatch(/Skipped heading level/);
  });

  test('analyzeKeywordDensity calculates correctly', () => {
     const text = "AI is great. AI is future.";
     const keywords = ["AI", "future"];
     const results = optimizer.analyzeKeywordDensity(text, keywords);
     
     const aiResult = results.find(r => r.keyword === "AI");
     expect(aiResult?.count).toBe(2);
     // 6 words. 2/6 = 33.33%
     expect(aiResult?.density).toBeCloseTo(33.33, 1);
  });

  test('generateFAQSchema creates valid structure', () => {
    fc.assert(
      fc.property(fc.array(fc.record({ question: fc.string(), answer: fc.string() })), (faqs) => {
        const schema = optimizer.generateFAQSchema(faqs);
        expect(schema['@type']).toBe('FAQPage');
        expect(schema.mainEntity).toHaveLength(faqs.length);
        if (faqs.length > 0) {
           expect(schema.mainEntity[0]['@type']).toBe('Question');
           expect(schema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
        }
      })
    );
  });
});
