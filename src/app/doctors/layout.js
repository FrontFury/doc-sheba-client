import { createPageMetadata } from "@/app/metadata";

export const metadata = createPageMetadata({
  title: "Find Doctors",
  description:
    "Find qualified doctors by specialty and choose the right healthcare professional for your needs.",
  keywords: ["find doctors", "doctor directory", "medical specialists"],
});

export default function DoctorsLayout({ children }) {
  return children;
}
