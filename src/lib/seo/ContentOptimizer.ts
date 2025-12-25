import { SchemaFAQPage } from './types';

export interface HeadingValidationResult {
  valid: boolean;
  errors: string[];
}

export interface KeywordDensityResult {
  keyword: string;
  count: number;
  density: number; // percentage
}

export class ContentOptimizer {

  /**
   * Validates heading hierarchy in HTML content.
   * Checks for presence of H1 and sequential nesting (e.g. H2 -> H3, not H2 -> H4).
   */
  public validateHeadingHierarchy(html: string): HeadingValidationResult {
    const errors: string[] = [];
    
    // Check for H1
    if (!/<h1[^>]*>/.test(html)) {
      errors.push('Missing H1 tag');
    }

    // Check nesting
    const headingRegex = /<h([1-6])[^>]*>/g;
    let match;
    let lastLevel = 0; // 0 means start of content (after H1 usually, or treating H1 as level 1)
    
    // Reset regex index if reusing
    headingRegex.lastIndex = 0;
    
    // We strictly check h1->h2->h3... 
    // H1 is usually expected once at top, but let's just track levels
    
    while ((match = headingRegex.exec(html)) !== null) {
      const level = parseInt(match[1], 10);
      
      if (lastLevel !== 0) {
        if (level > lastLevel + 1) {
          errors.push(`Skipped heading level: H${lastLevel} to H${level}`);
        }
      }
      lastLevel = level;
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Analyzes keyword density in plain text.
   */
  public analyzeKeywordDensity(text: string, keywords: string[]): KeywordDensityResult[] {
    const wordCount = text.split(/\s+/).length;
    if (wordCount === 0) return [];

    return keywords.map(keyword => {
      // Simple case-insensitive count
      const regex = new RegExp(`\\b${this.escapeRegExp(keyword)}\\b`, 'gi');
      const count = (text.match(regex) || []).length;
      return {
        keyword,
        count,
        density: (count / wordCount) * 100
      };
    });
  }

  /**
   * Generates FAQ Schema from Q&A pairs.
   */
  public generateFAQSchema(faqs: { question: string; answer: string }[]): SchemaFAQPage {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }

  /**
   * Formats content for AI readability (e.g. Q&A format).
   * This is a helper to structure content.
   */
  public formatQA(question: string, answer: string): string {
    return `
      <div class="ai-qa-section" itemscope itemtype="https://schema.org/Question">
        <h3 itemprop="name">${question}</h3>
        <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
          <div itemprop="text">${answer}</div>
        </div>
      </div>
    `;
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\\]/g, '\\$&');
  }
}
