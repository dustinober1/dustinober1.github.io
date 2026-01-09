# Dustin J. Ober - Professional Portfolio

A modern, professional portfolio website built with **Next.js 16** and **TypeScript**, showcasing AI/ML development expertise and technical instructional design experience.

## 🚀 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: CSS with Custom Properties (Design System)
- **Deployment**: Render (configured)
- **Fonts**: Inter (Google Fonts)
- **Icons**: Font Awesome 6

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with SEO metadata
│   │   ├── page.tsx            # Homepage
│   │   └── globals.css         # Global styles & design system
│   ├── components/             # Reusable React components
│   │   ├── Navigation.tsx      # Header with mobile menu
│   │   ├── Footer.tsx          # Footer component
│   │   ├── Hero.tsx            # Hero section
│   │   ├── SkillsSection.tsx   # Technical skills
│   │   ├── ExpertiseSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── InsightsSection.tsx
│   │   ├── EducationSummarySection.tsx
│   │   └── ContactSection.tsx
│   ├── lib/                    # Utilities (future)
│   └── data/                   # Static data (future)
├── public/                     # Static assets
│   ├── images/
│   ├── logos/
│   ├── education/
│   └── Professional_Certifications/
├── content/                    # Blog posts (future)
├── render.yaml                 # Render deployment config
└── package.json
```

## 🛠 Development

### Prerequisites
- Node.js 18+
- npm

### Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🎨 Design System

The site uses a cohesive design system with CSS custom properties:

```css
--bg-color: #0d1117;        /* Dark background */
--card-bg: rgba(22, 27, 34, 0.7);
--text-primary: #e6edf3;    /* Primary text */
--text-secondary: #8b949e;  /* Secondary text */
--accent: #2f81f7;          /* Accent blue */
--accent-hover: #58a6ff;
```

## 🌐 Deployment

The site is configured for deployment on Render. See `render.yaml` for configuration.

### Environment Variables

Set the following in your Render dashboard:
- `NODE_ENV`: production

## 📋 Project Status

This portfolio website has been successfully migrated from static HTML to Next.js with modern React components and TypeScript.

### Completed Features
- ✅ Next.js 16 with App Router and TypeScript
- ✅ Responsive navigation with mobile menu
- ✅ Modern component architecture
- ✅ SEO optimization with structured data
- ✅ Contact form functionality
- ✅ Research/whitepaper pages
- ✅ Resume and CV pages
- ✅ Professional certifications display
- ✅ Render deployment configuration

## 📝 License

© 2025 Dustin J. Ober. All rights reserved.