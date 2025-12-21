import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://dustinober1.github.io'),
  title: {
    default: "Dustin J. Ober | AI Developer & Technical Instructional Designer",
    template: "%s | Dustin J. Ober",
  },
  description: "Portfolio of Dustin J. Ober, an AI Developer and Technical Instructional Systems Designer specialized in NLP, LLMs, and Educational Technology.",
  keywords: ["AI Developer", "Instructional Design", "Machine Learning", "NLP", "Leidos", "PMP", "Data Science", "Dustin Ober"],
  authors: [{ name: "Dustin J. Ober" }],
  creator: "Dustin J. Ober",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dustinober1.github.io/",
    siteName: "Dustin J. Ober Portfolio",
    title: "Dustin J. Ober | AI Developer & Technical Instructional Designer",
    description: "Portfolio of Dustin J. Ober, an AI Developer and Technical Instructional Systems Designer specialized in NLP, LLMs, and Educational Technology.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dustin J. Ober | AI Developer & Technical Instructional Designer",
    description: "Portfolio of Dustin J. Ober, an AI Developer and Technical Instructional Systems Designer specialized in NLP, LLMs, and Educational Technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Dustin J. Ober",
              "jobTitle": "AI Developer & Technical Instructional Designer",
              "url": "https://dustinober1.github.io/",
              "sameAs": [
                "https://www.linkedin.com/in/dober1/"
              ],
              "knowsAbout": ["AI Development", "Instructional Design", "Data Science", "Project Management"]
            })
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
