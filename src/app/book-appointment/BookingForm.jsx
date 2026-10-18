"use client";

import { useState } from "react";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { createAppointment } from "@/lib/actions/appointments";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
];

const getToday = () => {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().slice(0, 10);
};

const formatFee = (amount) =>
  amount === null ? "Contact clinic" : `৳${amount.toLocaleString("en-BD")}`;

const inputClassName =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white/80 px-3.5 py-3 text-sm font-semibold text-[#12343B] outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-[#0F766E] focus:ring-2 focus:ring-emerald-500/15 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:disabled:bg-slate-800";
const labelClassName = "text-xs font-extrabold text-slate-600 dark:text-slate-300";

export default function BookingForm({
  doctorId,
  doctorName,
  patient,
  chamberFee,
  patientProfileReady,
}) {
  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    consultationType: "in-person",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const serviceCharge = 0;
  const total = chamberFee;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const result = await createAppointment({
        doctorId,
        ...formData,
      });

      if (result?.error) {
        setErrorMessage(result.error);
      } else if (result?.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage("Your appointment request could not be submitted. Please try again.");
      }
    } catch (error) {
      console.error("Appointment submission failed:", error);
      setErrorMessage("We could not submit your appointment request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/50">
        <div className="flex items-center gap-2 font-extrabold text-emerald-900 dark:text-emerald-200">
          <CheckCircle2 className="h-5 w-5" />
          Appointment request received
        </div>
        <p className="mt-2 text-sm leading-6 text-emerald-900/75 dark:text-emerald-200/75">
          Your request to see {doctorName} has been sent. The clinic will confirm your appointment. Payment has not been processed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="sr-only">Patient information</legend>
        <label className={labelClassName}>
          Full name
          <input className={inputClassName} value={patient.name} readOnly />
        </label>
        <label className={labelClassName}>
          Email address
          <input className={inputClassName} type="email" value={patient.email} readOnly />
        </label>
        <label className={`${labelClassName} sm:col-span-2`}>
          Phone number
          <input className={inputClassName} type="tel" value={patient.phone} readOnly />
        </label>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClassName} htmlFor="appointmentDate">
          Preferred date
          <span className="relative mt-1.5 block">
            <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0F766E]" />
            <input
              id="appointmentDate"
              name="appointmentDate"
              type="date"
              min={getToday()}
              value={formData.appointmentDate}
              onChange={handleChange}
              className={`${inputClassName} pl-10`}
              required
            />
          </span>
        </label>
        <label className={labelClassName} htmlFor="appointmentTime">
          Preferred time
          <span className="relative mt-1.5 block">
            <Clock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0F766E]" />
            <select
              id="appointmentTime"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              className={`${inputClassName} appearance-none pl-10`}
              required
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((appointmentTime) => (
                <option key={appointmentTime} value={appointmentTime}>
                  {appointmentTime}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>

      <fieldset>
        <legend className={labelClassName}>Consultation type</legend>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {[
            { value: "in-person", label: "In-Person" },
            { value: "online", label: "Online" },
          ].map((type) => (
            <label
              key={type.value}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-3 text-sm font-bold transition ${
                formData.consultationType === type.value
                  ? "border-[#0F766E] bg-teal-50 text-[#0F766E] dark:border-teal-500 dark:bg-teal-950 dark:text-teal-300"
                  : "border-slate-200 bg-white/70 text-slate-600 hover:border-teal-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-teal-700"
              }`}
            >
              <input
                type="radio"
                name="consultationType"
                value={type.value}
                checked={formData.consultationType === type.value}
                onChange={handleChange}
                className="accent-[#0F766E]"
              />
              {type.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className={labelClassName} htmlFor="notes">
        Reason / symptoms         <span className="font-semibold text-slate-400 dark:text-slate-500">(optional)</span>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          maxLength={2000}
          value={formData.notes}
          onChange={handleChange}
          placeholder="Briefly describe what you would like the doctor to know."
          className={`${inputClassName} resize-y`}
        />
      </label>

      <div className="rounded-2xl border border-teal-100 bg-[#F4FAF9] p-4 dark:border-slate-700 dark:bg-slate-800/70">
        <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0F766E] dark:text-teal-400">
          <CreditCard className="h-4 w-4" />
          Fee breakdown
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-3 text-slate-600 dark:text-slate-300">
            <span>Chamber fee</span>
            <span className="font-bold text-[#12343B] dark:text-slate-100">{formatFee(chamberFee)}</span>
          </div>
          <div className="flex justify-between gap-3 text-slate-600 dark:text-slate-300">
            <span>Service charge</span>
            <span className="font-bold text-[#12343B] dark:text-slate-100">{formatFee(serviceCharge)}</span>
          </div>
          <div className="flex justify-between gap-3 border-t border-teal-900/10 pt-3 font-black text-[#12343B] dark:border-slate-600 dark:text-slate-100">
            <span>Total</span>
            <span>{formatFee(total)}</span>
          </div>
        </div>
        <p className="mt-3 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
          Payment is not collected here. The clinic will confirm your request and payment arrangements.
        </p>
      </div>

      {errorMessage && (
        <div role="alert" className="flex gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !patientProfileReady || chamberFee === null}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F766E] to-emerald-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-teal-900/15 transition hover:from-[#0B5F59] hover:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
        {isSubmitting ? "Booking appointment…" : "Book Appointment"}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-center text-[11px] font-semibold text-slate-400 dark:text-slate-500">
        <ShieldCheck className="h-3.5 w-3.5" />
        Your request is sent securely to DocSheba
      </p>
    </form>
  );
}
