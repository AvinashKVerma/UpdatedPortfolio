"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Institutional Evaluation & Accreditation",
    description:
      "A secure, scalable platform for evaluating academic institutions with role-based access, reusable components, and AWS serverless deployment.",
    image: "/placeholder.svg",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "AWS",
      "Serverless",
      "Context API",
    ],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/AvinashKVerma",
  },
  {
    id: 2,
    title: "News Application",
    description:
      "A dynamic news web app with real-time updates, user auth, responsive UI, and analytics/monetization integrations.",
    image: "/placeholder.svg",
    tags: ["Next.js", "NextAuth", "Tailwind CSS", "NextUI", "Google Analytics"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/AvinashKVerma",
  },
  {
    id: 3,
    title: "Tax Collection App",
    description:
      "Civic utility management app with intuitive UI, responsive design, and integration of external libraries for interactivity.",
    image: "/placeholder.svg",
    tags: ["React", "Tailwind CSS", "Material UI", "Hooks", "Testing"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/AvinashKVerma",
  },
  {
    id: 4,
    title: "HR Management System",
    description:
      "A robust HR system with role-based functionality, payroll & attendance modules, and multi-company support.",
    image: "/placeholder.svg",
    tags: [
      "React",
      "Next.js",
      "Authentication",
      "Role-Based Access",
      "Security",
    ],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/AvinashKVerma",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-muted/50 py-16 md:py-24">
      <div className="px-4 md:px-6 container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>

        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
            >
              <Card className="flex flex-col h-full overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
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
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 w-4 h-4" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 w-4 h-4" />
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
  );
}
