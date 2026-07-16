import ResumeUpload from "@/components/resume/resume-upload";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { FileText } from "lucide-react";

export default async function ResumePage() {
  const session = await auth();

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  const resumes = await prisma.resume.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-primary mb-1">
        Resumes
      </p>
      <h1 className="text-2xl font-semibold text-foreground mb-6">
        Manage your resumes
      </h1>

      <ResumeUpload />

      {resumes.length === 0 ? (
        <div className="mt-4 border border-dashed border-border rounded-xl p-6 text-center text-sm text-muted-foreground">
          No resumes uploaded yet.
        </div>
      ) : (
        <div className="space-y-3 mt-4">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="p-4 border border-border bg-card rounded-2xl hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <FileText className="w-4 h-4 text-primary" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-foreground truncate">
                    {resume.fileName}
                  </h2>
                  <p className="text-xs font-mono text-muted-foreground">
                    Uploaded {resume.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {resume.parsedText.slice(0, 300)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
