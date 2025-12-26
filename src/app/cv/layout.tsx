import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Curriculum Vitae | Dustin J. Ober - Complete Professional History",
    description:
        "Comprehensive CV of Dustin J. Ober detailing 20+ years of experience in AI development, instructional design, military service, and federal contracting with full certification portfolio.",
    keywords: [
        "Dustin Ober CV",
        "curriculum vitae",
        "AI developer experience",
        "federal contractor",
        "military veteran developer",
        "instructional designer CV",
        "security clearance professional",
        "defense AI specialist",
    ],
    openGraph: {
        title: "Curriculum Vitae | Dustin J. Ober",
        description:
            "Comprehensive CV detailing 20+ years of AI development, instructional design, and federal contracting experience.",
        url: "https://aiober.com/cv",
        type: "profile",
    },
    alternates: {
        canonical: "https://aiober.com/cv",
    },
};

export default function CVLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
