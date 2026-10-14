import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Loader2,
  MapPin,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { redirect } from "next/navigation";
import { getDoctorDetails } from "@/lib/api/doctors";
import { getPatientDetails } from "@/lib/api/patients";
import { getUserSession } from "@/lib/core/session";
import BookingForm from "./BookingForm";

const getFeeAmount = (fee) => {
  const value = String(fee ?? "").replace(/,/g, "").replace(/[^\d.]/g, "");
  const amount = Number(value);
  return value && Number.isFinite(amount) && amount >= 0 ? amount : null;
};

function BookingLoading() {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center gap-3 text-[#0F766E]">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="text-sm font-semibold text-slate-500">Loading secure booking…</p>
    </div>
  );
}

async function BookingContent({ doctorId }) {
  const user = await getUserSession();

  if (!user) {
    const bookingUrl = doctorId
      ? `/book-appointment?doctor=${encodeURIComponent(doctorId)}`
      : "/book-appointment";
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(bookingUrl)}`);
  }

  if (!doctorId) {
    return (
      <BookingMessage
        title="Choose a doctor first"
        message="We could not find a doctor in this booking link. Return to the doctor directory and select a profile."
        actionHref="/doctors"
        actionLabel="Find a doctor"
      />
    );
  }

  let doctor;
  let patient;

  try {
    [doctor, patient] = await Promise.all([
      getDoctorDetails(doctorId),
      getPatientDetails(user.id),
    ]);
  } catch (error) {
    console.error("Failed to load appointment booking details:", error);
    return (
      <BookingMessage
        title="Booking details are unavailable"
        message="We could not load your appointment details. Please try again in a moment."
        actionHref="/doctors"
        actionLabel="Back to doctors"
      />
    );
  }

  if (!doctor) {
    return (
      <BookingMessage
        title="Doctor not found"
        message="This doctor profile may no longer be available. Choose another doctor to continue."
        actionHref="/doctors"
        actionLabel="Find a doctor"
      />
    );
  }

  const patientName = user.name || patient?.name || "";
  const patientEmail = user.email || patient?.email || "";
  const patientPhone = user.phone || patient?.phone || "";
  const chamberFee = getFeeAmount(doctor.chamberFee);
  const patientProfileReady = Boolean(patientName && patientEmail && patientPhone);
  const doctorName = doctor.name || "Doctor";
  const specialty = doctor.department || doctor.deptCategory || "Medical specialist";

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#F4FAF9] px-4 py-10 text-[#12343B] sm:px-6 lg:px-8"
      style={{ fontFamily: "var(--font-manrope), Manrope, sans-serif" }}
    >
      <div className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-8">
        <header className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0F766E] shadow-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4" />
            Secure appointment booking
          </span>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Book your appointment</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Choose a preferred time and consultation type. The clinic will confirm your appointment request.
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 p-5 shadow-xl shadow-teal-950/5 backdrop-blur-2xl sm:p-7">
            <div className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#0F766E]">
              <Stethoscope className="h-4 w-4" />
              Doctor overview
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-teal-100 bg-teal-50 text-[#0F766E]">
                {doctor.image ? (
                  <Image src={doctor.image} alt={doctorName} fill unoptimized className="object-cover" />
                ) : (
                  <Stethoscope className="h-9 w-9" />
                )}
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-black leading-tight">{doctorName}</h2>
                <p className="mt-1 text-sm font-bold text-[#0F766E]">{specialty}</p>
                {doctor.designation && (
                  <p className="mt-1 text-xs font-semibold text-slate-600">{doctor.designation}</p>
                )}
                <p className="mt-1 text-xs leading-5 text-slate-500">{doctor.degrees || "Qualifications not listed"}</p>
              </div>
            </div>

            <div className="mt-7 space-y-4 border-t border-teal-900/10 pt-6">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-emerald-800">Chamber fee</p>
                <p className="mt-1 text-xl font-black text-[#12343B]">
                  {chamberFee === null ? "Contact clinic" : `৳${chamberFee.toLocaleString("en-BD")}`}
                </p>
              </div>
              <DoctorDetail
                icon={MapPin}
                title="Chamber location"
                value={doctor.location || doctor.chamberAddress || doctor.address || "Contact clinic for address"}
              />
              <DoctorDetail
                icon={Clock}
                title="Visiting hours"
                value={doctor.visitingHours || "Please contact the clinic for availability"}
              />
            </div>

            <div className="mt-7 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
              <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-900">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                Your information is protected
              </div>
              <p className="mt-1.5 text-xs leading-5 text-emerald-900/70">
                Patient details are taken from your DocSheba account and verified again when you submit.
              </p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-xl shadow-teal-950/5 backdrop-blur-2xl sm:p-7">
            <div className="mb-6">
              <h2 className="text-xl font-black">Appointment details</h2>
              <p className="mt-1 text-sm text-slate-500">Your profile details are read-only for your security.</p>
            </div>

            {!patientProfileReady && (
              <div role="alert" className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <p className="font-extrabold">Complete your patient profile to book</p>
                <p className="mt-1 text-xs leading-5">
                  Add your name, email, and phone number to your account before submitting an appointment request.
                </p>
              </div>
            )}

            <BookingForm
              doctorId={doctorId}
              patient={{ name: patientName, email: patientEmail, phone: patientPhone }}
              chamberFee={chamberFee}
              patientProfileReady={patientProfileReady}
              doctorName={doctorName}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

function DoctorDetail({ icon: Icon, title, value }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E]">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{title}</p>
        <p className="mt-1 text-sm font-semibold leading-5 text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function BookingMessage({ title, message, actionHref, actionLabel }) {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#F4FAF9] px-4 py-12">
      <section className="w-full max-w-lg rounded-3xl border border-white bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-[#0F766E]">
          <Stethoscope className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-2xl font-black text-[#12343B]">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{message}</p>
        <Link
          href={actionHref}
          className="mt-6 inline-flex rounded-xl bg-[#0F766E] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#0B5F59]"
        >
          {actionLabel}
        </Link>
      </section>
    </main>
  );
}

async function BookingRoute({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const requestedDoctorId = resolvedSearchParams?.doctor;
  const doctorId = typeof requestedDoctorId === "string" ? requestedDoctorId : "";

  return <BookingContent doctorId={doctorId} />;
}

export default function BookAppointmentPage({ searchParams }) {
  return (
    <Suspense fallback={<BookingLoading />}>
      <BookingRoute searchParams={searchParams} />
    </Suspense>
  );
}
