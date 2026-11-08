import { createPageMetadata } from "@/app/metadata";

export const metadata = createPageMetadata({
  title: "Manage Users",
  description:
    "Review and manage DocSheba user accounts from the administrator user management dashboard.",
  keywords: ["manage users", "user administration", "DocSheba users"],
});

export default function AdminUsersLayout({ children }) {
  return children;
}
