import { Users } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-[#0F766E] dark:bg-teal-950 dark:text-teal-400">
        <Users className="h-7 w-7" />
      </div>
      <h1 className="mt-5 text-2xl font-black text-[#12343B] dark:text-slate-100">
        Users
      </h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
        User management is not available yet.
      </p>
    </section>
  );
}
