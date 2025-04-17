"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface YearSelectorProps {
  years: number[];
  selectedYear: number;
  onChange: (year: number) => void;
}

export function YearSelector({
  years,
  selectedYear,
  onChange,
}: YearSelectorProps) {
  return (
    <div className="flex items-center">
      <Select
        value={selectedYear.toString()}
        onValueChange={(value) => onChange(Number.parseInt(value))}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
