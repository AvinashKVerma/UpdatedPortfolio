"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap } from "lucide-react"

const education = [
  {
    id: 1,
    institution: "University of Technology",
    degree: "Master of Computer Science",
    field: "Software Engineering",
    period: "2015 - 2017",
    description: "Focused on advanced software engineering principles, distributed systems, and web technologies.",
    achievements: ["Graduated with Distinction", "Published research paper on web performance optimization"],
  },
  {
    id: 2,
    institution: "State University",
    degree: "Bachelor of Science",
    field: "Computer Science",
    period: "2011 - 2015",
    description:
      "Comprehensive program covering programming fundamentals, algorithms, data structures, and software development.",
    achievements: ["Dean's List all semesters", "Led student web development club"],
  },
]

export default function EducationSection() {
  return (
    <section id="education" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Education
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card>
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="rounded-full p-2 bg-muted">
                    <GraduationCap className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>{edu.degree}</CardTitle>
                    <CardDescription className="text-base">{edu.field}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">{edu.institution}</span>
                    <Badge variant="outline">{edu.period}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{edu.description}</p>
                  <h4 className="font-medium mb-2">Achievements:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
