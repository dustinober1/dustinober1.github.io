# GEMINI.md - Project Context

## Project Overview
Personal portfolio website for Dustin J. Ober, featuring research whitepapers, projects, and professional information. Built with Next.js 16.

## Recent Changes

### 2026-01-16: Added Performance Review Highlights
- **Goal**: Integrate "Exceptional Performance" review metrics to reinforce technical credibility.
- **Files Modified**:
  - `src/components/Hero.tsx` - Added "97% Process Automation" credential badge
  - `src/components/SkillsSection.tsx` - Added "Accessibility & Compliance" skill category
  - `src/components/ExperienceSection.tsx` - Added NCTC achievements (accessibility DB, automation)
  - `src/app/about/page.tsx` - Added 97% stat, Section 508 specialization
  - `src/app/resume/page.tsx` - Enhanced bullets with specific metrics, added accessibility skills
- **Key Additions**:
  - "97% Process Automation" badge (reduced reporting from 1 week to 30 minutes)
  - Section 508/WCAG accessibility expertise
  - NCTC accessibility database achievement

### 2026-01-16: Added Professional Certifications Section
- **Goal**: Showcase technical credentials to reinforce "Data Scientist & ML Engineer" brand.
- **Files Created**:
  - `src/components/CertificationsSection.tsx` - Component displaying 14 certifications in 3 categories
  - `src/components/CertificationsSection.module.css` - Styling matching TechStackSection pattern
- **Files Modified**:
  - `src/app/page.tsx` - Integrated CertificationsSection after EducationSummarySection
  - `src/components/EducationSummarySection.tsx` - Removed duplicate "Key Certifications" section
  - `src/app/resume/page.tsx` - Updated certifications to accurate list
  - `src/app/education/page.tsx` - Updated with 16 accurate certifications in 4 categories
- **Categories**:
  - AI & Machine Learning (9 Udacity Nanodegrees)
  - Data & Cloud Platforms (Databricks, AWS, Business Analytics)
  - Project Management (PMP)


### 2026-01-16: Portfolio Repositioning for Data Science Focus
- **Goal**: Address recruiter feedback about "not technical enough" and "job hopping" concerns.
- **Files Modified**:
  - `src/components/Hero.tsx` - Updated title to "Data Scientist & ML Engineer"
  - `src/components/TechStackSection.tsx` (NEW) - Prominent tech stack display
  - `src/components/TechStackSection.module.css` (NEW) - Styling for tech stack
  - `src/components/SkillsSection.tsx` - Reordered to lead with Data Science & ML
  - `src/components/ExperienceSection.tsx` - Complete overhaul with career arcs
  - `src/components/ExperienceSection.module.css` (NEW) - Styling for career arcs
  - `src/app/page.tsx` - Integrated TechStackSection
  - `src/app/about/page.tsx` - Updated title/stats to match new branding
- **Key Changes**:
  - Hero: "Data Scientist & ML Engineer" title, "30+ ML Models Deployed" badge
  - New TechStackSection with 6 categories (Data Science Core, Deep Learning, NLP/LLMs, etc.)
  - Skills reordered: Data Science & ML now first, Instructional Design last
  - Experience grouped into "Career Arcs" instead of individual jobs
  - Added career journey narrative explaining intentional progression
  - Added contract disclaimer for defense work
  - Dates changed to year-only format


### 2026-01-10: Authored Scaling LLM Evaluation Whitepaper
- **File Modified**: `whitepapers/markdown/08_Scaling LLM Evaluation with DSPy.md` (Created)
- **Files Updated**: `src/app/research/page.tsx`, `src/app/research/[slug]/page.tsx`
- **Change Summary**: Created Whitepaper #08, "Scaling LLM Evaluation with DSPy".
- **Details**:
  - Authored case study on moving from manual prompting to DSPy pipelines.
  - Included two case studies: Clinical Extraction (99% Accuracy) and Multi-Rubric Essay Grading (0.92 Human-Alignment).
  - Highlighted "99% Extraction Accuracy" using DSPy Assertions and MIPROv2.
  - Registered new page in Next.js routing and whitepaper list.
  - Generated and mirrored PDF: `whitepapers/pdf/08-scaling-llm-evaluation-with-dspy.pdf`.

