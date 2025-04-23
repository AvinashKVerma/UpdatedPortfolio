"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@heroui/react";

export default function Education() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
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

  const educations = [
    {
      title: "B.Tech",
      duration: "2018 - 2022",
      institute: "C.V. Raman College of Engineering",
      description:
        "Completed Bachelor of Technology with a focus on Computer Science and Engineering.",
      avatar: "/profile1.png",
    },
    {
      title: "Intermediate",
      duration: "2016 - 2018",
      institute: "DAV Public School",
      description:
        "Completed intermediate education with focus on Science and Mathematics.",
      avatar: "/profile2.png",
    },
  ];

  return (
    <section id="education" className="bg-background py-20" ref={sectionRef}>
      <div className="px-4 md:px-6 container">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="mb-4 font-bold text-3xl tracking-tighter">
            Education
          </h2>
          <p className="text-muted-foreground">My academic background</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-6 mx-auto max-w-3xl"
        >
          {educations.map((edu, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="max-w-full">
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src={edu.avatar}
                    />
                    <div className="flex flex-col justify-center items-start gap-1">
                      <h4 className="font-semibold text-default-600 text-small">
                        {edu.title}
                      </h4>
                      <h5 className="text-default-400 text-small tracking-tight">
                        {edu.institute}
                      </h5>
                    </div>
                  </div>
                  <div className="font-medium text-default-500 text-xs">
                    {edu.duration}
                  </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-default-500 text-small">
                  <p>{edu.description}</p>
                </CardBody>
                <CardFooter />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
