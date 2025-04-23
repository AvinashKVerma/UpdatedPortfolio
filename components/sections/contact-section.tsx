"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Button,
  addToast,
} from "@heroui/react";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      addToast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="contact" className="bg-muted/30 py-20" ref={sectionRef}>
      <div className="px-4 md:px-6 container">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="mb-4 font-bold text-3xl tracking-tighter">
            Contact Me
          </h2>
          <p className="text-muted-foreground">
            Get in touch for opportunities or just to say hello
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="gap-8 grid grid-cols-1 md:grid-cols-2 mx-auto max-w-4xl"
        >
          {/* Message Form */}
          <Card className="w-full">
            <CardHeader className="flex-col items-start gap-1">
              <h4 className="font-semibold text-default-600 text-lg">
                Send a Message
              </h4>
              <p className="text-default-400 text-sm">
                Fill out the form below to get in touch with me.
              </p>
            </CardHeader>
            <CardBody className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <Input
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Textarea
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                />
                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  isDisabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardBody>
          </Card>

          {/* Contact Details */}
          <Card className="w-full">
            <CardHeader className="flex-col items-start gap-1">
              <h4 className="font-semibold text-default-600 text-lg">
                Contact Information
              </h4>
              <p className="text-default-400 text-sm">
                Here's how you can reach me directly.
              </p>
            </CardHeader>
            <CardBody className="space-y-6">
              <div className="flex items-start gap-4">
                <MdLocationOn className="text-default-400 text-2xl" />
                <div>
                  <p className="font-semibold text-default-600">Location</p>
                  <p className="text-default-400">Ranchi, Jharkhand</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MdEmail className="text-default-400 text-2xl" />
                <div>
                  <p className="font-semibold text-default-600">Email</p>
                  <p className="text-default-400">avinashverma078@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MdPhone className="text-default-400 text-2xl" />
                <div>
                  <p className="font-semibold text-default-600">Phone</p>
                  <p className="text-default-400">+91 82104 88328</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
