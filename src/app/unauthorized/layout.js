import { createPageMetadata } from "@/app/metadata";

export const metadata = createPageMetadata({
  title: "Access Denied",
  description:
    "You do not have permission to access this DocSheba page. Sign in with an authorized account to continue.",
  keywords: ["access denied", "authorized account", "DocSheba security"],
});

export default function UnauthorizedLayout({ children }) {
  return children;
}
