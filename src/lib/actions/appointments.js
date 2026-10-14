"use server";

import { getDoctorDetails } from "@/lib/api/doctors";
import { getPatientDetails } from "@/lib/api/patients";
import { getUserSession } from "@/lib/core/session";
import { serverMutation } from "@/lib/core/server";

const getFeeAmount = (fee) => {
  const value = String(fee ?? "").replace(/,/g, "").replace(/[^\d.]/g, "");
  const amount = Number(value);
  return value && Number.isFinite(amount) && amount >= 0 ? amount : null;
};

const getDhakaDate = () => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const dateParts = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
};

export async function hasActivePatientSession() {
  const user = await getUserSession();
  return Boolean(user);
}

export async function createAppointment(formData) {
  const user = await getUserSession();
  if (!user) {
    return { error: "Please sign in before booking an appointment." };
  }

  const doctorId = typeof formData?.doctorId === "string" ? formData.doctorId.trim() : "";
  const appointmentDate =
    typeof formData?.appointmentDate === "string" ? formData.appointmentDate : "";
  const appointmentTime =
    typeof formData?.appointmentTime === "string" ? formData.appointmentTime : "";
  const consultationType =
    typeof formData?.consultationType === "string" ? formData.consultationType : "";
  const notes = typeof formData?.notes === "string" ? formData.notes.trim() : "";

  if (!doctorId || doctorId.length > 200) {
    return { error: "Select a valid doctor before submitting your request." };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)) {
    return { error: "Choose a valid appointment date." };
  }

  const [year, month, day] = appointmentDate.split("-").map(Number);
  const parsedDate = new Date(Date.UTC(year, month - 1, day));
  if (
    parsedDate.getUTCFullYear() !== year ||
    parsedDate.getUTCMonth() !== month - 1 ||
    parsedDate.getUTCDate() !== day ||
    appointmentDate < getDhakaDate()
  ) {
    return { error: "Choose today or a future date for your appointment." };
  }
  if (!/^(0[1-9]|1[0-2]):00 (AM|PM)$/.test(appointmentTime)) {
    return { error: "Choose a valid appointment time." };
  }
  if (!["in-person", "online"].includes(consultationType)) {
    return { error: "Choose a valid consultation type." };
  }
  if (notes.length > 2000) {
    return { error: "Your problem summary must be 2,000 characters or fewer." };
  }

  try {
    const [patient, doctor] = await Promise.all([
      getPatientDetails(user.id),
      getDoctorDetails(doctorId),
    ]);

    const patientName = user.name || patient?.name || "";
    const patientEmail = user.email || patient?.email || "";
    const patientPhone = user.phone || patient?.phone || "";

    if (!patientName || !patientEmail || !patientPhone) {
      return {
        error: "Your patient name, email, and phone number are required to submit a booking.",
      };
    }
    if (!doctor) {
      return { error: "We could not find this doctor. Please choose another profile." };
    }

    if (getFeeAmount(doctor.chamberFee) === null) {
      return { error: "This doctor's chamber fee is unavailable. Please contact the clinic." };
    }

    const result = await serverMutation("/appointments", {
      patientId: user.id,
      patientName,
      patientEmail,
      patientPhone,
      doctorId,
      doctorName: doctor.name || "Doctor",
      department: doctor.department || "",
      chamberFee: doctor.chamberFee,
      appointmentDate,
      appointmentTime,
      consultationType,
      notes,
    });

    if (!result || result.success === false || result.error) {
      return {
        error:
          result?.message ||
          result?.error ||
          "The appointment request was not saved. Please try again.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Create Appointment Error:", error);
    return {
      error: error instanceof Error
        ? error.message
        : "Unable to submit the appointment request right now.",
    };
  }
}
