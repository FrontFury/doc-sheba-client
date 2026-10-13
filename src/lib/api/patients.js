import { serverFetch } from "../core/server";

export const getPatientDetails = async (userID) => {
  if (!userID) return null;

  try {
    const res = await serverFetch(
      `/api/my/patients?userID=${encodeURIComponent(userID)}`
    );

    return res || null;
  } catch (error) {
    console.error("Failed to fetch patient details:", error);
    return null;
  }
};