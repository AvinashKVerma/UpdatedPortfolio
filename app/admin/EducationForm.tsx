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

export default function EducationForm() {
  const [education, setEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    period: "",
    description: "",
    achievements: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/education", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(education),
      });

      const result = await res.json();

      if (result.success) {
        console.log("Education saved:", result.data);
        // Optional: reset form or show toast
      } else {
        console.error("Failed:", result.error);
      }
    } catch (err) {
      console.error("Error saving education:", err);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-start gap-1">
        <div className="font-semibold text-2xl leading-none tracking-tight">
          Education
        </div>
        <div className="text-muted-foreground text-sm">
          Add or edit your educational background
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-2">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <Input
              name="institution"
              value={education.institution}
              onChange={handleChange}
              label="Institution"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Enter institution name"
            />
            <Input
              name="degree"
              value={education.degree}
              onChange={handleChange}
              label="Degree"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Enter degree"
            />
          </div>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <Input
              name="field"
              value={education.field}
              onChange={handleChange}
              label="Field of Study"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Enter field of study"
            />
            <Input
              name="period"
              value={education.period}
              onChange={handleChange}
              label="Period"
              labelPlacement="outside"
              variant="bordered"
              placeholder="2015 - 2019"
            />
          </div>
          <Textarea
            name="description"
            value={education.description}
            onChange={handleChange}
            label="Description"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Enter description"
          />
          <Textarea
            name="achievements"
            value={education.achievements}
            onChange={handleChange}
            label="Achievements (one per line)"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Enter achievements"
          />
        </div>
      </CardBody>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="bordered">Cancel</Button>
        <Button onPress={handleSave}>Save Education</Button>
      </CardFooter>
    </Card>
  );
}
