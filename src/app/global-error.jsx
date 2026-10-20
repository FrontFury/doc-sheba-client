"use client";

import ErrorPage from "@/components/ErrorPage";
import "./globals.css";

export default function GlobalError({ error, retry }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <ErrorPage error={error} retry={retry} />
      </body>
    </html>
  );
}
