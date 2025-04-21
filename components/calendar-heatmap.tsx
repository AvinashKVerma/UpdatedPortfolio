"use client";

import { useState } from "react";
import { Tooltip, Select, SelectItem } from "@heroui/react";
import type { Selection } from "@heroui/react";

interface ContributionDay {
  date: string;
  count: number;
  color: string;
}

interface Week {
  days: ContributionDay[];
}

interface CalendarHeatmapProps {
  data: {
    weeks: Week[];
    totalContributions: number;
  };
  selectedYear: Selection;
  setSelectedYear: React.Dispatch<React.SetStateAction<Selection>>;
  colorScheme: Selection;
  setColorScheme: React.Dispatch<React.SetStateAction<Selection>>;
}

// Color themes
const colorThemes: Record<string, string[]> = {
  Green: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  Blue: ["#ebedf0", "#c6e6ff", "#86c5f4", "#4a90e2", "#0050b3"],
  Purple: ["#ebedf0", "#e0c3fc", "#c084fc", "#a855f7", "#6b21a8"],
  Red: ["#ebedf0", "#fca5a5", "#f87171", "#ef4444", "#b91c1c"],
  Orange: ["#ebedf0", "#fed7aa", "#fdba74", "#fb923c", "#c2410c"],
  Yellow: ["#ebedf0", "#fef9c3", "#fde68a", "#facc15", "#ca8a04"],
  Teal: ["#ebedf0", "#b2f5ea", "#81e6d9", "#38b2ac", "#234e52"],
  Pink: ["#ebedf0", "#fbcfe8", "#f9a8d4", "#ec4899", "#9d174d"],
  Gray: ["#f3f4f6", "#d1d5db", "#9ca3af", "#6b7280", "#374151"],
  Indigo: ["#ebedf0", "#dbeafe", "#a5b4fc", "#6366f1", "#312e81"],
  Sky: ["#ebedf0", "#bae6fd", "#7dd3fc", "#38bdf8", "#0c4a6e"],
  Lime: ["#ecfccb", "#d9f99d", "#bef264", "#84cc16", "#4d7c0f"],
  Cyan: ["#ecfeff", "#a5f3fc", "#22d3ee", "#06b6d4", "#164e63"],
  Amber: ["#fff7ed", "#fde68a", "#fbbf24", "#f59e0b", "#78350f"],
  Rose: ["#fff1f2", "#fda4af", "#fb7185", "#f43f5e", "#881337"],
  Emerald: ["#ecfdf5", "#a7f3d0", "#34d399", "#10b981", "#065f46"],
};

export function CalendarHeatmap({
  data,
  selectedYear,
  setSelectedYear,
  colorScheme,
  setColorScheme,
}: CalendarHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  if (!data || !data.weeks) {
    return <div>No contribution data available</div>;
  }

  const currentScheme = Array.from(colorScheme)[0] as string;
  const themeColors = colorThemes[currentScheme];

  const getColor = (count: number): string => {
    if (count === 0) return themeColors[0];
    if (count <= 2) return themeColors[1];
    if (count <= 5) return themeColors[2];
    if (count <= 9) return themeColors[3];
    return themeColors[4];
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthLabels: { month: number; weekIndex: number }[] = [];
  let currentMonth = -1;

  data.weeks.forEach((week, weekIndex) => {
    const firstDay = week.days[0];
    if (firstDay) {
      const date = new Date(firstDay.date);
      const month = date.getMonth();
      if (month !== currentMonth) {
        monthLabels.push({ month, weekIndex });
        currentMonth = month;
      }
    }
  });

  const currentYear = new Date().getFullYear();
  const availableYears = Array.from({ length: 6 }, (_, i) =>
    String(currentYear - i)
  );

  return (
    <div className="relative flex flex-col gap-3 md:gap-6 min-w-full">
      {/* Year and Theme Selectors */}
      <div className="flex flex-wrap justify-end items-center gap-4 px-1">
        <Select
          className="w-[120px]"
          label="Year"
          variant="bordered"
          labelPlacement="outside"
          selectedKeys={selectedYear}
          onSelectionChange={setSelectedYear}
        >
          {availableYears.map((year) => (
            <SelectItem key={year}>{year}</SelectItem>
          ))}
        </Select>
        <div className="flex w-full sm:w-[200px]">
          <Select
            className="w-full"
            label="Color Theme"
            labelPlacement="outside"
            placeholder="Select Theme"
            variant="bordered"
            selectedKeys={colorScheme}
            onSelectionChange={(keys) => setColorScheme(keys as Set<string>)}
          >
            {Object.keys(colorThemes).map((theme) => (
              <SelectItem key={theme}>{theme}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Month Labels */}
      <div className="overflow-x-scroll">
        <div className="p-4 w-fit">
          <div className="relative flex justify-between px-10 w-auto">
            {monthLabels.map(({ month }) => (
              <div
                key={month}
                className="text-muted-foreground text-xs text-center"
              >
                {months[month]}
              </div>
            ))}
          </div>

          {/* Heatmap */}
          <div className="flex">
            {/* Weekday Labels */}
            <div className="flex flex-col justify-around w-8 h-[88px] text-muted-foreground text-xs">
              <div>Mon</div>
              <div>Wed</div>
              <div>Fri</div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1">
              <div className="gap-1 grid grid-flow-col">
                {data.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="gap-1 grid grid-rows-7">
                    {week.days.map((day, dayIndex) => (
                      <Tooltip
                        key={dayIndex}
                        content={
                          <div className="text-xs">
                            <div className="font-medium">
                              {new Date(day.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                            <div>
                              {day.count} contribution
                              {day.count !== 1 ? "s" : ""}
                            </div>
                          </div>
                        }
                      >
                        <div
                          className="rounded-sm hover:ring-2 hover:ring-primary/50 hover:ring-offset-1 w-3 h-3 hover:scale-125 transition-transform"
                          style={{ backgroundColor: getColor(day.count) }}
                          onMouseEnter={() => setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                        />
                      </Tooltip>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-between items-center gap-2 mt-4">
        <div className="text-sm">
          <strong>{data.totalContributions}</strong> contributions in{" "}
          {selectedYear}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">Less</span>
          <div className="flex gap-1">
            {themeColors.map((color) => (
              <div
                key={color}
                className="rounded-sm w-3 h-3"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="text-muted-foreground text-xs">More</span>
        </div>
      </div>
    </div>
  );
}
