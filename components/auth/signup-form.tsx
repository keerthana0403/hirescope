"use client";

import { useState } from "react";

export function SignupForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    setLoading(false);

    if (response.ok) {
      window.location.href = "/login";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <input name="name" placeholder="Name" className="border p-2 w-full" />

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 w-full"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}
