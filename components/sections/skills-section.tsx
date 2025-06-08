"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export default function SkillsSection() {
  const [techSkills, setTechSkills] = useState<string[]>([]);
  const [aiSkills, setAiSkills] = useState<string[]>([]);
  // Categories loaded from API
  const [skillCategories, setSkillCategories] = useState<
    { title: string; description: string }[]
  >([]);

  useEffect(() => {
    async function fetchSkillsAndCategories() {
      try {
        // Fetch tech and AI skills
        const skillsRes = await fetch("/api/skills");
        const skillsData: { name: string; type: "tech" | "ai" }[] =
          await skillsRes.json();

        setTechSkills(
          skillsData.filter((s) => s.type === "tech").map((s) => s.name)
        );
        setAiSkills(
          skillsData.filter((s) => s.type === "ai").map((s) => s.name)
        );

        // Fetch categories
        const categoriesRes = await fetch("/api/categories");
        const categoriesData: { title: string; description: string }[] =
          await categoriesRes.json();
        setSkillCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load skills or categories", error);
      }
    }
    fetchSkillsAndCategories();
  }, []);

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="px-4 md:px-6 container">
        {/* Section Heading */}
        <motion.h2
          className="mb-8 text-center section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills & Technologies
        </motion.h2>

        {/* Tech Skill Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {techSkills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 * (index % 10) }}
            >
              <Badge
                variant="secondary"
                className="hover:bg-accent px-4 py-2 font-medium text-sm md:text-base transition-colors hover:text-accent-foreground cursor-default"
              >
                {skill}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Category Cards */}
        <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4 mt-12">
          {Array.isArray(skillCategories) &&
            skillCategories.map((block, i) => (
              <motion.div
                key={block.title}
                className="bg-card shadow-sm p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <h3 className="mb-3 font-semibold text-lg">{block.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {block.description}
                </p>
              </motion.div>
            ))}
        </div>

        {/* AI Tools Section */}
        <motion.h3
          className="mt-16 mb-6 font-semibold text-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          AI Tools & Exploration
        </motion.h3>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {aiSkills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
            >
              <Badge
                variant="default"
                className="bg-primary px-4 py-2 font-medium text-white dark:text-black text-sm md:text-base"
              >
                {skill}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
