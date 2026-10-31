"use client";

import ErrorPage from "@/components/ErrorPage";
import Script from "next/script";
import "./globals.css";

const themeScript = `
  (() => {
    const storageKey = "docsheba-theme";
    let storedTheme = null;
    try {
      storedTheme = window.localStorage.getItem(storageKey);
    } catch {}
    if (storedTheme !== "dark" && storedTheme !== "light") {
      const cookieTheme = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith(storageKey + "="));
      storedTheme = cookieTheme ? cookieTheme.split("=")[1] : null;
    }
    const theme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
  })();
`;

export default function GlobalError({ error, retry }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <ErrorPage error={error} retry={retry} />
      </body>
    </html>
  );
}
