import { type NextRequest, NextResponse } from "next/server";

// GitHub GraphQL API endpoint
const GITHUB_API = "https://api.github.com/graphql";

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  const year = searchParams.get("year") || new Date().getFullYear().toString();

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  // Get GitHub token from environment variables
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GitHub token is not configured" },
      { status: 500 }
    );
  }

  try {
    // Calculate date range for the requested year
    const fromDate = `${year}-01-01T00:00:00Z`;
    const toDate = `${year}-12-31T23:59:59Z`;

    // GraphQL query to fetch contributions
    const query = `
      query($username: String!, $fromDate: DateTime!, $toDate: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $fromDate, to: $toDate) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                }
              }
            }
          }
        }
      }
    `;

    // Make request to GitHub GraphQL API
    const response = await fetch(GITHUB_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username, fromDate, toDate },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    // Check for errors in the GraphQL response
    if (data.errors) {
      throw new Error(`GraphQL error: ${data.errors[0].message}`);
    }

    // Format the data for our component
    const calendarData =
      data.data.user.contributionsCollection.contributionCalendar;

    // Transform the data structure to match our component's expectations
    const formattedData = {
      totalContributions: calendarData.totalContributions,
      weeks: calendarData.weeks.map((week: any) => ({
        days: week.contributionDays.map((day: any) => ({
          date: day.date,
          count: day.contributionCount,
          color: day.color,
        })),
      })),
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch contributions",
      },
      { status: 500 }
    );
  }
}
