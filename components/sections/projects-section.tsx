"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { Button, Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { Badge } from "@/components/ui/badge";

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
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="px-4 sm:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl"
      >
        <h2 className="mb-12 font-bold text-3xl text-center">Projects</h2>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id} className="shadow-md rounded-2xl">
              <CardHeader>
                <div className="relative h-auto">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="font-semibold text-2xl leading-none tracking-tight">
                    {project.title}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {project.description}
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} className="bg-gray-100 text-gray-800">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardBody>
              <CardFooter className="flex justify-end gap-4">
                <Button
                  variant="bordered"
                  size="sm"
                  startContent={<FiGithub className="mr-2 w-4 h-4" />}
                >
                  <Link
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code
                  </Link>
                </Button>
                <Button
                  size="sm"
                  startContent={<BsBoxArrowUpRight className="mr-2 w-4 h-4" />}
                >
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
