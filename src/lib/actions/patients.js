'use server'

import { getUserSession } from "../core/session";
import { serverFetch, serverMutation } from "../core/server";
import { getPatientDetails } from "../api/patients";

export async function getCurrentPatientSummary() {
  const user = await getUserSession();
  if (!user || user.role !== "patient") return null;

  const patient = await getPatientDetails(user.id);
  if (!patient) return null;

  return {
    patientID: patient.patientID || "",
    name: patient.name || "",
    image: patient.image || "",
    bloodGroup: patient.bloodGroup || "",
  };
}

export const createPatient = async (newPatientData) => {
  const user = await getUserSession();
  if (!user) {
    return { error: "Please sign in to create a patient profile." };
  }

  try {
    const existingPatient = await serverFetch(
      `/api/my/patients?userID=${encodeURIComponent(user.id)}`
    );
    if (existingPatient?.success === false) {
      return {
        error:
          existingPatient.message ||
          "Unable to verify whether a patient profile already exists.",
      };
    }
    if (existingPatient) {
      return { error: "A patient profile already exists for this account." };
    }

    const patientData = { ...newPatientData };
    delete patientData.patientID;
    delete patientData._id;

    const createdPatient = await serverMutation("/api/patients", {
      ...patientData,
      patientID: user.id,
      userID: user.id,
      email: user.email,
    });

    if (!createdPatient?.patientID) {
      return {
        error:
          createdPatient?.message ||
          "The patient profile was not saved. Please try again.",
      };
    }

    return createdPatient;
  } catch (error) {
    console.error("Create Patient Error:", error);
    return { error: "Unable to verify or save the patient profile right now." };
  }
};