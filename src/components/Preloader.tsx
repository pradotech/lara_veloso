"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out after 1.5s
    const fadeTimer = setTimeout(() => setFadeOut(true), 1500);
    // Remove from DOM after fade animation completes (2s total)
    const removeTimer = setTimeout(() => setVisible(false), 2000);

    // Prevent scrolling while preloader is visible
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`preloader ${fadeOut ? "preloader--fade-out" : ""}`}
      aria-hidden="true"
    >
      {/* Film reel icon */}
      <div className="preloader__reel">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="preloader__reel-svg"
        >
          {/* Outer ring */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="currentColor"
            strokeWidth="3"
            opacity="0.3"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.15"
          />

          {/* Center hub */}
          <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.9" />
          <circle cx="50" cy="50" r="4" fill="var(--c-bg)" />

          {/* Sprocket holes — 8 evenly spaced */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            const rad = (angle * Math.PI) / 180;
            const cx = 50 + 28 * Math.cos(rad);
            const cy = 50 + 28 * Math.sin(rad);
            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="7"
                  fill="currentColor"
                  opacity="0.2"
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r="5"
                  fill="var(--c-bg)"
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.6"
                />
              </g>
            );
          })}

          {/* Spokes from center to each hole */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            const rad = (angle * Math.PI) / 180;
            const x2 = 50 + 21 * Math.cos(rad);
            const y2 = 50 + 21 * Math.sin(rad);
            return (
              <line
                key={`spoke-${i}`}
                x1="50"
                y1="50"
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="1.2"
                opacity="0.2"
              />
            );
          })}

          {/* Film perforations on outer edge */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            const rad = (angle * Math.PI) / 180;
            const cx = 50 + 44 * Math.cos(rad);
            const cy = 50 + 44 * Math.sin(rad);
            return (
              <rect
                key={`perf-${i}`}
                x={cx - 1.8}
                y={cy - 1.2}
                width="3.6"
                height="2.4"
                rx="0.6"
                fill="currentColor"
                opacity="0.25"
                transform={`rotate(${angle}, ${cx}, ${cy})`}
              />
            );
          })}
        </svg>
      </div>

      {/* Logo */}
      <div className="preloader__logo">
        <Image
          src="/logo-lara.png"
          alt="Lara Rosa Veloso"
          width={200}
          height={80}
          priority
          className="logo-themed"
        />
      </div>

      {/* Subtle loading bar */}
      <div className="preloader__bar">
        <div className="preloader__bar-fill" />
      </div>
    </div>
  );
}
