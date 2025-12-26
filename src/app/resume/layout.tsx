import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume | Dustin J. Ober - AI Developer & Technical ISD",
    description:
        "Professional resume of Dustin J. Ober showcasing experience in AI development, NLP, machine learning, and technical instructional design for defense and intelligence sectors.",
    keywords: [
        "Dustin Ober resume",
        "AI developer resume",
        "NLP engineer",
        "instructional systems designer",
        "defense contractor AI",
        "Leidos developer",
        "PMP certified",
        "TensorFlow developer",
    ],
    openGraph: {
        title: "Resume | Dustin J. Ober - AI Developer & Technical ISD",
        description:
            "Professional resume showcasing AI development, NLP, and technical instructional design expertise.",
        url: "https://aiober.com/resume",
        type: "profile",
    },
    alternates: {
        canonical: "https://aiober.com/resume",
    },
};

export default function ResumeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
