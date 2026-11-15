import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { cacheLife } from "next/cache";

export type VisitorPoint = {
  date: string;
  desktop: number;
  mobile: number;
};

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const CLIENT_EMAIL = process.env.GA4_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, "\n");

export async function getTotalVisitors(days = 30): Promise<number | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 60 * 60 * 6, expire: 60 * 60 * 24 });

  if (!PROPERTY_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    return null;
  }

  try {
    const client = new BetaAnalyticsDataClient({
      credentials: { client_email: CLIENT_EMAIL, private_key: PRIVATE_KEY },
    });

    const [report] = await client.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: `${days - 1}daysAgo`, endDate: "today" }],
      metrics: [{ name: "activeUsers" }],
    });

    const total = report.rows?.reduce((sum, row) => {
      return sum + Number(row.metricValues?.[0]?.value ?? 0);
    }, 0);

    return total ?? 0;
  } catch (error) {
    console.error("GA4 total visitors report failed:", error);
    return null;
  }
}

export async function getVisitorSeries(
  days = 90,
): Promise<VisitorPoint[] | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 60 * 60 * 6, expire: 60 * 60 * 24 });

  if (!PROPERTY_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    return null;
  }

  try {
    const client = new BetaAnalyticsDataClient({
      credentials: { client_email: CLIENT_EMAIL, private_key: PRIVATE_KEY },
    });

    const [report] = await client.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: `${days - 1}daysAgo`, endDate: "today" }],
      dimensions: [{ name: "date" }, { name: "deviceCategory" }],
      metrics: [{ name: "activeUsers" }],
    });

    const points = new Map<string, VisitorPoint>();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().slice(0, 10);
      points.set(key, { date: key, desktop: 0, mobile: 0 });
    }

    for (const row of report.rows ?? []) {
      const rawDate = row.dimensionValues?.[0]?.value;
      const point = rawDate
        ? points.get(
            `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}`,
          )
        : undefined;
      if (!point) continue;

      const users = Number(row.metricValues?.[0]?.value ?? 0);
      // Chart has two series; tablet (and rare TV/console) count as mobile.
      if (row.dimensionValues?.[1]?.value === "desktop") {
        point.desktop += users;
      } else {
        point.mobile += users;
      }
    }

    return [...points.values()];
  } catch (error) {
    console.error("GA4 report failed:", error);
    return null;
  }
}
