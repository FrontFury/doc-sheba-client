import { createPageMetadata } from "@/app/metadata";

export const metadata = createPageMetadata({
  title: "Doctor Profile",
  description:
    "Update your DocSheba doctor profile, professional details, and availability for patients.",
  keywords: ["doctor profile", "doctor information", "medical profile"],
});

export default function DoctorProfileLayout({ children }) {
  return children;
}
