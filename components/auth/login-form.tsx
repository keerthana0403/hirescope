"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

const inputClass =
  "border rounded-lg p-2.5 w-full text-sm bg-[#10152A] outline-none transition-colors placeholder:text-[#5C6488] focus:ring-1 focus:ring-[#3B5BFF] focus:border-[#3B5BFF]";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium" style={{ color: "#C4C9DE" }}>
          Email
        </label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          className={inputClass}
          style={{ borderColor: "#1C2340", color: "#E7EAF5" }}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" style={{ color: "#C4C9DE" }}>
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className={inputClass}
          style={{ borderColor: "#1C2340", color: "#E7EAF5" }}
        />
      </div>

      {error && (
        <p
          className="text-sm rounded-lg px-3 py-2 border"
          style={{
            color: "#FF8FB3",
            backgroundColor: "#251329",
            borderColor: "#4A2140",
          }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg px-4 py-2.5 w-full text-sm font-semibold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#3B5BFF", color: "#F5F7FF" }}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
