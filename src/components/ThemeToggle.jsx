"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";

const subscribeToTheme = (callback) => {
  window.addEventListener("docsheba-theme-change", callback);
  return () => window.removeEventListener("docsheba-theme-change", callback);
};

const getThemeSnapshot = () => document.documentElement.classList.contains("dark");

export default function ThemeToggle() {
  const isDarkMode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => false
  );

  const toggleTheme = () => {
    const nextIsDarkMode = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDarkMode);
    window.dispatchEvent(new Event("docsheba-theme-change"));
  };

  return (
    <Button
      isIconOnly
      variant="flat"
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
      className="bg-slate-100 dark:bg-slate-800 text-[#12343B] dark:text-amber-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5 text-[#12343B]" />
      )}
    </Button>
  );
}