### 2026-01-10: Authored Neuro-Symbolic Tutors Whitepaper
- **File Modified**: `whitepapers/markdown/07_The Future of Neuro-Symbolic Tutors.md` (Created)
- **Files Updated**: `src/app/research/page.tsx`, `src/app/research/[slug]/page.tsx`
- **Change Summary**: Created Whitepaper #07, "The Future of Neuro-Symbolic Tutors".
- **Details**:
  - Authored ~8 page whitepaper covering the integration of Deep Learning and Symbolic Logic.
  - Defined architecture for Neuro-Symbolic Tutors (Neural Layer, Symbolic Layer, DSPy Bridge).
  - Registered new page in Next.js routing and whitepaper list.
  - Generated and mirrored PDF: `whitepapers/pdf/07-the-future-of-neuro-symbolic-tutors.pdf`.


### 2026-01-09: Expanded Beyond Vibes Engineering Whitepaper
- **File Modified**: `whitepapers/markdown/06_Beyond Vibes Engineering Reliable AI Tutors with DSPy.md`
- **Change Summary**: Significantly expanded whitepaper to ~55KB (1,120 lines, ~24 pages).
- **New Sections Added**:
  - **Architecture Deep-Dive**: Detailed breakdown of DSPy Signatures, Modules, and Optimizers (BootstrapFewShot, MIPRO).
  - **Conceptual Framework**: New "4-Layer Hierarchy of Reliability" (Prompt -> Program -> Optimized -> Verified).
  - **Metrics**: Comprehensive taxonomy of Pedagogical Metrics (Structural, Reference, Semantic) with Python implementation code.
  - **Advanced Patterns**: Assertions for self-correcting inference, RAG 2.0 (Query Optimization), and Multi-Agent Simulation.
  - **Operational Runbooks**: Golden Dataset versioning (DVC), CI/CD pipelines for prompts, and Cost/RoI analysis.
  - **Case Studies**: Detailed narratives for Defense (Air-Gapped), Corporate (Compliance), and University (Adaptive Tutor) scenarios.
  - **Implementation Guide**: Full "Production-Ready" tutorial with FastAPI serving code.
- **Verification**: Verified build rendering and regenerated mirrored PDF via Playwright.

### 2026-01-09: Expanded Agentic Architectures Whitepaper
- **File Modified**: `whitepapers/markdown/05_Agentic Architectures in Secure Enclaves.md`
- **Change Summary**: Massive expansion to 425KB PDF (~22 pages). Deep technical dive into sovereign agent patterns.
- **New Sections Added**:
  - **Strategic Assessment**: The "Connected Assumption" vulnerability and Geopolitical Risks.
  - **The Sovereign Agent Framework (SAF)**: Full reference architecture (LangGraph + gVisor + SQLite).
  - **Code Deep Dives**:
    - **Explicit Graph Routing**: Python/LangGraph code for a deterministic state machine.
    - **Sandboxed Execution**: `sandbox.Dockerfile` and Python wrapper for gVisor isolation.
    - **Audit Logging**: SQLite schema for hash-chained immutable logs.
  - **Threat Modeling**: New chapter on Red Teaming (Data Poisoning, Fork Bombs).
  - **Hardware Params**: Detailed "Agent Appliance" rack spec (H100/A100 sizing).
  - **Case Studies**: "ChainReaction" (Supply Chain Risk) and "Clinical Decision Support" (HIPAA).
- **Verification**: Built and regenerated PDF.

### 2026-01-09: Expanded Verifiable Intelligence Whitepaper
- **File Modified**: `whitepapers/markdown/04_Verifiable Intelligence.md`
- **Change Summary**: Significantly expanded whitepaper to ~6,000 words (~20 pages with formatting).
- **New Sections Added**:
  - **Strategic Context**: The "Vibe Based" Crisis & Sovereign Imperative.
  - **Regulatory Alignment**: Deep mapping to EU AI Act Art 14 and NIST AI RMF.
  - **Technical Deep-Dive**: Comprehensive DSPy Tutorial, Code examples for CheckCompliance module, and Optimizers (MIPRO vs Bootstrap).
  - **Governance Architecture**: "Citation Forcing," "I Don't Know" Guardrails, and Data Provenance Watermarking.
  - **New Case Study**: "The Sovereign Grant Writer" (Non-profit context).
  - **Operational Runbooks**: CI/CD for Prompts (GitHub Actions), Prometheus Metrics for drift detection.
  - **Future Outlook**: Agentic Verification and Neuro-Symbolic integration.

