"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Mail, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { generateEmail } from "@/actions/application";

type EmailButtonProps = {
  applicationId: string;
  company: string;
  role: string;
};

export function EmailButton({
  applicationId,
  company,
  role,
}: EmailButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  function handleGenerate() {
    startTransition(async () => {
      try {
        const result = await generateEmail(applicationId);
        setEmail(result);
        setOpen(true);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to generate email",
        );
      }
    });
  }

  function handleCopy() {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={handleGenerate}
        disabled={isPending}
        className="w-full"
      >
        <Mail className="w-3 h-3 mr-2" />
        {isPending ? "Generating..." : "Follow-up Email"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Follow-up Email — {role} @ {company}
            </DialogTitle>
          </DialogHeader>

          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {email}
          </div>

          <Button onClick={handleCopy} variant="outline" className="w-full">
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2 text-green-500" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" /> Copy Email
              </>
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
