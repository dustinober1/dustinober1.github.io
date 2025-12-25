import * as fc from 'fast-check';
import { MobileOptimizer } from '../../../lib/seo/MobileOptimizer';
import { AccessibilityManager } from '../../../lib/seo/AccessibilityManager';

describe('Mobile & Accessibility Property Tests', () => {
  const mobileOpt = new MobileOptimizer();
  const a11yMgr = new AccessibilityManager();

  test('MobileOptimizer.validateViewport detects presence', () => {
    const valid = '<head><meta name="viewport" content="width=device-width, initial-scale=1" /></head>';
    expect(mobileOpt.validateViewport(valid)).toBe(true);
    
    const invalid = '<head><meta name="description" content="foo" /></head>';
    expect(mobileOpt.validateViewport(invalid)).toBe(false);
  });

  test('MobileOptimizer.checkFixedDimensions detects large widths', () => {
     fc.assert(
        fc.property(fc.integer({ min: 351, max: 2000 }), (width) => {
           const css = `.foo { width: ${width}px; }`;
           const errors = mobileOpt.checkFixedDimensions(css);
           expect(errors.length).toBeGreaterThan(0);
           expect(errors[0]).toContain(`${width}px`);
        })
     );
  });

  test('AccessibilityManager.validateImages detects missing alt', () => {
    const badImg = '<img src="foo.jpg" />';
    expect(a11yMgr.validateImages(badImg)).toContain('Image missing alt attribute');

    const goodImg = '<img src="foo.jpg" alt="A foo" />';
    expect(a11yMgr.validateImages(goodImg)).toHaveLength(0);
  });

  test('AccessibilityManager.validateButtons detects empty buttons without label', () => {
     const badBtn = '<button class="icon"></button>';
     expect(a11yMgr.validateButtons(badBtn)).toContain('Button missing accessible name (aria-label or text content)');
     
     const goodBtn = '<button>Click me</button>';
     expect(a11yMgr.validateButtons(goodBtn)).toHaveLength(0);

     const ariaBtn = '<button aria-label="Menu"></button>';
     expect(a11yMgr.validateButtons(ariaBtn)).toHaveLength(0);
  });
});
