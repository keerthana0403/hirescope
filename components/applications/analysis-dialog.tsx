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
          <div>
            <h3 className="font-semibold mb-2">Match Score</h3>

            <p className="text-3xl font-bold text-green-600">{matchScore}%</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Strengths</h3>

            <ul className="list-disc pl-5">
              {strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Missing Skills</h3>

            <ul className="list-disc pl-5">
              {missingSkills.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Suggestions</h3>

            <ul className="list-disc pl-5">
              {suggestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
