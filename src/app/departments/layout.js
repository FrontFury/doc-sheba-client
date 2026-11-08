import { createPageMetadata } from "@/app/metadata";

export const metadata = createPageMetadata({
  title: "Medical Departments",
  description:
    "Explore DocSheba medical departments and discover healthcare services for a range of health needs.",
  keywords: ["medical departments", "healthcare specialties", "medical services"],
});

export default function DepartmentsLayout({ children }) {
  return children;
}
