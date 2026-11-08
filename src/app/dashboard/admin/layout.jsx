import { Suspense } from "react";
import { requireRole } from "@/lib/core/session";
import { createPageMetadata } from "@/app/metadata";

export const instant = false;
export const metadata = createPageMetadata({
    title: "Admin Dashboard",
    description:
        "Manage DocSheba users and oversee healthcare platform operations from the administrator dashboard.",
    keywords: ["admin dashboard", "user management", "DocSheba administration"],
});

async function AdminAccess({ children }) {
    await requireRole('admin');
    return children;
}

const AdminLayout = ({ children }) => (
    <Suspense
        fallback={
            <div className="flex min-h-[70vh] items-center justify-center text-sm font-semibold text-slate-500 dark:text-slate-400">
                Checking account access…
            </div>
        }
    >
        <AdminAccess>{children}</AdminAccess>
    </Suspense>
);

export default AdminLayout;