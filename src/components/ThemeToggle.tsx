"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { themeStorageKey } from "@/lib/site";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(themeStorageKey, next);
    } catch {
      /* storage can be blocked; the toggle still works for this visit */
    }
  }

  return (
    <button
      type="button"
      data-theme-toggle
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition hover:border-accent/60 hover:text-fg"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
