"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@heroui/react";

export default function AboutSection() {
  return (
    <section id="about" className="bg-muted/50 py-16 md:py-24">
      <div className="px-4 md:px-6 container">
        <motion.h2
          className="mb-12 font-bold text-3xl sm:text-4xl text-center section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <div className="gap-8 md:gap-12 grid grid-cols-1 md:grid-cols-2">
          {/* Professional Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="max-w-full">
              <CardHeader className="justify-start gap-4">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src="/profile3.png"
                  alt="Avinash Verma"
                />
                <div className="flex flex-col justify-center gap-1">
                  <h4 className="font-semibold text-default-600 text-base">
                    Avinash K R Verma
                  </h4>
                  <h5 className="text-default-400 text-sm">
                    Frontend Developer at Uinfo Technology
                  </h5>
                </div>
              </CardHeader>
              <CardBody className="px-4 pt-0 text-default-500 text-sm">
                <p className="mb-2">
                  With 2+ years of hands-on experience in React and Next.js, I
                  build performant and scalable web apps that focus on user
                  experience and maintainability.
                </p>
                <p>
                  I&apos;ve implemented CI/CD pipelines, serverless architecture
                  with AWS, and optimized state management using tools like
                  Redux and Context API.
                </p>
              </CardBody>
              <CardFooter className="px-4 pt-2 text-default-400 text-xs">
                <span>
                  Location: Ranchi, Jharkhand • Tech Stack: React, Next.js,
                  Tailwind, AWS
                </span>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Personal Interests Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="max-w-full">
              <CardHeader className="justify-start gap-4">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src="/profile3.png"
                  alt="Avinash Verma"
                />
                <div className="flex flex-col justify-center gap-1">
                  <h4 className="font-semibold text-default-600 text-base">
                    Personal Interests
                  </h4>
                  <h5 className="text-default-400 text-sm">Beyond the Code</h5>
                </div>
              </CardHeader>
              <CardBody className="px-4 pt-0 text-default-500 text-sm">
                <p className="mb-2">
                  I love mentoring juniors, exploring tools like V0.dev and
                  ChatGPT, and experimenting with design in Figma. I&apos;ve
                  organized robotics competitions and was the Technical
                  Secretary of my department.
                </p>
                <p>
                  I&apos;m also passionate about building side projects, staying
                  updated on React ecosystem trends, and continuously improving
                  my craft.
                </p>
              </CardBody>
              <CardFooter className="px-4 pt-2 text-default-400 text-xs">
                <span>Always learning • Team Player • Creative Thinker</span>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
