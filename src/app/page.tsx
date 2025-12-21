import Link from "next/link";
import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ExperienceSection from "@/components/ExperienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InsightsSection from "@/components/InsightsSection";
import EducationSummarySection from "@/components/EducationSummarySection";

export default function Home() {
  return (
    <main>
      <Hero />
      <SkillsSection />
      <ExpertiseSection />
      <ExperienceSection />
      <TestimonialsSection />
      <InsightsSection />
      <EducationSummarySection />
    </main>
  );
}
