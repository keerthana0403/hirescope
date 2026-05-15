import { Draggable } from "@hello-pangea/dnd";

type Application = {
  id: string;
  company: string;
  role: string;
  status: string;
};

type ApplicationCardProps = {
  application: Application;
  index: number;
};

export function ApplicationCard({ application, index }: ApplicationCardProps) {
  return (
    <Draggable draggableId={application.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="rounded-2xl border bg-background p-4 shadow-sm hover:shadow-md transition"
        >
          <h3 className="font-semibold text-lg">{application.company}</h3>

          <p className="text-sm text-muted-foreground mt-1">
            {application.role}
          </p>
        </div>
      )}
    </Draggable>
  );
}
