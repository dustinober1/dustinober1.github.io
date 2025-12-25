export class MobileOptimizer {
  
  public validateViewport(html: string): boolean {
    return /<meta\s+name=["']viewport["']\s+content=["'][^"']*width=device-width[^"']*["']\s*\/?>/i.test(html);
  }

  public checkFixedDimensions(cssOrHtml: string): string[] {
    const errors: string[] = [];
    // Simple check for large fixed widths which break mobile layout
    const fixedWidthRegex = /width:\s*([0-9]+)px/gi;
    let match;
    while ((match = fixedWidthRegex.exec(cssOrHtml)) !== null) {
      const width = parseInt(match[1], 10);
      if (width > 350) { // arbitrary safe mobile width
        errors.push(`Found fixed width > 350px: ${width}px`);
      }
    }
    return errors;
  }
}
