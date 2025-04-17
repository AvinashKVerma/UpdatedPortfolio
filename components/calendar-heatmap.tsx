"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  year: number;
}

// Define some color themes
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

export function CalendarHeatmap({ data, year }: CalendarHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [colorScheme, setColorScheme] = useState("Green");

  if (!data || !data.weeks) {
    return <div>No contribution data available</div>;
  }

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
    const firstDayOfWeek = week.days[0];
    if (firstDayOfWeek) {
      const date = new Date(firstDayOfWeek.date);
      const month = date.getMonth();
      if (month !== currentMonth) {
        monthLabels.push({ month, weekIndex });
        currentMonth = month;
      }
    }
  });

  // Get current theme
  const themeColors = colorThemes[colorScheme];

  // Optional: map count to theme color
  const getColor = (count: number): string => {
    if (count === 0) return themeColors[0];
    if (count >= 1 && count <= 2) return themeColors[1];
    if (count >= 3 && count <= 5) return themeColors[2];
    if (count >= 6 && count <= 9) return themeColors[3];
    return themeColors[4];
  };

  return (
    <div className="pb-4 overflow-x-auto">
      <div className="relative min-w-[800px]">
        {/* Color scheme selector */}
        <div className="flex justify-end mb-4">
          <label className="mr-2 text-muted-foreground text-sm">
            Color scheme:
          </label>
          <select
            value={colorScheme}
            onChange={(e) => setColorScheme(e.target.value)}
            className="px-2 py-1 border rounded text-sm"
          >
            {Object.keys(colorThemes).map((scheme) => (
              <option key={scheme} value={scheme}>
                {scheme}
              </option>
            ))}
          </select>
        </div>

        {/* Month labels */}
        <div className="flex mb-2 h-4">
          <div className="relative flex flex-1 justify-between px-10">
            {monthLabels.map(({ month }) => (
              <div
                key={month}
                className="text-muted-foreground text-xs text-center"
              >
                {months[month]}
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap */}
        <div className="flex">
          {/* Weekday labels */}
          <div className="flex flex-col justify-around w-8 h-[88px] text-muted-foreground text-xs">
            <div>Mon</div>
            <div>Wed</div>
            <div>Fri</div>
          </div>

          <TooltipProvider delayDuration={0}>
            <div className="flex-1">
              <div className="gap-1 grid grid-flow-col">
                {data.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="gap-1 grid grid-rows-7">
                    {week.days.map((day, dayIndex) => (
                      <Tooltip key={dayIndex}>
                        <TooltipTrigger asChild>
                          <div
                            className="rounded-sm hover:ring-2 hover:ring-primary/50 hover:ring-offset-1 w-3 h-3 hover:scale-125 transition-transform duration-200"
                            style={{ backgroundColor: getColor(day.count) }}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          <div className="font-medium">
                            {new Date(day.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="mt-1">
                            {day.count} contribution{day.count !== 1 ? "s" : ""}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </TooltipProvider>
        </div>

        {/* Legend */}
        <div className="flex justify-end items-center gap-2 mt-4">
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

        {/* Footer */}
        <div className="mt-4 text-sm">
          <strong>{data.totalContributions}</strong> contributions in {year}
        </div>
      </div>
    </div>
  );
}
