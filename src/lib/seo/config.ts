import { SEOConfig } from './types';

export const defaultSEOConfig: SEOConfig = {
  title: {
    default: "Dustin J. Ober | AI Developer & Technical ISD",
    template: "%s | Dustin J. Ober",
  },
  description: "Portfolio of Dustin J. Ober, an AI Developer and Technical Instructional Systems Designer specialized in NLP, LLMs, and Educational Technology.",
  applicationName: "Dustin Ober Portfolio",
  authors: [{ name: "Dustin J. Ober", url: "https://aiober.com" }],
  generator: "Next.js",
  keywords: [
    "AI Developer",
    "Instructional Design",
    "Machine Learning",
    "NLP",
    "Leidos",
    "PMP",
    "Data Science",
    "Dustin Ober"
  ],
  referrer: 'origin-when-cross-origin',
  creator: "Dustin J. Ober",
  publisher: "Dustin J. Ober",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aiober.com/",
    siteName: "Dustin J. Ober Portfolio",
    title: "Dustin J. Ober | AI Developer & Technical Instructional Designer",
    description: "Portfolio of Dustin J. Ober, an AI Developer and Technical Instructional Systems Designer specialized in NLP, LLMs, and Educational Technology.",
    images: [
      {
        url: 'https://aiober.com/og-image.jpg', // Placeholder, needs actual image
        width: 1200,
        height: 630,
        alt: 'Dustin J. Ober - AI Developer & Technical ISD',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dustinober", // Assuming this handle, update if known
    creator: "@dustinober",
    title: "Dustin J. Ober | AI Developer & Technical Instructional Designer",
    description: "Portfolio of Dustin J. Ober, an AI Developer and Technical Instructional Systems Designer specialized in NLP, LLMs, and Educational Technology.",
    images: ['https://aiober.com/twitter-image.jpg'], // Placeholder
  },
  alternates: {
    canonical: 'https://aiober.com',
  }
};
