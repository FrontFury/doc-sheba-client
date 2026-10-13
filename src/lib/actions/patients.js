'use server'

import { getUserSession } from "../core/session";
import { serverFetch, serverMutation } from "../core/server";

export const createPatient = async (newPatientData) => {
  const user = await getUserSession();
  if (!user) {
    return { error: "Please sign in to create a patient profile." };
  }

  try {
    const existingPatient = await serverFetch(
      `/api/my/patients?patientID=${encodeURIComponent(user.id)}`
    );
    if (existingPatient) {
      return { error: "A patient profile already exists for this account." };
    }

    return serverMutation("/api/patients", {
      ...newPatientData,
      patientID: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error("Create Patient Error:", error);
    return { error: "Unable to verify or save the patient profile right now." };
  }
};