import { Application, ApplicationStatus } from "@prisma/client";

export function getDashboardAnalytics(applications: Application[]) {
  const totalApplications = applications.length;

  const activeApplications = applications.filter(
    (app) => app.status === "APPLIED" || app.status === "INTERVIEW",
  ).length;

  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  const weeklyApplications = applications.filter(
    (app) => app.createdAt >= lastWeek,
  ).length;

  const interviewCount = applications.filter(
    (app) => app.status === ApplicationStatus.INTERVIEW,
  ).length;

  const offerCount = applications.filter(
    (app) => app.status === ApplicationStatus.OFFER,
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === ApplicationStatus.REJECTED,
  ).length;

  const responseCount = interviewCount + offerCount + rejectedCount;

  const responseRate =
    totalApplications === 0
      ? 0
      : Math.round((responseCount / totalApplications) * 100);

  const interviewRate =
    totalApplications === 0
      ? 0
      : Math.round((interviewCount / totalApplications) * 100);

  const rejectionRate =
    totalApplications === 0
      ? 0
      : Math.round((rejectedCount / totalApplications) * 100);

  const validScores = applications
    .map((app) => app.matchScore)
    .filter((score): score is number => score !== null);

  const averageMatchScore =
    validScores.length === 0
      ? 0
      : Math.round(
          validScores.reduce((sum, score) => sum + score, 0) /
            validScores.length,
        );

  const skillFrequency: Record<string, number> = {};

  applications.forEach((app) => {
    if (Array.isArray(app.missingSkills)) {
      app.missingSkills.forEach((skill) => {
        if (typeof skill === "string") {
          skillFrequency[skill] = (skillFrequency[skill] ?? 0) + 1;
        }
      });
    }
  });

  const mostMissingSkill =
    Object.entries(skillFrequency).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";

  return {
    // Overview
    totalApplications,
    activeApplications,
    interviews: interviewCount,
    offers: offerCount,

    // Analytics
    weeklyApplications,
    responseRate,
    interviewRate,
    rejectionRate,
    averageMatchScore,
    mostMissingSkill,
  };
}
