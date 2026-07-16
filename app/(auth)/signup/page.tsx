import { SignupForm } from "@/components/auth/signup-form";
import { AuthLayout } from "@/components/auth/auth-layout";
import Link from "next/link";

export default function SignupPage() {
  return (
    <AuthLayout eyebrow="Get started" heading="Create your account">
      <SignupForm />

      <p className="mt-6 text-center text-sm" style={{ color: "#8891B0" }}>
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium hover:underline"
          style={{ color: "#6C8CFF" }}
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
