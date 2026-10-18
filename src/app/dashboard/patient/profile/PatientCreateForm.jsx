"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  CheckCircle2,
  HeartPulse,
  Loader2,
  Save,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { Button } from "@heroui/react";
import { createPatient } from "@/lib/actions/patients";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_HOST_KEY;
const fieldClassName = "w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]";
const labelClassName = "block text-xs font-extrabold text-slate-500 mb-1";

export default function PatientCreateForm({ user, patientDetails }) {
  const [formData, setFormData] = useState({
    patientID: patientDetails?.patientID || user?.id || "",
    name: patientDetails?.name || user?.name || "",
    email: patientDetails?.email || user?.email || "",
    phone: patientDetails?.phone || "",
    image: patientDetails?.image || "",
    dateOfBirth: patientDetails?.dateOfBirth || "",
    gender: patientDetails?.gender || "",
    bloodGroup: patientDetails?.bloodGroup || "",
    presentAddress: patientDetails?.presentAddress || "",
    emergencyContactName: patientDetails?.emergencyContactName || patientDetails?.emergencyContact?.name || "",
    emergencyContactPhone: patientDetails?.emergencyContactPhone || patientDetails?.emergencyContact?.phone || "",
    knownAllergies: patientDetails?.knownAllergies || "",
    medicalConditions: patientDetails?.medicalConditions || "",
    currentMedications: patientDetails?.currentMedications || "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [createdPatientID, setCreatedPatientID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setErrorMessage("");
    if (!IMGBB_API_KEY) {
      setErrorMessage("Profile photo upload is not configured.");
      event.target.value = "";
      return;
    }
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      setErrorMessage("Choose an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setIsUploading(true);
    try {
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(",")[1]);
        reader.onerror = () => reject(new Error("Could not read the selected image."));
        reader.readAsDataURL(file);
      });
      const uploadData = new FormData();
      uploadData.append("image", base64Image);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: uploadData,
      });
      const result = await response.json();

      if (!response.ok || !result.success || !result.data?.url) {
        throw new Error(result?.error?.message || "Failed to upload profile photo.");
      }
      setFormData((previous) => ({ ...previous, image: result.data.url }));
    } catch (error) {
      setErrorMessage(error.message || "Unable to upload the profile photo.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSavedSuccess(false);

    try {
      const result = await createPatient(formData);

      if (result?.error) {
        setErrorMessage(result?.error || "Failed to create patient profile.");
      } else {
        setCreatedPatientID(result.patientID);
        setSavedSuccess(true);
      }
    } catch (error) {
      console.error("Create Patient Error:", error);
      setErrorMessage("Backend server issue. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 p-4 sm:p-8 font-sans overflow-hidden">
      <div className="max-w-300 mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 text-[#0F766E] dark:text-teal-300 text-xs font-black tracking-wider uppercase shadow-sm">
              <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
              <span>Patient Registration</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#12343B] dark:text-white tracking-tight font-[#Manrope]">
              Create Patient Profile
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-4 py-2 rounded-2xl text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Secure Health Record</span>
          </div>
        </div>

        <AnimatePresence>
          {savedSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-linear-to-r from-[#0F766E] to-emerald-600 text-white rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>
                Patient profile created successfully. Patient ID: {createdPatientID}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {errorMessage && (
          <div role="alert" className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 rounded-2xl font-bold text-xs flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {patientDetails && (
                <div role="status" className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-2xl font-bold text-xs flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>A patient profile already exists for this account. Creation is disabled.</span>
                </div>
              )}
              <fieldset disabled={Boolean(patientDetails) || savedSuccess} className="space-y-6 border-0 p-0 m-0 min-w-0">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider">
                  Profile Photo (ImgBB Cloud Storage)
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-dashed border-[#0F766E]/40 bg-slate-200 dark:bg-slate-700 shrink-0 shadow-sm flex items-center justify-center text-slate-400">
                    {formData.image ? (
                      <Image src={formData.image} alt="Patient profile" fill unoptimized className="object-cover" />
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">No Image</span>
                    )}
                  </div>
                  <label className="cursor-pointer bg-[#0F766E] hover:bg-[#0E7490] text-white px-4 py-2.5 rounded-xl font-extrabold text-xs inline-flex items-center gap-2 transition-all shadow-md w-fit">
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span>{isUploading ? "Uploading..." : "Upload via ImgBB"}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className={labelClassName}>Full Name</label>
                  <input id="name" name="name" type="text" maxLength={120} autoComplete="name" placeholder="Enter full name" value={formData.name} onChange={handleChange} className={fieldClassName} required />
                </div>
                <div>
                  <label htmlFor="email" className={labelClassName}>Email Address</label>
                  <input id="email" name="email" type="email" autoComplete="email" value={formData.email} readOnly className={`${fieldClassName} read-only:opacity-70`} required />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClassName}>Phone Number</label>
                  <input id="phone" name="phone" type="tel" maxLength={24} autoComplete="tel" placeholder="e.g. +880 1XXXXXXXXX" value={formData.phone} onChange={handleChange} className={fieldClassName} required />
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className={labelClassName}>Date of Birth</label>
                  <input id="dateOfBirth" name="dateOfBirth" type="date" max={new Date().toISOString().slice(0, 10)} value={formData.dateOfBirth} onChange={handleChange} className={fieldClassName} required />
                </div>
                <div>
                  <label htmlFor="gender" className={labelClassName}>Gender</label>
                  <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className={fieldClassName} required>
                    <option value="">Select gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="bloodGroup" className={labelClassName}>Blood Group</label>
                  <select id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className={fieldClassName} required>
                    <option value="">Select blood group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"].map((group) => <option key={group} value={group}>{group}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="presentAddress" className={labelClassName}>Present Address</label>
                  <textarea id="presentAddress" name="presentAddress" rows={3} maxLength={500} autoComplete="street-address" placeholder="Street, area, city" value={formData.presentAddress} onChange={handleChange} className={`${fieldClassName} font-medium`} required />
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">Emergency Contact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="emergencyContactName" className={labelClassName}>Contact Name</label>
                    <input id="emergencyContactName" name="emergencyContactName" type="text" maxLength={120} placeholder="Full name" value={formData.emergencyContactName} onChange={handleChange} className={fieldClassName} required />
                  </div>
                  <div>
                    <label htmlFor="emergencyContactPhone" className={labelClassName}>Contact Phone Number</label>
                    <input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" maxLength={24} placeholder="e.g. +880 1XXXXXXXXX" value={formData.emergencyContactPhone} onChange={handleChange} className={fieldClassName} required />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">Medical Information <span className="normal-case font-semibold">(optional)</span></h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="knownAllergies" className={labelClassName}>Known Allergies</label>
                    <textarea id="knownAllergies" name="knownAllergies" rows={2} maxLength={1000} placeholder="List allergies, or leave blank" value={formData.knownAllergies} onChange={handleChange} className={`${fieldClassName} font-medium`} />
                  </div>
                  <div>
                    <label htmlFor="medicalConditions" className={labelClassName}>Existing Medical Conditions</label>
                    <textarea id="medicalConditions" name="medicalConditions" rows={2} maxLength={1000} placeholder="List existing conditions, or leave blank" value={formData.medicalConditions} onChange={handleChange} className={`${fieldClassName} font-medium`} />
                  </div>
                  <div>
                    <label htmlFor="currentMedications" className={labelClassName}>Current Medications</label>
                    <textarea id="currentMedications" name="currentMedications" rows={2} maxLength={1000} placeholder="List current medications, or leave blank" value={formData.currentMedications} onChange={handleChange} className={`${fieldClassName} font-medium`} />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isUploading || savedSuccess}
                startContent={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                className="w-full bg-[#0F766E] hover:bg-[#0E7490] text-white font-black text-xs py-3.5 rounded-2xl shadow-lg transition-all"
              >
                  {isSubmitting ? "Saving Patient..." : patientDetails || savedSuccess ? "Patient Profile Exists" : "Create Patient Profile"}
              </Button>
              </fieldset>
            </form>
          </div>

          <aside className="lg:col-span-4 sticky top-24 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-rose-500" /> Patient Summary
            </span>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {formData.image ? (
                    <Image src={formData.image} alt="Patient" fill unoptimized className="object-cover" />
                  ) : (
                    <span className="text-xs font-black text-slate-400">Photo</span>
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="font-extrabold text-base text-[#12343B] dark:text-slate-100 truncate">{formData.name || "Patient Name"}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{formData.email || "Email address"}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{formData.phone || "Phone number"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 bg-[#F8FAFC] dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Date of Birth</span>
                  <span className="font-extrabold text-[#12343B] dark:text-slate-200 mt-1 block">{formData.dateOfBirth || "Not set"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Blood Group</span>
                  <span className="font-extrabold text-[#0F766E] dark:text-teal-400 mt-1 block">{formData.bloodGroup || "Not set"}</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900 text-xs text-teal-800 dark:text-teal-200 flex gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <p>This profile is linked to the signed-in account email.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}