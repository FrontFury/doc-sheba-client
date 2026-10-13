import { serverFetch } from "../core/server";

export const getPatientDetails = async (patientID) => {
  if (!patientID) return null;

  try {
    const res = await serverFetch(
      `/api/my/patients?patientID=${encodeURIComponent(patientID)}`
    );

    return res || null;
  } catch (error) {
    console.error("Failed to fetch patient details:", error);
    return null;
  }
};