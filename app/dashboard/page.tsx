import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { getDashboardAnalytics } from "@/lib/analytics";

import { KanbanBoard } from "@/components/kanban/kanban-board";
import AddApplicationDialog from "@/components/dashboard/add-application-dialog";
import { StatsCard } from "@/components/dashboard/stats-card";

import { Briefcase, Activity, Handshake, Trophy } from "lucide-react";
import AnalyticsCard from "@/components/dashboard/analytics-card";

export default async function DashboardPage() {
  const session = await auth();

  const applications = await prisma.application.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const analytics = getDashboardAnalytics(applications);

  return (
    <>
      <div className="flex justify-end mb-6">
        <AddApplicationDialog />
      </div>

      {applications.length > 0 && (
        <>
          {/* Current Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Total Applications"
              value={analytics.totalApplications}
              icon={Briefcase}
            />

            <StatsCard
              title="Active Applications"
              value={analytics.activeApplications}
              icon={Activity}
            />

            <StatsCard
              title="Interviews"
              value={analytics.interviews}
              icon={Handshake}
            />

            <StatsCard title="Offers" value={analytics.offers} icon={Trophy} />
          </div>

          {/* Analytics Section */}
          <AnalyticsCard analytics={analytics} />
        </>
      )}

      <KanbanBoard applications={applications} />
    </>
  );
}
