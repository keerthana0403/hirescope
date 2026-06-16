"use client";

import { useState } from "react";

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
        {/* Trigger */}
        <DialogTrigger asChild>
          <Button size="lg">+ Add Application</Button>
        </DialogTrigger>

        {/* Modal */}
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Application</DialogTitle>
            <DialogDescription>
              Fill in the details below to track a new job application.
            </DialogDescription>
          </DialogHeader>
          <ApplicationForm onSuccess={() => setOpen(false)} />{" "}
        </DialogContent>
      </Dialog>
    </div>
  );
}
