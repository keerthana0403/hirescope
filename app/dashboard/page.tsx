import { prisma } from "@/lib/db";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import AddApplicationDialog from "@/components/dashboard/add-application-dialog";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Briefcase, Activity, Handshake, Trophy } from "lucide-react";

import { auth } from "@/lib/auth";

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

  const totalApplications = applications.length;

  const activeApplications = applications.filter(
    (app) => app.status === "APPLIED" || app.status === "INTERVIEW",
  ).length;

  const interviews = applications.filter(
    (app) => app.status === "INTERVIEW",
  ).length;

  const offers = applications.filter((app) => app.status === "OFFER").length;

  return (
    <>
      <div className="flex justify-end mb-6">
        <AddApplicationDialog />
      </div>

      {applications.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Applications"
            value={totalApplications}
            icon={Briefcase}
          />

          <StatsCard
            title="Active Applications"
            value={activeApplications}
            icon={Activity}
          />

          <StatsCard title="Interviews" value={interviews} icon={Handshake} />

          <StatsCard title="Offers" value={offers} icon={Trophy} />
        </div>
      )}

      <KanbanBoard applications={applications} />
    </>
  );
}
