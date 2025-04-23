"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("projects");

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen container">
        <div className="flex flex-col items-center gap-4">
          <div className="border-4 border-t-accent rounded-full w-12 h-12 animate-spin" />
          <p className="font-medium text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 container">
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="font-bold text-3xl">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your portfolio content</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm">
            Signed in as:{" "}
            <span className="font-medium">{session?.user?.email}</span>
          </p>
        </div>
      </div>

      <Tabs
        aria-label="Admin Tabs"
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(String(key))}
        classNames={{ base: "w-full", tabList: "w-full" }}
      >
        <Tab key="projects" title="Projects">
          <ProjectsForm />
        </Tab>

        <Tab key="skills" title="Skills">
          <SkillsForm />
        </Tab>

        <Tab key="experience" title="Experience">
          <ExperienceForm />
        </Tab>

        <Tab key="education" title="Education">
          <EducationForm />
        </Tab>
      </Tabs>
    </div>
  );
}
