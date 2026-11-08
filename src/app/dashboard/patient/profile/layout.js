import { createPageMetadata } from "@/app/metadata";

export const metadata = createPageMetadata({
  title: "Patient Profile",
  description:
    "Create and update your DocSheba patient profile to keep your healthcare information current.",
  keywords: ["patient profile", "patient information", "healthcare account"],
});

export default function PatientProfileLayout({ children }) {
  return children;
}
