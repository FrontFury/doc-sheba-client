import ExploreDept from "@/components/Home/ExploreDept";
import HeroBanner from "@/components/Home/HeroBanner";
import PatientVoice from "@/components/Home/PatientVoice";
import ShortDes from "@/components/Home/ShortDes";
import SpecialDoc from "@/components/Home/SpecialDoc";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] transition-colors">
      <HeroBanner />
      <ExploreDept/>
      <SpecialDoc/>
      <PatientVoice/>
      <ShortDes/>
    </main>
  );
}