import { getDashboardAnalytics } from "@/lib/analytics"; // adjust to your actual file path

export type WeeklyAnalytics = {
  weeklyApplications: number;
  responseRate: number;
  averageMatchScore: number;
  mostMissingSkill: string | null;
};

export type DashboardAnalytics = ReturnType<typeof getDashboardAnalytics>;
