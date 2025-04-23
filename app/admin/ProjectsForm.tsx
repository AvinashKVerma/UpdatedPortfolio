import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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

  const handleSave = () => {
    addToast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    });
    console.log("Saved Data:", formData); // You can replace this with actual API call
  };
  return (
    <Card>
      <CardHeader className="flex flex-col items-start gap-1">
        <div className="font-semibold text-2xl leading-none tracking-tight">
          Projects
        </div>
        <div className="text-muted-foreground text-sm">
          Add, edit, or remove projects from your portfolio
        </div>
      </CardHeader>

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
        <Button variant="bordered">Cancel</Button>
        <Button onPress={handleSave}>Save Project</Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectsForm;
