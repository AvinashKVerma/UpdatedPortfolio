"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Professional Summary</h3>
                <p className="text-muted-foreground mb-4">
                  I am a passionate Frontend Developer with 5+ years of experience specializing in React and Next.js. I
                  focus on building performant, accessible, and user-friendly web applications that solve real-world
                  problems.
                </p>
                <p className="text-muted-foreground">
                  My expertise includes modern JavaScript frameworks, responsive design, state management, and
                  integrating with various APIs and services. I'm committed to writing clean, maintainable code and
                  staying up-to-date with the latest web technologies and best practices.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Personal Interests</h3>
                <p className="text-muted-foreground mb-4">
                  Beyond coding, I enjoy contributing to open-source projects and sharing knowledge through technical
                  blog posts and community forums. I'm passionate about mentoring junior developers and participating in
                  hackathons.
                </p>
                <p className="text-muted-foreground">
                  In my free time, I enjoy hiking, photography, and exploring new technologies through side projects. I
                  believe in continuous learning and am currently exploring advanced React patterns and serverless
                  architectures.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
