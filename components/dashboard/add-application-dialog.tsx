"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApplicationForm } from "../application-form";
import { Button } from "../ui/button";

export default function AddApplicationDialog() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="mb-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Application
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto border-border bg-card">
          <DialogHeader>
            <DialogTitle>Add New Application</DialogTitle>
            <DialogDescription>
              Fill in the details below to track a new job application.
            </DialogDescription>
          </DialogHeader>
          <ApplicationForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
