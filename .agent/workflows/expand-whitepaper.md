---
description: Research and expand an existing whitepaper to approximately 20 pages
---

# Whitepaper Expansion Workflow

Use this workflow to significantly expand an existing whitepaper in the Sovereign AI series.

## Prerequisites
- Target whitepaper exists in `whitepapers/markdown/`
- Clear understanding of the expansion goals

## Steps

### 1. Review the current whitepaper content
Read the existing markdown file to understand current structure and content:
```
whitepapers/markdown/<WHITEPAPER_FILE>.md
```

### 2. Check current statistics
// turbo
```bash
wc -l whitepapers/markdown/<WHITEPAPER_FILE>.md && wc -c whitepapers/markdown/<WHITEPAPER_FILE>.md
```

### 3. Create an implementation plan
Create a detailed expansion plan covering:
- Current word count and target word count (~8,000-9,000 words for 20 pages)
- New sections to add
- Existing sections to expand
- Tables, diagrams, and examples to include

Recommended sections for comprehensive whitepapers:
- Executive Summary (expanded)
- Strategic Imperatives / Background
- Regulatory & Compliance considerations
- Technical deep-dives with calculations/examples
- Security best practices
- Implementation case studies (2-3 examples)
- Operational runbooks
- Troubleshooting guide
- Appendices (Glossary, Quick Reference, Further Reading)

### 4. Get user approval on the plan
Present the implementation plan for review before writing.

### 5. Write the expanded content
Expand the markdown file with all new sections. Maintain:
- Consistent technical tone
- Professional formatting
- Code examples and diagrams where appropriate
- Tables for comparisons and reference data

### 6. Verify the expansion statistics
// turbo
```bash
wc -l whitepapers/markdown/<WHITEPAPER_FILE>.md && wc -c whitepapers/markdown/<WHITEPAPER_FILE>.md
```

Target metrics for ~20 pages:
- Lines: 1,200-1,500
- Bytes: 45,000-60,000
- Words: 8,000-9,000

### 7. Build and verify rendering
// turbo
```bash
npm run build
```

### 8. Regenerate the PDF
// turbo
```bash
npx tsx scripts/generate-pdf.ts "whitepapers/markdown/<WHITEPAPER_FILE>.md"
```

### 9. Update GEMINI.md
Document the changes made in GEMINI.md under "Recent Changes".

### 10. Commit and push
```bash
git add -A && git commit -m "Expand <WHITEPAPER_NAME> to ~20 pages" && git push
```

## Expansion Template

When expanding, consider adding these section types:

| Section Type | Purpose | Target Length |
|--------------|---------|---------------|
| Strategic Context | Why this matters | 600-800 words |
| Technical Deep-Dive | How it works in detail | 1,000-1,500 words |
| Compliance/Regulatory | Legal requirements | 500-700 words |
| Case Studies | Real-world examples | 600-900 words |
| Operational Procedures | How to run it | 500-700 words |
| Troubleshooting | Common issues | 400-600 words |
| Appendices | Reference material | 400-600 words |
