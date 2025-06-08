import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Textarea,
} from "@heroui/react";
import * as React from "react";

const ProjectsForm: React.FC = () => {
  const [formData, setFormData] = React.useState({
    projectTitle: "",
    projectImage: "",
    projectDescription: "",
    projectTags: "",
    projectDemo: "",
    projectRepo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();
      if (json.success) {
        addToast({
          title: "Project saved",
          description: "Your project was successfully added.",
        });
      } else {
        console.error(json.error);
      }
    } catch (err) {
      console.error("Failed to save project", err);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-center gap-1">
        <div className="font-semibold text-2xl leading-none tracking-tight">
          Projects
        </div>
        <div className="text-muted-foreground text-sm">
          Add, edit, or remove projects from your portfolio
        </div>
      </CardHeader>
      <Divider />

      <CardBody>
        <div className="flex flex-col gap-2">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <Input
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              label="Project Title"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Enter project title"
            />
            <Input
              name="projectImage"
              value={formData.projectImage}
              onChange={handleChange}
              label="Project Image URL"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Enter image URL"
            />
          </div>
          <Textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            label="Description"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Enter project description"
          />
          <Input
            name="projectTags"
            value={formData.projectTags}
            onChange={handleChange}
            label="Tags (comma separated)"
            labelPlacement="outside"
            variant="bordered"
            placeholder="React, Next.js, Tailwind CSS"
          />
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <Input
              name="projectDemo"
              value={formData.projectDemo}
              onChange={handleChange}
              label="Demo URL"
              labelPlacement="outside"
              variant="bordered"
              placeholder="https://example.com"
            />
            <Input
              name="projectRepo"
              value={formData.projectRepo}
              onChange={handleChange}
              label="Repository URL"
              labelPlacement="outside"
              variant="bordered"
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>
      </CardBody>

      <CardFooter className="flex justify-end gap-2">
        <Button
          className="rounded-full h-7"
          color="success"
          variant="bordered"
          onPress={handleSave}
        >
          Save Project
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectsForm;
