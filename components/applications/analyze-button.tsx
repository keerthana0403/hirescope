"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { analyzeApplication } from "@/actions/application";
import { Button } from "@/components/ui/button";

type AnalyzeButtonProps = {
  applicationId: string;
};

export function AnalyzeButton({ applicationId }: AnalyzeButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleAnalyze() {
    startTransition(async () => {
      try {
        await analyzeApplication(applicationId);

        toast.success("Analysis completed");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Analysis failed");
      }
    });
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleAnalyze}
      disabled={isPending}
    >
      {isPending ? "Analyzing..." : "Analyze Match"}
    </Button>
  );
}
