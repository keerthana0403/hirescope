"use client";

import { useState, useEffect, useRef } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";

import { KanbanColumn } from "./kanban-column";
import { updateStatus } from "@/actions/application";

type Application = {
  id: string;
  company: string;
  role: string;
  status: string;
};

type KanbanBoardProps = {
  applications: Application[];
};

export function KanbanBoard({ applications }: KanbanBoardProps) {
  const [items, setItems] = useState(applications);
  const isDragging = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!isDragging.current) {
      setItems(applications);
    }
  }, [applications]);

  async function onDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId) {
      return;
    }

    const updatedItems = items.map((item) => {
      if (item.id === draggableId) {
        return {
          ...item,
          status: destination.droppableId,
        };
      }

      return item;
    });

    setItems(updatedItems);

    await updateStatus(draggableId, destination.droppableId);

    router.refresh();
  }

  function onDragStart() {
    isDragging.current = true;
  }

  const applied = items.filter((app) => app.status === "APPLIED");

  const interview = items.filter((app) => app.status === "INTERVIEW");

  const offer = items.filter((app) => app.status === "OFFER");

  const rejected = items.filter((app) => app.status === "REJECTED");

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <KanbanColumn title="Applied" applications={applied} />

        <KanbanColumn title="Interview" applications={interview} />

        <KanbanColumn title="Offer" applications={offer} />

        <KanbanColumn title="Rejected" applications={rejected} />
      </div>
    </DragDropContext>
  );
}
