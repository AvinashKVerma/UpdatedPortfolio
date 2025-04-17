"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    id: 1,
    company: "Tech Innovations Inc.",
    role: "Senior Frontend Developer",
    period: "Jan 2022 - Present",
    description:
      "Leading the frontend development team in building a next-generation SaaS platform using React and Next.js.",
    achievements: [
      "Implemented a component library that reduced development time by 40%",
      "Optimized application performance, improving load times by 60%",
      "Mentored junior developers and established coding standards",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Redux", "Tailwind CSS"],
  },
  {
    id: 2,
    company: "Digital Solutions Ltd.",
    role: "Frontend Developer",
    period: "Mar 2019 - Dec 2021",
    description:
      "Developed and maintained multiple client-facing web applications with a focus on performance and user experience.",
    achievements: [
      "Built responsive interfaces for 15+ client projects",
      "Integrated third-party APIs and services",
      "Collaborated with designers to implement pixel-perfect UIs",
    ],
    technologies: ["React", "JavaScript", "CSS3", "RESTful APIs", "Git"],
  },
  {
    id: 3,
    company: "WebCraft Studios",
    role: "Junior Web Developer",
    period: "Jun 2017 - Feb 2019",
    description: "Started as an intern and grew into a full-time role working on various web development projects.",
    achievements: [
      "Assisted in the development of company website and client projects",
      "Learned and applied modern web development practices",
      "Participated in code reviews and team meetings",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap"],
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Work Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-border transform -translate-x-1/2" />

          {/* Experience cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent transform -translate-x-1/2 mt-6" />

                {/* Date for mobile */}
                <div className="md:hidden pl-10 pb-4">
                  <Badge variant="outline" className="text-sm font-medium">
                    {exp.period}
                  </Badge>
                </div>

                {/* Content */}
                <div className="w-full md:w-[calc(50%-20px)] pl-10 md:pl-0 md:px-6">
                  <Card>
                    <CardHeader>
                      <div className="hidden md:block mb-2">
                        <Badge variant="outline" className="text-sm font-medium">
                          {exp.period}
                        </Badge>
                      </div>
                      <CardTitle>{exp.role}</CardTitle>
                      <CardDescription className="text-lg">{exp.company}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      <h4 className="font-medium mb-2">Key Achievements:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
