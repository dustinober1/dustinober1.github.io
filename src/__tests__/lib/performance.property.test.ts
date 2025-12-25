import * as fc from 'fast-check';
import { analyzeResourceTiming } from '../../lib/performance';

describe('Performance Property Tests', () => {
  
  test('analyzeResourceTiming handles random performance entries', () => {
    // We need to mock performance.getEntriesByType
    const originalGetEntriesByType = performance.getEntriesByType;
    
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            name: fc.string(),
            duration: fc.double({ min: 0, max: 10000 }),
            transferSize: fc.integer({ min: 0, max: 10000000 }),
            initiatorType: fc.string()
          })
        ),
        (entries) => {
           // Mocking
           global.performance.getEntriesByType = jest.fn().mockReturnValue(entries);
           
           const analysis = analyzeResourceTiming();
           
           expect(analysis.totalResources).toBe(entries.length);
           expect(analysis.totalSize).toBe(entries.reduce((acc, e) => acc + e.transferSize, 0));
           expect(analysis.slowResources.length).toBeLessThanOrEqual(10);
           
           // Verify logic consistency
           const slowCount = entries.filter(e => e.duration > 500).length;
           // slowResources is sliced to 10
           expect(analysis.slowResources.length).toBe(Math.min(slowCount, 10));
        }
      )
    );
    
    // Restore
    global.performance.getEntriesByType = originalGetEntriesByType;
  });
});
