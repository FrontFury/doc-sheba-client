import { protectedFetch, serverFetch } from "../core/server";

const getDoctorList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.doctors)) return payload.doctors;
  if (Array.isArray(payload?.data?.doctors)) return payload.data.doctors;
  throw new Error("The doctors API returned an invalid response.");
};

const getDoctorIdentifiers = (doctor) =>
  [doctor?.doctorID, doctor?._id?.$oid, doctor?._id, doctor?.id]
    .filter(Boolean)
    .map(String);

export const getPublicDoctorDetails = async (doctorID) => {
  if (!doctorID) return null;

  const doctors = getDoctorList(await serverFetch("/api/doctors"));
  const requestedID = String(doctorID);

  return (
    doctors.find((doctor) => getDoctorIdentifiers(doctor).includes(requestedID)) ||
    null
  );
};

export const getDoctorDetails = async (doctorID) => {
  if (!doctorID) return null;

  try {
    const res = await protectedFetch(
      `/api/my/doctors?doctorID=${encodeURIComponent(doctorID)}`
    );
    
    if (!res) return null;

    return res;
  } catch (error) {
    console.error("Failed to fetch doctor details:", error);
    return null;
  }
};