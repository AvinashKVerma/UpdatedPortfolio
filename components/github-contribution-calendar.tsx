"use client";

import { useState, useEffect } from "react";
import { CalendarHeatmap } from "./calendar-heatmap";
import { Skeleton } from "@/components/ui/skeleton";
import { YearSelector } from "./year-selector";

interface GitHubContributionCalendarProps {
  username: string;
}

export function GitHubContributionCalendar({
  username,
}: GitHubContributionCalendarProps) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [contributionData, setContributionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributions() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/github/contributions?username=${username}&year=${selectedYear}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch contributions: ${response.status}`);
        }

        const data = await response.json();
        setContributionData(data);
      } catch (err) {
        console.error("Error fetching GitHub contributions:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch contributions"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchContributions();
  }, [username, selectedYear]);

  // Get current year and 5 years back for the dropdown
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from({ length: 6 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
        <h2 className="font-semibold text-2xl">
          Contributions for <span className="text-primary">{selectedYear}</span>
        </h2>
        <YearSelector
          years={availableYears}
          selectedYear={selectedYear}
          onChange={setSelectedYear}
        />
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="rounded-lg w-full h-[120px]" />
          <div className="gap-1 grid grid-cols-7">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-4" />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="bg-destructive/10 p-6 rounded-lg text-destructive">
          <p>Error: {error}</p>
          <p className="mt-2 text-sm">
            Please check your GitHub token and try again.
          </p>
        </div>
      ) : (
        <CalendarHeatmap data={contributionData} year={selectedYear} />
      )}

      <div className="text-muted-foreground text-sm">
        <p>Showing both public and private contributions for {username}</p>
      </div>
    </div>
  );
}
