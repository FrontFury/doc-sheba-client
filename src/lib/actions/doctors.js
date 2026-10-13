'use server'

import { serverMutation } from "../core/server";


export const createDoctor = async (newDoctorData) => {
  try {
    return await serverMutation("/api/doctors", newDoctorData);
  } catch (error) {
    console.error("Create Doctor Error:", error);

    if (error instanceof TypeError) {
      return {
        error:
          "Cannot connect to the DocSheba API. Start the backend server and try again.",
      };
    }

    return {
      error: error.message || "Unable to save the doctor profile.",
    };
  }
};