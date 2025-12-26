import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Dustin J. Ober",
    description:
        "Get in touch with Dustin J. Ober for AI development, instructional design projects, or speaking engagements. Professional inquiries welcome.",
    keywords: [
        "contact Dustin Ober",
        "AI developer contact",
        "instructional design consultant",
        "hire AI developer",
        "technical consultant Virginia",
    ],
    openGraph: {
        title: "Contact | Dustin J. Ober",
        description:
            "Get in touch with Dustin J. Ober for AI development, instructional design projects, or speaking engagements.",
        url: "https://aiober.com/contact",
        type: "website",
    },
    alternates: {
        canonical: "https://aiober.com/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
