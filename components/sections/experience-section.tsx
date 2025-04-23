"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardBody, CardFooter, Badge } from "@heroui/react";

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
        threshold: 0.1,
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
                <CardHeader className="flex md:flex-row flex-col justify-between items-start md:items-center gap-2">
                  <div>
                    <h4 className="font-semibold text-large">
                      {experience.role}
                    </h4>
                    <p className="text-default-500 text-small">
                      {experience.company}
                    </p>
                  </div>
                  <Badge>{experience.period}</Badge>
                </CardHeader>

                <CardBody className="space-y-4 text-default-500 text-sm">
                  <p>{experience.description}</p>

                  <div>
                    <ul className="space-y-1 list-disc list-inside">
                      {experience.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <strong className="text-default-600">Technologies: </strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {experience.technologies.map((tech, index) => (
                        <Badge key={index} variant="solid">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardBody>

                <CardFooter />
              </Card>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
