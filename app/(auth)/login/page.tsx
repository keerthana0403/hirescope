import { LoginForm } from "@/components/auth/login-form";
import { AuthLayout } from "@/components/auth/auth-layout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <AuthLayout eyebrow="Welcome back" heading="Sign in to your pipeline">
      <LoginForm />

      <p className="mt-6 text-center text-sm" style={{ color: "#8891B0" }}>
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium hover:underline"
          style={{ color: "#6C8CFF" }}
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}
