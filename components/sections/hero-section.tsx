"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { CiMail } from "react-icons/ci";

export default function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="px-4 md:px-6 container">
        <div className="flex md:flex-row flex-col-reverse justify-between items-center gap-10 md:gap-16">
          {/* Text Section */}
          <motion.div
            className="space-y-4 w-full md:w-1/2 md:text-left text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              Avinash K R Verma
            </h1>
            <h2 className="font-medium text-accent text-xl sm:text-2xl md:text-3xl">
              Frontend Developer (React & Next.js)
            </h2>
            <p className="mx-auto md:mx-0 max-w-xl text-muted-foreground text-base sm:text-lg">
              Building performant, scalable, and user-centric web applications
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <Button>
                <Link href="#contact">Get in touch</Link>
              </Button>
              <Button variant="bordered">
                <Link href="#projects">View projects</Link>
              </Button>
            </div>
            <div className="flex justify-center md:justify-start gap-4 pt-4">
              <Link
                href="https://github.com/AvinashKVerma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FiGithub className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/avinashkverma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaLinkedinIn className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="avinashverma078@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <CiMail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </motion.div>

          {/* Avatar Section */}
          <motion.div
            className="flex justify-center md:justify-end w-full md:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative border-4 border-accent rounded-full w-[240px] sm:w-[280px] md:w-[320px] lg:w-[400px] h-[240px] sm:h-[280px] md:h-[320px] lg:h-[400px] overflow-hidden">
              <Avatar
                className="w-full h-fit object-cover"
                src={"profile3.png"}
                alt="AV"
              />
              {/* Use <Image /> if optimization is needed */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
