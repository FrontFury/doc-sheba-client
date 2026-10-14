import { Suspense } from "react";
import { redirect } from "next/navigation";
import { CalendarCheck, Loader2 } from "lucide-react";
import AppointmentList from "@/components/Dashboard/AppointmentList";
import { getPatientAppointments } from "@/lib/api/appointments";
import { getPatientDetails } from "@/lib/api/patients";
import { getUserSession } from "@/lib/core/session";

async function PatientAppointmentsContent() {
  const user = await getUserSession();
  if (!user) {
    redirect(
      `/auth/signin?callbackUrl=${encodeURIComponent("/dashboard/patient/my-appointments")}`
    );
  }

  let appointments;
  try {
    const patient = await getPatientDetails(user.id);
    const patientID = patient?.patientID || user.id;
    appointments = await getPatientAppointments(patientID);
  } catch (error) {
    console.error("Failed to load patient appointments:", error);
    return <AppointmentsError />;
  }

  return <AppointmentList appointments={appointments} view="patient" />;
}

function AppointmentsLoading() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-900">
      <Loader2 className="h-6 w-6 animate-spin text-[#0F766E]" />
      Loading your appointments…
    </div>
  );
}

function AppointmentsError() {
  return (
    <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
      We couldn’t load your appointments. Please refresh the page or try again later.
    </div>
  );
}

export default function PatientAppointmentsPage() {
  return (
    <main className="space-y-6 pb-10">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#0F766E] dark:border-teal-900 dark:bg-teal-950/60 dark:text-teal-300">
            <CalendarCheck className="h-3.5 w-3.5" />
            Patient dashboard
          </span>
          <h1 className="mt-3 text-2xl font-black tracking-tight text-[#12343B] dark:text-white sm:text-3xl">
            My Appointments
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Review your appointment details and booking status.
          </p>
        </div>
      </header>
      <Suspense fallback={<AppointmentsLoading />}>
        <PatientAppointmentsContent />
      </Suspense>
    </main>
  );
}
