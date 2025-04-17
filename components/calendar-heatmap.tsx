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

export function CalendarHeatmap({ data, year }: CalendarHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

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

  // Calculate which month to show above which column
  const monthLabels: { month: number; weekIndex: number }[] = [];
  let currentMonth = -1;

  data.weeks.forEach((week, weekIndex) => {
    const firstDayOfWeek = week.days[0];
    if (firstDayOfWeek) {
      const date = new Date(firstDayOfWeek.date);
      const month = date.getMonth();

      if (month !== currentMonth) {
        monthLabels.push({
          month,
          weekIndex,
        });
        currentMonth = month;
      }
    }
  });

  return (
    <div className="pb-4 overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="flex mb-2">
          <div className="flex flex-1">
            {monthLabels.map(({ month, weekIndex }) => (
              <div
                key={month}
                className="text-muted-foreground text-xs"
                style={{
                  position: "absolute",
                  left: `${weekIndex * 16 + 40}px`,
                }}
              >
                {months[month]}
              </div>
            ))}
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-col justify-around w-8 text-muted-foreground text-xs">
            <div>Mon</div>
            <div>Wed</div>
            <div>Fri</div>
          </div>

          <div className="flex-1">
            <div className="gap-1 grid grid-flow-col">
              {data.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="gap-1 grid grid-rows-7">
                  {week.days.map((day, dayIndex) => (
                    <TooltipProvider key={dayIndex} delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="rounded-sm hover:ring-2 hover:ring-primary/50 hover:ring-offset-1 w-3 h-3 hover:scale-125 transition-all duration-200"
                            style={{ backgroundColor: day.color }}
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
                    </TooltipProvider>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-2 mt-4">
          <span className="text-muted-foreground text-xs">Less</span>
          <div className="flex gap-1">
            {["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"].map(
              (color) => (
                <div
                  key={color}
                  className="rounded-sm w-3 h-3"
                  style={{ backgroundColor: color }}
                />
              )
            )}
          </div>
          <span className="text-muted-foreground text-xs">More</span>
        </div>

        <div className="mt-4 text-sm">
          <strong>{data.totalContributions}</strong> contributions in {year}
        </div>
      </div>
    </div>
  );
}
