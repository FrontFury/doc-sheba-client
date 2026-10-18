import { Suspense } from "react";
import { requireRole } from "@/lib/core/session";

export const instant = false;

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