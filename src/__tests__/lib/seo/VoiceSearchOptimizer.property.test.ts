import * as fc from 'fast-check';
import { VoiceSearchOptimizer, VoiceOptimizationConfig } from '../../../lib/seo/VoiceSearchOptimizer';

/**
 * Property-Based Tests for Voice Search and Featured Snippet Optimization
 * **Feature: seo-ai-optimization, Property 11: Voice Search and Featured Snippet Optimization**
 * **Validates: Requirements 15.1, 15.2, 15.3, 15.4**
 */

describe('VoiceSearchOptimizer Property Tests', () => {
  // Generators for voice search testing
  const contentGenerator = fc.string({ minLength: 100, maxLength: 2000 });
  
  const keywordGenerator = fc.array(
    fc.string({ minLength: 3, maxLength: 20 }).filter(s => /^[a-zA-Z\s]+$/.test(s)),
    { minLength: 1, maxLength: 10 }
  );

  const configGenerator = fc.record({
    maxAnswerLength: fc.integer({ min: 20, max: 100 }),
    targetKeywords: keywordGenerator,
    conversationalTone: fc.boolean(),
    includeQuestionVariations: fc.boolean(),
    optimizeForLocalSearch: fc.boolean()
  }) as fc.Arbitrary<VoiceOptimizationConfig>;

  const professionalContentGenerator = fc.constantFrom(
    'Dustin J. Ober is an experienced AI Developer and Technical Instructional Systems Designer with over 10 years of experience in machine learning and natural language processing. He specializes in developing AI solutions for government and enterprise clients.',
    'As a certified Project Management Professional (PMP) and AI specialist, Dustin has led numerous successful projects in artificial intelligence, data science, and educational technology. His expertise includes Python, TensorFlow, and cloud computing.',
    'Dustin provides comprehensive AI consulting services including machine learning model development, natural language processing solutions, and technical training. He has worked with Fortune 500 companies and government agencies.',
    'With extensive experience in instructional design and AI development, Dustin creates innovative learning solutions that leverage artificial intelligence. His background includes work at Leidos and various educational institutions.'
  );

  test('Property 11.1: Q&A content generation produces valid question-answer pairs', () => {
    fc.assert(
      fc.property(
        professionalContentGenerator,
        keywordGenerator,
        configGenerator,
        (content, keywords, config) => {
          const optimizer = new VoiceSearchOptimizer(config);
          const qaContent = optimizer.generateQAContent(content, keywords);

          // Validate structure
          expect(Array.isArray(qaContent)).toBe(true);

          qaContent.forEach(qa => {
            // Each Q&A should have required fields
            expect(qa.question).toBeDefined();
            expect(typeof qa.question).toBe('string');
            expect(qa.question.length).toBeGreaterThan(0);
            expect(qa.question.endsWith('?')).toBe(true);

            expect(qa.answer).toBeDefined();
            expect(typeof qa.answer).toBe('string');
            expect(qa.answer.length).toBeGreaterThan(0);

            expect(Array.isArray(qa.keywords)).toBe(true);
            expect(qa.keywords.length).toBeGreaterThan(0);

            expect(Array.isArray(qa.longTailVariations)).toBe(true);

            // Context should be string or undefined
            if (qa.context !== undefined) {
              expect(typeof qa.context).toBe('string');
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 11.2: Featured snippets meet length and format requirements', () => {
    fc.assert(
      fc.property(
        professionalContentGenerator,
        keywordGenerator,
        configGenerator,
        (content, keywords, config) => {
          const optimizer = new VoiceSearchOptimizer(config);
          const qaContent = optimizer.generateQAContent(content, keywords);
          const snippets = optimizer.generateFeaturedSnippets(content, qaContent);

          // Validate structure
          expect(Array.isArray(snippets)).toBe(true);

          snippets.forEach(snippet => {
            // Length requirements
            expect(snippet.answerLength).toBeLessThanOrEqual(config.maxAnswerLength);
            expect(snippet.answerLength).toBeGreaterThan(0);

            // Format validation
            expect(['paragraph', 'list', 'table']).toContain(snippet.format);

            // Content validation
            expect(snippet.question).toBeDefined();
            expect(snippet.question.length).toBeGreaterThan(0);
            expect(snippet.answer).toBeDefined();
            expect(snippet.answer.length).toBeGreaterThan(0);
            expect(snippet.source).toBeDefined();

            // Word count should match answerLength
            const actualWordCount = snippet.answer.split(/\s+/).filter(w => w.length > 0).length;
            expect(snippet.answerLength).toBe(actualWordCount);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 11.3: Long-tail variations include diverse question patterns', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 50 }).filter(s => s.includes('?')),
        fc.string({ minLength: 3, maxLength: 20 }).filter(s => /^[a-zA-Z\s]+$/.test(s)),
        configGenerator,
        (baseQuestion, keyword, config) => {
          const optimizer = new VoiceSearchOptimizer(config);
          const variations = optimizer.generateLongTailVariations(baseQuestion, keyword);

          // Validate structure
          expect(Array.isArray(variations)).toBe(true);
          expect(variations.length).toBeGreaterThan(0);

          // All variations should be strings
          variations.forEach(variation => {
            expect(typeof variation).toBe('string');
            expect(variation.length).toBeGreaterThan(0);
          });

          // Should include keyword in variations
          const keywordIncluded = variations.some(v => 
            v.toLowerCase().includes(keyword.toLowerCase())
          );
          expect(keywordIncluded).toBe(true);

          // If local search is enabled, should include location-based variations
          if (config.optimizeForLocalSearch) {
            const hasLocationVariations = variations.some(v => 
              v.includes('near me') || v.includes('in my area') || v.includes('local')
            );
            expect(hasLocationVariations).toBe(true);
          }

          // If conversational tone is enabled, should include conversational patterns
          if (config.conversationalTone) {
            const hasConversationalVariations = variations.some(v => 
              v.includes('I need') || v.includes('Looking for') || v.includes('Can you help')
            );
            expect(hasConversationalVariations).toBe(true);
          }

          // Should not have duplicates
          const uniqueVariations = [...new Set(variations)];
          expect(uniqueVariations.length).toBe(variations.length);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 11.4: FAQ schema follows Schema.org specification', () => {
    fc.assert(
      fc.property(
        professionalContentGenerator,
        keywordGenerator,
        configGenerator,
        (content, keywords, config) => {
          const optimizer = new VoiceSearchOptimizer(config);
          const qaContent = optimizer.generateQAContent(content, keywords);
          const faqSchema = optimizer.generateFAQSchema(qaContent);

          // Validate Schema.org structure
          expect(faqSchema['@context']).toBe('https://schema.org');
          expect(faqSchema['@type']).toBe('FAQPage');
          expect(Array.isArray(faqSchema.mainEntity)).toBe(true);

          // Validate each FAQ item
          faqSchema.mainEntity.forEach(item => {
            expect(item['@type']).toBe('Question');
            expect(item.name).toBeDefined();
            expect(typeof item.name).toBe('string');
            expect(item.name.length).toBeGreaterThan(0);

            expect(item.acceptedAnswer).toBeDefined();
            expect(item.acceptedAnswer['@type']).toBe('Answer');
            expect(item.acceptedAnswer.text).toBeDefined();
            expect(typeof item.acceptedAnswer.text).toBe('string');
            expect(item.acceptedAnswer.text.length).toBeGreaterThan(0);
          });

          // Should have same number of items as Q&A content
          expect(faqSchema.mainEntity.length).toBe(qaContent.length);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 11.5: Natural language optimization produces comprehensive voice content', () => {
    fc.assert(
      fc.property(
        professionalContentGenerator,
        configGenerator,
        (content, config) => {
          const optimizer = new VoiceSearchOptimizer(config);
          const voiceContent = optimizer.optimizeForNaturalLanguage(content);

          // Validate structure
          expect(voiceContent.qaFormat).toBeDefined();
          expect(Array.isArray(voiceContent.qaFormat)).toBe(true);

          expect(voiceContent.featuredSnippets).toBeDefined();
          expect(Array.isArray(voiceContent.featuredSnippets)).toBe(true);

          expect(voiceContent.faqSchema).toBeDefined();
          expect(voiceContent.faqSchema['@context']).toBe('https://schema.org');

          expect(voiceContent.naturalLanguagePatterns).toBeDefined();
          expect(Array.isArray(voiceContent.naturalLanguagePatterns)).toBe(true);

          expect(voiceContent.conversationalContent).toBeDefined();
          expect(Array.isArray(voiceContent.conversationalContent)).toBe(true);

          // Natural language patterns should include conversational starters
          const hasConversationalPatterns = voiceContent.naturalLanguagePatterns.some(pattern =>
            pattern.includes('Tell me') || pattern.includes('I want to know') || 
            pattern.includes('Can you explain') || pattern.includes('Help me understand')
          );
          expect(hasConversationalPatterns).toBe(true);

          // Conversational content should match Q&A format length
          expect(voiceContent.conversationalContent.length).toBe(voiceContent.qaFormat.length);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 11.6: Voice optimization validation provides accurate scoring', () => {
    fc.assert(
      fc.property(
        professionalContentGenerator,
        configGenerator,
        (content, config) => {
          const optimizer = new VoiceSearchOptimizer(config);
          const voiceContent = optimizer.optimizeForNaturalLanguage(content);
          const validation = optimizer.validateVoiceOptimization(voiceContent);

          // Validate validation structure
          expect(typeof validation.isValid).toBe('boolean');
          expect(typeof validation.score).toBe('number');
          expect(validation.score).toBeGreaterThanOrEqual(0);
          expect(validation.score).toBeLessThanOrEqual(100);
          expect(Array.isArray(validation.issues)).toBe(true);
          expect(Array.isArray(validation.recommendations)).toBe(true);

          // If no issues, should be valid
          if (validation.issues.length === 0) {
            expect(validation.isValid).toBe(true);
          }

          // Score should reflect content quality
          if (voiceContent.qaFormat.length > 0) {
            expect(validation.score).toBeGreaterThan(0);
          }

          if (voiceContent.featuredSnippets.length > 0) {
            expect(validation.score).toBeGreaterThan(20);
          }

          if (voiceContent.faqSchema.mainEntity.length > 0) {
            expect(validation.score).toBeGreaterThan(40);
          }

          // Issues should be meaningful strings
          validation.issues.forEach(issue => {
            expect(typeof issue).toBe('string');
            expect(issue.length).toBeGreaterThan(0);
          });

          // Recommendations should be meaningful strings
          validation.recommendations.forEach(rec => {
            expect(typeof rec).toBe('string');
            expect(rec.length).toBeGreaterThan(0);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 11.7: Question generation covers diverse voice search patterns', () => {
    fc.assert(
      fc.property(
        professionalContentGenerator,
        keywordGenerator,
        configGenerator,
        (content, keywords, config) => {
          const optimizer = new VoiceSearchOptimizer(config);
          const qaContent = optimizer.generateQAContent(content, keywords);

          if (qaContent.length > 0) {
            // Should have questions starting with different question words
            const questionStarters = qaContent.map(qa => 
              qa.question.split(' ')[0].toLowerCase()
            );

            const uniqueStarters = [...new Set(questionStarters)];
            
            // Should have variety in question types
            expect(uniqueStarters.length).toBeGreaterThan(0);

            // Common voice search patterns should be present
            const commonPatterns = ['who', 'what', 'how', 'why', 'when', 'where'];
            const hasCommonPatterns = uniqueStarters.some(starter => 
              commonPatterns.includes(starter)
            );
            expect(hasCommonPatterns).toBe(true);

            // Each question should be properly formatted
            qaContent.forEach(qa => {
              expect(qa.question.endsWith('?')).toBe(true);
              expect(qa.question.length).toBeGreaterThan(5);
              
              // Should contain at least one keyword
              const containsKeyword = keywords.some(keyword =>
                qa.question.toLowerCase().includes(keyword.toLowerCase())
              );
              expect(containsKeyword).toBe(true);
            });
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 11.8: Answer optimization maintains content integrity', () => {
    fc.assert(
      fc.property(
        professionalContentGenerator,
        keywordGenerator,
        configGenerator,
        (content, keywords, config) => {
          const optimizer = new VoiceSearchOptimizer(config);
          const qaContent = optimizer.generateQAContent(content, keywords);
          const snippets = optimizer.generateFeaturedSnippets(content, qaContent);

          snippets.forEach(snippet => {
            // Answer should be derived from original content
            expect(snippet.answer.length).toBeGreaterThan(0);
            
            // Should not exceed configured length
            expect(snippet.answerLength).toBeLessThanOrEqual(config.maxAnswerLength);

            // Should maintain readability
            expect(snippet.answer.trim()).toBe(snippet.answer);
            
            // Should not be just punctuation or whitespace
            expect(/[a-zA-Z]/.test(snippet.answer)).toBe(true);

            // If conversational tone is enabled, may include conversational elements
            if (config.conversationalTone) {
              // This is optional, so we just check it doesn't break the answer
              expect(snippet.answer.length).toBeGreaterThan(0);
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 11.9: Configuration options properly influence output', () => {
    fc.assert(
      fc.property(
        professionalContentGenerator,
        keywordGenerator,
        (content, keywords) => {
          // Test with local search enabled
          const localConfig: VoiceOptimizationConfig = {
            maxAnswerLength: 50,
            targetKeywords: keywords,
            conversationalTone: false,
            includeQuestionVariations: true,
            optimizeForLocalSearch: true
          };

          // Test with conversational tone enabled
          const conversationalConfig: VoiceOptimizationConfig = {
            maxAnswerLength: 50,
            targetKeywords: keywords,
            conversationalTone: true,
            includeQuestionVariations: true,
            optimizeForLocalSearch: false
          };

          const localOptimizer = new VoiceSearchOptimizer(localConfig);
          const conversationalOptimizer = new VoiceSearchOptimizer(conversationalConfig);

          const localQA = localOptimizer.generateQAContent(content, keywords);
          const conversationalQA = conversationalOptimizer.generateQAContent(content, keywords);

          // Local search should generate location-based variations
          if (localQA.length > 0) {
            const hasLocationVariations = localQA.some(qa =>
              qa.longTailVariations.some(variation =>
                variation.includes('near me') || variation.includes('local')
              )
            );
            expect(hasLocationVariations).toBe(true);
          }

          // Conversational tone should affect content
          if (conversationalQA.length > 0) {
            const hasConversationalVariations = conversationalQA.some(qa =>
              qa.longTailVariations.some(variation =>
                variation.includes('I need') || variation.includes('Can you help')
              )
            );
            expect(hasConversationalVariations).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});