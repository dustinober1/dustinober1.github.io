import {
  SchemaFAQPage,
  FeaturedSnippet,
  VoiceQuery,
  VoiceSearchContent,
  VoiceOptimizationConfig
} from './types';

export class VoiceSearchOptimizer {
  private config: VoiceOptimizationConfig;

  constructor(config: Partial<VoiceOptimizationConfig> = {}) {
    this.config = {
      maxAnswerLength: 50, // Words for featured snippets
      targetKeywords: [],
      conversationalTone: true,
      includeQuestionVariations: true,
      optimizeForLocalSearch: false,
      ...config
    };
  }

  /**
   * Generate Q&A content formatted for voice queries
   * Implements Requirements 15.1: Q&A content formatting for voice queries
   */
  generateQAContent(content: string, targetKeywords: string[]): VoiceQuery[] {
    const qaContent: VoiceQuery[] = [];

    // Common voice search question patterns
    const questionPatterns = [
      'Who is',
      'What is',
      'What does',
      'How does',
      'Why does',
      'When did',
      'Where is',
      'How to',
      'What are the benefits of',
      'How much experience does',
      'What services does',
      'How can',
      'What makes'
    ];

    targetKeywords.forEach(keyword => {
      questionPatterns.forEach(pattern => {
        const question = this.generateQuestionVariation(pattern, keyword);
        const answer = this.extractRelevantAnswer(content, keyword, question);

        if (answer) {
          qaContent.push({
            question,
            answer,
            keywords: [keyword],
            longTailVariations: this.generateLongTailVariations(question, keyword),
            context: this.extractContext(content, keyword)
          });
        }
      });
    });

    return qaContent;
  }

  /**
   * Build concise, definitive answers for featured snippets
   * Implements Requirements 15.2: Concise, definitive answer generation for snippets
   */
  generateFeaturedSnippets(content: string, queries: VoiceQuery[]): FeaturedSnippet[] {
    return queries.map(query => {
      const optimizedAnswer = this.optimizeAnswerForSnippet(query.answer);

      return {
        question: query.question,
        answer: optimizedAnswer,
        answerLength: this.countWords(optimizedAnswer),
        format: this.determineAnswerFormat(optimizedAnswer),
        source: 'Professional Portfolio'
      };
    }).filter(snippet =>
      snippet.answerLength <= this.config.maxAnswerLength &&
      snippet.answer.length > 0
    );
  }

  /**
   * Add long-tail keyword variation integration
   * Implements Requirements 15.3: Long-tail keyword variation integration
   */
  generateLongTailVariations(baseQuestion: string, keyword: string): string[] {
    const variations: string[] = [];

    // Location-based variations
    if (this.config.optimizeForLocalSearch) {
      variations.push(
        `${baseQuestion} near me`,
        `${baseQuestion} in my area`,
        `local ${keyword} expert`
      );
    }

    // Intent-based variations
    variations.push(
      `best ${keyword} specialist`,
      `experienced ${keyword} professional`,
      `${keyword} consultant services`,
      `hire ${keyword} expert`,
      `${keyword} project help`,
      `freelance ${keyword} developer`
    );

    // Conversational variations
    if (this.config.conversationalTone) {
      variations.push(
        `I need help with ${keyword}`,
        `Looking for ${keyword} expertise`,
        `Can you help me with ${keyword}`,
        `${keyword} services available`
      );
    }

    // Question format variations
    const questionWords = ['who', 'what', 'how', 'why', 'when', 'where'];
    questionWords.forEach(word => {
      if (!baseQuestion.toLowerCase().startsWith(word)) {
        variations.push(`${word} ${keyword.toLowerCase()}`);
      }
    });

    return variations.filter((v, i, arr) => arr.indexOf(v) === i); // Remove duplicates
  }

