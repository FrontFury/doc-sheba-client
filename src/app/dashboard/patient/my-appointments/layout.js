import { createPageMetadata } from "@/app/metadata";

export const metadata = createPageMetadata({
  title: "My Appointments",
  description:
    "View and manage your upcoming and past medical appointments booked through DocSheba.",
  keywords: ["my appointments", "patient appointments", "appointment history"],
});

export default function PatientAppointmentsLayout({ children }) {
  return children;
}
