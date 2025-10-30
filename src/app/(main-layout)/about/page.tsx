import AboutHero from "./_components/hero-section/AboutHero";
import StatsSection from "./_components/stats-section/StatsSection";
import StorySection from "./_components/story-section/StorySection";
import ValuesSection from "./_components/values-section/ValuesSection";
import CTASection from "./_components/cta-section/CTASection";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <StatsSection />
      <StorySection />
      <ValuesSection />
      <CTASection />
    </main>
  );
}
