"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="theme-toggle"
      type="button"
    >
      {theme === "light" ? (
        <i className="fas fa-moon" aria-hidden="true"></i>
      ) : (
        <i className="fas fa-sun" aria-hidden="true"></i>
      )}
    </button>
  );
}
