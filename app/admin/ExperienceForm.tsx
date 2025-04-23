import {
  Input,
  Textarea,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@heroui/react";
import { useState } from "react";

export default function ExperienceForm() {
  const [experienceData, setExperienceData] = useState({
    companyName: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
    description: "",
    achievements: "",
    technologies: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setExperienceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Experience:", experienceData);
    // Add toast or save logic here
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-start gap-1">
        <div className="font-semibold text-2xl leading-none tracking-tight">
          Experience
        </div>
        <div className="text-muted-foreground text-sm">
          Add or edit your work experience
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-2">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <Input
              name="companyName"
              value={experienceData.companyName}
              onChange={handleChange}
              label="Company Name"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Enter company name"
            />
            <Input
              name="jobTitle"
              value={experienceData.jobTitle}
              onChange={handleChange}
              label="Job Title"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Enter job title"
            />
          </div>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <Input
              name="startDate"
              value={experienceData.startDate}
              onChange={handleChange}
              label="Start Date"
              labelPlacement="outside"
              variant="bordered"
              placeholder="MM/YYYY"
            />
            <Input
              name="endDate"
              value={experienceData.endDate}
              onChange={handleChange}
              label="End Date"
              labelPlacement="outside"
              variant="bordered"
              placeholder="MM/YYYY or Present"
            />
          </div>
          <Textarea
            name="description"
            value={experienceData.description}
            onChange={handleChange}
            label="Description"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Enter job description"
          />
          <Textarea
            name="achievements"
            value={experienceData.achievements}
            onChange={handleChange}
            label="Achievements (one per line)"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Enter achievements"
          />
          <Input
            name="technologies"
            value={experienceData.technologies}
            onChange={handleChange}
            label="Technologies"
            labelPlacement="outside"
            variant="bordered"
            placeholder="React, Next.js, Tailwind CSS"
          />
        </div>
      </CardBody>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="bordered">Cancel</Button>
        <Button onPress={handleSave}>Save Experience</Button>
      </CardFooter>
    </Card>
  );
}
