---
description: Regenerate PDF after expanding a whitepaper markdown file
---

# Whitepaper PDF Regeneration Workflow

Use this workflow after updating or expanding a whitepaper markdown file to regenerate the corresponding PDF.

## Prerequisites
- Whitepaper markdown file has been updated in `whitepapers/markdown/`
- Node.js and npm are available
- Playwright browsers are installed (one-time setup)

## Steps

### 1. Verify the markdown file exists and check word count
```bash
wc -l "whitepapers/markdown/<WHITEPAPER_FILE>.md"
```

### 2. Build the project to ensure markdown renders correctly
// turbo
```bash
npm run build
```

### 3. Generate the PDF using Playwright
// turbo
```bash
npx tsx scripts/generate-pdf.ts "whitepapers/markdown/<WHITEPAPER_FILE>.md"
```

If Playwright browsers are not installed, run:
```bash
npx playwright install chromium
```

### 4. Verify the PDF was generated and mirrored
The script automatically mirrors the PDF to `public/whitepapers/pdf/` for the web server.
// turbo
```bash
ls -la whitepapers/pdf/
ls -la public/whitepapers/pdf/
```

### 5. Commit and push changes
```bash
git add -A && git commit -m "Update <WHITEPAPER_NAME> and regenerate PDF" && git push
```

## File Naming Convention

| Markdown File | PDF Output |
|---------------|------------|
| `01_Sovereign AI Infrastructure.md` | `01-sovereign-ai-infrastructure.pdf` |
| `02_The Disconnected Pipeline.md` | `02-the-disconnected-pipeline.pdf` |
| `03_Private Knowledge Retrieval.md` | `03-private-knowledge-retrieval.pdf` |

## Troubleshooting

### Playwright browser not found
```bash
npx playwright install chromium
```

### PDF generation fails
- Check markdown syntax is valid
- Ensure no broken image links
- Check console output for specific errors
