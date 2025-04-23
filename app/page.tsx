import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import ExperienceSection from "@/components/sections/experience-section";
import EducationSection from "@/components/sections/education-section";
import { GitHubContributionCalendar } from "@/components/github-contribution-calendar";
import Contact from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="container">
      <HeroSection />
      <AboutSection />
      <GitHubContributionCalendar username="AvinashKVerma" />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <Contact />
    </div>
  );
}
