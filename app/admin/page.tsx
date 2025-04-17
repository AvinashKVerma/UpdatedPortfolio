"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("projects")

  // If the user is not authenticated, redirect to the sign-in page
  if (status === "unauthenticated") {
    redirect("/auth/signin")
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-t-accent animate-spin" />
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    })
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your portfolio content</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm">
            Signed in as: <span className="font-medium">{session?.user?.email}</span>
          </p>
        </div>
      </div>

      <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Add, edit, or remove projects from your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="project-title" className="text-sm font-medium">
                      Project Title
                    </label>
                    <Input id="project-title" placeholder="Enter project title" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="project-image" className="text-sm font-medium">
                      Project Image URL
                    </label>
                    <Input id="project-image" placeholder="Enter image URL" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="project-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea id="project-description" placeholder="Enter project description" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="project-tags" className="text-sm font-medium">
                    Tags (comma separated)
                  </label>
                  <Input id="project-tags" placeholder="React, Next.js, Tailwind CSS" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="project-demo" className="text-sm font-medium">
                      Demo URL
                    </label>
                    <Input id="project-demo" placeholder="https://example.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="project-repo" className="text-sm font-medium">
                      Repository URL
                    </label>
                    <Input id="project-repo" placeholder="https://github.com/username/repo" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSave}>Save Project</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Add or remove skills from your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="skill-name" className="text-sm font-medium">
                    Skill Name
                  </label>
                  <Input id="skill-name" placeholder="Enter skill name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="skill-category" className="text-sm font-medium">
                    Category
                  </label>
                  <Input id="skill-category" placeholder="frontend, backend, etc." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSave}>Save Skill</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
              <CardDescription>Add or edit your work experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="company-name" className="text-sm font-medium">
                      Company Name
                    </label>
                    <Input id="company-name" placeholder="Enter company name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="job-title" className="text-sm font-medium">
                      Job Title
                    </label>
                    <Input id="job-title" placeholder="Enter job title" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="start-date" className="text-sm font-medium">
                      Start Date
                    </label>
                    <Input id="start-date" placeholder="MM/YYYY" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="end-date" className="text-sm font-medium">
                      End Date
                    </label>
                    <Input id="end-date" placeholder="MM/YYYY or Present" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="job-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea id="job-description" placeholder="Enter job description" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="achievements" className="text-sm font-medium">
                    Achievements (one per line)
                  </label>
                  <Textarea id="achievements" placeholder="Enter achievements" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="technologies" className="text-sm font-medium">
                    Technologies (comma separated)
                  </label>
                  <Input id="technologies" placeholder="React, Next.js, Tailwind CSS" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSave}>Save Experience</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>Add or edit your educational background</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="institution" className="text-sm font-medium">
                      Institution
                    </label>
                    <Input id="institution" placeholder="Enter institution name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="degree" className="text-sm font-medium">
                      Degree
                    </label>
                    <Input id="degree" placeholder="Enter degree" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="field" className="text-sm font-medium">
                      Field of Study
                    </label>
                    <Input id="field" placeholder="Enter field of study" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edu-period" className="text-sm font-medium">
                      Period
                    </label>
                    <Input id="edu-period" placeholder="2015 - 2019" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="edu-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea id="edu-description" placeholder="Enter description" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edu-achievements" className="text-sm font-medium">
                    Achievements (one per line)
                  </label>
                  <Textarea id="edu-achievements" placeholder="Enter achievements" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSave}>Save Education</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