### 2026-01-09: Expanded Private Knowledge Retrieval Whitepaper
- **File Modified**: `whitepapers/markdown/03_Private Knowledge Retrieval.md`
- **Change Summary**: Significantly expanded whitepaper from ~12KB (178 lines) to ~34KB (558 lines).
- **New Sections Added**:
  - **Strategic Context**: "The Connected Assumption" & Sovereign Imperative.
  - **Technical Deep-Dives**: Bi-Encoders vs Cross-Encoders, MRL, Quantization math, HNSW/DiskANN.
  - **Architecture**: Python ingestion code, Qdrant/Chroma/Milvus comparison matrix.
  - **Agentic RAG**: DSPy tutorial with code examples, CRAG architecture.
  - **Security**: Metadata ACLs JSON example, Vector Inversion defense.
  - **Expanded Case Studies**: Detailed narratives for Defense, Legal, and Clinical scenarios.
  - **Operational Runbooks**: Drift detection, detailed Capacity Planning tables.
  - **Appendices**: Glossary, Sovereign Stack recommendation.

### 2026-01-09: Expanded Private Knowledge Retrieval Whitepaper
- **File Modified**: `whitepapers/markdown/03_Private Knowledge Retrieval.md`
- **Change Summary**: Significantly expanded the whitepaper from ~5.5KB (167 lines) to ~62KB (493 lines, ~20 pages).
- **New Sections Added**:
  - Section 2: Strategic Context & Geopolitical Sovereignty.
  - Section 5: Advanced Retrieval Patterns (Hybrid search, Reranking, MRL).
  - Section 6: Agentic RAG & Multi-Turn Architectures (DSPy, ReAct).
  - Section 8: Zero-Trust Security Hardening (ACLs, sanitization).
  - Section 10: Implementation Case Studies (Defense Intelligence, Financial Audit).
  - Section 11: Comprehensive Operational Runbooks & TROUBLESHOOTING.
  - Section 12: Hardware Sizing & Capacity Planning (VRAM/Compute).
  - Appendices: 250-item technical glossary and 50-scenario troubleshooting matrix.
- **Verification**: Verified build rendering and regenerated mirrored PDF via Playwright.

### 2026-01-09: Fixed Sovereign AI PDF Download & Improved Workflow
- **Issue**: Expanded 20-page Sovereign AI PDF was in `whitepapers/pdf/` but the website served an older version from `public/whitepapers/pdf/`.
- **Fix**: Synchronized the expanded PDF to the `public` directory.
- **Workflow Improvement**: Updated `scripts/generate-pdf.ts` to automatically mirror generated PDFs to `public/whitepapers/pdf/`.
- **Documentation**: Updated `.agent/workflows/regenerate-whitepaper-pdf.md`.

### 2026-01-09: Expanded Disconnected Pipeline Whitepaper
- **File Modified**: `whitepapers/markdown/02_The Disconnected Pipeline.md`
- **Change Summary**: Expanded whitepaper from ~5 pages (303 lines) to ~15 pages (577 lines, 28KB)
- **New Sections Added**:
  - Strategic Context: "The Connected Assumption" & Sovereign Imperative
  - Dependency Ecosystem Deep-Dive: Python, NPM, Containers, Models
  - Nexus Configuration Deep Dive: `nexus.properties` & Storage Sizing
  - Advanced Containerization with Apptainer (SIF, multi-node scaling)
  - New Case Studies: "Air-Gapped Manufacturing" and "HIPAA Research Hospital"
  - Automated Ingest Script: Python "Bundle Builder"
  - Operational Runbooks & Troubleshooting Guide
  - Appendices: Glossary, CLI Quick Ref, Air-Gap Policy Template

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
