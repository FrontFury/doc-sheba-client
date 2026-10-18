"use client";

import { useState } from "react";
import { AlertCircle, Eye, Loader2, Trash2, X } from "lucide-react";
import {
  deleteDoctorAppointment,
  updateDoctorAppointmentStatus,
} from "@/lib/actions/appointments";

const appointmentStatuses = ["pending", "confirmed", "completed", "cancelled"];

const formatAppointmentId = (appointment) => {
  const id = appointment?._id?.$oid || appointment?._id || appointment?.id;
  return typeof id === "string" ? id : "—";
};

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatFee = (value) => {
  if (value === null || value === undefined || value === "") return "—";

  const amount = Number(String(value).replace(/[^\d.-]/g, ""));
  return Number.isFinite(amount)
    ? `৳${amount.toLocaleString("en-BD")}`
    : String(value);
};

const getStatusStyle = (status) => {
  const normalized = String(status || "pending").toLowerCase();

  if (normalized === "confirmed") {
    return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300";
  }
  if (normalized === "completed") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300";
  }
  if (normalized === "cancelled") {
    return "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300";
  }

  return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300";
};

const displayValue = (value) => {
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
};

function StatusBadge({ status }) {
  const label = displayValue(status || "pending");

  return (
    <span className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-extrabold capitalize ${getStatusStyle(label)}`}>
      {label}
    </span>
  );
}

function AppointmentDetails({ appointment, onClose }) {
  const details = [
    ["Appointment ID", formatAppointmentId(appointment)],
    ["Patient Name", appointment.patientName],
    ["Patient Email", appointment.patientEmail],
    ["Patient Phone", appointment.patientPhone],
    ["Doctor Name", appointment.doctorName],
    ["Department", appointment.department],
    ["Chamber Fee", formatFee(appointment.chamberFee)],
    ["Appointment Date", formatDate(appointment.appointmentDate)],
    ["Appointment Time", appointment.appointmentTime],
    ["Consultation Type", appointment.consultationType],
    ["Notes", appointment.notes],
    ["Status", appointment.status || "pending"],
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-details-title"
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/70 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-7"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-[#0F766E]">Appointment details</p>
            <h2 id="appointment-details-title" className="mt-1 text-xl font-black text-[#12343B] dark:text-white">
              {displayValue(appointment.doctorName || appointment.patientName)}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close appointment details"
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <dl className="grid gap-4 sm:grid-cols-2">
          {details.map(([label, value]) => (
            <div key={label} className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-950/60">
              <dt className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{label}</dt>
              <dd className="mt-1 break-words text-sm font-semibold text-slate-700 dark:text-slate-200">
                {label === "Status" ? <StatusBadge status={value} /> : displayValue(value)}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

export default function AppointmentList({ appointments, view }) {
  const [appointmentRows, setAppointmentRows] = useState(appointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [busyAppointmentId, setBusyAppointmentId] = useState("");
  const [mutationError, setMutationError] = useState("");
  const isDoctorView = view === "doctor";

  const columns = isDoctorView
    ? ["Appointment ID", "Patient Name", "Patient Email", "Patient Phone", "Chamber Fee", "Appointment Date", "Appointment Time", "Consultation Type", "Notes", "Status", "Actions"]
    : ["Appointment ID", "Doctor Name", "Department", "Chamber Fee", "Appointment Date", "Appointment Time", "Consultation Type", "Notes", "Status"];

  const handleStatusChange = async (appointment, status) => {
    const appointmentId = formatAppointmentId(appointment);
    if (appointmentId === "—" || !appointmentStatuses.includes(status)) {
      setMutationError("This appointment cannot be updated because its ID or status is invalid.");
      return;
    }

    setBusyAppointmentId(appointmentId);
    setMutationError("");
    try {
      const result = await updateDoctorAppointmentStatus(appointmentId, status);
      if (result?.error) {
        setMutationError(result.error);
        return;
      }

      setAppointmentRows((current) =>
        current.map((item) =>
          formatAppointmentId(item) === appointmentId
            ? { ...item, status: result.status }
            : item
        )
      );
    } catch (error) {
      console.error("Unable to update appointment status:", error);
      setMutationError("Unable to update appointment status. Please try again.");
    } finally {
      setBusyAppointmentId("");
    }
  };

  const handleDelete = async (appointment) => {
    const appointmentId = formatAppointmentId(appointment);
    if (appointmentId === "—") {
      setMutationError("This appointment cannot be deleted because its ID is invalid.");
      return;
    }
    if (!window.confirm("Delete this appointment? This action cannot be undone.")) {
      return;
    }

    setBusyAppointmentId(appointmentId);
    setMutationError("");
    try {
      const result = await deleteDoctorAppointment(appointmentId);
      if (result?.error) {
        setMutationError(result.error);
        return;
      }

      setAppointmentRows((current) =>
        current.filter((item) => formatAppointmentId(item) !== appointmentId)
      );
    } catch (error) {
      console.error("Unable to delete appointment:", error);
      setMutationError("Unable to delete appointment. Please try again.");
    } finally {
      setBusyAppointmentId("");
    }
  };

  if (appointmentRows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-[#0F766E] dark:bg-teal-950/60 dark:text-teal-300">
          <Eye className="h-5 w-5" />
        </div>
        <h2 className="mt-4 text-base font-extrabold text-[#12343B] dark:text-white">No appointments yet</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {isDoctorView ? "Appointments assigned to you will appear here." : "Your appointment bookings will appear here."}
        </p>
      </div>
    );
  }

  return (
    <>
      {mutationError && (
        <div
          role="alert"
          className="mb-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          {mutationError}
        </div>
      )}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-left">
            <thead className="bg-[#F4FAF9] dark:bg-slate-800/80">
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col" className="whitespace-nowrap px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-300">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {appointmentRows.map((appointment, index) => (
                <tr key={formatAppointmentId(appointment) === "—" ? index : formatAppointmentId(appointment)} className="align-top transition hover:bg-teal-50/30 dark:hover:bg-slate-800/40">
                  <td className="max-w-40 truncate px-4 py-4 text-xs font-bold text-slate-500" title={formatAppointmentId(appointment)}>
                    {formatAppointmentId(appointment)}
                  </td>
                  {isDoctorView ? (
                    <>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-bold text-[#12343B] dark:text-slate-100">{displayValue(appointment.patientName)}</td>
                      <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{displayValue(appointment.patientEmail)}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{displayValue(appointment.patientPhone)}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-bold text-[#12343B] dark:text-slate-100">{formatFee(appointment.chamberFee)}</td>
                    </>
                  ) : (
                    <>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-bold text-[#12343B] dark:text-slate-100">{displayValue(appointment.doctorName)}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{displayValue(appointment.department)}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-bold text-[#12343B] dark:text-slate-100">{formatFee(appointment.chamberFee)}</td>
                    </>
                  )}
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{formatDate(appointment.appointmentDate)}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{displayValue(appointment.appointmentTime)}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm capitalize text-slate-600 dark:text-slate-300">{displayValue(appointment.consultationType)}</td>
                  <td className="max-w-56 px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
                    <span className="line-clamp-2 break-words" title={displayValue(appointment.notes)}>{displayValue(appointment.notes)}</span>
                  </td>
                  <td className="px-4 py-4">
                    {isDoctorView ? (
                      <div className="flex items-center gap-2">
                        <select
                          aria-label={`Update appointment ${formatAppointmentId(appointment)} status`}
                          value={
                            appointmentStatuses.includes(
                              String(appointment.status || "pending").toLowerCase()
                            )
                              ? String(appointment.status || "pending").toLowerCase()
                              : "pending"
                          }
                          onChange={(event) =>
                            handleStatusChange(appointment, event.target.value)
                          }
                          disabled={
                            busyAppointmentId === formatAppointmentId(appointment)
                          }
                          className={`rounded-full border px-2.5 py-1.5 text-xs font-extrabold capitalize outline-none focus:ring-2 focus:ring-teal-600/20 disabled:opacity-50 ${getStatusStyle(appointment.status)}`}
                        >
                          {appointmentStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        {busyAppointmentId === formatAppointmentId(appointment) && (
                          <Loader2 className="h-4 w-4 animate-spin text-[#0F766E]" />
                        )}
                      </div>
                    ) : (
                      <StatusBadge status={appointment.status} />
                    )}
                  </td>
                  {isDoctorView && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedAppointment(appointment)}
                          aria-label={`View appointment ${formatAppointmentId(appointment)}`}
                          title="View appointment details"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-[#0F766E] transition hover:bg-[#0F766E] hover:text-white dark:border-teal-900 dark:bg-teal-950/60 dark:text-teal-300 dark:hover:bg-[#0F766E] dark:hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(appointment)}
                          disabled={
                            busyAppointmentId === formatAppointmentId(appointment)
                          }
                          aria-label={`Delete appointment ${formatAppointmentId(appointment)}`}
                          title="Delete appointment"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-700 dark:hover:text-white"
                        >
                          {busyAppointmentId === formatAppointmentId(appointment) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </>
  );
}
