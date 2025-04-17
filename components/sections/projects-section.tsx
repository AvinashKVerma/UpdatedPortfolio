"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform with product listings, cart functionality, and payment integration.",
    image: "/placeholder.svg",
    tags: ["Next.js", "React", "Tailwind CSS", "Stripe", "MongoDB"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/example/repo",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: "/placeholder.svg",
    tags: ["React", "Redux", "Node.js", "Socket.io", "PostgreSQL"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/example/repo",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current and forecasted weather data from multiple sources.",
    image: "/placeholder.svg",
    tags: ["React", "Chart.js", "Weather API", "Geolocation"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/example/repo",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A responsive portfolio website showcasing projects and skills with dark/light mode support.",
    image: "/placeholder.svg",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/example/repo",
  },
  {
    id: 5,
    title: "Recipe Sharing Platform",
    description: "A platform for users to share, discover, and save recipes with social features.",
    image: "/placeholder.svg",
    tags: ["React", "Firebase", "Cloud Functions", "Authentication"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/example/repo",
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description: "A fitness tracking application that allows users to log workouts and track progress over time.",
    image: "/placeholder.svg",
    tags: ["React Native", "Redux", "Express", "MongoDB"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/example/repo",
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
            >
              <Card className="h-full flex flex-col overflow-hidden">
                <div className="relative h-48">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
