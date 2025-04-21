"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    id: 1,
    company: "Uinfo Technology Pvt. Ltd.",
    role: "Software Engineer",
    period: "August 2022 – Present",
    description:
      "Leading the frontend development team in building websites and applications using React and Next.js.",
    achievements: [
      "Implemented a component library that reduced development time by 40%",
      "Optimized application performance, improving load times by 60%",
      "Mentored junior developers and established coding standards",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Redux", "Tailwind CSS"],
  },
];

export default function Experience() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is in view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="experience" className="bg-muted/30 py-20" ref={sectionRef}>
      <div className="px-4 md:px-6 container">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="mb-4 font-bold text-3xl tracking-tighter">
            Experience
          </h2>
          <p className="text-muted-foreground">My professional journey</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="relative pl-8 border-muted-foreground/20 border-l"
            >
              <div className="top-6 -left-[9px] absolute bg-primary border-4 border-background rounded-full w-4 h-4"></div>
              <Card className="mb-10">
                <CardHeader>
                  <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-2">
                    <CardTitle>{experience.role}</CardTitle>
                    <Badge variant="outline">{experience.period}</Badge>
                  </div>
                  <CardDescription>{experience.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {experience.description}
                  </p>
                  <ul className="space-y-2 mt-4 pl-5 text-muted-foreground list-disc">
                    {experience.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <strong>Technologies:</strong>
                    <ul className="space-x-2 mt-2">
                      {experience.technologies.map((tech, index) => (
                        <li key={index} className="inline-block">
                          <Badge variant="outline">{tech}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
