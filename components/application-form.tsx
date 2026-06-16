"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createApplication } from "@/actions/application";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/submit-button";
import { toast } from "sonner";

type ApplicationFormProps = {
  onSuccess?: () => void;
};

export function ApplicationForm({ onSuccess }: ApplicationFormProps) {
  const [status, setStatus] = useState("APPLIED");
  const [state, formAction] = useActionState(createApplication, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success("Application added successfully");
      onSuccess?.();

      router.refresh();
    }
  }, [state, router, onSuccess]);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Input name="company" placeholder="Company" className="h-11" />
        {state?.errors?.company && (
          <p className="text-red-500 text-sm">{state.errors.company[0]}</p>
        )}
      </div>

      <div>
        <Input name="role" placeholder="Role" className="h-11" />
        {state?.errors?.role && (
          <p className="text-red-500 text-sm">{state.errors.role[0]}</p>
        )}
      </div>

      <Textarea
        name="jobDesc"
        placeholder="Paste the job description here..."
        className="min-h-37.5"
      />

      <Select name="status" value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-full h-11">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="APPLIED">Applied</SelectItem>
          <SelectItem value="INTERVIEW">Interview</SelectItem>
          <SelectItem value="REJECTED">Rejected</SelectItem>
          <SelectItem value="OFFER">Offer</SelectItem>
        </SelectContent>
      </Select>

      <SubmitButton />
    </form>
  );
}
