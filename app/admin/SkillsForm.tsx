import {
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@heroui/react";
import { useState } from "react";

export default function SkillsForm() {
  const [skillData, setSkillData] = useState({
    skillName: "",
    skillCategory: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSkillData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Skill:", skillData);
    // Add toast or actual save logic here
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-start gap-1">
        <div className="font-semibold text-2xl leading-none tracking-tight">
          Skills
        </div>
        <div className="text-muted-foreground text-sm">
          Add or remove skills from your portfolio
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-2">
          <Input
            name="skillName"
            value={skillData.skillName}
            onChange={handleChange}
            label="Skill Name"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Enter skill name"
          />
          <Input
            name="skillCategory"
            value={skillData.skillCategory}
            onChange={handleChange}
            label="Category"
            labelPlacement="outside"
            variant="bordered"
            placeholder="frontend, backend, etc."
          />
        </div>
      </CardBody>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="bordered">Cancel</Button>
        <Button onPress={handleSave}>Save Skill</Button>
      </CardFooter>
    </Card>
  );
}
