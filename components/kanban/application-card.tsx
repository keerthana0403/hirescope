import { Draggable } from "@hello-pangea/dnd";
import { formatDistanceToNow } from "date-fns";

import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { AnalyzeButton } from "../applications/analyze-button";
import { AnalysisDialog } from "../applications/analysis-dialog";

type ApplicationStatus = "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";

type Application = {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  createdAt: Date;

  matchScore: number | null;
  missingSkills: string[] | null;
  strengths: string[] | null;
  suggestions: string[] | null;
};

type ApplicationCardProps = {
  application: Application;
  index: number;
};

const statusStyles: Record<ApplicationStatus, string> = {
  APPLIED: "bg-blue-100 text-blue-700 border-blue-200",
  INTERVIEW: "bg-yellow-100 text-yellow-700 border-yellow-200",
  OFFER: "bg-green-100 text-green-700 border-green-200",
  REJECTED: "bg-red-100 text-red-700 border-red-200",
};

function formatStatus(status: ApplicationStatus) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function ApplicationCard({ application, index }: ApplicationCardProps) {
  return (
    <Draggable draggableId={application.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-4 hover:shadow-md transition-all cursor-grab"
        >
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">{application.company}</h3>

              <p className="text-sm text-muted-foreground">
                {application.role}
              </p>

              {application.matchScore !== null && (
                <p className="text-sm font-medium text-green-600 mt-2">
                  Match Score: {application.matchScore}%
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <Badge className={statusStyles[application.status]}>
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
              <AnalysisDialog
                company={application.company}
                role={application.role}
                matchScore={application.matchScore}
                strengths={(application.strengths as string[]) ?? []}
                missingSkills={(application.missingSkills as string[]) ?? []}
                suggestions={(application.suggestions as string[]) ?? []}
              />
            )}
          </div>
        </Card>
      )}
    </Draggable>
  );
}
