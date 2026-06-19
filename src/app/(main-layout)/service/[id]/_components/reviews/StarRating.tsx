"use client";

import { useState } from "react";
import { Star } from "lucide-react";

// ─── Display-only Stars ───────────────────────────────────────────────────────

interface StarDisplayProps {
  rating: number;          // 0–5, supports decimals
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function StarDisplay({ rating, size = "md", showValue = false }: StarDisplayProps) {
  const sizeMap = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" };
  const cls = sizeMap[size];

  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.floor(rating);
        const partial = !filled && i === Math.ceil(rating) && rating % 1 > 0;
        return (
          <span key={i} className="relative inline-block">
            {/* Background star */}
            <Star className={`${cls} text-gray-200`} fill="currentColor" />
            {/* Overlay — filled or partial */}
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : `${(rating % 1) * 100}%` }}
              >
                <Star className={`${cls} text-yellow-400`} fill="currentColor" />
              </span>
            )}
          </span>
        );
      })}
      {showValue && (
        <span className="ml-1 text-sm font-semibold text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
}

// ─── Interactive Star Picker ──────────────────────────────────────────────────

interface StarPickerProps {
  value: number;           // 0 = unset
  onChange: (v: number) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export function StarPicker({ value, onChange, size = "md", disabled = false }: StarPickerProps) {
  const [hovered, setHovered] = useState(0);
  const sizeMap = { sm: "h-5 w-5", md: "h-7 w-7", lg: "h-8 w-8" };
  const cls = sizeMap[size];
  const active = hovered || value;

  return (
    <span className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && onChange(i)}
          onMouseEnter={() => !disabled && setHovered(i)}
          onMouseLeave={() => !disabled && setHovered(0)}
          className={`transition-transform duration-100 ${!disabled ? "hover:scale-110 cursor-pointer" : "cursor-default"}`}
          aria-label={`${i} star${i > 1 ? "s" : ""}`}
        >
          <Star
            className={`${cls} transition-colors duration-100 ${
              i <= active ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
          />
        </button>
      ))}
    </span>
  );
}
