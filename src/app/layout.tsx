import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { metadataManager, structuredDataEngine } from "@/lib/seo";

export const metadata: Metadata = metadataManager.generate();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = structuredDataEngine.generatePerson({
    name: "Dustin J. Ober",
    jobTitle: "AI Developer & Technical Instructional Designer",
    url: "https://aiober.com/",
    sameAs: [
      "https://www.linkedin.com/in/dober1/"
    ],
    knowsAbout: ["AI Development", "Instructional Design", "Data Science", "Project Management"]
  });

  const websiteSchema = structuredDataEngine.generateWebSite({
    name: "Dustin J. Ober Portfolio",
    url: "https://aiober.com",
    description: "Portfolio of Dustin J. Ober, an AI Developer and Technical Instructional Systems Designer.",
    author: "Dustin J. Ober",
  });

  const serviceSchema = structuredDataEngine.generateService({
    name: "AI Implementation Consulting",
    description: "Expert consulting services for AI implementation in defense, intelligence, and regulated industries. Specializing in sovereign AI infrastructure, NLP systems, and technical training curriculum development.",
    provider: "Dustin J. Ober",
    areaServed: "United States",
    serviceType: "AI Consulting",
  });

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, websiteSchema, serviceSchema])
          }}
        />
      </head>
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
