export class AccessibilityManager {
  
  public validateImages(html: string): string[] {
    const errors: string[] = [];
    // Check img tags for alt
    const imgRegex = /<img([^>]+)>/g;
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
      const attrs = match[1];
      if (!/alt=["'][^"']*["']/.test(attrs)) {
        errors.push('Image missing alt attribute');
      }
    }
    return errors;
  }

  public validateButtons(html: string): string[] {
    const errors: string[] = [];
    const buttonRegex = /<button([^>]*)>(.*?)<\/button>/gi;
    let match;
    while ((match = buttonRegex.exec(html)) !== null) {
      const attrs = match[1];
      const content = match[2];
      
      const hasAriaLabel = /aria-label=["'][^"']+["']/.test(attrs);
      const hasContent = content.trim().length > 0;
      
      if (!hasAriaLabel && !hasContent) {
        errors.push('Button missing accessible name (aria-label or text content)');
      }
    }
    return errors;
  }
}
