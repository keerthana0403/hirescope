import { prisma } from "@/lib/db";
import { ApplicationForm } from "@/components/application-form";

export default async function DashboardPage() {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-6">
      <ApplicationForm />

      {applications.map((app) => (
        <div key={app.id} className="border p-3 rounded">
          <h3>{app.company}</h3>
          <p>{app.role}</p>
          <p>{app.status}</p>
        </div>
      ))}
    </div>
  );
}
