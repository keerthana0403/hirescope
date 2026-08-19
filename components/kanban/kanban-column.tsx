import { ApplicationCard } from "./application-card";

import { Droppable } from "@hello-pangea/dnd";
import { Badge } from "../ui/badge";
import { Application } from "@/types/application";

type KanbanColumnProps = {
  title: string;
  applications: Application[];
};

export function KanbanColumn({ title, applications }: KanbanColumnProps) {
  return (
    <Droppable droppableId={title.toUpperCase()}>
      {(provided) => (
        <div className="bg-card/60 border border-border rounded-2xl p-4 h-[500px] flex flex-col">
          {/* Column Header */}
          <div className="mb-4 flex items-center justify-between shrink-0">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              {title}
            </h2>

            <Badge
              variant="secondary"
              className="bg-secondary text-secondary-foreground font-mono"
            >
              {applications.length}
            </Badge>
          </div>

          {/* Scrollable Applications */}
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-0 flex-1 overflow-y-auto hide-scrollbar"
          >
            <div className="space-y-3">
              {applications.map((application, index) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  index={index}
                />
              ))}

              {applications.length === 0 && (
                <div className="border border-dashed border-border rounded-xl p-6 text-center text-sm text-muted-foreground">
                  No applications
                </div>
              )}

              {provided.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
}
