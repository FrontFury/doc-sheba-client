import { createPageMetadata } from "@/app/metadata";

export const metadata = createPageMetadata({
  title: "Book an Appointment",
  description:
    "Book a medical appointment with a trusted DocSheba doctor at a time that works for you.",
  keywords: ["book appointment", "doctor appointment", "online healthcare booking"],
});

export default function BookAppointmentLayout({ children }) {
  return children;
}
