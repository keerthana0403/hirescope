"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import { ScoreRing } from "./score-ring";

const STATS = [
  {
    value: 94,
    label: "Match Score",
    sublabel: "Average resume-to-JD fit after tailoring in HireScope",
  },
  {
    value: 67,
    label: "Response Rate",
    sublabel:
      "Applications tracked past the \u201capplied\u201d stage this month",
  },
  {
    value: 100,
    label: "Pipeline Synced",
    sublabel: "Every application, one Kanban board, zero spreadsheets",
  },
];

interface AuthLayoutProps {
  children: React.ReactNode;
  eyebrow: string;
  heading: string;
}

export function AuthLayout({ children, eyebrow, heading }: AuthLayoutProps) {
  const [statIndex, setStatIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatIndex((i) => (i + 1) % STATS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stat = STATS[statIndex];

  return (
    <div
      className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2"
      style={{ backgroundColor: "#0A0E1A" }}
    >
      {/* Brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden p-12 border-r border-white/5">
        <div
          className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #3B5BFF 0%, transparent 70%)",
          }}
        />

        <Link href="/" className="relative z-10 flex items-center gap-2 w-fit">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{ backgroundColor: "#3B5BFF" }}
          >
            <Briefcase className="w-4 h-4" style={{ color: "#0A0E1A" }} />
          </span>
          <span
            className="font-semibold tracking-tight"
            style={{ color: "#E7EAF5" }}
          >
            HireScope
          </span>
        </Link>

        <div className="relative z-10 flex flex-col items-start gap-8">
          <div className="animate-[fadeIn_0.6s_ease]">
            <ScoreRing
              value={stat.value}
              label={stat.label}
              sublabel={stat.sublabel}
              size={200}
            />
          </div>

          <div className="flex gap-1.5">
            {STATS.map((_, i) => (
              <span
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === statIndex ? 20 : 8,
                  backgroundColor: i === statIndex ? "#3B5BFF" : "#1C2340",
                }}
              />
            ))}
          </div>
        </div>

        <p
          className="relative z-10 text-sm max-w-sm"
          style={{ color: "#8891B0" }}
        >
          Built to replace the spreadsheet: AI-scored matches, a live pipeline,
          and follow-ups that write themselves.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-md"
              style={{ backgroundColor: "#3B5BFF" }}
            >
              <Briefcase className="w-4 h-4" style={{ color: "#0A0E1A" }} />
            </span>
            <span
              className="font-semibold tracking-tight"
              style={{ color: "#E7EAF5" }}
            >
              HireScope
            </span>
          </div>

          <p
            className="font-mono text-xs uppercase tracking-widest mb-2"
            style={{ color: "#3B5BFF" }}
          >
            {eyebrow}
          </p>
          <h1
            className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8"
            style={{ color: "#E7EAF5" }}
          >
            {heading}
          </h1>

          {children}
        </div>
      </div>
    </div>
  );
}
