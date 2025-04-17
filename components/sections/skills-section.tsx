"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const skills = [
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "Tailwind CSS", category: "styling" },
  { name: "Redux", category: "state" },
  { name: "React Query", category: "data" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "MongoDB", category: "database" },
  { name: "PostgreSQL", category: "database" },
  { name: "AWS", category: "cloud" },
  { name: "Docker", category: "devops" },
  { name: "Git", category: "version-control" },
  { name: "Jest", category: "testing" },
  { name: "React Testing Library", category: "testing" },
  { name: "Cypress", category: "testing" },
  { name: "Figma", category: "design" },
  { name: "Responsive Design", category: "design" },
  { name: "Accessibility", category: "design" },
  { name: "Performance Optimization", category: "optimization" },
  { name: "SEO", category: "optimization" },
  { name: "CI/CD", category: "devops" },
  { name: "Agile/Scrum", category: "methodology" },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills & Technologies
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * (index % 10) }}
            >
              <Badge
                variant="secondary"
                className="text-sm md:text-base py-2 px-4 font-medium hover:bg-accent hover:text-accent-foreground transition-colors cursor-default"
              >
                {skill.name}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            className="bg-card rounded-lg p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-3">Frontend Development</h3>
            <p className="text-muted-foreground text-sm">
              Building responsive, accessible, and performant user interfaces with modern frameworks and best practices.
            </p>
          </motion.div>

          <motion.div
            className="bg-card rounded-lg p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-3">Backend Integration</h3>
            <p className="text-muted-foreground text-sm">
              Connecting frontend applications to APIs, databases, and services to create full-stack solutions.
            </p>
          </motion.div>

          <motion.div
            className="bg-card rounded-lg p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-3">Performance Optimization</h3>
            <p className="text-muted-foreground text-sm">
              Improving load times, rendering performance, and overall user experience through optimization techniques.
            </p>
          </motion.div>

          <motion.div
            className="bg-card rounded-lg p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-3">DevOps & Deployment</h3>
            <p className="text-muted-foreground text-sm">
              Setting up CI/CD pipelines, containerization, and deploying applications to cloud platforms.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
