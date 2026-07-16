import { Draggable } from "@hello-pangea/dnd";
import { formatDistanceToNow } from "date-fns";

import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { AnalyzeButton } from "../applications/analyze-button";
import { AnalysisDialog } from "../applications/analysis-dialog";
import { EmailButton } from "../applications/email-button";
import { Application, ApplicationStatus } from "@/types/application";

type ApplicationCardProps = {
  application: Application;
  index: number;
};

const statusStyles: Record<ApplicationStatus, string> = {
  APPLIED: "bg-primary/15 text-primary border-primary/30",
  INTERVIEW: "bg-chart-4/15 text-chart-4 border-chart-4/30",
  OFFER: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  REJECTED: "bg-chart-5/15 text-chart-5 border-chart-5/30",
};

function formatStatus(status: ApplicationStatus) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function ApplicationCard({ application, index }: ApplicationCardProps) {
  let progressColor: string = "text-muted-foreground";
  if (application.matchScore !== null) {
    progressColor =
      application.matchScore >= 80
        ? "text-chart-3"
        : application.matchScore >= 60
          ? "text-chart-4"
          : "text-chart-5";
  }
  return (
    <Draggable draggableId={application.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-4 border-border bg-card hover:border-primary/40 hover:shadow-[0_0_24px_-10px_var(--primary)] transition-all cursor-grab"
        >
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground">
                {application.company}
              </h3>

              <p className="text-sm text-muted-foreground">
                {application.role}
              </p>

              {application.matchScore !== null && (
                <p
                  className={`text-sm font-mono font-medium ${progressColor} mt-2`}
                >
                  Match Score: {application.matchScore}%
                </p>
              )}
            </div>
            <div className="flex items-center justify-between text-sm">
              <Badge
                variant="outline"
                className={statusStyles[application.status]}
              >
                {formatStatus(application.status)}
              </Badge>

              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(application.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            {application.matchScore === null ? (
              <AnalyzeButton applicationId={application.id} />
            ) : (
              <div className="space-y-2">
                <AnalysisDialog
                  company={application.company}
                  role={application.role}
                  matchScore={application.matchScore}
                  strengths={(application.strengths as string[]) ?? []}
                  missingSkills={(application.missingSkills as string[]) ?? []}
                  suggestions={(application.suggestions as string[]) ?? []}
                />
                <EmailButton
                  applicationId={application.id}
                  company={application.company}
                  role={application.role}
                />
              </div>
            )}
          </div>
        </Card>
      )}
    </Draggable>
  );
}
