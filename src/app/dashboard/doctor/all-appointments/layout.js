import { createPageMetadata } from "@/app/metadata";

export const metadata = createPageMetadata({
  title: "All Appointments",
  description:
    "Review and manage your upcoming and past patient appointments in DocSheba.",
  keywords: ["doctor appointments", "appointment management", "patient schedule"],
});

export default function DoctorAppointmentsLayout({ children }) {
  return children;
}
