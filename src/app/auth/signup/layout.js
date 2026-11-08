import { createPageMetadata } from "@/app/metadata";

export const metadata = createPageMetadata({
  title: "Create an Account",
  description:
    "Create your DocSheba account to find doctors, book appointments, and manage your healthcare journey.",
  keywords: ["DocSheba signup", "create healthcare account", "patient registration"],
});

export default function SignUpLayout({ children }) {
  return children;
}
