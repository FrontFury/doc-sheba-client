'use server'

import { serverMutation } from "../core/server";


export const createDoctor = async (newDoctorData) => {
    return serverMutation('/api/doctors', newDoctorData);
}