'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Stethoscope,
  CalendarCheck,
  CreditCard,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Search,
  Filter,
  UserPlus,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@heroui/react';

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dummy Stats Data
  const stats = [
    {
      title: 'Total Doctors',
      value: '128',
      change: '+12% this month',
      icon: Stethoscope,
      color: 'from-teal-500/20 to-emerald-500/20',
      textColor: 'text-teal-600 dark:text-teal-400',
    },
    {
      title: 'Active Patients',
      value: '2,845',
      change: '+18% this month',
      icon: Users,
      color: 'from-blue-500/20 to-cyan-500/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Appointments Today',
      value: '64',
      change: '+5% vs yesterday',
      icon: CalendarCheck,
      color: 'from-amber-500/20 to-orange-500/20',
      textColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      title: 'Total Revenue',
      value: '৳ 4,85,000',
      change: '+22% growth',
      icon: CreditCard,
      color: 'from-emerald-500/20 to-teal-500/20',
      textColor: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  // Dummy Pending Doctor Verification Requests
  const pendingDoctors = [
    {
      id: 'DOC-101',
      name: 'Dr. Sarah Ahmed',
      specialty: 'Cardiologist',
      experience: '8 Years',
      degrees: 'MBBS, FCPS (Cardiology)',
      appliedDate: '18 Oct 2026',
    },
    {
      id: 'DOC-102',
      name: 'Dr. Mahmudul Hasan',
      specialty: 'Neurologist',
      experience: '12 Years',
      degrees: 'MBBS, MD (Neurology)',
      appliedDate: '17 Oct 2026',
    },
  ];

  // Dummy Recent Appointments
  const recentAppointments = [
    {
      id: 'APT-8821',
      patient: 'Rafiqul Islam',
      doctor: 'Dr. Tanvir Rahman',
      department: 'Cardiology',
      date: '18 Oct 2026',
      time: '10:30 AM',
      fee: '৳ 1,000',
      status: 'Confirmed',
    },
    {
      id: 'APT-8822',
      patient: 'Nusrat Jahan',
      doctor: 'Dr. Anika Tabassum',
      department: 'Dermatology',
      date: '18 Oct 2026',
      time: '11:15 AM',
      fee: '৳ 800',
      status: 'Pending',
    },
    {
      id: 'APT-8823',
      patient: 'Sajid Hossain',
      doctor: 'Dr. Farhana Khan',
      department: 'Orthopedics',
      date: '18 Oct 2026',
      time: '02:00 PM',
      fee: '৳ 1,200',
      status: 'Completed',
    },
    {
      id: 'APT-8824',
      patient: 'Fatema Khatun',
      doctor: 'Dr. Kamrul Ahsan',
      department: 'Pediatrics',
      date: '19 Oct 2026',
      time: '04:30 PM',
      fee: '৳ 700',
      status: 'Cancelled',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 p-4 sm:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Top Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 rounded-[32px] shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-[#0F766E] dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              DocSheba Administrative Console
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#12343B] dark:text-white tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              System overview, doctor verification requests, and overall platform statistics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="bg-[#0F766E] hover:bg-[#0E7490] text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md transition-all flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New Doctor</span>
            </Button>
          </div>
        </div>

        {/* Analytics Summary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-[28px] shadow-sm relative overflow-hidden flex flex-col justify-between"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} rounded-bl-full blur-2xl pointer-events-none`} />

                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    {stat.title}
                  </span>
                  <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 ${stat.textColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-3xl font-black text-[#12343B] dark:text-white tracking-tight">
                    {stat.value}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{stat.change}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid: Pending Verifications & Recent Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Doctor Verification Requests (4 Cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-[32px] shadow-sm space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-black text-[#12343B] dark:text-white">
                    Verification Requests
                  </h2>
                  <p className="text-xs text-slate-400">Doctors waiting for profile approval</p>
                </div>
                <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 text-xs font-black px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                  {pendingDoctors.length} Pending
                </span>
              </div>

              <div className="space-y-4 mt-4">
                {pendingDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-extrabold text-sm text-[#12343B] dark:text-slate-100">
                          {doc.name}
                        </h4>
                        <p className="text-xs font-black text-[#0F766E] dark:text-teal-400 uppercase tracking-wider">
                          {doc.specialty}
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">{doc.appliedDate}</span>
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
                      <p><strong>Degrees:</strong> {doc.degrees}</p>
                      <p><strong>Experience:</strong> {doc.experience}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                      <Button className="flex-1 bg-[#0F766E] hover:bg-[#0E7490] text-white text-xs font-extrabold py-2 rounded-xl">
                        Approve
                      </Button>
                      <Button className="flex-1 bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 hover:bg-rose-100 text-xs font-extrabold py-2 rounded-xl">
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="flat"
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs py-3 rounded-2xl flex items-center justify-center gap-2 mt-4"
            >
              <span>View All Requests</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Right Column: Recent Appointments Table (8 Cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-[32px] shadow-sm space-y-6">
            
            {/* Table Filter Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-black text-[#12343B] dark:text-white">
                  Recent Appointments
                </h2>
                <p className="text-xs text-slate-400">Live booking activity across the platform</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search appointment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-black uppercase tracking-wider">
                    <th className="pb-3 px-2">ID</th>
                    <th className="pb-3 px-2">Patient</th>
                    <th className="pb-3 px-2">Doctor</th>
                    <th className="pb-3 px-2">Schedule</th>
                    <th className="pb-3 px-2">Fee</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {recentAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-2 font-bold text-slate-500">{apt.id}</td>
                      <td className="py-4 px-2 font-bold text-[#12343B] dark:text-slate-100">{apt.patient}</td>
                      <td className="py-4 px-2">
                        <p className="font-extrabold text-[#0F766E] dark:text-teal-400">{apt.doctor}</p>
                        <p className="text-[10px] text-slate-400">{apt.department}</p>
                      </td>
                      <td className="py-4 px-2">
                        <p className="font-bold">{apt.date}</p>
                        <p className="text-[10px] text-slate-400">{apt.time}</p>
                      </td>
                      <td className="py-4 px-2 font-black text-[#12343B] dark:text-white">{apt.fee}</td>
                      <td className="py-4 px-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            apt.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                              : apt.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                              : apt.status === 'Completed'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
                              : 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}