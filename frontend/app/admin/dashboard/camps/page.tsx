"use client"

import { useState } from "react";
import CampList from "./components/CampList";
import ColonieForm from "./components/ColonieForm";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-[#fdfaf7] font-sans antialiased text-[#4a3f35] overflow-x-hidden">
      <div className="max-w-7xl mx-auto py-10 px-8">
        <span className="text-[20px] font-black text-[#0f0e0d] uppercase tracking-[0.4em] block border-l-4 border-[#c4a484] pl-6">
          Dashboard Admin Camps
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-8 pb-20">
        <div className="flex flex-col gap-16">
          
          <section className="w-full">
            <div className="mb-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c4a484]">Configuration</h2>
              <p className="text-sm font-bold text-[#2d241e]">Créer une nouvelle aventure</p>
            </div>
            <ColonieForm onSuccess={handleRefresh} />
          </section>

          <section className="w-full">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c4a484]">Gestion</h2>
                <p className="text-sm font-bold text-[#2d241e]">Colonies actives</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4a484] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c4a484]"></span>
                </span>
                <span className="text-[10px] font-black text-[#c4a484] uppercase">Live View</span>
              </div>
            </div>
            <CampList refreshKey={refreshKey} />
          </section>

        </div>
      </div>
    </main>
  );
}