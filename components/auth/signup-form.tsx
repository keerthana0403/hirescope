"use client";

import { useMemo, useState } from "react";

const inputClass =
  "border rounded-lg p-2.5 w-full text-sm bg-[#10152A] outline-none transition-colors placeholder:text-[#5C6488] focus:ring-1 focus:ring-[#3B5BFF] focus:border-[#3B5BFF]";

const STRENGTH_LABELS = ["Too short", "Weak", "Fair", "Good", "Strong"];

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function strengthColor(strength: number) {
  if (strength <= 1) return "#FF6B6B";
  if (strength === 2) return "#FFB020";
  if (strength === 3) return "#6C8CFF";
  return "#3ECF8E";
}

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    setLoading(false);

    if (response.ok) {
      window.location.href = "/login";
    } else {
      const data = await response.json();
      setError(data.error || "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium" style={{ color: "#C4C9DE" }}>
          Name
        </label>
        <input
          name="name"
          placeholder="Your name"
          required
          className={inputClass}
          style={{ borderColor: "#1C2340", color: "#E7EAF5" }}
        />
      </div>

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
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          style={{ borderColor: "#1C2340", color: "#E7EAF5" }}
        />

        {password.length > 0 && (
          <div className="mt-1.5 flex flex-col gap-1.5">
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="h-1 flex-1 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor:
                      i < strength ? strengthColor(strength) : "#1C2340",
                  }}
                />
              ))}
            </div>
            <span
              className="font-mono text-xs"
              style={{ color: strengthColor(strength) }}
            >
              {STRENGTH_LABELS[strength]}
            </span>
          </div>
        )}
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
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}
