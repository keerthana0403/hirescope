"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadResume } from "@/actions/resume";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ResumeUpload() {
  const [fileName, setFileName] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    await uploadResume(formData);

    form.reset();
    setFileName("");

    router.refresh();
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold">Upload Resume</h2>
            <p className="text-sm text-muted-foreground">
              Upload your PDF resume for AI-powered job matching.
            </p>
          </div>

          <label
            htmlFor="resume"
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition"
          >
            <input
              id="resume"
              type="file"
              name="resume"
              accept=".pdf"
              required
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
            />

            {fileName ? (
              <div>
                <p className="font-medium">{fileName}</p>
                <p className="text-sm text-muted-foreground">Ready to upload</p>
              </div>
            ) : (
              <div>
                <p className="font-medium">Click to select a PDF resume</p>
                <p className="text-sm text-muted-foreground">PDF files only</p>
              </div>
            )}
          </label>

          <Button type="submit">Upload Resume</Button>
        </form>
      </CardContent>
    </Card>
  );
}
