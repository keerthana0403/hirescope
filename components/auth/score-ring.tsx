"use client";

import { useEffect, useState } from "react";

interface ScoreRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export function ScoreRing({
  value,
  size = 200,
  strokeWidth = 10,
  label,
  sublabel,
}: ScoreRingProps) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimated(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1C2340"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreRingGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
        <defs>
          <linearGradient
            id="scoreRingGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6C8CFF" />
            <stop offset="100%" stopColor="#3B5BFF" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute flex flex-col items-center justify-center text-center px-4">
        <span
          className="font-mono font-semibold tabular-nums"
          style={{
            fontSize: size * 0.2,
            color: "#E7EAF5",
            letterSpacing: "-0.02em",
          }}
        >
          {animated}
          <span style={{ fontSize: size * 0.1, color: "#8891B0" }}>%</span>
        </span>
        {label && (
          <span
            className="font-mono uppercase tracking-widest mt-1"
            style={{ fontSize: size * 0.045, color: "#8891B0" }}
          >
            {label}
          </span>
        )}
        {sublabel && (
          <span
            className="mt-2 text-sm leading-snug max-w-[80%]"
            style={{ color: "#8891B0" }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
