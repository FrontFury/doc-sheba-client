import { serverFetch } from "@/lib/core/server";

const getAppointmentArray = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.appointments)) return response.appointments;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.appointments)) return response.data.appointments;

  throw new Error("The appointments API returned an invalid response.");
};

export const getPatientAppointments = async (patientID) => {
  if (!patientID) {
    throw new Error("A patient ID is required to load appointments.");
  }

  const response = await serverFetch(
    `/api/patient/my-appointments?patientID=${encodeURIComponent(patientID)}`
  );

  return getAppointmentArray(response);
};

export const getDoctorAppointments = async (doctorID) => {
  if (!doctorID) {
    throw new Error("A doctor ID is required to load appointments.");
  }

  const response = await serverFetch(
    `/api/doctor/all-appointments?doctorID=${encodeURIComponent(doctorID)}`
  );

  return getAppointmentArray(response);
};
