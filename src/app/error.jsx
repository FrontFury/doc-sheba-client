"use client";

import ErrorPage from "@/components/ErrorPage";

export default function Error({ error, retry }) {
  return <ErrorPage error={error} retry={retry} />;
}
