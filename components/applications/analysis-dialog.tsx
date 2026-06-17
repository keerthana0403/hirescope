"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type AnalysisDialogProps = {
  company: string;
  role: string;
  matchScore: number;
  strengths: string[];
  missingSkills: string[];
  suggestions: string[];
};

export function AnalysisDialog({
  company,
  role,
  matchScore,
  strengths,
  missingSkills,
  suggestions,
}: AnalysisDialogProps) {
  const progressColor =
    matchScore >= 80
      ? "bg-green-500"
      : matchScore >= 60
        ? "bg-yellow-500"
        : "bg-red-500";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          View Analysis
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {role} @ {company}
          </DialogTitle>
          <DialogDescription>
            AI-powered resume and job description match analysis.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Match Score</h3>
              <span
                className={`text-2xl font-bold ${progressColor.replace("bg-", "text-")}`}
              >
                {matchScore}%
              </span>
            </div>

            <Progress value={matchScore} indicatorClassName={progressColor} />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Strengths</h3>

            <div className="flex flex-wrap gap-2">
              {strengths.map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Missing Skills</h3>

            <div className="flex flex-wrap gap-2">
              {missingSkills.map((item) => (
                <Badge key={item} variant="destructive">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Suggestions</h3>

            <ul className="space-y-2">
              {suggestions.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
