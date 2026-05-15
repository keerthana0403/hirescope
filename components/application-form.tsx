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

export function ApplicationForm() {
  const [status, setStatus] = useState("APPLIED");
  const [state, formAction] = useActionState(createApplication, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success("Application added successfully");
      router.refresh();
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Input name="company" placeholder="Company" />
        {state?.errors?.company && (
          <p className="text-red-500 text-sm">{state.errors.company[0]}</p>
        )}
      </div>

      <div>
        <Input name="role" placeholder="Role" />
        {state?.errors?.role && (
          <p className="text-red-500 text-sm">{state.errors.role[0]}</p>
        )}
      </div>

      <Textarea name="jobDesc" placeholder="Job Description" />

      <Select name="status" value={status} onValueChange={setStatus}>
        <SelectTrigger>
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
