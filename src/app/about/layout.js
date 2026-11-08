import { createPageMetadata } from "@/app/metadata";

export const metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn how DocSheba connects people in Bangladesh with trusted doctors and convenient healthcare services.",
  keywords: ["about DocSheba", "healthcare in Bangladesh", "trusted medical care"],
});

export default function AboutLayout({ children }) {
  return children;
}
