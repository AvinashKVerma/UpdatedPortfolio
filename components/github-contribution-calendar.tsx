"use client";

import { useState, useEffect } from "react";
import { CalendarHeatmap } from "./calendar-heatmap";
import { motion } from "framer-motion";
import { Card, Skeleton } from "@heroui/react";
import type { Selection } from "@heroui/react";

interface GitHubContributionCalendarProps {
  username: string;
}

export function GitHubContributionCalendar({
  username,
}: GitHubContributionCalendarProps) {
  const [selectedYear, setSelectedYear] = useState<Selection>(
    new Set([new Date().getFullYear().toString()])
  );
  const [colorScheme, setColorScheme] = useState<Selection>(new Set(["Green"]));
  const [contributionData, setContributionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributions() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/github/contributions?username=${username}&year=${
            [...selectedYear][0]
          }`
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

  return (
    <section id="github-contributions" className="py-16 md:py-24">
      <div className="flex flex-col gap-4 px-4 sm:px-8 md:px-6 container">
        {/* Title and Year Selector */}
        <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
          <motion.h2
            className="font-bold text-2xl md:text-3xl text-center leading-9 md:leading-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            GitHub Contributions
          </motion.h2>
        </div>

        {/* Display Contributions or Loading/Error State */}
        {isLoading ? (
          <Card className="space-y-5 p-6 w-full" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="bg-default-300 rounded-lg w-full h-[150px]" />
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="rounded-lg w-3/5">
                <div className="bg-default-200 rounded-lg w-3/5 h-3" />
              </Skeleton>
              <Skeleton className="rounded-lg w-4/5">
                <div className="bg-default-200 rounded-lg w-4/5 h-3" />
              </Skeleton>
              <Skeleton className="rounded-lg w-2/5">
                <div className="bg-default-300 rounded-lg w-2/5 h-3" />
              </Skeleton>
            </div>
          </Card>
        ) : error ? (
          <Card className="bg-red-50 p-6 border border-red-500">
            <p className="font-semibold text-red-700 text-lg">Error: {error}</p>
            <p className="mt-2 text-red-600 text-sm">
              Please check your GitHub token and try again. You can also refresh
              the page to retry.
            </p>
            <button
              onClick={() => setIsLoading(true)}
              className="bg-red-500 hover:bg-red-600 mt-4 px-4 py-2 rounded-lg text-white"
            >
              Retry
            </button>
          </Card>
        ) : (
          <CalendarHeatmap
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            data={contributionData}
            colorScheme={colorScheme}
            setColorScheme={setColorScheme}
          />
        )}

        {/* Info about contributions */}
        <div className="text-muted-foreground text-sm md:text-left text-center">
          <p>
            Contributions include both public and private commits, pull
            requests, issues, and comments. The heatmap visually represents your
            activity across the year.
          </p>
        </div>
      </div>
    </section>
  );
}
