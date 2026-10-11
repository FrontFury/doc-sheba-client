import { Suspense } from 'react';
import { getUserSession } from '@/lib/core/session';
import DoctorProfile from './DoctorProfile';
import { getDoctorDetails } from '@/lib/api/doctors';
import { Loader2 } from 'lucide-react';

// ১. ডাটা লোডার কম্পোনেন্ট
async function DoctorProfileLoader() {
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="p-8 text-center text-rose-500 font-bold">
        User session not found. Please log in.
      </div>
    );
  }

  const doctorDetails = await getDoctorDetails(user?.id);

  return <DoctorProfile doctor={user} doctorDetails={doctorDetails} />;
}

// ২. লোডিং ইউআই ফলব্যাক
function ProfileSkeleton() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-8 h-8 text-[#0F766E] animate-spin" />
      <p className="text-xs font-bold text-slate-400">Loading Doctor Profile...</p>
    </div>
  );
}

// ৩. মূল পেজ এক্সপোর্ট (Suspense সহ)
const DoctorPage = () => {
  return (
    <div>
      <Suspense fallback={<ProfileSkeleton />}>
        <DoctorProfileLoader />
      </Suspense>
    </div>
  );
};

export default DoctorPage;