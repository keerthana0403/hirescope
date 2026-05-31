import ResumeUpload from "@/components/resume/resume-upload";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

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
      <h1 className="text-2xl font-bold mb-4">Resume</h1>

      <ResumeUpload />

      {resumes.length === 0 ? (
        <p className="mt-4 text-muted-foreground">No resumes uploaded yet.</p>
      ) : (
        resumes.map((resume) => (
          <div key={resume.id} className="mt-4 p-4 border rounded">
            <h2 className="text-lg font-semibold">{resume.fileName}</h2>

            <p className="text-sm text-muted-foreground">
              Uploaded: {resume.createdAt.toLocaleDateString()}
            </p>

            <p className="mt-2">{resume.parsedText.slice(0, 300)}...</p>
          </div>
        ))
      )}
    </div>
  );
}
