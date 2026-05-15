import { prisma } from "@/lib/db";
import { ApplicationForm } from "@/components/application-form";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default async function DashboardPage() {
  const applications = await prisma.application.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6 space-y-8">
      {/* <div>
        <h1 className="text-3xl font-bold">HireScope Dashboard</h1>

        <p className="text-muted-foreground mt-1">
          Track your job applications intelligently
        </p>
      </div> */}
      <DashboardHeader />

      <ApplicationForm />

      <KanbanBoard applications={applications} />
    </div>
  );
}
