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
            __html: structuredDataEngine.serialize(personSchema)
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
