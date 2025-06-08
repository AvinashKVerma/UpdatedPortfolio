"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  Select,
  SelectItem,
} from "@heroui/react";
import { FaXmark } from "react-icons/fa6";

export default function SkillsForm() {
  // States for skills loaded from API
  const [techSkills, setTechSkills] = useState<string[]>([]);
  const [aiSkills, setAiSkills] = useState<string[]>([]);

  // Categories loaded from API
  const [skillCategories, setSkillCategories] = useState<
    { title: string; description: string }[]
  >([]);

  const [selectedCategory, setSelectedCategory] = useState<"tech" | "ai">(
    "tech"
  );
  const [selectedSkill, setSelectedSkill] = useState("");

  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");

  // Fetch skills and categories on mount
  useEffect(() => {
    async function fetchSkillsAndCategories() {
      try {
        // Fetch tech and AI skills
        const skillsRes = await fetch("/api/skills");
        const skillsData: { name: string; type: "tech" | "ai" }[] =
          await skillsRes.json();

        setTechSkills(
          skillsData.filter((s) => s.type === "tech").map((s) => s.name)
        );
        setAiSkills(
          skillsData.filter((s) => s.type === "ai").map((s) => s.name)
        );

        // Fetch categories
        const categoriesRes = await fetch("/api/categories");
        const categoriesData: { title: string; description: string }[] =
          await categoriesRes.json();
        setSkillCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load skills or categories", error);
      }
    }
    fetchSkillsAndCategories();
  }, []);

  // Add new skill (POST to /api/skills)
  const handleAddSkill = async () => {
    if (!selectedCategory || !selectedSkill) return;

    // Avoid duplicates in UI
    if (
      (selectedCategory === "tech" && techSkills.includes(selectedSkill)) ||
      (selectedCategory === "ai" && aiSkills.includes(selectedSkill))
    ) {
      alert("Skill already exists");
      return;
    }

    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: selectedSkill, type: selectedCategory }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Failed to add skill");
        return;
      }

      const newSkill = await res.json();
      if (newSkill.type === "tech") {
        setTechSkills((prev) => [...prev, newSkill.name]);
      } else {
        setAiSkills((prev) => [...prev, newSkill.name]);
      }

      setSelectedSkill("");
    } catch (error) {
      alert("Error adding skill");
      console.error(error);
    }
  };

  // Remove skill (DELETE from /api/skills/[name])
  const handleRemoveSkill = async (skill: string, type: "tech" | "ai") => {
    try {
      const res = await fetch(`/api/skills/${encodeURIComponent(skill)}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Failed to delete skill");
        return;
      }

      if (type === "tech") {
        setTechSkills((prev) => prev.filter((s) => s !== skill));
      } else {
        setAiSkills((prev) => prev.filter((s) => s !== skill));
      }
    } catch (error) {
      alert("Error deleting skill");
      console.error(error);
    }
  };

  // Add new category (POST to /api/categories)
  const addCategory = async () => {
    if (!newCategoryTitle.trim() || !newCategoryDescription.trim()) return;

    if (skillCategories.find((cat) => cat.title === newCategoryTitle.trim())) {
      alert("Category title already exists");
      return;
    }

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newCategoryTitle.trim(),
          description: newCategoryDescription.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Failed to add category");
        return;
      }

      const newCategory = await res.json();
      setSkillCategories((prev) => [...prev, newCategory]);
      setNewCategoryTitle("");
      setNewCategoryDescription("");
    } catch (error) {
      alert("Error adding category");
      console.error(error);
    }
  };

  // Remove category (DELETE from /api/categories/[title])
  const removeCategory = async (title: string) => {
    try {
      const res = await fetch(`/api/categories/${encodeURIComponent(title)}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Failed to delete category");
        return;
      }

      setSkillCategories((prev) => prev.filter((c) => c.title !== title));
    } catch (error) {
      alert("Error deleting category");
      console.error(error);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-col items-start gap-1">
        <h2 className="font-bold text-2xl">🧠 Skills Management</h2>
        <p className="text-muted-foreground text-sm">
          Add, edit, or remove skills and categories.
        </p>
      </CardHeader>

      <CardBody className="space-y-6">
        {/* Add Skills Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-end gap-4">
            <Select
              label="Skill Type"
              labelPlacement="outside"
              variant="bordered"
              selectedKeys={[selectedCategory]}
              onChange={(e) => {
                setSelectedCategory(e.target.value as "tech" | "ai");
                setSelectedSkill("");
              }}
              className="min-w-[180px]"
            >
              <SelectItem key="tech">Tech Skill</SelectItem>
              <SelectItem key="ai">AI Skill</SelectItem>
            </Select>

            <Input
              label="Select Skill"
              labelPlacement="outside"
              variant="bordered"
              value={selectedSkill}
              onValueChange={setSelectedSkill}
              className="min-w-[200px]"
              isDisabled={!selectedCategory}
            />

            <Button
              variant="solid"
              color="primary"
              onPress={handleAddSkill}
              isDisabled={!selectedSkill}
            >
              Add Skill
            </Button>
          </div>

          {/* Skill Badges */}
          <div className="flex flex-wrap gap-2">
            {(selectedCategory === "tech" ? techSkills : aiSkills).map(
              (skill) => (
                <Button
                  key={skill}
                  variant="bordered"
                  className="px-2 rounded-full h-7"
                  endContent={
                    <div
                      className="px-0 cursor-pointer"
                      onClick={() => handleRemoveSkill(skill, selectedCategory)}
                    >
                      <FaXmark className="w-3 h-3 hover:text-red-500" />
                    </div>
                  }
                >
                  <span>{skill}</span>
                </Button>
              )
            )}
          </div>
        </div>

        {/* Manage Categories */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-xl">📂 Skill Categories</h3>
          {skillCategories.map(({ title, description }) => (
            <div
              key={title}
              className="flex justify-between items-center space-y-4 bg-muted mb-6 p-2 border rounded-lg"
            >
              <div>
                <p className="font-medium text-lg">{title}</p>
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>
              <Button
                variant="ghost"
                color="danger"
                size="sm"
                className="rounded-full h-7"
                onPress={() => removeCategory(title)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Input
            label="Category Title"
            variant="bordered"
            labelPlacement="outside"
            value={newCategoryTitle}
            onChange={(e) => setNewCategoryTitle(e.target.value)}
            className="mb-4"
          />
          <Textarea
            label="Category Description"
            variant="bordered"
            labelPlacement="outside"
            value={newCategoryDescription}
            onChange={(e) => setNewCategoryDescription(e.target.value)}
            className="mb-4"
          />
          <Button
            variant="solid"
            onPress={addCategory}
            isDisabled={!newCategoryTitle || !newCategoryDescription}
          >
            Add Category
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
