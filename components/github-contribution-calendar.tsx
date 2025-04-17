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
    <div className="space-y-6 px-4 sm:px-8">
      {/* Title and Year Selector */}
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
        <h2 className="font-semibold text-primary text-2xl">
          GitHub Contributions for{" "}
          <span className="text-accent">{username}</span>
        </h2>
        <div className="mt-2 sm:mt-0">
          <YearSelector
            years={availableYears}
            selectedYear={selectedYear}
            onChange={setSelectedYear}
          />
        </div>
      </div>

      {/* Display Contributions or Loading/Error State */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="rounded-lg w-full h-[150px]" />
          <div className="gap-1 grid grid-cols-7">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-4" />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-6 border border-red-500 rounded-lg text-red-700">
          <p className="font-semibold text-lg">Error: {error}</p>
          <p className="mt-2 text-sm">
            Please check your GitHub token and try again. You can also refresh
            the page to retry.
          </p>
          <button
            onClick={() => setIsLoading(true)}
            className="bg-red-500 hover:bg-red-600 mt-4 px-4 py-2 rounded-lg text-white"
          >
            Retry
          </button>
        </div>
      ) : (
        <CalendarHeatmap data={contributionData} year={selectedYear} />
      )}

      {/* Info about contributions */}
      <div className="mt-4 text-muted-foreground text-sm">
        <p>
          Contributions include both public and private commits, pull requests,
          issues, and comments. The heatmap visually represents your activity
          across the year.
        </p>
      </div>
    </div>
  );
}
