import { createPageMetadata } from "@/app/metadata";

export const metadata = createPageMetadata({
  title: "Sign In",
  description:
    "Sign in to your DocSheba account to manage appointments and access personalized healthcare services.",
  keywords: ["DocSheba sign in", "patient login", "doctor login"],
});

export default function SignInLayout({ children }) {
  return children;
}
