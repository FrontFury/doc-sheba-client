import { serverFetch } from "../core/server";

export const getDoctorDetails = async (doctorID) => {
  if (!doctorID) return null;

  try {
    const res = await serverFetch(
      `/api/my/doctors?doctorID=${encodeURIComponent(doctorID)}`
    );
    
    if (!res) return null;

    return res;
  } catch (error) {
    console.error("Failed to fetch doctor details:", error);
    return null;
  }
};