import { Suspense } from "react";
import { requireRole } from "@/lib/core/session";
import { createPageMetadata } from "@/app/metadata";

export const instant = false;
export const metadata = createPageMetadata({
    title: "Doctor Dashboard",
    description:
        "View appointments, manage your doctor profile, and coordinate patient care in DocSheba.",
    keywords: ["doctor dashboard", "doctor appointments", "patient care"],
});

async function DoctorAccess({ children }) {
    await requireRole('doctor');
    return children;
}

const DoctorLayout = ({ children }) => (
    <Suspense
        fallback={
            <div className="flex min-h-[70vh] items-center justify-center text-sm font-semibold text-slate-500 dark:text-slate-400">
                Checking account access…
            </div>
        }
    >
        <DoctorAccess>{children}</DoctorAccess>
    </Suspense>
);

export default DoctorLayout;