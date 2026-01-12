"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ mode }: { mode: string }) {
  return (
    <button
      className="
        p-2 rounded-full
        hover:bg-muted
        transition
      "
      aria-label="Toggle theme"
    >
      {mode === "dark" ? (
        <Sun className="h-5 w-5 text-foreground" />
      ) : (
        <Moon className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
}
