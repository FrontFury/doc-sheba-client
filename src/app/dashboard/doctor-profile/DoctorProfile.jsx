"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Upload,
  Star,
  Save,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@heroui/react";
import { createDoctor } from "@/lib/actions/doctors";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_HOST_KEY;

export default function DoctorProfile({ doctor, doctorDetails }) {
  // 💡 doctorDetails থেকে প্রাথমিক ডাটা সেট করা হলো
  const [formData, setFormData] = useState({
    name: doctorDetails?.name || "",
    department: doctorDetails?.department || "",
    deptCategory: doctorDetails?.deptCategory || "",
    designation: doctorDetails?.designation || "",
    degrees: doctorDetails?.degrees || "",
    bmdcReg: doctorDetails?.bmdcReg || "",
    rating: doctorDetails?.rating || "",
    chamberFee: doctorDetails?.chamberFee || "",
    avgQueueTime: doctorDetails?.avgQueueTime || "",
    location: doctorDetails?.location || "",
    visitingHours: doctorDetails?.visitingHours || "",
    experience: doctorDetails?.experience || "",
    articleTitle: doctorDetails?.articleTitle || "",
    articleDesc: doctorDetails?.articleDesc || "",
    image: doctorDetails?.image || "",
    doctorID: doctor?.id || doctorDetails?.doctorID || "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage("");

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Image = reader.result.split(",")[1];
        const apiKey = IMGBB_API_KEY;

        const uploadData = new FormData();
        uploadData.append("image", base64Image);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: uploadData,
          }
        );

        const result = await response.json();

        if (result.success && result.data?.url) {
          console.log("ImgBB Permanent URL:", result.data.url);
          setFormData((prev) => ({ ...prev, image: result.data.url }));
        } else {
          console.error("ImgBB Upload Failed:", result);
          setErrorMessage(
            `ImgBB Error: ${result?.error?.message || "Failed to upload image"}`
          );
        }
        setIsUploading(false);
      };

      reader.onerror = (error) => {
        console.error("FileReader Error:", error);
        setErrorMessage("Error reading image file.");
        setIsUploading(false);
      };
    } catch (error) {
      console.error("ImgBB Network Error:", error);
      setErrorMessage("Network error during image upload to ImgBB.");
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await createDoctor(formData);

      if (res?.error) {
        setErrorMessage(res.error || "Failed to create doctor profile.");
      } else {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      }
    } catch (error) {
      console.error("Create Doctor Error:", error);
      setErrorMessage("Backend server issue. Please check your endpoint.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 p-4 sm:p-8 font-sans overflow-hidden">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 text-[#0F766E] dark:text-teal-300 text-xs font-black tracking-wider uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>ACCREDITED FACULTY PROFILE MANAGER</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#12343B] dark:text-white tracking-tight font-[#Manrope]">
              Customize Doctor Directory Card
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-4 py-2 rounded-2xl text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>BMDC Reg & ShebaFlow™ Verified</span>
          </div>
        </div>

        {/* Alerts */}
        <AnimatePresence>
          {savedSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-gradient-to-r from-[#0F766E] to-emerald-600 text-white rounded-2xl font-bold text-xs flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>Doctor created successfully via Server Action!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {errorMessage && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 rounded-2xl font-bold text-xs flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider">
                  Doctor Profile Avatar (ImgBB Cloud Storage)
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-dashed border-[#0F766E]/40 bg-slate-200 dark:bg-slate-700 shrink-0 shadow-sm flex items-center justify-center text-slate-400">
                    {formData.image ? (
                      <Image
                        src={formData.image}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">
                        No Image
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 flex-1">
                    <label className="cursor-pointer bg-[#0F766E] hover:bg-[#0E7490] text-white px-4 py-2.5 rounded-xl font-extrabold text-xs inline-flex items-center gap-2 transition-all shadow-md">
                      {isUploading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span>
                        {isUploading ? "Uploading..." : "Upload via ImgBB"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-500 mb-1">
                    Doctor Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Dr. Sayeda Sanjid Ara Nupur"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-500 mb-1">
                    Department / Specialty
                  </label>
                  <input
                    type="text"
                    name="department"
                    placeholder="e.g. FERTILITY & WOMEN'S HEALTH"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-500 mb-1">
                    Department Category
                  </label>
                  <input
                    type="text"
                    name="deptCategory"
                    placeholder="e.g. Gynecology & Obstetrics"
                    value={formData.deptCategory}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-500 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    placeholder="e.g. Consultant Specialist"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-500 mb-1">
                    Degrees & Qualifications
                  </label>
                  <input
                    type="text"
                    name="degrees"
                    placeholder="e.g. MBBS, FCPS (Obs & Gynae)"
                    value={formData.degrees}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-500 mb-1">
                    Experience (Years)
                  </label>
                  <input
                    type="text"
                    name="experience"
                    placeholder="e.g. 12+ Years"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-500 mb-1">
                    BMDC Reg Number
                  </label>
                  <input
                    type="text"
                    name="bmdcReg"
                    placeholder="e.g. 1234567"
                    value={formData.bmdcReg}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-500 mb-1">
                    Rating Score
                  </label>
                  <input
                    type="text"
                    name="rating"
                    placeholder="e.g. 5"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                  />
                </div>
              </div>

              {/* Chamber Fee, Timing & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-extrabold text-slate-500 mb-1">
                    Chamber Fee (৳)
                  </label>
                  <input
                    type="number"
                    name="chamberFee"
                    placeholder="e.g. 1200"
                    value={formData.chamberFee}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-500 mb-1">
                    Avg Queue Wait Time
                  </label>
                  <input
                    type="text"
                    name="avgQueueTime"
                    placeholder="e.g. 10 mins"
                    value={formData.avgQueueTime}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-500 mb-1">
                    Chamber Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Dhanmondi, Dhaka"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-500 mb-1">
                    Visiting Hours
                  </label>
                  <input
                    type="text"
                    name="visitingHours"
                    placeholder="e.g. Sat - Wed (5:00 PM - 9:00 PM)"
                    value={formData.visitingHours}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                  />
                </div>
              </div>

              {/* Article Brief */}
              <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-extrabold text-slate-500 mb-1">
                    Article Title
                  </label>
                  <input
                    type="text"
                    name="articleTitle"
                    placeholder="e.g. VBVVV"
                    value={formData.articleTitle}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-500 mb-1">
                    Article Summary
                  </label>
                  <textarea
                    rows={3}
                    name="articleDesc"
                    placeholder="e.g. yyyyyyyyyy..."
                    value={formData.articleDesc}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isUploading}
                startContent={
                  isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )
                }
                className="w-full bg-[#0F766E] hover:bg-[#0E7490] text-white font-black text-xs py-3.5 rounded-2xl shadow-lg transition-all"
              >
                {isSubmitting
                  ? "Sending to Server..."
                  : "Save Doctor Profile & Publish Card"}
              </Button>
            </form>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Live Card Preview
            </span>

            <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200/90 dark:border-slate-800 p-6 shadow-xl space-y-5">
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800 shadow-md flex items-center justify-center">
                  {formData.image ? (
                    <Image
                      src={formData.image}
                      alt="Doctor"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400">
                      Photo
                    </span>
                  )}
                </div>

                <div className="space-y-0.5 flex-1 min-w-0">
                  <span className="text-[11px] font-black text-[#0F766E] dark:text-teal-400 uppercase tracking-widest block truncate">
                    {formData.department || "SPECIALTY DEPARTMENT"}
                  </span>
                  <h3 className="font-extrabold text-base text-[#12343B] dark:text-slate-100 truncate">
                    {formData.name || "Doctor Full Name"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                    {formData.designation || "Designation"}
                  </p>
                  <div className="flex items-center gap-2 pt-0.5 text-xs">
                    <span className="flex items-center gap-1 font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {formData.rating || "5.0"}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400 text-[11px] font-semibold">
                      BMDC: {formData.bmdcReg || "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8FAFC] dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1.5">
                <h4 className="font-extrabold text-xs text-[#12343B] dark:text-slate-100">
                  {formData.articleTitle || "Featured Clinical Guidance Title"}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {formData.articleDesc ||
                    "Brief summary of clinical guidance or article insights..."}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">
                    Chamber Fee
                  </span>
                  <span className="font-black text-xl text-[#12343B] dark:text-slate-100">
                    ৳
                    {formData.chamberFee
                      ? Number(formData.chamberFee).toLocaleString("en-BD")
                      : "0"}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">
                    Avg Queue Time
                  </span>
                  <span className="font-extrabold text-xs text-[#0F766E] dark:text-teal-400">
                    {formData.avgQueueTime || "< 15 mins"}
                  </span>
                </div>
              </div>

              <Button className="w-full bg-[#0F766E] hover:bg-[#0E7490] text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2">
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}