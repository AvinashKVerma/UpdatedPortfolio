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
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-2">
                  <CardTitle>B.Tech</CardTitle>
                  <Badge variant="outline">2018 - 2022</Badge>
                </div>
                <CardDescription>
                  C.V. Raman College of Engineering
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Completed Bachelor of Technology with focus on Computer
                  Science and Engineering.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-2">
                  <CardTitle>Intermediate</CardTitle>
                  <Badge variant="outline">2016 - 2018</Badge>
                </div>
                <CardDescription>DAV Public School</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Completed intermediate education with focus on Science and
                  Mathematics.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
