# GEMINI.md - Project Context

## Project Overview
Personal portfolio website for Dustin J. Ober, featuring research whitepapers, projects, and professional information. Built with Next.js 16.

## Recent Changes

### 2026-01-09: Expanded Sovereign AI Infrastructure Whitepaper
- **File Modified**: `whitepapers/markdown/01_Sovereign AI Infrastructure.md`
- **Change Summary**: Significantly expanded the whitepaper from ~5 pages (~224 lines, 13KB) to ~20 pages (~1,427 lines, 53KB)
- **New Sections Added**:
  - Section 2: Strategic Imperatives for Sovereign AI (geopolitical landscape, data sovereignty laws, supply chain vulnerabilities, mission continuity)
  - Section 4: Regulatory & Compliance Deep Dive (ITAR, CUI, CMMC, HIPAA, SOX, PCI-DSS)
  - Expanded Hardware Sizing with detailed VRAM calculations, GPU architecture comparisons, multi-GPU configurations, storage considerations
  - Section 7: Security Hardening Best Practices (OS hardening, model security, audit/logging)
  - Section 9: Implementation Case Studies (defense intelligence, hospital clinical support, manufacturing quality control)
  - Section 10: Operational Runbooks (model updates, disaster recovery, capacity planning)
  - Section 12: Troubleshooting & Common Pitfalls (CUDA issues, OOM errors, silent failures)
  - Appendices: Glossary, Quick Reference Cards, Further Reading

## Architecture Notes

### Whitepaper System
- Source markdown files: `whitepapers/markdown/`
- PDF versions: `whitepapers/pdf/`
- Web rendering: `src/app/research/[slug]/page.tsx`
- Uses `marked` library to render markdown to HTML
- Styling in `src/app/research/[slug]/whitepaper.module.css`

### Styling
- Global styles: `src/app/globals.css`
- Uses CSS variables for theming (light/dark mode)
- Font: Plus Jakarta Sans (primary), JetBrains Mono (code)
- Accent color: `#5469d4` (light) / `#818cf8` (dark)

## Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run lint` - Run ESLint
