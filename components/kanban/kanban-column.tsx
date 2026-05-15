import { ApplicationCard } from "./application-card";

import { Droppable } from "@hello-pangea/dnd";

type Application = {
  id: string;
  company: string;
  role: string;
  status: string;
};

type KanbanColumnProps = {
  title: string;
  applications: Application[];
};

export function KanbanColumn({ title, applications }: KanbanColumnProps) {
  return (
    <Droppable droppableId={title.toUpperCase()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="rounded-2xl bg-muted/40 p-4 min-h-125"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-lg">{title}</h2>

            <span className="text-sm text-muted-foreground">
              {applications.length}
            </span>
          </div>

          <div className="space-y-3">
            {applications.map((application, index) => (
              <ApplicationCard
                key={application.id}
                application={application}
                index={index}
              />
            ))}

            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