  /**
   * Create FAQ schema markup for voice compatibility
   * Implements Requirements 15.4: FAQ schema markup for voice compatibility
   */
  generateFAQSchema(qaContent: VoiceQuery[]): SchemaFAQPage {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: qaContent.map(qa => ({
        '@type': 'Question',
        name: qa.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: qa.answer
        }
      }))
    };
  }

  /**
   * Implement natural language pattern optimization
   * Implements Requirements 15.5: Natural language pattern optimization
   */
  optimizeForNaturalLanguage(content: string): VoiceSearchContent {
    const targetKeywords = this.extractKeywords(content);
    const qaContent = this.generateQAContent(content, targetKeywords);
    const featuredSnippets = this.generateFeaturedSnippets(content, qaContent);
    const faqSchema = this.generateFAQSchema(qaContent);

    return {
      qaFormat: qaContent,
      featuredSnippets,
      faqSchema,
      naturalLanguagePatterns: this.generateNaturalLanguagePatterns(content),
      conversationalContent: this.generateConversationalContent(qaContent)
    };
  }

  /**
   * Validate voice search optimization
   */
  validateVoiceOptimization(content: VoiceSearchContent): {
    isValid: boolean;
    score: number;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 0;

    // Check Q&A content
    if (content.qaFormat.length === 0) {
      issues.push('No Q&A content generated');
    } else {
      score += 20;
      if (content.qaFormat.length >= 5) score += 10;
    }

    // Check featured snippets
    if (content.featuredSnippets.length === 0) {
      issues.push('No featured snippets optimized');
    } else {
      score += 20;
      const avgLength = content.featuredSnippets.reduce((sum, s) => sum + s.answerLength, 0) / content.featuredSnippets.length;
      if (avgLength <= this.config.maxAnswerLength) score += 10;
    }

    // Check FAQ schema
    if (!content.faqSchema.mainEntity || content.faqSchema.mainEntity.length === 0) {
      issues.push('FAQ schema is empty or invalid');
    } else {
      score += 20;
    }

    // Check natural language patterns
    if (content.naturalLanguagePatterns.length < 3) {
      issues.push('Insufficient natural language patterns');
      recommendations.push('Add more conversational question patterns');
    } else {
      score += 15;
    }

    // Check conversational content
    if (content.conversationalContent.length < 3) {
      issues.push('Limited conversational content');
      recommendations.push('Expand conversational response patterns');
    } else {
      score += 15;
    }

    return {
      isValid: issues.length === 0,
      score: Math.min(score, 100),
      issues,
      recommendations
    };
  }

  // Private helper methods
  private generateQuestionVariation(pattern: string, keyword: string): string {
    const variations: { [key: string]: string } = {
      'Who is': `Who is ${keyword}?`,
      'What is': `What is ${keyword}?`,
      'What does': `What does ${keyword} do?`,
      'How does': `How does ${keyword} work?`,
      'Why does': `Why choose ${keyword}?`,
      'When did': `When did ${keyword} start?`,
      'Where is': `Where is ${keyword} located?`,
      'How to': `How to work with ${keyword}?`,
      'What are the benefits of': `What are the benefits of ${keyword}?`,
      'How much experience does': `How much experience does ${keyword} have?`,
      'What services does': `What services does ${keyword} provide?`,
      'How can': `How can ${keyword} help?`,
      'What makes': `What makes ${keyword} different?`
    };

    return variations[pattern] || `${pattern} ${keyword}?`;
  }

  private extractRelevantAnswer(content: string, keyword: string, question: string): string {
    // Simple extraction logic - in a real implementation, this would use NLP
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const relevantSentences = sentences.filter(sentence =>
      sentence.toLowerCase().includes(keyword.toLowerCase())
    );

    if (relevantSentences.length === 0) return '';

    // Return the first relevant sentence, optimized for voice
    let answer = relevantSentences[0].trim();

    // Ensure answer is conversational
    if (this.config.conversationalTone) {
      answer = this.makeConversational(answer, question);
    }

    return answer;
  }

  private extractContext(content: string, keyword: string): string {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const keywordSentences = sentences.filter(s =>
      s.toLowerCase().includes(keyword.toLowerCase())
    );

    return keywordSentences.slice(0, 2).join('. ').trim();
  }

  private optimizeAnswerForSnippet(answer: string): string {
    // Ensure answer is concise and direct
    const words = answer.split(' ');
    if (words.length > this.config.maxAnswerLength) {
      return words.slice(0, this.config.maxAnswerLength).join(' ') + '...';
    }

    // Make sure answer starts with a clear statement
    if (!answer.match(/^(Yes|No|The|A|An|I|We|This|That)/)) {
      // Add context if missing
      return answer;
    }

    return answer;
  }

  private countWords(text: string): number {
    return text.split(/\s+/).filter(word => word.length > 0).length;
  }

  private determineAnswerFormat(answer: string): 'paragraph' | 'list' | 'table' {
    if (answer.includes('\n-') || answer.includes('•') || answer.includes('1.')) {
      return 'list';
    }
    if (answer.includes('|') && answer.split('|').length > 3) {
      return 'table';
    }
    return 'paragraph';
  }

  private extractKeywords(content: string): string[] {
    // Simple keyword extraction - in production, use more sophisticated NLP
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should']);

    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.has(word));

    // Count frequency and return top keywords
    const frequency: { [key: string]: number } = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  }

  private generateNaturalLanguagePatterns(content: string): string[] {
    const patterns = [
      'Tell me about',
      'I want to know',
      'Can you explain',
      'Help me understand',
      'I need information about',
      'What should I know about',
      'Give me details on',
      'I\'m looking for',
      'Show me',
      'Find me'
    ];

    const keywords = this.extractKeywords(content);
    const naturalPatterns: string[] = [];

    keywords.slice(0, 5).forEach(keyword => {
      patterns.forEach(pattern => {
        naturalPatterns.push(`${pattern} ${keyword}`);
      });
    });

    return naturalPatterns;
  }

  private generateConversationalContent(qaContent: VoiceQuery[]): string[] {
    return qaContent.map(qa => {
      const conversational = this.makeConversational(qa.answer, qa.question);
      return conversational;
    });
  }

  private makeConversational(answer: string, question: string): string {
    if (!this.config.conversationalTone) return answer;

    // Add conversational starters
    const starters = [
      'Well,',
      'Actually,',
      'You know,',
      'Here\'s the thing:',
      'Let me tell you,',
      'The answer is,'
    ];

    // Check if answer already sounds conversational
    if (answer.match(/^(Well|Actually|You know|Here's|Let me|The answer)/)) {
      return answer;
    }

    // Add a conversational starter occasionally
    if (Math.random() > 0.7) {
      const starter = starters[Math.floor(Math.random() * starters.length)];
      return `${starter} ${answer.toLowerCase()}`;
    }

    return answer;
  }
}