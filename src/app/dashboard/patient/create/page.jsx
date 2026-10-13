import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import PatientCreateForm from "./PatientCreateForm";
import { getUserSession } from "@/lib/core/session";
import { getPatientDetails } from "@/lib/api/patients";

async function PatientCreateLoader() {
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="p-8 text-center text-rose-500 font-bold">
        User session not found. Please log in.
      </div>
    );
  }

  const patientDetails = await getPatientDetails(user.id);

  return (
    <PatientCreateForm
      user={{ id: user.id, name: user.name, email: user.email }}
      patientDetails={patientDetails}
    />
  );
}

export default function PatientCreatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-[#0F766E] animate-spin" />
          <p className="text-xs font-bold text-slate-400">Loading Patient Create Form...</p>
        </div>
      }
    >
      <PatientCreateLoader />
    </Suspense>
  );
}