"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const techSkills = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "Material UI",
  "Next UI",
  "Redux",
  "Context API",
  "NextAuth",
  "Google Auth",
  "Node.js",
  "Serverless Deployment",
  "AWS (Amplify, EC2)",
  "CI/CD",
  "Figma",
  "Git",
  "GitHub",
  "HTML",
  "CSS",
  "JavaScript",
  "UI/UX",
];

const aiSkills = ["ChatGPT", "V0.dev", "DeepSeek", "openui.fly.dev"];

export default function SkillsSection() {
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
          {[
            {
              title: "Frontend Development",
              description:
                "Responsive and user-focused UIs using React, Next.js, Tailwind CSS, and design systems.",
            },
            {
              title: "State & Authentication",
              description:
                "State management and secure access control with Redux, Context API, NextAuth, and Google Auth.",
            },
            {
              title: "DevOps & Deployment",
              description:
                "CI/CD, GitHub, AWS Amplify & EC2, and serverless deployment for scalable systems.",
            },
            {
              title: "Design & Collaboration",
              description:
                "Design tools like Figma and UI/UX expertise to build beautiful and intuitive interfaces.",
            },
          ].map((block, i) => (
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
                className="bg-primary px-4 py-2 font-medium text-white text-sm md:text-base"
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
