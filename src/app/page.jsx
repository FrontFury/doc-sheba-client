import SymptomSelector from "@/components/Home/Body/SymptomSelector";
import ExploreDept from "@/components/Home/ExploreDept";
import HeroBanner from "@/components/Home/HeroBanner";
import PatientVoice from "@/components/Home/PatientVoice";
import ShortDes from "@/components/Home/ShortDes";
import SpecialDoc from "@/components/Home/SpecialDoc";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] text-[#172033] transition-colors dark:bg-slate-950 dark:text-slate-100">
      <HeroBanner />
      <SymptomSelector/>
      <ShortDes/>
      <ExploreDept/>
      <SpecialDoc/>
      <PatientVoice/>
      
      
    </main>
  );
}